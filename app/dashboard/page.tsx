import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { SponsorCard } from "@/components/sponsor-card";
import type { SponsorMatch } from "@/lib/types";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role, latitude, longitude")
    .eq("id", user.id)
    .single();

  if (!profile || profile.role !== "seeker") {
    redirect("/onboarding");
  }
  if (profile.latitude === null || profile.longitude === null) {
    redirect("/onboarding?reason=location");
  }

  const { data: wantedTagRows } = await supabase
    .from("seeker_tags")
    .select("tags(label)")
    .eq("profile_id", user.id);

  const wantedTags = (wantedTagRows ?? [])
    .map((row) => (row as unknown as { tags: { label: string } | null }).tags?.label)
    .filter((label): label is string => Boolean(label));

  const { data: matches } = await supabase.rpc("match_sponsors", {
    p_seeker_id: user.id,
    p_radius_miles: 50,
    p_limit: 25,
  });

  const sponsors = (matches ?? []) as SponsorMatch[];

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl text-ink">Sponsors near you</h1>
          <p className="mt-2 text-ink-dim">
            Ranked by how well they match what you&apos;re looking for, then by distance.
          </p>
        </div>
        <Link
          href="/onboarding"
          className="shrink-0 rounded-full border border-border-strong px-4 py-2 text-sm text-ink-dim transition-colors hover:border-ink hover:text-ink"
        >
          Edit preferences
        </Link>
      </div>

      {wantedTags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {wantedTags.map((label) => (
            <span
              key={label}
              className="rounded-full border border-border-strong px-3 py-1 text-xs text-ink-dim"
            >
              {label}
            </span>
          ))}
        </div>
      )}

      <div className="mt-10 space-y-4">
        {sponsors.length === 0 ? (
          <div className="rounded-2xl border border-border bg-surface p-8 text-center">
            <p className="font-display text-lg text-ink">No sponsors in range yet</p>
            <p className="mt-2 text-sm text-ink-dim">
              Try widening what you&apos;re looking for, or check back as more sponsors join
              Konekt near you.
            </p>
          </div>
        ) : (
          sponsors.map((sponsor) => (
            <SponsorCard
              key={sponsor.sponsor_id}
              sponsor={sponsor}
              totalWanted={wantedTags.length}
            />
          ))
        )}
      </div>
    </main>
  );
}
