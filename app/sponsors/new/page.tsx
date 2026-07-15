import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { SponsorListingForm } from "@/components/sponsor-listing-form";
import { groupTagsByCategory, type Tag } from "@/lib/types";

export default async function NewSponsorPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: tags } = await supabase
    .from("tags")
    .select("id, label, category")
    .order("category")
    .order("label");

  const tagsByCategory = groupTagsByCategory((tags ?? []) as Tag[]);

  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="font-display text-3xl text-ink">Post a sponsorship</h1>
      <p className="mt-2 text-ink-dim">
        Your listing shows up to nearby seekers whose tags match yours.
      </p>

      {error && (
        <p className="mt-6 rounded-xl border border-border-strong bg-surface px-4 py-3 text-sm text-ink-dim">
          {error}
        </p>
      )}

      <div className="mt-10">
        <SponsorListingForm tagsByCategory={tagsByCategory} />
      </div>
    </main>
  );
}
