export type ButtonVariant = "primary" | "accent" | "ghost" | "ghost-dark";

const base =
  "inline-flex items-center justify-center gap-2 rounded-pill px-6 font-display text-label font-semibold " +
  "transition-[background-color,color,transform] duration-[var(--duration-tap)] ease-brew " +
  "active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-60 disabled:active:scale-100";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-espresso text-oat hover:bg-espresso-soft active:shadow-press",
  accent: "bg-amber text-espresso hover:bg-amber-dark hover:text-oat active:shadow-press",
  ghost: "border border-espresso text-espresso hover:bg-cream-line",
  "ghost-dark": "border border-oat/60 text-oat hover:bg-oat/10",
};

export function buttonClass(variant: ButtonVariant, size: "default" | "compact" = "default"): string {
  return `${base} ${variants[variant]} ${size === "compact" ? "h-11" : "h-12"}`;
}
