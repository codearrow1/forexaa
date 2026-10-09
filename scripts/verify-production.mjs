/**
 * FOREXAA PRODUCTION READINESS GATE (Phase 6 Rule 17-18).
 *
 *   npm run verify:production
 *   npm run verify:production-config   (env/config checks only, faster)
 *
 * Prints PASS / WARNING / BLOCKER per check and exits non-zero when any
 * BLOCKER exists. NEVER prints secret values — only presence.
 *
 * This gate checks environment/infrastructure readiness. Structural checks
 * (security headers/CSP, sitemap, robots, canonicals, claims, indexation) are
 * enforced by `npm run verify:headers` and `npm run seo:check`.
 */
import { readFileSync, existsSync } from "node:fs";
import process from "node:process";

const configOnly = process.argv.includes("--config-only");

const results = [];
// `class` distinguishes who must act:
//   CODE                 — fixable inside the repository
//   OWNER INFRASTRUCTURE — requires the owner's infrastructure (no values invented here)
//   OWNER CONTENT/LEGAL  — requires owner-supplied content, legal review or external verification
const add = (check, status, detail, cls = "CODE") =>
  results.push({ check, status, detail, cls });

// --- helpers (never print secret values) -------------------------------
const envFiles = [".env.local", ".env"].filter((f) => existsSync(f));
function isConfigured(name) {
  if (process.env[name] && process.env[name].trim()) return true;
  for (const f of envFiles) {
    const text = readFileSync(f, "utf8");
    if (new RegExp(`^\\s*${name}\\s=`, "m").test(text)) return true;
  }
  return false;
}
const has = (n) => isConfigured(n);
const label = (n) => (has(n) ? "configured" : "not set");

// --- 1. Next.js patched -------------------------------------------------
let nextVersion = "unknown";
try {
  nextVersion = JSON.parse(
    readFileSync("node_modules/next/package.json", "utf8"),
  ).version;
} catch {}
const patched = nextVersion.localeCompare("16.3.8") >= 0;
add("Next.js patched (>= 16.3.8)", patched ? "PASS" : "BLOCKER", `installed ${nextVersion}`, "CODE");

// --- 2. production env ---------------------------------------------------
const nodeEnv = process.env.NODE_ENV || "development";
add(
  "Production environment",
  nodeEnv === "production" ? "PASS" : "WARNING",
  `NODE_ENV=${nodeEnv} (a dev build is not production-ready)`,
  "OWNER INFRASTRUCTURE",
);

// --- 3. required production infrastructure ------------------------------
add(
  "Persistent lead storage (DATABASE_URL)",
  has("DATABASE_URL") ? "PASS" : "BLOCKER",
  label("DATABASE_URL"),
  "OWNER INFRASTRUCTURE",
);
add(
  "Shared rate-limit backend (RATE_LIMIT_URL + RATE_LIMIT_TOKEN)",
  has("RATE_LIMIT_URL") && has("RATE_LIMIT_TOKEN") ? "PASS" : "BLOCKER",
  `${label("RATE_LIMIT_URL")} / ${label("RATE_LIMIT_TOKEN")}`,
  "OWNER INFRASTRUCTURE",
);
add(
  "Live email (SMTP_HOST + SMTP_USER + SMTP_PASSWORD + SMTP_FROM)",
  has("SMTP_HOST") && has("SMTP_USER") && has("SMTP_PASSWORD") && has("SMTP_FROM")
    ? "PASS"
    : "BLOCKER",
  "SMTP credentials must be set for real delivery",
  "OWNER INFRASTRUCTURE",
);
add("Sales inbox (SALES_EMAIL)", has("SALES_EMAIL") ? "PASS" : "WARNING", label("SALES_EMAIL"), "OWNER INFRASTRUCTURE");
add(
  "Site origin (NEXT_PUBLIC_SITE_URL)",
  has("NEXT_PUBLIC_SITE_URL") ? "PASS" : "BLOCKER",
  label("NEXT_PUBLIC_SITE_URL"),
  "OWNER INFRASTRUCTURE",
);

// --- 4. optional (informational) ----------------------------------------
add(
  "Search Console verification (GOOGLE_SITE_VERIFICATION)",
  has("GOOGLE_SITE_VERIFICATION") ? "PASS" : "WARNING",
  has("GOOGLE_SITE_VERIFICATION") ? "meta tag will render" : "not committed (verify manually first)",
  "OWNER CONTENT/LEGAL",
);

// --- 5. build present ----------------------------------------------------
if (!configOnly) {
  add(
    "Production build present (.next)",
    existsSync(".next") ? "PASS" : "BLOCKER",
    existsSync(".next") ? "run `npm run build` before start" : "run `npm run build`",
  );
}

