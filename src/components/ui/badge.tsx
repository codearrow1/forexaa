import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type Tone = "neutral" | "primary" | "success" | "warning" | "danger";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: Tone;
}

const TONE: Record<Tone, string> = {
  neutral: "bg-surface-elevated text-text-muted border-border",
  primary: "bg-primary/10 text-primary border-border-accent",
  success: "bg-success/10 text-success border-success/30",
  warning: "bg-warning/10 text-warning border-warning/30",
  danger: "bg-danger/10 text-danger border-danger/30",
};

/** Small status/category tag. Renders a pill. */
export function Badge({ tone = "neutral", className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-pill border px-2.5 py-0.5 text-caption font-medium",
        TONE[tone],
        className,
      )}
      {...props}
    />
  );
}
