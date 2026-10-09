import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const VARIANT: Record<Variant, string> = {
  primary:
    "bg-primary text-text-inverted font-semibold hover:bg-primary-hover active:translate-y-px disabled:opacity-50",
  secondary:
    "bg-secondary/15 text-text border border-border-strong font-medium hover:bg-secondary/25 hover:border-border-accent active:translate-y-px disabled:opacity-50",
  ghost:
    "text-text-muted font-medium hover:text-text hover:bg-surface-elevated disabled:opacity-50",
};

const SIZE: Record<Size, string> = {
  sm: "h-8 px-3 text-small",
  md: "h-10 px-4 text-body",
  lg: "h-12 px-6 text-body-lg",
};

/**
 * Base button. For links styled as buttons use the `ButtonLink` export.
 * All interactive primitives share these states:
 * hover / active / focus-visible / disabled (Rule 14).
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = "primary", size = "md", className, type = "button", ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md font-sans",
        "transition-[background-color,border-color,color,transform,box-shadow]",
        "duration-(--duration-fast) ease-(--ease-out)",
        "disabled:pointer-events-none",
        VARIANT[variant],
        SIZE[size],
        className,
      )}
      {...props}
    />
  );
});

/** Anchor styled as a button (external/internal CTA targets). */
export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  external = false,
  onClick,
}: {
  href: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
  /**
   * Mark true for off-site URLs. Internal links stay same-origin
   * (prevents open-redirect confusion).
   */
  external?: boolean;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}) {
  return (
    <a
      href={href}
      onClick={onClick}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md font-sans",
        "transition-[background-color,border-color,color,transform] duration-(--duration-fast) ease-(--ease-out)",
        VARIANT[variant],
        SIZE[size],
        className,
      )}
    >
      {children}
    </a>
  );
}
