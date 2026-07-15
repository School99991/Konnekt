import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/update-session";

// Next.js 16 renamed middleware.ts to proxy.ts and the exported function
// to `proxy` — the logic is otherwise identical to the old middleware.
export async function proxy(request: NextRequest) {
  return updateSession(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
