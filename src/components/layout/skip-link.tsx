import { cn } from "@/lib/cn";

/**
 * Skip-to-content link. Visually hidden until focused (keyboard users).
 * Required for WCAG 2.2 AA (2.4.1 Bypass Blocks).
 */
export function SkipLink() {
  return (
    <a
      href="#main-content"
      className={cn(
        "sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200]",
        "focus:rounded-md focus:border focus:border-border-accent focus:bg-surface-elevated",
        "focus:px-4 focus:py-2 focus:text-small focus:font-medium focus:text-text",
      )}
    >
      Skip to content
    </a>
  );
}
