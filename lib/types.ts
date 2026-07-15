export type Role = "seeker" | "sponsor";

export interface Tag {
  id: string;
  label: string;
  category: string;
}

export interface Profile {
  id: string;
  full_name: string | null;
  role: Role;
  latitude: number | null;
  longitude: number | null;
  city: string | null;
}

/** One row returned by the `match_sponsors` Postgres function. */
export interface SponsorMatch {
  sponsor_id: string;
  name: string;
  logo_url: string | null;
  min_amount: number;
  max_amount: number;
  message: string | null;
  city: string | null;
  distance_miles: number;
  matched_tags: string[];
  match_count: number;
}

/** Groups a flat tag list by its category for rendering. */
export function groupTagsByCategory(tags: Tag[]): Record<string, Tag[]> {
  return tags.reduce<Record<string, Tag[]>>((groups, tag) => {
    (groups[tag.category] ??= []).push(tag);
    return groups;
  }, {});
}
