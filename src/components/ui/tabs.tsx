"use client";

import { useState, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/cn";

interface TabItem {
  readonly id: string;
  readonly label: string;
  readonly content: ReactNode;
}

interface TabsProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  items: readonly TabItem[];
  /** Controlled initial active tab id. */
  defaultActiveId?: string;
}

/**
 * Accessible tabs (WAI-ARIA tabs pattern): role=tablist/tab/tabpanel,
 * arrow-key navigation, roving tabindex, Enter/Space activation.
 * Client component (interactivity).
 */
export function Tabs({ items, defaultActiveId, className, ...props }: TabsProps) {
  const [active, setActive] = useState<string>(defaultActiveId ?? items[0]?.id ?? "");

  const select = (id: string) => setActive(id);

  const onKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    const count = items.length;
    const index = items.findIndex((item) => item.id === active);
    const current = index === -1 ? 0 : index;
    const target = (selector: number) => {
      const item = items[((selector % count) + count) % count];
      if (item) select(item.id);
    };
    switch (event.key) {
      case "ArrowRight":
        event.preventDefault();
        target(current + 1);
        break;
      case "ArrowLeft":
        event.preventDefault();
        target(current - 1);
        break;
      case "Home":
        event.preventDefault();
        target(0);
        break;
      case "End":
        event.preventDefault();
        target(count - 1);
        break;
      default:
        break;
    }
  };

  return (
    <div className={cn("flex flex-col gap-5", className)} {...props}>
      <div
        role="tablist"
        aria-label="Tabs"
        className="inline-flex flex-wrap gap-1 rounded-md border border-border bg-surface p-1"
      >
        {items.map((item) => {
          const isActive = item.id === active;
          return (
            <button
              key={item.id}
              role="tab"
              id={`tab-${item.id}`}
              aria-selected={isActive}
              aria-controls={`tabpanel-${item.id}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => select(item.id)}
              onKeyDown={onKeyDown}
              className={cn(
                "rounded-sm px-4 py-2 text-small font-medium transition-colors duration-(--duration-fast)",
                isActive
                  ? "bg-surface-elevated text-text"
                  : "text-text-muted hover:text-text",
              )}
            >
              {item.label}
            </button>
          );
        })}
      </div>
      {items.map((item) => (
        <div
          key={item.id}
          role="tabpanel"
          id={`tabpanel-${item.id}`}
          aria-labelledby={`tab-${item.id}`}
          hidden={item.id !== active}
          className="type-body"
        >
          {item.content}
        </div>
      ))}
    </div>
  );
}
