export function Logo() {
  return (
    <span className="flex items-center gap-2">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="9" cy="12" r="6" fill="var(--color-accent)" opacity="0.85" />
        <circle
          cx="15"
          cy="12"
          r="6"
          fill="var(--color-accent-strong)"
          opacity="0.85"
          style={{ mixBlendMode: "screen" }}
        />
      </svg>
      <span className="font-display text-lg tracking-tight text-ink">Konekt</span>
    </span>
  );
}
