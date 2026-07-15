export default function DashboardLoading() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <div className="h-9 w-64 animate-pulse rounded-lg bg-surface" />
      <div className="mt-3 h-5 w-80 animate-pulse rounded-lg bg-surface" />
      <div className="mt-10 space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-28 animate-pulse rounded-2xl border border-border bg-surface" />
        ))}
      </div>
    </main>
  );
}
