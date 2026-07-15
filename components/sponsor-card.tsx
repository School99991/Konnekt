import { MatchMeter } from "@/components/match-meter";
import { connectWithSponsor } from "@/app/dashboard/actions";
import type { SponsorMatch } from "@/lib/types";

export function SponsorCard({
  sponsor,
  totalWanted,
  interactive = true,
}: {
  sponsor: SponsorMatch;
  totalWanted: number;
  /** Set to false for non-functional preview cards (e.g. on the landing page). */
  interactive?: boolean;
}) {
  const connect = connectWithSponsor.bind(null, sponsor.sponsor_id);

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-border bg-surface p-5 transition-colors hover:border-border-strong sm:flex-row sm:items-center sm:gap-5">
      <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-surface-hover text-xs font-medium text-ink-faint">
        {sponsor.logo_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={sponsor.logo_url}
            alt={`${sponsor.name} logo`}
            className="h-full w-full object-cover"
          />
        ) : (
          sponsor.name.slice(0, 2).toUpperCase()
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="font-display text-2xl text-accent">
            ${sponsor.min_amount.toLocaleString()}–${sponsor.max_amount.toLocaleString()}
          </span>
          <span className="font-display text-lg text-ink">{sponsor.name}</span>
          <span className="font-mono text-xs text-ink-faint">
            {sponsor.distance_miles.toFixed(1)} mi
          </span>
        </div>

        {sponsor.message && (
          <p className="mt-1 line-clamp-1 text-sm text-ink-dim">{sponsor.message}</p>
        )}

        <div className="mt-2">
          <MatchMeter matched={sponsor.match_count} total={totalWanted} />
        </div>
      </div>

      {interactive ? (
        <form action={connect} className="sm:shrink-0">
          <button
            type="submit"
            className="w-full rounded-full bg-ink px-6 py-3 font-display text-sm font-medium text-canvas transition-colors hover:bg-accent sm:w-auto"
          >
            Connect
          </button>
        </form>
      ) : (
        <span className="w-full shrink-0 rounded-full bg-ink px-6 py-3 text-center font-display text-sm font-medium text-canvas opacity-90 sm:w-auto">
          Connect
        </span>
      )}
    </div>
  );
}
