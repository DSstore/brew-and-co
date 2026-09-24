import type { Metadata } from "next";
import Image from "next/image";
import { ReserveButton } from "@/components/reservation/reserve-button";
import { getMenu } from "@/lib/menu";
import { HOURS_SUMMARY, PHOTOS, SHOP, type Photo } from "@/lib/site";

export const metadata: Metadata = {
  title: "About us",
  description:
    "How Maya Okafor and Theo Lindqvist turned an old hardware store on Franklin Avenue into Brew & Co.",
};

function StoryPhoto({ photo, sizes }: { photo: Photo; sizes: string }) {
  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-card bg-cream-line">
      <Image src={photo.src} alt={photo.alt} fill sizes={sizes} className="object-cover" />
    </div>
  );
}

export default function AboutPage() {
  const credits = [
    ...Object.values(PHOTOS).map(({ subject, page }) => ({ label: subject, page })),
    ...getMenu().map(({ name, imagePage }) => ({ label: name, page: imagePage })),
  ];

  return (
    <>
      <div className="mx-auto max-w-[1200px] px-6 pt-14 lg:px-16 lg:pt-20">
        <h1 className="max-w-[14ch] text-display-mobile font-semibold md:text-display">
          We started with a cupping table.
        </h1>
        <p className="mt-6 max-w-[52ch] text-body-lg text-espresso-soft">
          We&apos;re Maya Okafor and Theo Lindqvist. We opened Brew &amp; Co on Franklin Avenue in
          October {SHOP.founded}, in the room that used to be Franklin Hardware.
        </p>
      </div>

      <section aria-labelledby="how-heading" className="mx-auto grid max-w-[1200px] gap-10 px-6 py-16 md:grid-cols-2 lg:gap-16 lg:px-16 lg:py-20">
        <StoryPhoto photo={PHOTOS.counter} sizes="(min-width: 768px) 50vw, 100vw" />
        <div className="max-w-[60ch] space-y-5 text-body-lg">
          <h2 id="how-heading" className="text-h2 font-semibold">
            How we met
          </h2>
          <p>
            In 2015 Maya was working the line at a diner on Nostrand Avenue and spending her days
            off at every coffee counter she could reach by bike. She grew up between Lagos and
            Brooklyn, in kitchens where somebody always had a kettle on, and she wanted a café
            that felt like those kitchens.
          </p>
          <p>
            Theo had moved from Gothenburg a few years earlier and was roasting coffee in a
            converted popcorn popper, to his neighbours&apos; mild concern. He brought three
            roasts to a public cupping in Crown Heights. Maya liked the third one best, told him
            exactly why, and we argued about it for an hour.
          </p>
        </div>
      </section>

      <section aria-labelledby="room-heading" className="bg-cloud/60">
        <div className="mx-auto grid max-w-[1200px] gap-10 px-6 py-16 md:grid-cols-2 lg:gap-16 lg:px-16 lg:py-20">
          <div className="max-w-[60ch] space-y-5 text-body-lg md:order-2">
            <h2 id="room-heading" className="text-h2 font-semibold">
              Finding the room
            </h2>
            <p>
              It took two more years. Franklin Hardware had been empty since 2014, and when we
              pulled up the shutters the shelves were still on the walls, labelled for screws and
              hinges. We kept them. Now they hold beans, mugs and whatever the neighbours leave for
              the book swap.
            </p>
            <p>
              We opened with one espresso machine, a pastry case Maya filled at 5am, and a sign
              that just said &ldquo;Coffee&rdquo; because we couldn&apos;t agree on a name. Brew
              &amp; Co came later, when the regulars started calling it that.
            </p>
            <p>
              Theo still roasts every Monday and Thursday at a shared roastery in Gowanus. Maya runs
              the kitchen and the schedule, and most of the people behind the counter have been
              with us for more than three years.
            </p>
          </div>
          <div className="grid gap-6 md:order-1">
            <StoryPhoto photo={PHOTOS.roasting} sizes="(min-width: 768px) 50vw, 100vw" />
            <StoryPhoto photo={PHOTOS.espresso} sizes="(min-width: 768px) 50vw, 100vw" />
          </div>
        </div>
      </section>

      <section aria-labelledby="events-heading" className="mx-auto max-w-[1200px] px-6 py-16 lg:px-16 lg:py-20">
        <h2 id="events-heading" className="text-h1 font-semibold">
          Fridays and Saturdays
        </h2>
        <div className="mt-8 grid gap-10 md:grid-cols-2 lg:gap-16">
          <div className="max-w-[60ch] space-y-4 text-body-lg">
            <h3 className="text-h2 font-semibold">Open mic, Fridays from 7pm</h3>
            <p>
              The open mic started because a regular, a nurse from Kings County Hospital, asked if
              she could play one song after close. Twelve people stayed to listen. Now it runs
              every Friday from 7 until 10, and the sign-up sheet at the counter fills fast.
            </p>
          </div>
          <div className="max-w-[60ch] space-y-4 text-body-lg">
            <h3 className="text-h2 font-semibold">Tastings, Saturdays at 10am</h3>
            <p>
              Saturday mornings are Theo&apos;s. Three coffees, side by side, and the only rule is
              that you say what you taste out loud. Nobody&apos;s wrong. It&apos;s free and there
              are 12 seats, first come first served.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="visit-heading" className="bg-espresso text-oat">
        <div className="mx-auto grid max-w-[1200px] gap-10 px-6 py-16 md:grid-cols-2 lg:px-16 lg:py-20">
          <div>
            <h2 id="visit-heading" className="text-h1 font-semibold">
              Come and see us
            </h2>
            <p className="mt-4 text-body-lg text-oat/85">
              {SHOP.street}, {SHOP.city}
            </p>
            <ReserveButton className="mt-8" />
          </div>
          <dl className="space-y-2 self-end text-body-lg">
            {HOURS_SUMMARY.map(({ days, hours }) => (
              <div key={days} className="flex justify-between gap-6 border-b border-oat/15 pb-2">
                <dt>{days}</dt>
                <dd className="tabular-nums text-oat/85">{hours}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section id="photo-credits" aria-labelledby="credits-heading" className="mx-auto max-w-[1200px] scroll-mt-6 px-6 py-16 lg:px-16">
        <h2 id="credits-heading" className="text-h2 font-semibold">
          Photo credits
        </h2>
        <p className="mt-3 max-w-[60ch] text-body text-espresso-soft">
          Every photo on this site comes from Pexels. Thank you to the photographers who share
          their work there.
        </p>
        <ul className="mt-6 columns-2 gap-8 text-label sm:columns-3 lg:columns-4">
          {credits.map(({ label, page }) => (
            <li key={page} className="break-inside-avoid">
              <a
                href={page}
                className="inline-flex min-h-11 items-center text-espresso-soft underline underline-offset-4 hover:text-espresso"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
