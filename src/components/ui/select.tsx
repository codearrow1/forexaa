import { forwardRef, useId, type SelectHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

interface Option {
  readonly value: string;
  readonly label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: readonly Option[];
  description?: string;
  error?: string;
  /** Renders a leading empty option (for required selects with no default). */
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { label, options, description, error, placeholder, id, className, ...props },
  ref,
) {
  const autoId = useId();
  const selectId = id ?? autoId;
  const descId = description ? `${selectId}-desc` : undefined;
  const errId = error ? `${selectId}-err` : undefined;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={selectId} className="type-small font-medium text-text">
        {label}
      </label>
      {description ? (
        <p id={descId} className="type-caption text-text-muted">
          {description}
        </p>
      ) : null}
      <select
        ref={ref}
        id={selectId}
        aria-invalid={error ? true : undefined}
        aria-describedby={cn(descId, errId) || undefined}
        className={cn(
          "h-11 w-full rounded-md border bg-surface-elevated px-3 text-body text-text",
          "focus:outline-2 focus:outline-border-focus",
          error ? "border-danger" : "border-border",
          className,
        )}
        {...props}
      >
        {placeholder ? (
          <option value="" disabled>
            {placeholder}
          </option>
        ) : null}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error ? (
        <p id={errId} role="alert" className="type-caption text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
});
