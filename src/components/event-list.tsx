import type { UpcomingEvent } from "@/lib/events";
import { formatMinutes, monthName, weekdayName } from "@/lib/time";

export function EventList({ events }: { events: UpcomingEvent[] }) {
  return (
    <ul className="divide-y divide-cream-line border-y border-cream-line">
      {events.map((event) => (
        <li key={event.key} className="flex gap-5 py-6">
          <time
            dateTime={event.isoDate}
            className="flex w-18 shrink-0 flex-col items-center justify-center rounded-date bg-oat py-3 text-center"
          >
            <span className="text-caption text-espresso-soft">{weekdayName(event.date).slice(0, 3)}</span>
            <span className="font-display text-h2 font-semibold tabular-nums">{event.date.day}</span>
            <span className="text-caption text-espresso-soft">{monthName(event.date).slice(0, 3)}</span>
          </time>
          <div className="min-w-0 self-center">
            <h3 className="text-xl font-semibold">{event.title}</h3>
            <p className="mt-0.5 text-label font-medium text-amber-dark">
              {formatMinutes(event.start)}–{formatMinutes(event.end)}
            </p>
            <p className="mt-1.5 max-w-[60ch] text-body text-espresso-soft">{event.description}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
