"use client";

import { useId, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

interface TooltipProps {
  /** Short label shown on hover/focus. Required for a11y. */
  content: string;
  children: ReactNode;
  side?: "top" | "bottom";
  className?: string;
}

/**
 * Lightweight tooltip. Shows on hover AND keyboard focus (Rule 14).
 * Uses useId for a stable accessible label.
 */
export function Tooltip({ content, children, side = "top", className }: TooltipProps) {
  const id = useId();
  const [open, setOpen] = useState(false);

  return (
    <span
      className={cn("relative inline-flex", className)}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocusCapture={() => setOpen(true)}
      onBlurCapture={() => setOpen(false)}
    >
      <span aria-describedby={open ? id : undefined}>{children}</span>
      <span
        id={id}
        role="tooltip"
        className={cn(
          "pointer-events-none absolute left-1/2 z-50 w-max max-w-64 -translate-x-1/2 rounded-sm",
          "border border-border bg-surface-elevated px-2.5 py-1.5 text-caption text-text shadow-card",
          side === "top" ? "bottom-full mb-2" : "top-full mt-2",
          "transition-opacity duration-(--duration-fast)",
          open ? "opacity-100" : "opacity-0",
        )}
      >
        {content}
      </span>
    </span>
  );
}
