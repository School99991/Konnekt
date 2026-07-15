import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { OnboardingFlow } from "@/components/onboarding-flow";
import { groupTagsByCategory, type Tag } from "@/lib/types";

export default async function OnboardingPage({
  searchParams,
}: {
  searchParams: Promise<{ reason?: string }>;
}) {
  const { reason } = await searchParams;
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
      <h1 className="font-display text-3xl text-ink">Set up your Konekt profile</h1>
      <p className="mt-2 text-ink-dim">
        {reason === "location"
          ? "Add your location so we can find sponsors near you."
          : "Two quick steps and we'll start matching you with sponsors."}
      </p>

      <div className="mt-10">
        <OnboardingFlow tagsByCategory={tagsByCategory} wantsLocation={reason === "location"} />
      </div>
    </main>
  );
}
