"use server";

import { HOURS } from "@/lib/site";
import {
  addDays,
  compareDates,
  formatLongDate,
  formatMinutes,
  parseIsoDate,
  shopNow,
  slotsFor,
  weekdayName,
  weekdayOf,
} from "@/lib/time";

export type ReservationField = "name" | "partySize" | "date" | "time";

export type ReservationState =
  | { status: "idle" }
  | { status: "error"; errors: Partial<Record<ReservationField, string>> }
  | { status: "ok"; summary: string };

const MAX_PARTY = 8;
const BOOKING_WINDOW_DAYS = 60;

export async function requestReservation(
  _prev: ReservationState,
  formData: FormData,
): Promise<ReservationState> {
  const values = {
    name: String(formData.get("name") ?? "").trim(),
    partySize: String(formData.get("partySize") ?? ""),
    date: String(formData.get("date") ?? ""),
    time: String(formData.get("time") ?? ""),
  };
  const errors: Partial<Record<ReservationField, string>> = {};

  if (values.name.length === 0) {
    errors.name = "Enter the name the table is under.";
  } else if (values.name.length > 80) {
    errors.name = "Keep the name under 80 characters.";
  }

  const partySize = Number(values.partySize);
  if (!Number.isInteger(partySize) || partySize < 1 || partySize > MAX_PARTY) {
    errors.partySize = `Choose a party size from 1 to ${MAX_PARTY}. For bigger groups, give us a call.`;
  }

  const { date: today, minutes: nowMinutes } = shopNow();
  const date = parseIsoDate(values.date);
  if (!date) {
    errors.date = "Choose a date.";
  } else if (compareDates(date, today) < 0) {
    errors.date = "Choose today or a later date.";
  } else if (compareDates(date, addDays(today, BOOKING_WINDOW_DAYS)) > 0) {
    errors.date = `We take bookings up to ${BOOKING_WINDOW_DAYS} days ahead.`;
  }

  const time = Number(values.time);
  if (values.time === "" || !Number.isInteger(time)) {
    errors.time = "Choose a time.";
  } else if (date && !errors.date) {
    const weekday = weekdayOf(date);
    const slots = slotsFor(weekday);
    if (!slots.includes(time)) {
      const { open, close } = HOURS[weekday];
      errors.time = `Pick a time between ${formatMinutes(open)} and ${formatMinutes(close - 30)} on ${weekdayName(date)}s.`;
    } else if (compareDates(date, today) === 0 && time <= nowMinutes) {
      errors.time = "That time has already passed today. Pick a later time.";
    }
  }

  if (Object.keys(errors).length > 0 || !date) {
    return { status: "error", errors };
  }

  // Not persisted yet: store the booking or notify the shop here when that's wired up.
  return {
    status: "ok",
    summary: `Table for ${partySize} on ${formatLongDate(date)} at ${formatMinutes(time)}, under the name ${values.name}.`,
  };
}
