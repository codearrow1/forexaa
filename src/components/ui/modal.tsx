"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/cn";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  /** Closes on backdrop click. */
  closeOnBackdrop?: boolean;
}

/**
 * Accessible modal dialog:
 *  - focus moves into the dialog on open and returns to the opener on close
 *  - Escape closes
 *  - backdrop click closes
 *  - body scroll lock
 *  - reduced-motion: the global CSS freezes the transition
 */
export function Modal({
  open,
  onClose,
  title,
  children,
  closeOnBackdrop = true,
}: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(open);

  const close = useCallback(() => {
    setVisible(false);
    // return focus to the opener after the exit transition
    const opener = openerRef.current;
    setTimeout(() => {
      onClose();
      opener?.focus();
    }, 200);
  }, [onClose]);

  // Render-phase: show the dialog the moment `open` turns true.
  if (open && !visible) {
    setVisible(true);
  }

  // Unmount after the exit transition completes.
  useEffect(() => {
    if (open || !visible) return;
    const timer = setTimeout(() => setVisible(false), 200);
    return () => clearTimeout(timer);
  }, [open, visible]);

  // External systems only: keyboard, scroll lock, focus. No state writes.
  useEffect(() => {
    if (!open) return;
    openerRef.current = (document.activeElement as HTMLElement | null) ?? null;
    panelRef.current?.focus();

    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = original;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  if (!visible) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      aria-hidden={!open}
    >
      <div
        className={cn(
          "absolute inset-0 bg-obsidian/70 backdrop-blur-sm",
          "transition-opacity duration-(--duration-base)",
          open ? "opacity-100" : "opacity-0",
        )}
        onClick={closeOnBackdrop ? close : undefined}
        aria-hidden="true"
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        tabIndex={-1}
        className={cn(
          "relative z-10 w-full max-w-lg rounded-xl border border-border bg-surface shadow-modal outline-none",
          "transition-all duration-(--duration-base)",
          open ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
        )}
      >
        <div className="flex items-center justify-between border-b border-border p-4">
          <h2 id="modal-title" className="type-h3">
            {title}
          </h2>
          <button
            type="button"
            onClick={close}
            aria-label="Close dialog"
            className="rounded-md p-1.5 text-text-muted hover:text-text"
          >
            <span aria-hidden="true">&#10005;</span>
          </button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>,
    document.body,
  );
}
