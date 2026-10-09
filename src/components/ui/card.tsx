import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type SurfaceVariant = "default" | "elevated" | "glass";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: SurfaceVariant;
  /** Apply a subtle interaction glow on hover/focus-within. */
  interactive?: boolean;
}

const VARIANT: Record<SurfaceVariant, string> = {
  default: "bg-surface border border-border",
  elevated: "bg-surface-elevated border border-border shadow-card",
  glass:
    "bg-surface/60 backdrop-blur-md border border-border-strong/60 shadow-card",
};

/**
 * Elevated surface primitive. Prefer `default` or `elevated` for card
 * content; reserve `glass` for overlays (modals, hero panels).
 */
export function Card({ variant = "default", interactive = false, className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl",
        VARIANT[variant],
        interactive &&
          "transition-[border-color,box-shadow] duration-(--duration-base) ease-(--ease-out) hover:border-border-accent hover:shadow-glow-cyan focus-within:border-border-accent",
        className,
      )}
      {...props}
    />
  );
}
