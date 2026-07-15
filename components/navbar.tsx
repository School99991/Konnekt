import Link from "next/link";
import { Logo } from "@/components/logo";
import { signOut } from "@/app/actions";

export function Navbar({ isLoggedIn }: { isLoggedIn: boolean }) {
  return (
    <header className="border-b border-border">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <Logo />
        </Link>
        <nav className="flex items-center gap-5 text-sm">
          {isLoggedIn ? (
            <>
              <Link href="/dashboard" className="text-ink-dim transition-colors hover:text-ink">
                Sponsors
              </Link>
              <Link href="/sponsors/new" className="text-ink-dim transition-colors hover:text-ink">
                Post a sponsorship
              </Link>
              <form action={signOut}>
                <button
                  type="submit"
                  className="rounded-full border border-border-strong px-4 py-2 transition-colors hover:border-ink"
                >
                  Sign out
                </button>
              </form>
            </>
          ) : (
            <>
              <Link href="/login" className="text-ink-dim transition-colors hover:text-ink">
                Log in
              </Link>
              <Link
                href="/signup"
                className="rounded-full bg-accent px-4 py-2 font-medium text-canvas transition-colors hover:bg-accent-strong"
              >
                Sign up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
