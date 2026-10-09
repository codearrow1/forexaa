import type { AnchorHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /** External (off-site) links get target + rel. Internal stay same-origin. */
  external?: boolean;
}

/**
 * Internal/external link primitive. Use relative `href` for same-site links.
 * Off-site links must set `external` (adds rel="noopener noreferrer").
 * Keep internal links same-origin to avoid open-redirect ambiguity (Rule 21).
 */
export function Link({ external = false, className, children, ...props }: LinkProps) {
  return (
    <a
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn(
        "font-medium text-primary underline-offset-4 hover:underline",
        className,
      )}
      {...props}
    >
      {children}
    </a>
  );
}
