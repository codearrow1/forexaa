/**
 * Security header strategy (OWASP ASVS reference: browser security).
 *
 * This module is the single place where response headers are decided. It is
 * consumed by the network boundary (src/proxy.ts).
 *
 * CSP policy:
 *  - Production: strict. No unsafe-inline/eval. Inline scripts are permitted
 *    ONLY via a per-request nonce (Next.js App Router emits inline RSC
 *    flight scripts; a nonce is the secure way to allow them).
 *  - Development: Next.js HMR injects inline module scripts, so we allow
 *    'unsafe-inline' in dev only. Documented deviation — production stays
 *    strict.
 *
 * Third-party trust is off by default (Rule 24). Every approved origin must
 * also be documented in docs/security/SECURITY-BASELINE.md.
 */

export interface HeaderContext {
  readonly isProduction: boolean;
  readonly cspAllowedOrigins: readonly string[];
  /** Per-request nonce permitting the app's own inline RSC / JSON-LD scripts. */
  readonly cspNonce?: string;
}

function buildCsp(ctx: HeaderContext): string {
  const { isProduction, cspNonce } = ctx;
  const allowed = [...ctx.cspAllowedOrigins];

  const scriptSrc: string[] = isProduction ? ["'self'"] : ["'self'", "'unsafe-inline'"];
  if (isProduction && cspNonce) scriptSrc.push("'" + "nonce-" + cspNonce + "'");

  const styleSrc: string[] = ["'self'", "'unsafe-inline'"];

  const directives: Array<[string, string[]]> = [
    ["default-src", ["'self'"]],
    ["script-src", scriptSrc],
    ["style-src", styleSrc],
    ["img-src", ["'self'", "data:", ...allowed]],
    ["font-src", ["'self'"]],
    ["connect-src", ["'self'", ...allowed]],
    ["frame-src", ["'none'"]],
    ["object-src", ["'none'"]],
    ["base-uri", ["'self'"]],
    ["form-action", ["'self'"]],
  ];

  return directives.map((pair) => pair[0] + " " + pair[1].join(" ")).join("; ");
}

export function buildSecurityHeaders(ctx: HeaderContext): Record<string, string> {
  const out: Record<string, string> = {
    "Content-Security-Policy": buildCsp(ctx),
    "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload",
    "X-Content-Type-Options": "nosniff",
    "Referrer-Policy": "strict-origin",
    "Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
    "X-Frame-Options": "DENY",
    "Cross-Origin-Opener-Policy": "same-origin",
    "Cross-Origin-Resource-Policy": "same-origin",
  };
  if (ctx.cspNonce) out["X-Nonce"] = ctx.cspNonce;
  return out;
}
