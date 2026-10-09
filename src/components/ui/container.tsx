import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  /** Opt out of the max-width for full-bleed backgrounds. */
  fullBleed?: boolean;
}

/**
 * Standard content container: 1280px max width, responsive gutters.
 * All page sections run through this so the grid stays consistent
 * (Rule 36: explicit responsive behavior, mobile-first).
 */
export function Container({ fullBleed = false, className, ...props }: ContainerProps) {
  return (
    <div
      className={cn(
        "w-full px-5 sm:px-6 lg:px-8 3xl:px-10",
        !fullBleed && "mx-auto max-w-[var(--container-width)]",
        className,
      )}
      {...props}
    />
  );
}
