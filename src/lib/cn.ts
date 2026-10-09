/**
 * Join class names, dropping falsy values.
 * No external dependency (kept on purpose — see Rule 5).
 */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}
