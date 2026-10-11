import { NextResponse } from "next/server";

/**
 * Internal health/readiness probe (Phase 7 Rule 41).
 *
 * Minimal public response ("OK") — no database URLs, provider names,
 * environment values, internal versions or connection details are exposed.
 * Kept outside the sitemap (noindex) and not linked.
 */
export const dynamic = "force-dynamic";

export async function GET() {
  return new NextResponse("OK", {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "X-Robots-Tag": "noindex, follow",
    },
  });
}
