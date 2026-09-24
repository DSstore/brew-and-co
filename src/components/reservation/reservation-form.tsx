"use client";

import { startTransition, useActionState, useEffect, useState } from "react";
import {
  requestReservation,
  type ReservationField,
  type ReservationState,
} from "@/app/actions/reserve";
import { buttonClass } from "@/components/button";
import { SHOP } from "@/lib/site";
import {
  addDays,
  compareDates,
  formatMinutes,
  parseIsoDate,
  shopNow,
  slotsFor,
  toIsoDate,
  weekdayOf,
} from "@/lib/time";

const initialState: ReservationState = { status: "idle" };
const PARTY_SIZES = [1, 2, 3, 4, 5, 6, 7, 8];

const fieldClass =
  "h-12 w-full rounded-input border bg-oat px-3 text-body text-espresso " +
  "aria-[invalid=true]:border-cherry border-cream-line";

function FieldError({ field, error }: { field: ReservationField; error?: string }) {
  if (!error) return null;
  return (
    <p id={`reservation-${field}-error`} className="mt-1.5 text-caption text-cherry">
      {error}
    </p>
  );
}

export function ReservationForm({
  onClose,
  onComplete,
}: {
  onClose: () => void;
  onComplete: () => void;
}) {
  const [state, formAction, pending] = useActionState(requestReservation, initialState);
  const [{ date: today, minutes: nowMinutes }] = useState(() => shopNow());
  const [partySize, setPartySize] = useState("2");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    if (state.status === "ok") onComplete();
  }, [state.status, onComplete]);

  if (state.status === "ok") {
    return (
      <div className="text-center">
        <div className="mx-auto flex size-12 items-center justify-center rounded-pill bg-matcha text-oat">
          <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
            <path d="M5 12.5l4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h2 id="reservation-title" className="mt-4 text-h2 font-semibold">
          Table requested
        </h2>
        <p className="mt-3 text-body text-espresso-soft" role="status">
          {state.summary}
        </p>
        <p className="mt-3 text-caption text-espresso-soft">
          We hold requested tables for 15 minutes past the time. To change or cancel, call us at{" "}
          <a href={SHOP.phoneHref} className="underline underline-offset-2">
            {SHOP.phoneDisplay}
          </a>
          .
        </p>
        <button type="button" onClick={onClose} className={`${buttonClass("primary")} mt-6 w-full`}>
          Done
        </button>
      </div>
    );
  }

  const errors = state.status === "error" ? state.errors : {};
  const selectedDate = parseIsoDate(date);
  const isToday = selectedDate !== null && compareDates(selectedDate, today) === 0;
  const slots = selectedDate
    ? slotsFor(weekdayOf(selectedDate)).filter((slot) => !isToday || slot > nowMinutes)
    : [];

  function fieldProps(field: ReservationField) {
    const error = errors[field];
    return {
      id: `reservation-${field}`,
      name: field,
      "aria-invalid": error ? true : undefined,
      "aria-describedby": error ? `reservation-${field}-error` : undefined,
    } as const;
  }

  // Submitting via onSubmit (not `action`) skips React's automatic form reset, which clears selects after an error.
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(() => formAction(formData));
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="flex items-start justify-between gap-4">
        <h2 id="reservation-title" className="text-h2 font-semibold">
          Reserve a table
        </h2>
        <button
          type="button"
          onClick={onClose}
          className="-mr-2 -mt-1 min-h-11 rounded-pill px-3 text-label font-medium text-espresso-soft hover:text-espresso"
        >
          Close
        </button>
      </div>

      <p aria-live="polite" className="mt-2 text-caption text-cherry">
        {state.status === "error" ? "Check the highlighted fields and try again." : ""}
      </p>

      <div className="mt-2 space-y-5">
        <div>
          <label htmlFor="reservation-name" className="mb-1.5 block text-label font-medium">
            Name
          </label>
          <input
            {...fieldProps("name")}
            type="text"
            autoComplete="name"
            maxLength={80}
            className={fieldClass}
          />
          <FieldError field="name" error={errors.name} />
        </div>

        <div>
          <label htmlFor="reservation-partySize" className="mb-1.5 block text-label font-medium">
            Party size
          </label>
          <select
            {...fieldProps("partySize")}
            value={partySize}
            onChange={(event) => setPartySize(event.target.value)}
            className={fieldClass}
          >
            {PARTY_SIZES.map((size) => (
              <option key={size} value={size}>
                {size === 1 ? "1 person" : `${size} people`}
              </option>
            ))}
          </select>
          <FieldError field="partySize" error={errors.partySize} />
          <p className="mt-1.5 text-caption text-espresso-soft">
            For 9 or more, call us at{" "}
            <a href={SHOP.phoneHref} className="underline underline-offset-2">
              {SHOP.phoneDisplay}
            </a>
            .
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="reservation-date" className="mb-1.5 block text-label font-medium">
              Date
            </label>
            <input
              {...fieldProps("date")}
              type="date"
              min={toIsoDate(today)}
              max={toIsoDate(addDays(today, 60))}
              value={date}
              onChange={(event) => {
                setDate(event.target.value);
                setTime("");
              }}
              className={fieldClass}
            />
            <FieldError field="date" error={errors.date} />
          </div>

          <div>
            <label htmlFor="reservation-time" className="mb-1.5 block text-label font-medium">
              Time
            </label>
            <select
              {...fieldProps("time")}
              value={time}
              onChange={(event) => setTime(event.target.value)}
              disabled={!selectedDate || slots.length === 0}
              className={`${fieldClass} disabled:opacity-60`}
            >
              <option value="">
                {!selectedDate ? "Pick a date first" : slots.length === 0 ? "No times left" : "Choose a time"}
              </option>
              {slots.map((slot) => (
                <option key={slot} value={slot}>
                  {formatMinutes(slot)}
                </option>
              ))}
            </select>
            <FieldError field="time" error={errors.time} />
          </div>
        </div>
      </div>

      <button type="submit" disabled={pending} className={`${buttonClass("primary")} mt-7 w-full`}>
        {pending ? "Requesting…" : "Request table"}
      </button>
    </form>
  );
}