// --- 6. tracked-secret scan --------------------------------------------
if (!configOnly) {
  const { execSync } = await import("node:child_process");
  let tracked = "";
  try {
    tracked = execSync("git ls-files", { encoding: "utf8" });
  } catch {
    tracked = "";
  }
  const lines = tracked.split("\n").filter(Boolean);
  const hits = lines.filter(
    (l) =>
      l.startsWith(".env") ||
      /\.(pem|key|p12|pfx|jks)$/i.test(l) ||
      /id_rsa/.test(l),
  );
  add(
    "No secret files tracked in git",
    hits.length === 0 ? "PASS" : "BLOCKER",
    hits.length === 0 ? "clean" : `tracked: ${hits.slice(0, 5).join(", ")}`,
  );
}

// --- 7. dependency security: runtime vs dev/build toolchain ---------------
// `npm audit --omit=dev` = what actually ships to the browser/server runtime.
// Full `npm audit` also includes the dev/build toolchain (eslint, etc.),
// which is tracked separately and must not be hidden.
let runtimeVulns = -1;
let fullVulns = -1;
if (!configOnly) {
  const { execSync } = await import("node:child_process");
  const auditJson = (args) => {
    try {
      const out = execSync(`npm audit ${args} --json`, {
        encoding: "utf8",
        stdio: ["ignore", "pipe", "pipe"],
      });
      return JSON.parse(out);
    } catch (error) {
      if (error.stdout) {
        try {
          return JSON.parse(error.stdout);
        } catch {
          /* fall through */
        }
      }
      return null;
    }
  };
  const runtime = auditJson("--omit=dev");
  const full = auditJson("");
  runtimeVulns = runtime?.metadata?.vulnerabilities?.total ?? -1;
  fullVulns = full?.metadata?.vulnerabilities?.total ?? -1;
  add(
    "Runtime dependencies (npm audit --omit=dev)",
    runtimeVulns === 0 ? "PASS" : "BLOCKER",
    runtimeVulns === 0
      ? "0 runtime vulnerabilities"
      : `${runtimeVulns} runtime vulnerability(ies) — must be fixed before launch`,
    "CODE",
  );
  add(
    "Dev/build toolchain (npm audit, full)",
    fullVulns === 0 ? "PASS" : "WARNING",
    fullVulns === 0
      ? "0 vulnerabilities"
      : `${fullVulns} advisory(ies) in dev/build toolchain (non-runtime; see docs/security/PHASE-9-DEPENDENCY-AUDIT.md)`,
    "CODE",
  );
}

// --- report -------------------------------------------------------------
console.log("\nFOREXAA PRODUCTION READINESS\n");
for (const r of results) {
  console.log(`  [${r.cls}] ${r.status.padEnd(7)} ${r.check} — ${r.detail}`);
}

const blockers = results.filter((r) => r.status === "BLOCKER");
const warnings = results.filter((r) => r.status === "WARNING");
const byClass = (items, cls) => items.filter((r) => r.cls === cls);
console.log("\nSummary:");
console.log(
  `  CODE issues:                ${blockers.filter((r) => r.cls === "CODE").length} blocker(s), ${warnings.filter((r) => r.cls === "CODE").length} warning(s)`,
);
console.log(
  `  OWNER INFRASTRUCTURE:       ${byClass(blockers, "OWNER INFRASTRUCTURE").length} blocker(s), ${byClass(warnings, "OWNER INFRASTRUCTURE").length} warning(s) — owner-supplied values required; none are invented by this gate`,
);
console.log(
  `  OWNER CONTENT/LEGAL:        ${byClass(blockers, "OWNER CONTENT/LEGAL").length} blocker(s), ${byClass(warnings, "OWNER CONTENT/LEGAL").length} warning(s)`,
);
console.log(
  `  Dependency security:        runtime ${runtimeVulns === 0 ? "clean" : runtimeVulns + " BLOCKER(s)"}; dev/build toolchain ${fullVulns === 0 ? "clean" : fullVulns + " advisory(ies) (non-runtime, documented)"}`,
);
console.log(
  `\nTotal: ${blockers.length} blocker(s), ${warnings.length} warning(s). Blockers keep this gate red on purpose — they are mandatory launch dependencies, not code defects to paper over.`,
);
console.log(
  `Also run: \`npm run verify:headers\` and \`npm run seo:check\` for structural security/SEO gates.\n`,
);

process.exitCode = blockers.length > 0 ? 1 : 0;
