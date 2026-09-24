"use client";

import { buttonClass, type ButtonVariant } from "@/components/button";
import { useOpenReservation } from "./provider";

export function ReserveButton({
  variant = "accent",
  size = "default",
  className = "",
}: {
  variant?: ButtonVariant;
  size?: "default" | "compact";
  className?: string;
}) {
  const open = useOpenReservation();
  return (
    <button
      type="button"
      aria-haspopup="dialog"
      onClick={open}
      className={`${buttonClass(variant, size)} ${className}`}
    >
      Reserve a table
    </button>
  );
}
