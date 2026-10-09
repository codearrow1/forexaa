"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { cn } from "@/lib/cn";

interface DropdownProps {
  /** Trigger content (typically a button label + chevron). */
  trigger: ReactNode;
  /** Menu items rendered inside the panel. */
  children: ReactNode;
  label: string;
  align?: "start" | "end";
  onOpenChange?: (open: boolean) => void;
}

/**
 * Accessible disclosure menu: button aria-expanded, Escape + outside click
 * close, focus returns to the trigger on close. Used by the header mega-menu
 * architecture (Phase 2) and mobile nav.
 */
export function Dropdown({
  trigger,
  children,
  label,
  align = "start",
  onOpenChange,
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const setOpenState = useCallback(
    (next: boolean) => {
      setOpen(next);
      onOpenChange?.(next);
    },
    [onOpenChange],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenState(false);
        triggerRef.current?.focus();
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpenState(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open, setOpenState]);

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={label}
        onClick={() => setOpenState(!open)}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-small font-medium",
          "text-text-muted transition-colors duration-(--duration-fast)",
          "hover:text-text",
          open && "text-text",
        )}
      >
        {trigger}
        <span aria-hidden="true" className={cn("text-caption transition-transform", open && "rotate-180")}>
          &#9662;
        </span>
      </button>
      {open ? (
        <div
          role="menu"
          aria-label={label}
          className={cn(
            "absolute top-full z-50 mt-2 min-w-56 rounded-lg border border-border bg-surface-elevated p-1.5 shadow-modal",
            "transition-opacity duration-(--duration-fast)",
            align === "start" ? "left-0" : "right-0",
          )}
        >
          {children}
        </div>
      ) : null}
    </div>
  );
}

export function DropdownItem({
  href,
  label,
  description,
}: {
  href: string;
  label: string;
  description?: string;
}) {
  return (
    <a
      role="menuitem"
      href={href}
      className="block rounded-md px-3 py-2 hover:bg-surface focus-visible:outline-2 focus-visible:outline-border-focus"
    >
      <span className="type-small font-medium text-text">{label}</span>
      {description ? <span className="mt-0.5 block type-caption text-text-muted">{description}</span> : null}
    </a>
  );
}
