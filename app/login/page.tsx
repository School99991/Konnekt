import Link from "next/link";
import { logIn } from "./actions";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <main className="mx-auto max-w-md px-6 py-20">
      <h1 className="font-display text-3xl text-ink">Log in</h1>
      <p className="mt-2 text-sm text-ink-dim">
        New to Konekt?{" "}
        <Link href="/signup" className="text-accent hover:underline">
          Create an account
        </Link>
      </p>

      {error && (
        <p className="mt-6 rounded-xl border border-border-strong bg-surface px-4 py-3 text-sm text-ink-dim">
          {error}
        </p>
      )}

      <form action={logIn} className="mt-8 space-y-4">
        <div>
          <label htmlFor="email" className="mb-1 block text-sm text-ink-dim">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="w-full rounded-xl border border-border-strong bg-transparent px-4 py-3 text-ink placeholder:text-ink-faint"
          />
        </div>
        <div>
          <label htmlFor="password" className="mb-1 block text-sm text-ink-dim">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            className="w-full rounded-xl border border-border-strong bg-transparent px-4 py-3 text-ink placeholder:text-ink-faint"
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-full bg-accent px-6 py-3 font-display text-base font-medium text-canvas transition-colors hover:bg-accent-strong"
        >
          Log in
        </button>
      </form>
    </main>
  );
}
