# Konekt

Konekt matches people looking for sponsors with local businesses that want
to sponsor them. A seeker sets tags describing what they're looking for
(their sport or craft, their audience, the kind of sponsor they want) and
Konekt ranks nearby sponsor listings by how well their tags match, then by
distance. Businesses post themselves as sponsor listings and get
discovered the same way.

**Stack:** Next.js 16 (App Router) + TypeScript + Tailwind CSS, Supabase
(Postgres + Auth) for the backend, deployed on Vercel, hosted on GitHub.

## How it's put together

- `app/` — pages and Server Actions, using the Next.js App Router.
- `components/` — shared UI (sponsor card, tag picker, match meter, forms).
- `lib/supabase/` — Supabase client setup for the browser and the server.
- `proxy.ts` — refreshes the auth session on every request (Next.js 16's
  replacement for `middleware.ts`).
- `supabase/schema.sql` — tables, row-level security policies, and the
  `match_sponsors` Postgres function that does the actual matching.
- `supabase/seed.sql` — a starter set of tags to pick from.

Matching happens in a single Postgres function (see `schema.sql`) rather
than in application code: it ranks sponsors by tag overlap first, then by
distance (Haversine formula, no PostGIS extension needed), and returns the
top results directly. The dashboard calls it with `supabase.rpc(...)`.

**Location** is captured with the browser's Geolocation API — the "Share
my location" buttons in onboarding and in the sponsor form — rather than a
geocoding service, so there's no extra API key to manage. If someone
declines, they can still add a city label, but distance-based matching
needs real coordinates. Swapping in a geocoding provider (Mapbox, Google)
later so people can type an address instead is a natural next step.

## 1. Create a Supabase project

1. Go to [database.new](https://database.new) and create a project.
2. In the SQL Editor, run `supabase/schema.sql`, then `supabase/seed.sql`.
3. In **Project Settings → API**, copy the **Project URL** and the
   **anon / publishable key**.

## 2. Configure environment variables

```bash
cp .env.example .env.local
```

Fill in:

```
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

`NEXT_PUBLIC_SITE_URL` is used to build the email confirmation link —
update it to your real domain once you deploy.

In Supabase, go to **Authentication → URL Configuration** and add
`http://localhost:3000/auth/callback` (and later your production
`https://your-domain.com/auth/callback`) to the redirect allow list.

## 3. Run it locally

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`. Sign up, confirm your email, then you'll be
walked through choosing whether you're looking for sponsors or posting a
sponsorship.

## 4. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<your-username>/konekt.git
git push -u origin main
```

## 5. Deploy on Vercel

1. In Vercel, **Add New → Project** and import the GitHub repo.
2. Add the same three environment variables from `.env.local` in the
   project's **Settings → Environment Variables** — set
   `NEXT_PUBLIC_SITE_URL` to the Vercel domain Vercel gives you (or your
   custom domain).
3. Deploy. Add `https://<your-vercel-domain>/auth/callback` to Supabase's
   redirect allow list (same place as step 2).

## Extending it

- **Editing/removing sponsor listings** — `/sponsors/manage` currently
  lists them read-only; add edit and delete forms following the same
  pattern as `sponsors/new/actions.ts`.
- **Accepting/declining connections** — the `connections` table and its
  RLS policies already support a sponsor updating `status`; a small
  `/sponsors/manage` inbox view would surface that.
- **Geocoded addresses** — replace the "Share my location" buttons with an
  address field wired to a geocoding API if you'd rather not rely on
  browser geolocation.
- **Logos** — `sponsors.logo_url` is already in the schema and rendered by
  `SponsorCard`; wire up Supabase Storage for uploads when you're ready.
