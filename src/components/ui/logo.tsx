import { cn } from "@/lib/cn";

interface LogoProps {
  className?: string;
  /** Compact: mark + FOREXAA wordmark at a smaller scale. */
  compact?: boolean;
}

/**
 * FOREXAA brand lockup — Aurora Terminal mark.
 *
 * Angular F monogram with the diagonal market arrow fused into the top arm
 * (integrated, not overlaid). Original geometry; not a competitor asset.
 * Mark is transparent so it reads on any surface.
 */
export function Logo({ className, compact = false }: LogoProps) {
  const size = compact ? 26 : 32;
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <svg
        aria-hidden="true"
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        className="shrink-0"
      >
        <path
          d="M30 33L66 33L74 41L74 49L46 49L46 57L66 57L66 69L46 69L46 77L30 77Z"
          fill="#20D8E8"
        />
        <path d="M74 43L90 27L90 43Z" fill="#64F2C1" />
      </svg>
      <span
        className={cn(
          "font-display font-extrabold tracking-tight",
          compact ? "text-body-lg" : "text-brand",
        )}
      >
        FOREXAA
      </span>
    </span>
  );
}
