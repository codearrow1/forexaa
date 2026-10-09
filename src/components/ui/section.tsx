import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/container";

interface SectionProps extends HTMLAttributes<HTMLElement> {
  /** Vertical rhythm preset. Mobile-first: tighter on small screens. */
  spacing?: "tight" | "default" | "wide";
  fullBleed?: boolean;
}

const SPACING: Record<NonNullable<SectionProps["spacing"]>, string> = {
  tight: "py-10 md:py-14",
  default: "py-16 md:py-24",
  wide: "py-20 md:py-32",
};

/**
 * Semantic section with consistent vertical rhythm. Content is placed
 * through Container for uniform gutters.
 */
export function Section({
  spacing = "default",
  fullBleed = false,
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section className={cn(SPACING[spacing], className)} {...props}>
      <Container fullBleed={fullBleed}>{children}</Container>
    </section>
  );
}
