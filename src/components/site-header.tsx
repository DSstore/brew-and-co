"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ReserveButton } from "@/components/reservation/reserve-button";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/about", label: "About" },
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const overHero = pathname === "/";
  const [sheetOpen, setSheetOpen] = useState(false);

  useEffect(() => {
    if (!sheetOpen) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setSheetOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [sheetOpen]);

  const tone = overHero && !sheetOpen ? "text-oat" : "text-espresso";

  return (
    <header
      className={`${overHero ? "absolute inset-x-0 top-0" : "relative border-b border-cream-line bg-oat"} z-30`}
    >
      <div className={`mx-auto flex h-18 max-w-[1200px] items-center justify-between gap-6 px-6 lg:px-16 ${tone}`}>
        <Link href="/" className="inline-flex min-h-11 items-center font-display text-2xl font-semibold tracking-tight">
          Brew &amp; Co
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
          <ul className="flex items-center gap-7">
            {LINKS.map(({ href, label }) => (
              <li key={href}>
                <NavLink href={href} label={label} active={pathname === href} />
              </li>
            ))}
          </ul>
          <ReserveButton size="compact" />
        </nav>

        <button
          type="button"
          className="min-h-11 rounded-pill px-3 text-label font-medium md:hidden"
          aria-expanded={sheetOpen}
          aria-controls="mobile-nav"
          onClick={() => setSheetOpen((open) => !open)}
        >
          {sheetOpen ? "Close" : "Explore"}
        </button>
      </div>

      {sheetOpen && (
        <nav
          id="mobile-nav"
          aria-label="Main"
          className="absolute inset-x-0 top-0 -z-10 border-b border-cream-line bg-oat px-6 pb-6 pt-20 md:hidden"
        >
          <ul className="space-y-1">
            {LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={() => setSheetOpen(false)}
                  aria-current={pathname === href ? "page" : undefined}
                  className="flex min-h-12 items-center font-display text-h2 font-semibold text-espresso decoration-amber decoration-2 underline-offset-[6px] aria-[current=page]:underline"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-5" onClick={() => setSheetOpen(false)}>
            <ReserveButton className="w-full" />
          </div>
        </nav>
      )}
    </header>
  );
}

function NavLink({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className="inline-flex min-h-11 items-center text-label font-medium underline-offset-[6px] decoration-amber decoration-2 hover:underline aria-[current=page]:underline"
    >
      {label}
    </Link>
  );
}
