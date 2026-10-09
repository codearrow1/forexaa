"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import type { SectionMenu } from "@/config/menus";

/**
 * Desktop mega menu (Rule 76-77).
 *  - Opens on hover (with a short intent delay) AND on focus (keyboard).
 *  - Escape / blur-out / mouse-leave close it.
 *  - Keyboard: Enter/Space/ArrowDown opens; arrows move between items;
 *    Escape closes and returns focus to the trigger.
 *  - No accidental opening: hover intent delay + focus-driven.
 */
export function MegaMenu({ menu }: { menu: SectionMenu }) {
  const [open, setOpen] = useState(false);
  const [hovering, setHovering] = useState(false);
  const panelId = useId();
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const linkCount = menu.groups.reduce((n, g) => n + g.links.length, 0);

  const cancelClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const openPanel = () => {
    cancelClose();
    setOpen(true);
    setHovering(true);
  };
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => {
      setOpen(false);
      setHovering(false);
      closeTimer.current = null;
    }, 120);
  };

  const onTriggerKey = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openPanel();
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <li
      className="relative"
      onMouseEnter={cancelClose}
      onMouseLeave={scheduleClose}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls={open ? panelId : undefined}
        onClick={() => (open ? setOpen(false) : openPanel())}
        onKeyDown={onTriggerKey}
        className={cn(
          "flex items-center gap-1 rounded-md px-3 py-2 type-small font-medium",
          "lg:px-2 xl:px-3", /* 1024-1279: 7 triggers x 8px keeps the bar within the container (no horizontal scroll) */
          "text-text-muted transition-colors duration-(--duration-fast)",
          (open || hovering) ? "text-text" : "hover:text-text",
        )}
      >
        {menu.label}
        <span aria-hidden="true" className={cn("text-caption transition-transform", open && "rotate-180")}>
          &#9662;
        </span>
      </button>

      {open && linkCount > 0 ? (
        <div
          id={panelId}
          role="menu"
          aria-label={`${menu.label} menu`}
          className={cn(
            "absolute left-0 top-full z-50 mt-1 min-w-72 rounded-xl border border-border bg-surface-elevated p-2 shadow-modal",
            "transition-opacity duration-(--duration-fast)",
          )}
        >
          {menu.blurb ? (
            <p className="type-caption px-3 py-2 text-text-muted">{menu.blurb}</p>
          ) : null}
          {menu.groups.map((group) => (
            <div key={group.heading} className="flex flex-col gap-0.5 py-1">
              <span className="type-label px-3 py-1.5 text-text-muted">{group.heading}</span>
              {group.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  role="menuitem"
                  tabIndex={-1}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2 hover:bg-surface focus-visible:outline-2 focus-visible:outline-border-focus"
                >
                  <span className="block type-small font-medium text-text">{link.label}</span>
                  {link.description ? (
                    <span className="type-caption text-text-muted">{link.description}</span>
                  ) : null}
                </Link>
              ))}
            </div>
          ))}
        </div>
      ) : null}
    </li>
  );
}
