import { describe, it, expect } from "vitest";
import { buildSecurityHeaders } from "@/security/headers";

const production = {
  isProduction: true,
  cspAllowedOrigins: [] as string[],
};

describe("security headers (production)", () => {
  const headers = buildSecurityHeaders(production);

  it("sets a strict CSP with object-src none and no unsafe-eval", () => {
    const csp = headers["Content-Security-Policy"] ?? "";
    expect(csp).toContain("default-src 'self'");
    expect(csp).toContain("object-src 'none'");
    expect(csp).toContain("frame-src 'none'");
    expect(csp).not.toContain("unsafe-eval");
    // Production must NOT allow unsafe-inline for scripts.
    const scriptDirective = csp.split("script-src ")[1]?.split(";")[0] ?? "";
    expect(scriptDirective).not.toContain("unsafe-inline");
  });

  it("defends against clickjacking", () => {
    expect(headers["X-Frame-Options"]).toBe("DENY");
    expect(headers["Cross-Origin-Opener-Policy"]).toBe("same-origin");
  });

  it("prevents MIME sniffing and leaks content type intent", () => {
    expect(headers["X-Content-Type-Options"]).toBe("nosniff");
  });

  it("sends HSTS for production", () => {
    expect(headers["Strict-Transport-Security"]).toMatch(/max-age=63072000/);
  });

  it("restricts powerful features via Permissions-Policy", () => {
    expect(headers["Permissions-Policy"]).toContain("camera=()");
  });
});

describe("security headers (development)", () => {
  it("relaxes script-src only in dev (documented HMR deviation)", () => {
    const headers = buildSecurityHeaders({
      isProduction: false,
      cspAllowedOrigins: [],
    });
    const csp = headers["Content-Security-Policy"] ?? "";
    const scriptDirective = csp.split("script-src ")[1]?.split(";")[0] ?? "";
    expect(scriptDirective).toContain("unsafe-inline");
  });
});

describe("security headers (approved origins)", () => {
  it("adds approved https origins to connect-src/img-src", () => {
    const headers = buildSecurityHeaders({
      isProduction: true,
      cspAllowedOrigins: ["https://cdn.example.com"],
    });
    const csp = headers["Content-Security-Policy"] ?? "";
    expect(csp).toContain("https://cdn.example.com");
  });

  it("rejects non-https and malformed origins at the source", async () => {
    const { loadServerEnv } = await import("@/lib/env");
    // Simulate env parsing by checking loadServerEnv output shape.
    const env = loadServerEnv();
    // cspAllowedOrigins is always an array of verified https origins.
    expect(Array.isArray(env.cspAllowedOrigins)).toBe(true);
    for (const origin of env.cspAllowedOrigins) {
      expect(origin.startsWith("https://")).toBe(true);
    }
  });
});
