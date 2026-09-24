import type { Badge as BadgeValue } from "@/lib/menu";

const styles: Record<BadgeValue, { label: string; className: string }> = {
  Popular: { label: "Popular", className: "bg-amber text-espresso" },
  "House Favorite": { label: "House favourite", className: "bg-matcha text-oat" },
};

export function Badge({ value }: { value: BadgeValue }) {
  const { label, className } = styles[value];
  return (
    <span
      className={`inline-flex items-center rounded-pill px-2.5 py-1 text-caption font-semibold ${className}`}
    >
      {label}
    </span>
  );
}
