import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type Size = "sm" | "md" | "lg";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Accessible name. REQUIRED — icon buttons have no visible text.
   * (Rule 15: screen-reader labels.)
   */
  "aria-label": string;
  size?: Size;
}

const SIZE: Record<Size, string> = {
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-12 w-12",
};

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton({ size = "md", className, type = "button", ...props }, ref) {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          "inline-flex items-center justify-center rounded-md border border-border bg-surface-elevated",
          "text-text-muted transition-[background-color,border-color,color] duration-(--duration-fast)",
          "hover:text-text hover:border-border-strong disabled:pointer-events-none disabled:opacity-40",
          SIZE[size],
          className,
        )}
        {...props}
      />
    );
  },
);
