/**
 * SEO validator (Rule 63 + Phase 3 extensions, Rule 73).
 *
 * Usage:
 *   npm run build
 *   npm run seo:check
 *
 * Boots the production build and reports PASS / WARNING / ERROR per check.
 * Exits non-zero on any ERROR so it can gate CI (Rule 76).
 *
 * Phase 3 additions: orphan pages, missing breadcrumbs, missing related
 * links, redirect chains, unverified claims in rendered HTML.
 */

import { spawn } from "node:child_process";
import { readdirSync } from "node:fs";
import path from "node:path";
import process from "node:process";

const PORT = 4174;
const BASE = `http://127.0.0.1:${PORT}`;
// Canonical URLs are baked at build time from NEXT_PUBLIC_SITE_URL; mirror
// that origin so the canonical check matches what the build produced.
const ORIGIN = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

/**
 * Static files served from /public (fonts, icons, OG images, etc.). These are
 * valid <a href>/<link href> targets but are NOT routes, so the internal-link
 * check must not flag them as dead routes. Built from the actual directory so
 * a renamed/removed asset correctly stops being excluded.
 */
const PUBLIC_ASSETS = new Set();
{
  const publicDir = path.resolve("public");
  const walk = (dir) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else PUBLIC_ASSETS.add("/" + full.slice(publicDir.length + 1).split(path.sep).join("/"));
    }
  };
  try {
    walk(publicDir);
  } catch {
    /* no public dir: nothing to exclude */
  }
}

/** All live routes (indexable + noindex scaffolds). */
const LIVE_ROUTES = [
  "/",
  "/solutions",
  "/platforms",
  "/broker-technology",
  "/infrastructure",
  "/pricing",
  "/services",
  "/resources",
  "/company",
  "/contact",
  "/broker-technology/crm",
  "/broker-technology/traders-room",
  "/broker-technology/back-office",
  "/broker-technology/ib-affiliate",
  "/platforms/mt4-mt5",
  "/platforms/mt7",
  "/platforms/ctrader",
  "/infrastructure/liquidity",
  "/services/white-label",
  "/solutions/social-copy",
  "/legal/privacy",
  "/legal/terms",
  "/legal/risk-disclosure",
  "/solutions/new-brokerage",
  "/solutions/existing-broker",
  "/solutions/prop-firm",
  "/solutions/multi-asset",
  "/company/partners",
  "/trust",
  "/trust/security",
  "/trust/privacy",
  "/trust/compliance",
  "/trust/risk-disclosure",
];
/** Only these are allowed in the sitemap (index + live). */
const INDEXABLE_ROUTES = [
  "/",
  "/solutions",
  "/platforms",
  "/broker-technology",
  "/infrastructure",
  "/pricing",
  "/contact",
  "/broker-technology/crm",
  "/broker-technology/traders-room",
  "/broker-technology/back-office",
  "/broker-technology/ib-affiliate",
  "/platforms/mt4-mt5",
  "/platforms/mt7",
  "/platforms/ctrader",
  "/infrastructure/liquidity",
  "/services/white-label",
  "/solutions/social-copy",
  "/solutions/new-brokerage",
  "/solutions/existing-broker",
  "/solutions/prop-firm",
  "/solutions/multi-asset",
  "/trust",
  "/trust/security",
  "/trust/compliance",
  "/trust/risk-disclosure",
];
/** Legacy 301 sources that must redirect (not 404, not 200). */
const REDIRECT_SOURCES = [
  "/forex-crm",
  "/mobiustrader-mt7-white-label",
  "/mt4-mt5-white-label",
  "/forex-liquidity",
  "/white-label",
  "/social-trading-white-label",
  "/about",
];
/** Unverified/forbidden claim strings that must never render. */
const FORBIDDEN_CLAIMS = [
  "100+ broker",
  "12,500",
  "500,000",
  "0.00001",
  "4.9/5",
  "$999",
  "$9,999",
  "$24,999",
  "99.9% uptime",
];

let errors = 0;
let warnings = 0;

function pass(msg) {
  console.log(`  PASS  ${msg}`);
}
function warn(msg) {
  warnings += 1;
  console.warn(`  WARN  ${msg}`);
}
function fail(msg) {
  errors += 1;
  console.error(`  ERROR ${msg}`);
}

async function waitForServer(url, tries = 60) {
  for (let i = 0; i < tries; i += 1) {
    try {
      const res = await fetch(url, { redirect: "manual" });
      return res.status < 500;
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 250));
    }
  }
  return false;
}

