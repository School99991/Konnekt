"use client";

import { useState } from "react";
import { TagPicker } from "@/components/tag-picker";
import { saveSeekerPreferences, chooseSponsorRole } from "@/app/onboarding/actions";
import type { Tag } from "@/lib/types";

export function OnboardingFlow({
  tagsByCategory,
  wantsLocation,
}: {
  tagsByCategory: Record<string, Tag[]>;
  /** True when we're re-prompting a seeker who skipped sharing a location. */
  wantsLocation?: boolean;
}) {
  const [role, setRole] = useState<"seeker" | "sponsor" | null>(wantsLocation ? "seeker" : null);
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [locating, setLocating] = useState(false);
  const [locationNote, setLocationNote] = useState<string | null>(null);

  function shareLocation() {
    if (!navigator.geolocation) {
      setLocationNote("Location isn't available in this browser — add your city instead.");
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        setLocating(false);
        setLocationNote("Location shared.");
      },
      () => {
        setLocating(false);
        setLocationNote("We couldn't get your location — add your city instead.");
      }
    );
  }

  if (role === null) {
    return (
      <div className="grid gap-4 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => setRole("seeker")}
          className="rounded-2xl border border-border-strong p-6 text-left transition-colors hover:border-accent"
        >
          <p className="font-display text-xl text-ink">I&apos;m looking for sponsors</p>
          <p className="mt-2 text-sm text-ink-dim">
            Tell us what you&apos;re looking for and we&apos;ll surface local sponsors that
            match.
          </p>
        </button>
        <button
          type="button"
          onClick={() => setRole("sponsor")}
          className="rounded-2xl border border-border-strong p-6 text-left transition-colors hover:border-accent"
        >
          <p className="font-display text-xl text-ink">I&apos;m a sponsor</p>
          <p className="mt-2 text-sm text-ink-dim">
            Post your business and get discovered by people nearby.
          </p>
        </button>
      </div>
    );
  }

  if (role === "sponsor") {
    return (
      <form action={chooseSponsorRole}>
        <p className="text-ink-dim">Next, you&apos;ll set up what you&apos;re offering.</p>
        <button
          type="submit"
          className="mt-4 rounded-full bg-accent px-6 py-3 font-display text-base font-medium text-canvas transition-colors hover:bg-accent-strong"
        >
          Continue
        </button>
      </form>
    );
  }

  return (
    <form action={saveSeekerPreferences} className="space-y-8">
      <input type="hidden" name="latitude" value={latitude ?? ""} />
      <input type="hidden" name="longitude" value={longitude ?? ""} />

      <div>
        <p className="mb-3 font-display text-lg text-ink">
          What are you looking for in a sponsor?
        </p>
        <TagPicker tagsByCategory={tagsByCategory} />
      </div>

      <div>
        <p className="mb-3 font-display text-lg text-ink">Where are you based?</p>
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={shareLocation}
            className="rounded-full border border-border-strong px-4 py-2.5 text-sm text-ink transition-colors hover:border-ink"
          >
            {locating ? "Locating…" : "Share my location"}
          </button>
          <input
            name="city"
            placeholder="City (optional)"
            className="rounded-full border border-border-strong bg-transparent px-4 py-2.5 text-sm text-ink placeholder:text-ink-faint"
          />
          {locationNote && <span className="text-xs text-ink-faint">{locationNote}</span>}
        </div>
        <p className="mt-2 text-xs text-ink-faint">
          We use this to rank nearby sponsors first. Sharing your location gives the most
          accurate results.
        </p>
      </div>

      <button
        type="submit"
        className="rounded-full bg-accent px-6 py-3 font-display text-base font-medium text-canvas transition-colors hover:bg-accent-strong"
      >
        Find sponsors
      </button>
    </form>
  );
}
