"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function connectWithSponsor(sponsorId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;

  await supabase
    .from("connections")
    .upsert(
      { seeker_id: user.id, sponsor_id: sponsorId, status: "pending" },
      { onConflict: "seeker_id,sponsor_id", ignoreDuplicates: true }
    );

  revalidatePath("/dashboard");
}
