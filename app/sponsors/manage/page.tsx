import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function ManageSponsorsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: listings } = await supabase
    .from("sponsors")
    .select("id, name, min_amount, max_amount, city, created_at, connections(count)")
    .eq("owner_id", user.id)
    .order("created_at", { ascending: false });

  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-3xl text-ink">Your listings</h1>
        <Link
          href="/sponsors/new"
          className="rounded-full bg-accent px-4 py-2 font-display text-sm font-medium text-canvas transition-colors hover:bg-accent-strong"
        >
          + New listing
        </Link>
      </div>

      <div className="mt-8 space-y-4">
        {!listings || listings.length === 0 ? (
          <div className="rounded-2xl border border-border bg-surface p-8 text-center">
            <p className="font-display text-lg text-ink">No listings yet</p>
            <p className="mt-2 text-sm text-ink-dim">
              Post a sponsorship to start showing up in nearby seekers&apos; matches.
            </p>
          </div>
        ) : (
          listings.map((listing) => {
            const connectionCount = Array.isArray(listing.connections)
              ? (listing.connections[0] as { count: number } | undefined)?.count ?? 0
              : 0;

            return (
              <div
                key={listing.id}
                className="flex items-center justify-between gap-4 rounded-2xl border border-border bg-surface p-5"
              >
                <div>
                  <p className="font-display text-lg text-ink">{listing.name}</p>
                  <p className="mt-1 font-mono text-sm text-accent">
                    ${listing.min_amount.toLocaleString()}–${listing.max_amount.toLocaleString()}
                  </p>
                </div>
                <p className="text-sm text-ink-dim">
                  {connectionCount} {connectionCount === 1 ? "connection" : "connections"}
                </p>
              </div>
            );
          })
        )}
      </div>
    </main>
  );
}
