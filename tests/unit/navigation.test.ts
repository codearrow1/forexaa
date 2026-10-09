import { describe, it, expect } from "vitest";
import { NAV_SECTIONS } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { SECTION_MENUS, MOBILE_MENU } from "@/config/menus";
import { routeByPath } from "@/config/seo/routes";

/**
 * Navigation data integrity (Rule 6: single source of truth, Phase 3).
 * Every link in nav / mega-menu / mobile / footer must resolve to a known
 * registry route.
 */
describe("navigation data integrity", () => {
  it("every primary nav section points to a known registry route", () => {
    for (const section of NAV_SECTIONS) {
      expect(routeByPath(section.href), section.href).toBeDefined();
    }
  });

  it("every mega-menu link points to a live registry route", () => {
    for (const menu of SECTION_MENUS) {
      expect(routeByPath(menu.href), menu.href).toBeDefined();
      for (const group of menu.groups) {
        for (const link of group.links) {
          const route = routeByPath(link.href);
          expect(route, link.href).toBeDefined();
          expect(route!.status, `${link.href} must be live`).toBe("live");
        }
      }
    }
  });

  it("every mobile menu link points to a live registry route", () => {
    for (const item of MOBILE_MENU) {
      const route = routeByPath(item.href);
      expect(route, item.href).toBeDefined();
      expect(route!.status).toBe("live");
    }
  });

  it("every footer column + legal link points to a live registry route", () => {
    for (const column of siteConfig.footer.columns) {
      for (const link of column.links) {
        const route = routeByPath(link.href);
        expect(route, link.href).toBeDefined();
        expect(route!.status, `${link.href} must be live`).toBe("live");
      }
    }
    for (const link of siteConfig.footer.legal) {
      expect(routeByPath(link.href)?.status, link.href).toBe("live");
    }
  });

  it("the canonical brand string is FOREXAA", () => {
    expect(siteConfig.name).toBe("FOREXAA");
  });
});
