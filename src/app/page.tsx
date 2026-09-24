import Image from "next/image";
import Link from "next/link";
import { buttonClass } from "@/components/button";
import { EventList } from "@/components/event-list";
import { MenuItemCard } from "@/components/menu-item";
import { ReserveButton } from "@/components/reservation/reserve-button";
import { getUpcomingEvents } from "@/lib/events";
import { getPopularItems } from "@/lib/menu";
import { PHOTOS, SHOP } from "@/lib/site";

// Rebuild hourly so "upcoming" events roll forward past each Friday and Saturday.
export const revalidate = 3600;

export default function HomePage() {
  const popular = getPopularItems();
  const events = getUpcomingEvents();

  return (
    <>
      <section className="relative isolate flex min-h-[560px] items-center overflow-hidden text-oat h-[min(85vh,760px)]">
        <Image
          src={PHOTOS.hero.src}
          alt={PHOTOS.hero.alt}
          fill
          preload
          sizes="100vw"
          className="-z-20 object-cover"
        />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[image:var(--overlay-hero)]" />
        <div className="mx-auto w-full max-w-[1200px] px-6 pt-16 lg:px-16">
          <h1 className="hero-rise max-w-[12ch] text-display-mobile font-semibold md:text-display">
            Coffee, pastries and a seat by the window.
          </h1>
          <div className="hero-follow">
            <p className="mt-6 max-w-[40ch] text-body-lg text-oat/90">
              Small-batch specialty coffee, pastries baked every morning and light lunches until close.
              On Franklin Avenue in {SHOP.neighbourhood} since {SHOP.founded}.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ReserveButton />
              <Link href="/menu" className={buttonClass("ghost-dark")}>
                View menu
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="popular-heading" className="mx-auto max-w-[1200px] px-6 py-20 lg:px-16 lg:py-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 id="popular-heading" className="text-h1 font-semibold">
            Most popular
          </h2>
          <Link
            href="/menu"
            className="inline-flex min-h-11 items-center text-label font-medium underline underline-offset-4 decoration-amber decoration-2"
          >
            See the full menu
          </Link>
        </div>
        <div className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {popular.map((item) => (
            <MenuItemCard key={item.name} item={item} />
          ))}
        </div>
      </section>

      <section aria-labelledby="events-heading" className="bg-cloud/60">
        <div className="mx-auto grid max-w-[1200px] gap-10 px-6 py-20 lg:grid-cols-12 lg:px-16 lg:py-24">
          <div className="lg:col-span-5">
            <h2 id="events-heading" className="text-h1 font-semibold">
              What&apos;s on
            </h2>
            <p className="mt-4 max-w-[40ch] text-body-lg text-espresso-soft">
              Every Friday night the room turns into a stage, and every Saturday morning our roaster
              pours three coffees side by side. Both are free. Just come in.
            </p>
            <div className="relative mt-8 hidden aspect-[4/3] overflow-hidden rounded-card lg:block">
              <Image
                src={PHOTOS.openMic.src}
                alt={PHOTOS.openMic.alt}
                fill
                sizes="(min-width: 1024px) 420px, 0px"
                className="object-cover"
              />
            </div>
          </div>
          <div className="lg:col-span-7">
            <EventList events={events} />
          </div>
        </div>
      </section>

      <section aria-labelledby="story-heading" className="mx-auto grid max-w-[1200px] items-center gap-10 px-6 py-20 md:grid-cols-2 lg:gap-16 lg:px-16 lg:py-24">
        <div className="relative aspect-[4/3] overflow-hidden rounded-card">
          <Image
            src={PHOTOS.counter.src}
            alt={PHOTOS.counter.alt}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <div>
          <h2 id="story-heading" className="text-h1 font-semibold">
            A hardware store, then a coffee shop
          </h2>
          <p className="mt-4 max-w-[45ch] text-body-lg text-espresso-soft">
            Maya and Theo met at a cupping in {SHOP.neighbourhood} and spent two years looking for the
            right room. They found it behind a hardware store&apos;s old shutters, and kept the shelves.
          </p>
          <Link href="/about" className={`${buttonClass("ghost")} mt-8`}>
            Read our story
          </Link>
        </div>
      </section>
    </>
  );
}
