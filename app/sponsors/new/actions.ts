"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function createSponsorListing(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const name = String(formData.get("name") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  const minAmount = Number(formData.get("minAmount"));
  const maxAmount = Number(formData.get("maxAmount"));
  const city = String(formData.get("city") ?? "").trim() || null;
  const latitudeRaw = formData.get("latitude");
  const longitudeRaw = formData.get("longitude");
  const latitude = latitudeRaw ? Number(latitudeRaw) : null;
  const longitude = longitudeRaw ? Number(longitudeRaw) : null;
  const tagIds = formData.getAll("tagIds").map(String);

  if (!name || !minAmount || !maxAmount || latitude === null || longitude === null) {
    redirect("/sponsors/new?error=Fill in your name, budget, and location to continue");
  }
  if (maxAmount < minAmount) {
    redirect("/sponsors/new?error=Your maximum budget should be at least your minimum");
  }

  await supabase.from("profiles").update({ role: "sponsor" }).eq("id", user.id);

  const { data: sponsor, error } = await supabase
    .from("sponsors")
    .insert({
      owner_id: user.id,
      name,
      message: message || null,
      min_amount: minAmount,
      max_amount: maxAmount,
      city,
      latitude,
      longitude,
    })
    .select("id")
    .single();

  if (error || !sponsor) {
    redirect("/sponsors/new?error=We couldn't save your listing, try again");
  }

  if (tagIds.length > 0) {
    await supabase
      .from("sponsor_tags")
      .insert(tagIds.map((tagId) => ({ sponsor_id: sponsor.id, tag_id: tagId })));
  }

  redirect("/sponsors/manage");
}
