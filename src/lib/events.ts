import { PHOTOS, type Photo } from "./site";
import { addDays, shopNow, toIsoDate, weekdayOf, type CalendarDate } from "./time";

type RecurringEvent = {
  weekday: number;
  title: string;
  start: number;
  end: number;
  description: string;
  photo: Photo;
};

const SCHEDULE: RecurringEvent[] = [
  {
    weekday: 5,
    title: "Open mic night",
    start: 19 * 60,
    end: 22 * 60,
    description:
      "Sign up at the counter from 6:30pm. Two songs or five minutes each, and the room is on your side.",
    photo: PHOTOS.openMic,
  },
  {
    weekday: 6,
    title: "Saturday coffee tasting",
    start: 10 * 60,
    end: 11 * 60 + 30,
    description:
      "Taste three single-origin coffees side by side with our roaster. Free, first come first served, 12 seats.",
    photo: PHOTOS.tasting,
  },
];

export type UpcomingEvent = Omit<RecurringEvent, "weekday"> & {
  date: CalendarDate;
  isoDate: string;
  key: string;
};

export function getUpcomingEvents(now: Date = new Date(), count = 4): UpcomingEvent[] {
  const { date: today, minutes } = shopNow(now);
  const events: UpcomingEvent[] = [];

  for (let offset = 0; events.length < count && offset < 28; offset++) {
    const date = addDays(today, offset);
    for (const { weekday, ...event } of SCHEDULE) {
      if (weekdayOf(date) !== weekday) continue;
      if (offset === 0 && minutes >= event.end) continue;
      const isoDate = toIsoDate(date);
      events.push({ ...event, date, isoDate, key: `${isoDate}-${event.title}` });
    }
  }
  return events.slice(0, count);
}
