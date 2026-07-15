import Link from "next/link";
import { SponsorCard } from "@/components/sponsor-card";
import type { SponsorMatch } from "@/lib/types";

const previewSponsors: SponsorMatch[] = [
  {
    sponsor_id: "preview-1",
    name: "Cedar & Co. Coffee",
    logo_url: null,
    min_amount: 250,
    max_amount: 750,
    message: "We back local runners and weekend warriors.",
    city: null,
    distance_miles: 1.2,
    matched_tags: ["Running", "Local community"],
    match_count: 2,
  },
  {
    sponsor_id: "preview-2",
    name: "Riverstone Outfitters",
    logo_url: null,
    min_amount: 500,
    max_amount: 2000,
    message: "Looking for outdoor athletes to represent the shop.",
    city: null,
    distance_miles: 3.8,
    matched_tags: ["Cycling", "Outdoor gear"],
    match_count: 2,
  },
];

const steps = [
  {
    number: "01",
    title: "Create an account",
    body: "Sign up as someone looking for sponsors, or as a business ready to back local talent.",
  },
  {
    number: "02",
    title: "Set your tags",
    body: "Pick what matters — your sport or craft, your audience, the kind of sponsor you want.",
  },
  {
    number: "03",
    title: "Get matched nearby",
    body: "Konekt ranks sponsors by how well their tags fit yours, then by distance, so you can reach out.",
  },
];

export default function LandingPage() {
  return (
    <main>
      <section className="mx-auto max-w-5xl px-6 pb-20 pt-16 sm:pt-24">
        <p className="font-mono text-xs uppercase tracking-widest text-accent">
          Local sponsorship, matched
        </p>
        <h1 className="mt-4 max-w-2xl font-display text-4xl leading-tight text-ink sm:text-6xl">
          Sponsorship, matched by what you actually do.
        </h1>
        <p className="mt-6 max-w-xl text-lg text-ink-dim">
          Konekt learns what you&apos;re looking for, then surfaces local sponsors that fit
          — no cold outreach required.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/signup"
            className="rounded-full bg-accent px-6 py-3 font-display text-base font-medium text-canvas transition-colors hover:bg-accent-strong"
          >
            Create your account
          </Link>
          <a
            href="#how-it-works"
            className="rounded-full border border-border-strong px-6 py-3 font-display text-base text-ink transition-colors hover:border-ink"
          >
            See how it works
          </a>
        </div>

        <div className="mt-16 space-y-4">
          <p className="font-mono text-xs uppercase tracking-widest text-ink-faint">
            Sponsors near you
          </p>
          {previewSponsors.map((sponsor) => (
            <SponsorCard
              key={sponsor.sponsor_id}
              sponsor={sponsor}
              totalWanted={2}
              interactive={false}
            />
          ))}
        </div>
      </section>

      <section id="how-it-works" className="border-t border-border">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <h2 className="font-display text-2xl text-ink sm:text-3xl">How it works</h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-3">
            {steps.map((step) => (
              <div key={step.number}>
                <p className="font-mono text-sm text-accent">{step.number}</p>
                <h3 className="mt-2 font-display text-lg text-ink">{step.title}</h3>
                <p className="mt-2 text-sm text-ink-dim">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto max-w-5xl px-6 py-10 text-sm text-ink-faint">Konekt</div>
      </footer>
    </main>
  );
}
