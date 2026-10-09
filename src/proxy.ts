/**
 * Network boundary for FOREXAA (Next.js 16 replacement for middleware).
 *
 * Responsibilities:
 *  - inject the security header set on every response
 *  - reject requests for known sensitive path patterns early
 *
 * Keep this file fast and side-effect light: no DB, no external calls.
 */

import { randomBytes } from "node:crypto";
import { NextResponse, type NextRequest } from "next/server";
import { loadServerEnv } from "@/lib/env";
import { buildSecurityHeaders } from "@/security/headers";

/**
 * Sensitive paths that must never resolve to a normal route. Returning 404
 * here avoids leaking whether such a resource exists (path enumeration).
 */
const FORBIDDEN_PATTERNS: readonly RegExp[] = [
  /^\/api\/admin\b/,
  /^\/admin\b/,
  /^\/\.env\b/,
  /(^|\/)\.env(\.|$)/,
  /^\/private\b/,
];

export default function proxy(request: NextRequest): NextResponse {
  const env = loadServerEnv();
  const { pathname } = request.nextUrl;

  const forbidden = FORBIDDEN_PATTERNS.some((pattern) =>
    pattern.test(pathname),
  );

  // Per-request CSP nonce: permits the app's own inline RSC / JSON-LD scripts
  // without 'unsafe-inline'. Forwarded to the server render via a request
  // header so components can apply it to their <script> tags.
  const nonce = randomBytes(16).toString("base64");
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-forexaa-nonce", nonce);

  if (forbidden) {
    const response = new NextResponse(null, {
      status: 403,
      statusText: "Forbidden",
    });
    return applyHeaders(response, env, nonce);
  }

  return applyHeaders(
    NextResponse.next({ request: { headers: requestHeaders } }),
    env,
    nonce,
  );
}

function applyHeaders(
  response: NextResponse,
  env: ReturnType<typeof loadServerEnv>,
  cspNonce: string,
): NextResponse {
  const headers = buildSecurityHeaders({
    isProduction: env.isProduction,
    cspAllowedOrigins: env.cspAllowedOrigins,
    cspNonce,
  });

  for (const [header, value] of Object.entries(headers)) {
    response.headers.set(header, value);
  }
  return response;
}

export const config = {
  // Apply to everything except static assets Next serves without headers.
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
