import Link from "next/link";
import { HOURS_SUMMARY, SHOP } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="bg-espresso text-oat">
      <div className="mx-auto grid max-w-[1200px] gap-10 px-6 py-14 md:grid-cols-3 lg:px-16">
        <div>
          <p className="font-display text-2xl font-semibold">Brew &amp; Co</p>
          <p className="mt-3 max-w-[32ch] text-body text-oat/80">
            Specialty coffee, fresh pastries and light lunches in {SHOP.neighbourhood} since{" "}
            {SHOP.founded}.
          </p>
        </div>

        <address className="not-italic">
          <h2 className="text-label font-semibold">Find us</h2>
          <p className="mt-3 text-body text-oat/80">
            {SHOP.street}
            <br />
            {SHOP.city}
          </p>
          <a
            href={SHOP.phoneHref}
            className="mt-2 inline-flex min-h-11 items-center text-body underline underline-offset-4"
          >
            {SHOP.phoneDisplay}
          </a>
        </address>

        <div>
          <h2 className="text-label font-semibold">Opening hours</h2>
          <dl className="mt-3 space-y-1 text-body">
            {HOURS_SUMMARY.map(({ days, hours }) => (
              <div key={days} className="flex justify-between gap-4 text-oat/80">
                <dt>{days}</dt>
                <dd className="tabular-nums">{hours}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="border-t border-oat/15">
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-3 px-6 py-5 text-caption text-oat/70 lg:px-16">
          <p>
            © {SHOP.founded}–{new Date().getFullYear()} {SHOP.name}
          </p>
          <Link href="/about#photo-credits" className="inline-flex min-h-11 items-center underline underline-offset-4">
            Photos from Pexels
          </Link>
        </div>
      </div>
    </footer>
  );
}
