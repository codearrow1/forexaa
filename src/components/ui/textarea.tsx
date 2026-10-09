import { forwardRef, useId, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  description?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
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
      <textarea
        ref={ref}
        id={inputId}
        aria-invalid={error ? true : undefined}
        aria-describedby={cn(descId, errId) || undefined}
        rows={4}
        className={cn(
          "w-full rounded-md border bg-surface-elevated px-3 py-2.5 text-body text-text",
          "placeholder:text-text-muted/60 focus:outline-2 focus:outline-border-focus",
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
