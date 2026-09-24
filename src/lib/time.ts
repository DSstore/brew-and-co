import { HOURS, SHOP } from "./site";

// A calendar date with no time zone attached. Arithmetic runs in UTC so DST never shifts the day.
export type CalendarDate = { year: number; month: number; day: number };

const WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export function shopNow(now: Date = new Date()): { date: CalendarDate; minutes: number } {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-US", {
      timeZone: SHOP.timeZone,
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hourCycle: "h23",
    })
      .formatToParts(now)
      .map((part) => [part.type, part.value]),
  );
  return {
    date: { year: Number(parts.year), month: Number(parts.month), day: Number(parts.day) },
    minutes: Number(parts.hour) * 60 + Number(parts.minute),
  };
}

function toUtc({ year, month, day }: CalendarDate): Date {
  return new Date(Date.UTC(year, month - 1, day));
}

export function addDays(date: CalendarDate, days: number): CalendarDate {
  const d = toUtc(date);
  d.setUTCDate(d.getUTCDate() + days);
  return { year: d.getUTCFullYear(), month: d.getUTCMonth() + 1, day: d.getUTCDate() };
}

export function weekdayOf(date: CalendarDate): number {
  return toUtc(date).getUTCDay();
}

export function compareDates(a: CalendarDate, b: CalendarDate): number {
  return toUtc(a).getTime() - toUtc(b).getTime();
}

export function toIsoDate({ year, month, day }: CalendarDate): string {
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

export function parseIsoDate(value: string): CalendarDate | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return null;
  const date = { year: Number(match[1]), month: Number(match[2]), day: Number(match[3]) };
  const roundTrip = toUtc(date);
  if (roundTrip.getUTCMonth() + 1 !== date.month || roundTrip.getUTCDate() !== date.day) return null;
  return date;
}

export function weekdayName(date: CalendarDate): string {
  return WEEKDAYS[weekdayOf(date)];
}

export function monthName(date: CalendarDate): string {
  return MONTHS[date.month - 1];
}

export function formatLongDate(date: CalendarDate): string {
  return `${weekdayName(date)}, ${date.day} ${monthName(date)}`;
}

export function formatMinutes(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  const suffix = h < 12 ? "am" : "pm";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}:${String(m).padStart(2, "0")}${suffix}`;
}

// Tables are bookable on the half hour, up to 30 minutes before closing.
export function slotsFor(weekday: number): number[] {
  const { open, close } = HOURS[weekday];
  const slots: number[] = [];
  for (let t = open; t <= close - 30; t += 30) slots.push(t);
  return slots;
}
