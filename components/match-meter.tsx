/**
 * Shows how many of the tags a seeker asked for are covered by a given
 * sponsor, as a row of filled/unfilled segments plus a mono count.
 * This is the visual proof of Konekt's core promise — "matched by what
 * you asked for" — so it sits on every sponsor card, not just a score.
 */
export function MatchMeter({ matched, total }: { matched: number; total: number }) {
  const segments = Math.max(total, 1);

  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-1" role="img" aria-label={`${matched} of ${total} tags matched`}>
        {Array.from({ length: segments }).map((_, i) => (
          <span
            key={i}
            aria-hidden="true"
            className={`h-1.5 w-4 rounded-full ${
              i < matched ? "bg-accent" : "bg-border-strong"
            }`}
          />
        ))}
      </div>
      <span className="font-mono text-xs text-ink-dim">
        {matched}/{total} matched
      </span>
    </div>
  );
}
