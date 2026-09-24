"use client";

import { useEffect, useRef, useState } from "react";

type Tab = { slug: string; label: string };

export function MenuTabs({ tabs }: { tabs: Tab[] }) {
  const [active, setActive] = useState(tabs[0]?.slug);
  const [stuck, setStuck] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(([entry]) => setStuck(!entry.isIntersecting));
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const sections = tabs
      .map(({ slug }) => document.getElementById(slug))
      .filter((section): section is HTMLElement => section !== null);
    // A section counts as active once its top passes the band just under the sticky bar.
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length > 0) setActive(visible[0].target.id);
      },
      { rootMargin: "-80px 0px -70% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [tabs]);

  useEffect(() => {
    const list = listRef.current;
    const tab = list?.querySelector<HTMLElement>(`[data-slug="${active}"]`);
    if (!list || !tab) return;
    const left = tab.offsetLeft - list.offsetLeft - 24;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    list.scrollTo({ left: Math.max(0, left), behavior: reduceMotion ? "auto" : "smooth" });
  }, [active]);

  return (
    <>
      <div ref={sentinelRef} aria-hidden="true" />
      <nav
        aria-label="Menu categories"
        className={`sticky top-0 z-20 bg-oat/95 backdrop-blur-sm transition-shadow ${
          stuck ? "border-b border-cream-line shadow-float" : ""
        }`}
      >
        <ul
          ref={listRef}
          className="scrollbar-none mx-auto flex max-w-[1200px] gap-2 overflow-x-auto px-6 py-3 lg:px-16"
        >
          {tabs.map(({ slug, label }) => (
            <li key={slug} className="shrink-0">
              <a
                href={`#${slug}`}
                data-slug={slug}
                aria-current={active === slug ? "true" : undefined}
                onClick={() => setActive(slug)}
                className="inline-flex min-h-11 items-center rounded-pill px-4 text-label font-medium text-espresso hover:bg-cream-line aria-[current=true]:bg-espresso aria-[current=true]:text-oat"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
