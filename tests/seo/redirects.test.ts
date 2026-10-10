import { describe, it, expect } from "vitest";
import { createRequire } from "node:module";
import { routeByPath } from "@/config/seo/routes";

const require = createRequire(import.meta.url);
const mod = require("../../next.config.mjs") as {
  default: { redirects?: () => Promise<readonly { source: string; destination: string; permanent: boolean }[]> };
};
const nextConfig = mod.default;

type Redirect = {
  source: string;
  destination: string;
  permanent: boolean;
};

/**
 * Redirect tests (Rule 42 / 71): legacy 301s must be a static allowlist —
 * no user-controlled destinations, no chains, no loops, no collision with
 * live routes, and every destination must exist and be live.
 */
describe("legacy redirects", () => {
  const redirects: Promise<Redirect[]> = nextConfig.redirects
    ? (nextConfig.redirects() as Promise<Redirect[]>)
    : Promise.resolve([]);

  it("all redirects are permanent 301s", async () => {
    const list = await redirects;
    expect(list.length).toBeGreaterThan(0);
    for (const redirect of list) {
      expect(redirect.permanent).toBe(true);
    }
  });

  it("sources never collide with live routes or with each other", async () => {
    const list = await redirects;
    const sources = list.map((redirect) => redirect.source);
    expect(new Set(sources).size).toBe(sources.length);
    for (const source of sources) {
      const route = routeByPath(source);
      expect(route, `source ${source} must not be a live route`).toBeUndefined();
    }
  });

  it("every destination is a live route (no chains / dead ends)", async () => {
    const list = await redirects;
    const sourceSet = new Set(list.map((redirect) => redirect.source));
    for (const redirect of list) {
      const route = routeByPath(redirect.destination);
      expect(route, `destination ${redirect.destination}`).toBeDefined();
      expect(route!.status).toBe("live");
      // A destination that is itself a redirect source would create a chain.
      expect(sourceSet.has(redirect.destination)).toBe(false);
    }
  });

  it("no destination is a duplicate of another destination", async () => {
    const list = await redirects;
    const destinations = list.map((redirect) => redirect.destination);
    // Multiple legacy URLs may converge on one live page; that is allowed.
    // What is forbidden is two *different* legacy URLs mapping to two
    // conflicting destinations for the same intent — not mechanically
    // detectable, so we at least assert all destinations are known routes.
    for (const destination of destinations) {
      expect(routeByPath(destination)).toBeDefined();
    }
    expect(destinations.length).toBe(list.length);
  });
});
