import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type Variant =
  | "body"
  | "body-lg"
  | "small"
  | "caption"
  | "label"
  | "muted"
  | "primary"
  | "secondary";

const VARIANT: Record<Variant, string> = {
  body: "type-body text-text",
  "body-lg": "type-body-lg text-text",
  small: "type-small text-text-muted",
  caption: "type-caption text-text-muted",
  label: "type-label text-text-muted",
  muted: "type-body text-text-muted",
  primary: "type-body text-primary",
  secondary: "type-body text-secondary-soft",
};

interface TextProps extends HTMLAttributes<HTMLElement> {
  variant?: Variant;
  as?: "p" | "span" | "div";
}

/** Semantic text primitive that maps to the type scale (Rule 9). */
export function Text({ variant = "body", as: Tag = "p", className, ...props }: TextProps) {
  return <Tag className={cn(VARIANT[variant], className)} {...props} />;
}
