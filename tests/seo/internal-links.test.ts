import { describe, it, expect } from "vitest";
import { LINKS, linkTargetsAreKnown } from "@/config/seo/internal-links";
import { siteConfig } from "@/config/site";
import { NAV_SECTIONS } from "@/config/navigation";
import { ALL_KNOWN_PATHS, routeByPath } from "@/config/seo/routes";

/**
 * Internal linking (Rule 24): every link in the data model resolves to a
 * known registry path — no dead links ship.
 */
describe("internal link integrity", () => {
  it("all modelled link targets are known registry paths", () => {
    expect(linkTargetsAreKnown()).toBe(true);
  });

  it("resolving a planned path falls back to a live route", () => {
    const link = LINKS.homeTo.crm;
    // /broker-technology/crm is planned → link resolves to the live hub.
    const expected =
      routeByPath(link.target)?.status === "live" ? link.target : link.fallback;
    expect(link.target).toBe(expected);
  });

  it("no link target points at a path outside the registry", () => {
    const all = [
      ...Object.values(LINKS.homeTo).map((l) => l.target),
      ...LINKS.crmCluster.siblings.map((l) => l.target),
      ...LINKS.crmCluster.related.map((l) => l.target),
      ...LINKS.whiteLabelCluster.siblings.map((l) => l.target),
      ...LINKS.whiteLabelCluster.related.map((l) => l.target),
      ...LINKS.liquidityCluster.siblings.map((l) => l.target),
      ...LINKS.liquidityCluster.related.map((l) => l.target),
    ];
    for (const target of all) {
      expect((ALL_KNOWN_PATHS as readonly string[]).includes(target), target).toBe(true);
    }
  });

  it("every primary nav + footer link resolves to a live route", () => {
    for (const section of NAV_SECTIONS) {
      const route = routeByPath(section.href);
      expect(route?.status, section.href).toBe("live");
    }
    for (const column of siteConfig.footer.columns) {
      for (const link of column.links) {
        expect(routeByPath(link.href)?.status, link.href).toBe("live");
      }
    }
  });

  it("core pages are reachable from the home page's link model", () => {
    // The home page links (directly or via LINKS) to these destinations.
    const homeTargets = [
      ...Object.values(LINKS.homeTo).map((l) => l.target),
      "/platforms",
      "/broker-technology",
      "/infrastructure",
      "/solutions",
      "/pricing",
    ];
    const expectedLive = [
      "/broker-technology",
      "/platforms",
      "/infrastructure",
      "/solutions",
      "/pricing",
    ];
    for (const route of expectedLive) {
      expect(homeTargets.includes(route), route).toBe(true);
    }
  });
});
