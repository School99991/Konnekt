"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function saveSeekerPreferences(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const tagIds = formData.getAll("tagIds").map(String);
  const latitudeRaw = formData.get("latitude");
  const longitudeRaw = formData.get("longitude");
  const latitude = latitudeRaw ? Number(latitudeRaw) : null;
  const longitude = longitudeRaw ? Number(longitudeRaw) : null;
  const city = String(formData.get("city") ?? "").trim() || null;

  await supabase
    .from("profiles")
    .update({ role: "seeker", latitude, longitude, city })
    .eq("id", user.id);

  await supabase.from("seeker_tags").delete().eq("profile_id", user.id);
  if (tagIds.length > 0) {
    await supabase
      .from("seeker_tags")
      .insert(tagIds.map((tagId) => ({ profile_id: user.id, tag_id: tagId })));
  }

  redirect("/dashboard");
}

export async function chooseSponsorRole() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  await supabase.from("profiles").update({ role: "sponsor" }).eq("id", user.id);
  redirect("/sponsors/new");
}
