/**
 * Lighthouse CI (Phase 7 Rule 19). Runs Lighthouse on the key routes and
 * checks realistic performance budgets. Does NOT require arbitrary 100/100.
 *
 *   npm run lighthouse            # requires a running server on LHCI_BASE
 *   LHCI_BASE=http://localhost:3211 npm run lighthouse
 *   LHCI_EVIDENCE_DIR=docs/performance/evidence npm run lighthouse   # keep JSON
 *
 * Methodology: mobile form factor (375x667, Moto G9-class CPU/network
 * simulation) to match the Phase 7 measurement baseline. Reports keep the
 * real, unmodified pages — no UA sniffing, no audit-only HTML.
 *
 * Exits non-zero if a hard budget (SEO or Accessibility) is missed, or if the
 * LCP/CLS/TBT budgets are exceeded on the routes below. Warns (non-fatal) on
 * performance score below the soft threshold.
 */
import { spawn } from "node:child_process";
import { mkdtemp, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import process from "node:process";

const BASE = process.env.LHCI_BASE ?? "http://localhost:3211";
/** When set (e.g. docs/performance/evidence), full Lighthouse JSON reports are
 *  kept for post-mortem; otherwise they are discarded after parsing. */
const EVIDENCE_DIR = process.env.LHCI_EVIDENCE_DIR ?? null;

const ROUTES = [
  "/",
  "/solutions",
  "/solutions/new-brokerage",
  "/solutions/existing-broker",
  "/solutions/prop-firm",
  "/solutions/multi-asset",
  "/broker-technology/crm",
  "/broker-technology/traders-room",
  "/broker-technology/back-office",
  "/platforms/mt4-mt5",
  "/platforms",
  "/pricing",
  "/infrastructure/liquidity",
  "/services/white-label",
  "/contact",
];

// Realistic budgets.
const LCP_MS = 2500;
const CLS = 0.1;
const TBT_MS = 150;
const A11Y = 0.95;
const SEO = 1.0;
const PERF_SOFT = 0.9; // soft; warns only

function runLighthouse(url, outPath) {
  return new Promise((resolve, reject) => {
    const args = [
      "-y",
      "lighthouse@12",
      url,
      "--chrome-flags=--headless=new --no-sandbox --disable-gpu",
      "--form-factor=mobile",
      "--only-categories=performance,accessibility,best-practices,seo",
      "--output=json",
      `--output-path=${outPath}`,
      "--quiet",
    ];
    const child = spawn("npx", args, { stdio: "ignore", shell: process.platform === "win32" });
    child.on("close", (code) => (code === 0 ? resolve() : reject(new Error(`lighthouse ${code}`))));
    child.on("error", reject);
  });
}

/** Extract the LCP element selector / label for audit evidence. Read-only.
 *  Reads the `largest-contentful-paint-element` audit (list of tables:
 *  [0]=element table (items[].node), [1]=phase breakdown). */
function extractLcpElement(report) {
  const details = report?.audits?.["largest-contentful-paint-element"]?.details;
  if (!details || !Array.isArray(details.items)) return "(n/a)";
  const elementTable = details.items[0];
  const node = elementTable?.items?.[0]?.node;
  if (!node) return "(n/a)";
  const label = (node.nodeLabel ?? node.snippet ?? "").slice(0, 40);
  return `${node.selector ?? "(no selector)"} [${label}]`;
}

const tmp = await mkdtemp(path.join(os.tmpdir(), "lhci-"));
const rows = [];
let hardFail = 0;
let softWarn = 0;

for (const route of ROUTES) {
  const out = path.join(tmp, `lh-${route.replace(/[^a-z0-9]/gi, "_")}.json`);
  try {
    // One retry on flaky runs (documented repeatability policy, §26 of the
    // Phase 8 spec): a single failed headless run must not gate the gate.
    try {
      await runLighthouse(`${BASE}${route}`, out);
    } catch {
      await runLighthouse(`${BASE}${route}`, out);
    }
    const fs = await import("node:fs");
    const j = JSON.parse(fs.readFileSync(out, "utf8"));
    const perf = Math.round(j.categories.performance.score * 100);
    const a11y = Math.round(j.categories.accessibility.score * 100);
    const seo = Math.round(j.categories.seo.score * 100);
    const lcp = j.audits["largest-contentful-paint"].numericValue ?? 0;
    const tbt = j.audits["total-blocking-time"].numericValue ?? 0;
    const cls = j.audits["cumulative-layout-shift"].numericValue ?? 0;

    // LCP element evidence (for the audit trail — not a score input).
    const lcpElement = extractLcpElement(j);

    // Optionally retain the full report for post-mortem (LHCI_EVIDENCE_DIR).
    if (EVIDENCE_DIR) {
      const fs = await import("node:fs");
      fs.mkdirSync(EVIDENCE_DIR, { recursive: true });
      const retained = path.join(EVIDENCE_DIR, `lh-${route.replace(/[^a-z0-9]/gi, "_")}.json`);
      fs.copyFileSync(out, retained);
    }

    const problems = [];
    if (lcp > LCP_MS) problems.push(`LCP ${(lcp / 1000).toFixed(1)}s > ${LCP_MS / 1000}s`);
    if (cls > CLS) problems.push(`CLS ${cls} > ${CLS}`);
    if (tbt > TBT_MS) problems.push(`TBT ${Math.round(tbt)}ms > ${TBT_MS}ms`);
    if (j.categories.accessibility.score < A11Y) {
      problems.push(`a11y ${a11y} < ${Math.round(A11Y * 100)}`);
      hardFail++;
    }
    if (j.categories.seo.score < SEO) {
      problems.push(`seo ${seo} < 100`);
      hardFail++;
    }
    if (j.categories.performance.score < PERF_SOFT) softWarn++;

    rows.push({ route, perf, a11y, seo, lcp: `${(lcp / 1000).toFixed(1)}s`, tbt: `${Math.round(tbt)}ms`, cls, lcpElement, problems });
  } catch (error) {
    rows.push({ route, perf: "?", a11y: "?", seo: "?", lcp: "?", tbt: "?", cls: "?", problems: [`run failed: ${error.message}`] });
    hardFail++;
  }
}

await rm(tmp, { recursive: true, force: true });

console.log("\nLighthouse CI (realistic budgets)\n");
const head = "route".padEnd(28), cols = "perf a11y seo  lcp    tbt   cls  lcp-element".split(" ");
console.log("  " + head + cols.join(" "));
for (const r of rows) {
  console.log(
    `  ${r.route.padEnd(28)}${String(r.perf).padEnd(4)}${String(r.a11y).padEnd(4)}${String(r.seo).padEnd(4)}${String(r.lcp).padEnd(6)}${String(r.tbt).padEnd(5)}${String(r.cls).padEnd(5)}  ${String(r.lcpElement ?? "(n/a)")}  ${r.problems.length ? " ⚠ " + r.problems.join("; ") : " ok"}`,
  );
}
console.log(`\nHard budget failures: ${hardFail}; soft perf warns: ${softWarn}.`);
await process.exit(hardFail > 0 ? 1 : 0);
