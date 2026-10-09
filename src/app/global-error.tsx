"use client";

import { Button } from "@/components/ui/button";

/**
 * Root error boundary — used when the error boundary itself fails.
 * Must be a client component with its own html/body (it sits above the
 * normal layout). No internal details are exposed (Rule 30).
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: unknown;
  reset: () => void;
}) {
  const digest =
    error instanceof Error && error.message ? error.message.slice(0, 80) : "unexpected";
  console.error("forexaa global error digest", digest);

  return (
    <html lang="en">
      <body className="flex min-h-screen items-center justify-center bg-[#07111f] text-[#f5f8fc]">
        <div className="text-center">
          <div className="text-2xl font-semibold">Something went wrong.</div>
          <p className="mt-2 max-w-sm text-sm text-[#7c8da3]">
            Please reload the page. If the problem persists, our team has
            been notified.
          </p>
          <div className="mt-6 flex justify-center">
            <Button variant="primary" onClick={reset}>
              Try again
            </Button>
          </div>
        </div>
      </body>
    </html>
  );
}
