"use client";

import { Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Button, ButtonLink } from "@/components/ui/button";

/**
 * Route-level error boundary.
 *
 * IMPORTANT (Rule 30 / error leakage): the `error` digest is intentionally
 * logged, but the raw error object is NEVER shown to the user. No stack
 * traces, paths, env values or internal details.
 */
export default function RouteError({
  error,
  reset,
}: {
  error: unknown;
  reset: () => void;
}) {
  const digest =
    error instanceof Error && error.message ? error.message.slice(0, 80) : "unexpected";

  // The digest is safe to log (server-side); never rendered in full.
  console.error("forexaa route error digest", digest);

  return (
    <Section spacing="wide">
      <Card variant="elevated" className="mx-auto max-w-md p-8 text-center">
        <div className="mb-4 text-danger type-display">Something went wrong.</div>
        <p className="type-body text-text-muted">
          We&apos;ve been notified. Please try again, or head back to the
          home page.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Button variant="primary" onClick={reset}>
            Try again
          </Button>
          <ButtonLink href="/" variant="ghost">
            Go home
          </ButtonLink>
        </div>
      </Card>
    </Section>
  );
}
