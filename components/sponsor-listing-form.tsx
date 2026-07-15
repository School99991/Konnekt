"use client";

import { useState } from "react";
import { TagPicker } from "@/components/tag-picker";
import { createSponsorListing } from "@/app/sponsors/new/actions";
import type { Tag } from "@/lib/types";

export function SponsorListingForm({
  tagsByCategory,
}: {
  tagsByCategory: Record<string, Tag[]>;
}) {
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [locating, setLocating] = useState(false);
  const [locationNote, setLocationNote] = useState<string | null>(null);

  function shareLocation() {
    if (!navigator.geolocation) {
      setLocationNote("Location isn't available in this browser.");
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
        setLocationNote("We couldn't get your location — try again.");
      }
    );
  }

  return (
    <form action={createSponsorListing} className="space-y-8">
      <input type="hidden" name="latitude" value={latitude ?? ""} />
      <input type="hidden" name="longitude" value={longitude ?? ""} />

      <div>
        <label htmlFor="name" className="mb-1 block text-sm text-ink-dim">
          Business name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="w-full rounded-xl border border-border-strong bg-transparent px-4 py-3 text-ink placeholder:text-ink-faint"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="minAmount" className="mb-1 block text-sm text-ink-dim">
            Minimum budget ($)
          </label>
          <input
            id="minAmount"
            name="minAmount"
            type="number"
            min={0}
            required
            className="w-full rounded-xl border border-border-strong bg-transparent px-4 py-3 text-ink placeholder:text-ink-faint"
          />
        </div>
        <div>
          <label htmlFor="maxAmount" className="mb-1 block text-sm text-ink-dim">
            Maximum budget ($)
          </label>
          <input
            id="maxAmount"
            name="maxAmount"
            type="number"
            min={0}
            required
            className="w-full rounded-xl border border-border-strong bg-transparent px-4 py-3 text-ink placeholder:text-ink-faint"
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="mb-1 block text-sm text-ink-dim">
          Brief message
        </label>
        <textarea
          id="message"
          name="message"
          rows={2}
          maxLength={140}
          placeholder="What kind of person are you hoping to sponsor?"
          className="w-full rounded-xl border border-border-strong bg-transparent px-4 py-3 text-ink placeholder:text-ink-faint"
        />
      </div>

      <div>
        <p className="mb-3 font-display text-lg text-ink">
          What are you looking to sponsor?
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
            {locating ? "Locating…" : "Share business location"}
          </button>
          <input
            name="city"
            placeholder="City (optional)"
            className="rounded-full border border-border-strong bg-transparent px-4 py-2.5 text-sm text-ink placeholder:text-ink-faint"
          />
          {locationNote && <span className="text-xs text-ink-faint">{locationNote}</span>}
        </div>
      </div>

      <button
        type="submit"
        className="rounded-full bg-accent px-6 py-3 font-display text-base font-medium text-canvas transition-colors hover:bg-accent-strong"
      >
        Post listing
      </button>
    </form>
  );
}
