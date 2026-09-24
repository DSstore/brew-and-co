"use client";

import { createContext, useCallback, useContext, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { ReservationForm } from "./reservation-form";

const OpenReservation = createContext<() => void>(() => {});

export function useOpenReservation() {
  return useContext(OpenReservation);
}

export function ReservationProvider({ children }: { children: React.ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const completedRef = useRef(false);
  // The form mounts on first open so "today" comes from the visitor's clock, not the build.
  const [hasOpened, setHasOpened] = useState(false);
  const [formKey, setFormKey] = useState(0);

  const open = useCallback(() => {
    flushSync(() => {
      setHasOpened(true);
      if (completedRef.current) {
        completedRef.current = false;
        setFormKey((key) => key + 1);
      }
    });
    const dialog = dialogRef.current;
    if (!dialog) return;
    dialog.showModal();
    dialog.querySelector<HTMLElement>("#reservation-name")?.focus();
  }, []);

  const close = useCallback(() => dialogRef.current?.close(), []);
  const markComplete = useCallback(() => {
    completedRef.current = true;
  }, []);

  return (
    <OpenReservation value={open}>
      {children}
      <dialog
        ref={dialogRef}
        aria-labelledby="reservation-title"
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
        className="m-auto w-[min(92vw,480px)] rounded-card bg-cloud p-0 text-espresso shadow-float"
      >
        <div className="p-6 sm:p-8">
          {hasOpened && <ReservationForm key={formKey} onClose={close} onComplete={markComplete} />}
        </div>
      </dialog>
    </OpenReservation>
  );
}
