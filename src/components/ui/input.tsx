import { forwardRef, useId, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  description?: string;
  /** Stable error message; rendered with an aria live region. */
  error?: string;
}

/**
 * Accessible text input: visible label, optional description, error state.
 * `aria-describedby` wires description + error. Server-safe (no state).
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, description, error, id, className, ...props },
  ref,
) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const descId = description ? `${inputId}-desc` : undefined;
  const errId = error ? `${inputId}-err` : undefined;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={inputId} className="type-small font-medium text-text">
        {label}
      </label>
      {description ? (
        <p id={descId} className="type-caption text-text-muted">
          {description}
        </p>
      ) : null}
      <input
        ref={ref}
        id={inputId}
        aria-invalid={error ? true : undefined}
        aria-describedby={cn(descId, errId) || undefined}
        className={cn(
          "h-11 w-full rounded-md border bg-surface-elevated px-3 text-body text-text",
          "placeholder:text-text-muted/60",
          "focus:outline-2 focus:outline-border-focus",
          error ? "border-danger" : "border-border",
          className,
        )}
        {...props}
      />
      {error ? (
        <p id={errId} role="alert" className="type-caption text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
});
