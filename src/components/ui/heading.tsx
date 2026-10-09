import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface HeadingProps {
  /**
   * Document heading level. Use exactly one h1 per page (Rule 15:
   * correct heading hierarchy).
   */
  level?: 1 | 2 | 3;
  children: ReactNode;
  className?: string;
  /** Small uppercase label rendered above the heading. */
  eyebrow?: string;
  /** Supporting line under the heading. */
  description?: string;
  align?: "left" | "center";
  id?: string;
}

const LEVEL_CLASS: Record<NonNullable<HeadingProps["level"]>, string> = {
  1: "type-h1",
  /* Level-2 headings through this component are always major section
   * headings — they use the V2 `type-section` scale (Phase 13 §1). */
  2: "type-section",
  3: "type-h3",
};

/**
 * Semantic heading with optional eyebrow + description.
 * Server component (no interactivity).
 */
export function Heading({
  level = 2,
  children,
  className,
  eyebrow,
  description,
  align = "left",
  id,
}: HeadingProps) {
  const Tag = `h${level}` as "h1" | "h2" | "h3";
  return (
    <div className={cn(align === "center" && "text-center", "flex flex-col gap-3", className)}>
      {eyebrow ? <span className="type-label text-primary">{eyebrow}</span> : null}
      <Tag id={id} className={cn(LEVEL_CLASS[level])}>
        {children}
      </Tag>
      {description ? (
        <p className={cn("type-body-lg text-text-muted", align === "center" && "mx-auto max-w-2xl")}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
