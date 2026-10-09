/**
 * Production preflight (Phase 11).
 *
 *   npm run production:preflight
 *
 * Validates configuration WITHOUT revealing secrets. For every secret, only
 * SET / MISSING / MALFORMED is reported — never the value.
 *
 * Classifies each check as PASS / WARNING / BLOCKER and tags it:
 *   CODE                 — fixable inside the repository
 *   OWNER INFRASTRUCTURE — owner-supplied infrastructure (never invented here)
 *   OWNER CONTENT/LEGAL  — owner-supplied content / legal / verification
 *   CONFIGURATION        — environment / mode
 *
 * This is a VERIFICATION tool. It never sends email, never migrates or mutates
 * a database, never changes rate-limit state, and never deploys.
 */
import { readFileSync, existsSync } from "node:fs";
import process from "node:process";

const results = [];
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

/** Report a secret's presence + basic shape without ever printing it. */
function checkSecret(name, { https = false } = {}) {
  const raw = process.env[name]?.trim();
  if (!raw) return { status: "MISSING", detail: "not set" };
  if (https) {
    try {
      const u = new URL(raw);
      if (u.protocol !== "https:") return { status: "MALFORMED", detail: "must be https" };
      if (!u.hostname) return { status: "MALFORMED", detail: "no host" };
    } catch {
      return { status: "MALFORMED", detail: "not a valid URL" };
    }
  }
  return { status: "SET", detail: "present" };
}

/** Validate a postgres DSN's shape without logging it. */
function checkDatabaseUrl() {
  const raw = process.env.DATABASE_URL?.trim();
  if (!raw) return { status: "MISSING", detail: "not set" };
  try {
    const u = new URL(raw);
    if (u.protocol !== "postgres:" && u.protocol !== "postgresql:") {
      return { status: "MALFORMED", detail: "scheme must be postgres:// or postgresql://" };
    }
    if (!u.hostname) return { status: "MALFORMED", detail: "no host" };
    if (u.searchParams.has("password") || u.password) {
      // A password in the DSN is expected; just confirm it is non-empty.
      if (!u.password) return { status: "MALFORMED", detail: "empty password" };
    }
    return { status: "SET", detail: "valid postgres DSN" };
  } catch {
    return { status: "MALFORMED", detail: "not a valid URL" };
  }
}

/** Validate an email address's shape without logging it. */
function checkEmail(name) {
  const raw = process.env[name]?.trim();
  if (!raw) return { status: "MISSING", detail: "not set" };
  // Pragmatic RFC-5322-ish shape check; never print the address.
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(raw)) {
    return { status: "MALFORMED", detail: "not a valid email address" };
  }
  return { status: "SET", detail: "valid email" };
}

// --- 1. environment mode -------------------------------------------------
const nodeEnv = process.env.NODE_ENV || "development";
add(
  "Environment mode",
  nodeEnv === "production" ? "PASS" : "WARNING",
  `NODE_ENV=${nodeEnv}${nodeEnv !== "production" ? " (development defaults are not production-ready)" : ""}`,
  "CONFIGURATION",
);

// --- 2. Next.js version -------------------------------------------------
let nextVersion = "unknown";
try {
  nextVersion = JSON.parse(readFileSync("node_modules/next/package.json", "utf8")).version;
} catch {}
const patched = nextVersion.localeCompare("16.3.8") >= 0;
add(
  "Next.js patched (>= 16.3.8)",
  patched ? "PASS" : "BLOCKER",
  `installed ${nextVersion}`,
);

// --- 3. site URL ---------------------------------------------------------
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
if (!siteUrl) {
  add("Site origin (NEXT_PUBLIC_SITE_URL)", "BLOCKER", "not set", "OWNER INFRASTRUCTURE");
} else {
  try {
    const u = new URL(siteUrl);
    const isLocal = /^(localhost|127\.0\.0\.1|\[::1\])$/.test(u.hostname);
    if (nodeEnv === "production" && u.protocol !== "https:") {
      add("Site origin (NEXT_PUBLIC_SITE_URL)", "BLOCKER", "must be https in production", "OWNER INFRASTRUCTURE");
    } else if (nodeEnv === "production" && isLocal) {
      add("Site origin (NEXT_PUBLIC_SITE_URL)", "BLOCKER", "must be a production hostname (not localhost)", "OWNER INFRASTRUCTURE");
    } else if (u.pathname.replace(/\/+$/, "")) {
      add("Site origin (NEXT_PUBLIC_SITE_URL)", "WARNING", "has a trailing path; canonicals will include it", "OWNER INFRASTRUCTURE");
    } else {
      add("Site origin (NEXT_PUBLIC_SITE_URL)", "PASS", "valid absolute https origin", "OWNER INFRASTRUCTURE");
    }
  } catch {
    add("Site origin (NEXT_PUBLIC_SITE_URL)", "BLOCKER", "not a valid URL", "OWNER INFRASTRUCTURE");
  }
}

// --- 4. database ---------------------------------------------------------
const db = checkDatabaseUrl();
add(
  "Persistent lead storage (DATABASE_URL)",
  db.status === "SET" ? "PASS" : "BLOCKER",
  db.detail,
  "OWNER INFRASTRUCTURE",
);

