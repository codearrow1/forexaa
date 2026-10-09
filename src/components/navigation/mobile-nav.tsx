"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { MOBILE_MENU, SECTION_MENUS } from "@/config/menus";
import { Logo } from "@/components/ui/logo";

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
}

/**
 * Mobile navigation drawer (Rule 79). Prioritized top items (not a vertical
 * copy of the mega menu) + an accordion of grouped destinations.
 *
 *  - ESC + backdrop click close
 *  - body scroll lock while open
 *  - focus moves to the panel on open, returns to the trigger on close
 *  - reduced-motion: the global CSS freezes the transition
 */
export function MobileNav({ open, onClose }: MobileNavProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(open);
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  // Render-phase: show the drawer the moment `open` turns true.
  if (open && !visible) {
    setVisible(true);
  }

  // Keep mounted briefly on close so the exit transition can play.
  useEffect(() => {
    if (open || !visible) return;
    const timer = setTimeout(() => setVisible(false), 200);
    return () => clearTimeout(timer);
  }, [open, visible]);

  // External systems only: focus, scroll lock, keyboard. No state writes.
  useEffect(() => {
    if (!open) return;
    panelRef.current?.focus();

    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = original;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!visible) return null;

  const groupedMenus = SECTION_MENUS.filter((menu) => menu.groups.length > 0);

  return (
    <div
      className="fixed inset-0 z-[90] lg:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
    >
      <button
        type="button"
        aria-label="Close navigation"
        onClick={onClose}
        className="absolute inset-0 h-full w-full cursor-default bg-obsidian/70 backdrop-blur-sm"
      />
      <div
        ref={panelRef}
        tabIndex={-1}
        className={cn(
          "absolute top-0 right-0 h-full w-[min(22rem,90vw)] overflow-y-auto",
          "border-l border-border bg-surface shadow-modal outline-none",
          "transition-transform duration-(--duration-base) ease-(--ease-out)",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-center justify-between border-b border-border p-4">
          <Logo compact />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation"
            className="rounded-md p-2 text-text-muted hover:text-text"
          >
            <span aria-hidden="true" className="type-body-lg">
              &#10005;
            </span>
          </button>
        </div>

        <nav aria-label="Mobile" className="flex flex-col gap-1 p-4">
          {/* Primary: Talk to FOREXAA + prioritized top sections */}
          <div className="flex flex-col gap-1">
            {MOBILE_MENU.map((item) =>
              "primary" in item && item.primary ? (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={onClose}
                  className="mt-2 flex h-11 items-center justify-center rounded-md bg-primary px-4 type-body font-semibold text-text-inverted"
                >
                  {item.label}
                </Link>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={onClose}
                  className="rounded-md px-3 py-2.5 type-body font-medium text-text hover:bg-surface-elevated"
                >
                  {item.label}
                </Link>
              ),
            )}
          </div>

          {/* Grouped destinations as an accessible accordion */}
          <div className="mt-4 border-t border-border pt-4">
            <span className="type-label px-1 text-text-muted">Explore</span>
            <ul className="mt-2 flex flex-col">
              {groupedMenus.map((menu) => {
                const isOpen = openGroup === menu.label;
                return (
                  <li key={menu.label} className="border-b border-border/60">
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpenGroup(isOpen ? null : menu.label)}
                      className="flex w-full items-center justify-between px-3 py-3 type-body font-medium text-text"
                    >
                      {menu.label}
                      <span aria-hidden="true" className={cn("text-text-muted transition-transform", isOpen && "rotate-180")}>
                        &#9662;
                      </span>
                    </button>
                    {isOpen ? (
                      <div className="flex flex-col gap-0.5 pb-3">
                        {menu.groups.flatMap((group) =>
                          group.links.map((link) => (
                            <Link
                              key={link.href}
                              href={link.href}
                              onClick={onClose}
                              className="rounded-md px-4 py-2 type-small text-text-muted hover:text-text"
                            >
                              {link.label}
                            </Link>
                          )),
                        )}
                      </div>
                    ) : null}
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
}
