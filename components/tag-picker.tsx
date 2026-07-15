import type { Tag } from "@/lib/types";

/**
 * Renders tags as toggle-chip checkboxes, grouped by category. Plain
 * native checkboxes so this works inside a server-actioned <form> with
 * no client JS required — selection state is styled with `has-[:checked]`.
 */
export function TagPicker({
  tagsByCategory,
  name = "tagIds",
  selectedIds = [],
}: {
  tagsByCategory: Record<string, Tag[]>;
  name?: string;
  selectedIds?: string[];
}) {
  return (
    <div className="space-y-6">
      {Object.entries(tagsByCategory).map(([category, tags]) => (
        <fieldset key={category}>
          <legend className="mb-2 font-display text-sm text-ink-dim">{category}</legend>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <label
                key={tag.id}
                className="cursor-pointer rounded-full border border-border-strong px-4 py-2 text-sm text-ink-dim transition-colors has-[:checked]:border-accent has-[:checked]:bg-accent-soft has-[:checked]:text-accent"
              >
                <input
                  type="checkbox"
                  name={name}
                  value={tag.id}
                  defaultChecked={selectedIds.includes(tag.id)}
                  className="sr-only"
                />
                {tag.label}
              </label>
            ))}
          </div>
        </fieldset>
      ))}
    </div>
  );
}