// --- 5. shared rate limiter ----------------------------------------------
const rlUrl = checkSecret("RATE_LIMIT_URL", { https: true });
const rlToken = checkSecret("RATE_LIMIT_TOKEN");
const rlReady = rlUrl.status === "SET" && rlToken.status === "SET";
add(
  "Shared rate-limit backend (RATE_LIMIT_URL + RATE_LIMIT_TOKEN)",
  rlReady ? "PASS" : "BLOCKER",
  `${rlUrl.status === "SET" ? "url SET" : `url ${rlUrl.status}`} / ${rlToken.status === "SET" ? "token SET" : `token ${rlToken.status}`}`,
  "OWNER INFRASTRUCTURE",
);

// --- 6. SMTP -------------------------------------------------------------
const smtpFields = ["SMTP_HOST", "SMTP_USER", "SMTP_PASSWORD", "SMTP_FROM"];
const smtpStatuses = smtpFields.map((f) => ({ f, r: checkSecret(f) }));
const smtpMissing = smtpStatuses.filter((s) => s.r.status === "MISSING");
const smtpMalformed = smtpStatuses.filter((s) => s.r.status === "MALFORMED");
if (smtpMissing.length > 0) {
  add(
    "Live email (SMTP_HOST + SMTP_USER + SMTP_PASSWORD + SMTP_FROM)",
    "BLOCKER",
    `missing: ${smtpMissing.map((s) => s.f).join(", ")}`,
    "OWNER INFRASTRUCTURE",
  );
} else if (smtpMalformed.length > 0) {
  add(
    "Live email (SMTP_HOST + SMTP_USER + SMTP_PASSWORD + SMTP_FROM)",
    "BLOCKER",
    `malformed: ${smtpMalformed.map((s) => s.f).join(", ")}`,
    "OWNER INFRASTRUCTURE",
  );
} else {
  add(
    "Live email (SMTP_HOST + SMTP_USER + SMTP_PASSWORD + SMTP_FROM)",
    "PASS",
    "all SMTP fields present",
    "OWNER INFRASTRUCTURE",
  );
}

// --- 7. sales email ------------------------------------------------------
const sales = checkEmail("SALES_EMAIL");
add(
  "Sales inbox (SALES_EMAIL)",
  sales.status === "SET" ? "PASS" : "WARNING",
  sales.detail,
  "OWNER INFRASTRUCTURE",
);

// --- 8. Search Console ---------------------------------------------------
add(
  "Search Console verification (GOOGLE_SITE_VERIFICATION)",
  has("GOOGLE_SITE_VERIFICATION") ? "PASS" : "WARNING",
  has("GOOGLE_SITE_VERIFICATION") ? "meta tag will render" : "not committed (verify manually first)",
  "OWNER CONTENT/LEGAL",
);

// --- 9. dependency security ----------------------------------------------
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
const runtimeVulns = runtime?.metadata?.vulnerabilities?.total ?? -1;
const fullVulns = full?.metadata?.vulnerabilities?.total ?? -1;
add(
  "Runtime dependencies (npm audit --omit=dev)",
  runtimeVulns === 0 ? "PASS" : "BLOCKER",
  runtimeVulns === 0 ? "0 runtime vulnerabilities" : `${runtimeVulns} runtime vulnerability(ies)`,
);
add(
  "Dev/build toolchain (npm audit, full)",
  fullVulns === 0 ? "PASS" : "WARNING",
  fullVulns === 0 ? "0 vulnerabilities" : `${fullVulns} advisory(ies) in dev/build toolchain (non-runtime)`,
);

// --- report --------------------------------------------------------------
console.log("\nFOREXAA PRODUCTION PREFLIGHT\n");
for (const r of results) {
  console.log(`  [${r.cls}] ${r.status.padEnd(7)} ${r.check} — ${r.detail}`);
}

const blockers = results.filter((r) => r.status === "BLOCKER");
const warnings = results.filter((r) => r.status === "WARNING");
const byClass = (items, cls) => items.filter((r) => r.cls === cls);
console.log("\nSummary:");
console.log(
  `  CODE:                 ${blockers.filter((r) => r.cls === "CODE").length} blocker(s), ${warnings.filter((r) => r.cls === "CODE").length} warning(s)`,
);
console.log(
  `  CONFIGURATION:        ${byClass(blockers, "CONFIGURATION").length} blocker(s), ${byClass(warnings, "CONFIGURATION").length} warning(s)`,
);
console.log(
  `  OWNER INFRASTRUCTURE: ${byClass(blockers, "OWNER INFRASTRUCTURE").length} blocker(s), ${byClass(warnings, "OWNER INFRASTRUCTURE").length} warning(s) — owner-supplied values required; none are invented by this gate`,
);
console.log(
  `  OWNER CONTENT/LEGAL:  ${byClass(blockers, "OWNER CONTENT/LEGAL").length} blocker(s), ${byClass(warnings, "OWNER CONTENT/LEGAL").length} warning(s)`,
);
console.log(
  `\nTotal: ${blockers.length} blocker(s), ${warnings.length} warning(s). This is a verification tool — it never sends email, migrates a database, or deploys.`,
);

process.exitCode = blockers.length > 0 ? 1 : 0;