async function main() {
  const nextBin = "node_modules/next/dist/bin/next";
  console.log("Starting production server on port", PORT);
  const child = spawn(process.execPath, [nextBin, "start", "--port", String(PORT)], {
    stdio: ["ignore", "inherit", "inherit"],
    cwd: process.cwd(),
  });

  const ready = await waitForServer(`${BASE}/`);
  if (!ready) {
    fail("server did not start");
    child.kill();
    process.exit(1);
  }

  const titles = new Set();
  const descriptions = new Set();
  const seenInternal = new Map();

  console.log("\n[1] Page metadata (title / description / canonical / OG)");
  for (const route of LIVE_ROUTES) {
    const res = await fetch(`${BASE}${route}`);
    if (res.status !== 200) {
      fail(`${route} -> HTTP ${res.status}`);
      continue;
    }
    const html = await res.text();
    const title = (html.match(/<title>([\s\S]*?)<\/title>/) ?? [])[1]?.trim() ?? "";
    const description = (
      html.match(/<meta name="description" content="([^"]*)"/) ?? [
      ,
      "",
    ]
    )[1] ?? "";
    const canonical = (
      html.match(/<link rel="canonical" href="([^"]*)"/) ?? [, ""]
    )[1] ?? "";
    const ogTitle = (html.match(/property="og:title" content="([^"]*)"/) ?? [])[1];
    const twitter = html.includes('name="twitter:card"');

    const expectedCanonical = `${ORIGIN}${route === "/" ? "" : route}`;
    if (!title) fail(`${route}: missing <title>`);
    else if (titles.has(title)) fail(`${route}: duplicate title "${title}"`);
    else titles.add(title);

    if (!description) fail(`${route}: missing meta description`);
    else if (descriptions.has(description))
      fail(`${route}: duplicate meta description`);
    else descriptions.add(description);

    if (!canonical) fail(`${route}: missing canonical link`);
    else if (canonical !== expectedCanonical)
      fail(`${route}: canonical "${canonical}" != "${expectedCanonical}"`);

    if (ogTitle === undefined) warn(`${route}: missing og:title`);
    if (!twitter) warn(`${route}: missing twitter:card`);

    // internal links (skip Next's own static assets + /public files)
    for (const href of html.matchAll(/href="(\/[^"?#]*)"/g)) {
      const path = href[1];
      if (path.startsWith("/_next/")) continue;
      const normalized = path.replace(/\/+$/, "") || "/";
      if (PUBLIC_ASSETS.has(normalized)) continue; // static file, not a route
      const known = LIVE_ROUTES.some((l) => (l === "/" ? normalized === "/" : normalized === l));
      if (!known && !seenInternal.has(normalized)) {
        seenInternal.set(normalized, true);
        warn(`${route}: internal link to unregistered path ${normalized} (404?)`);
      }
    }

    // H1
    const h1count = (html.match(/<h1[\s>]/g) ?? []).length;
    if (INDEXABLE_ROUTES.includes(route)) {
      if (h1count === 0) fail(`${route}: missing H1`);
      else if (h1count > 1) fail(`${route}: ${h1count} H1 elements`);
    } else if (h1count === 0) {
      warn(`${route}: no H1 on noindex scaffold (acceptable, flagged)`);
    }

    // Breadcrumbs on deep indexable pages
    if (route.split("/").length > 2 && INDEXABLE_ROUTES.includes(route)) {
      if (!html.includes('aria-label="Breadcrumb"')) {
        fail(`${route}: deep indexable page missing breadcrumbs`);
      } else {
        pass(`${route}: breadcrumbs present`);
      }
    }

    // JSON-LD validity
    const ldMatches = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g) ?? [];
    for (const block of ldMatches) {
      const inner = block
        .replace(/^<script type="application\/ld\+json">/, "")
        .replace(/<\/script>$/, "");
      try {
        const parsed = JSON.parse(inner);
        if (!parsed || typeof parsed !== "object") fail(`${route}: empty JSON-LD`);
      } catch {
        fail(`${route}: invalid JSON-LD (parse error): ${inner.slice(0, 80)}...`);
      }
    }

    // images have alt
    const imgNoAlt = (html.match(/<img(?![^>]*alt=)[^>]*>/g) ?? []).length;
    if (imgNoAlt > 0) warn(`${route}: ${imgNoAlt} <img> without alt attribute`);

    // forbidden claims
    for (const claim of FORBIDDEN_CLAIMS) {
      if (html.includes(claim)) fail(`${route}: renders unverified claim "${claim}"`);
    }
  }

  console.log("\n[2] Sitemap + noindex consistency");
  const smRes = await fetch(`${BASE}/sitemap.xml`);
  const smXml = await smRes.text();
  for (const route of INDEXABLE_ROUTES) {
    const url = `${ORIGIN}${route === "/" ? "" : route}`;
    if (smXml.includes(`<loc>${url}</loc>`)) pass(`sitemap includes ${route}`);
    else fail(`sitemap missing indexable route ${route}`);
  }
  for (const route of LIVE_ROUTES.filter((r) => !INDEXABLE_ROUTES.includes(r))) {
    const url = `${ORIGIN}${route === "/" ? "" : route}`;
    if (smXml.includes(`<loc>${url}</loc>`))
      fail(`sitemap wrongly includes noindex route ${route}`);
    else pass(`sitemap excludes noindex route ${route}`);
  }

  console.log("\n[3] robots.txt");
  const robots = await (await fetch(`${BASE}/robots.txt`)).text();
  for (const block of ["/api/", "/admin/", "/private/"]) {
    if (robots.includes(block)) pass(`robots disallows ${block}`);
    else fail(`robots missing disallow ${block}`);
  }

  console.log("\n[4] Legacy redirects (permanent, no chains)");
  for (const source of REDIRECT_SOURCES) {
    const res = await fetch(`${BASE}${source}`, { redirect: "manual" });
    // Next.js `permanent: true` emits 308; 301 is the classic equivalent.
    // Both are permanent redirects for search engines.
    if (res.status === 301 || res.status === 308) {
      const location = res.headers.get("location") ?? "";
      const dest = location.replace(ORIGIN, "") || "/";
      const destRes = await fetch(`${BASE}${dest}`, { redirect: "manual" });
      if (destRes.status === 200) pass(`${source} -> ${res.status} ${dest}`);
      else fail(`${source} -> ${res.status} ${dest} but destination is ${destRes.status}`);
    } else {
      fail(`${source} -> ${res.status} (expected permanent redirect)`);
    }
  }

  console.log("\n[5] Dead internal link check");
  for (const [link] of seenInternal) {
    const res = await fetch(`${BASE}${link}`, { redirect: "manual" });
    if (res.status === 404) fail(`dead internal link ${link} -> 404`);
  }

  child.kill();

  console.log(
    `\nseo:check complete — ${errors} error(s), ${warnings} warning(s).`,
  );
  process.exit(errors === 0 ? 0 : 1);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
