/**
 * Launch check (Phase 11) — the single authoritative launch gate.
 *
 *   npm run launch:check
 *
 * Orchestrates the existing checks plus the production preflight and reports
 * a categorized PASS / WARNING / BLOCKER result. It is a VERIFICATION tool:
 * it never sends email, never migrates or mutates a database, never deploys.
 *
 * Server-dependent checks (browser:qa, lighthouse) run only when a server is
 * reachable at QA_BASE / LHCI_BASE; otherwise they are reported as SKIP.
 */
import { spawn } from "node:child_process";
import process from "node:process";

const BASE = process.env.QA_BASE ?? "http://localhost:3211";

function run(cmd, args = []) {
  return new Promise((resolve) => {
    const child = spawn(cmd, args, { shell: process.platform === "win32", stdio: "ignore" });
    child.on("close", (code) => resolve(code ?? 1));
  });
}

async function serverUp() {
  try {
    const res = await fetch(`${BASE}/health`, { signal: AbortSignal.timeout(3000) });
    return res.ok;
  } catch {
    return false;
  }
}

/** [category, label, npmScript, needsServer] */
const CHECKS = [
  ["CODE", "typecheck", "typecheck", false],
  ["CODE", "lint", "lint", false],
  ["CODE", "tests", "test", false],
  ["CODE", "build", "build", false],
  ["SECURITY", "security headers", "verify:headers", false],
  ["SEO", "seo:check", "seo:check", false],
  ["BROWSER QA", "browser:qa", "browser:qa", true],
  ["PERFORMANCE", "lighthouse", "lighthouse", true],
  ["OWNER INFRASTRUCTURE", "verify:production", "verify:production", false],
  ["OWNER INFRASTRUCTURE", "production:preflight", "production:preflight", false],
  ["SECURITY", "runtime dependency audit", null, false], // npm audit --omit=dev
  ["SECURITY", "full dependency audit", null, false], // npm audit
];

const up = await serverUp();
const rows = [];

for (const [category, label, script, needsServer] of CHECKS) {
  if (needsServer && !up) {
    rows.push({ category, label, status: "SKIP", detail: `no server at ${BASE}` });
    continue;
  }
  let code;
  if (script) {
    code = await run("npm", ["run", script]);
  } else if (label === "runtime dependency audit") {
    code = await run("npm", ["audit", "--omit=dev"]);
  } else {
    code = await run("npm", ["audit"]);
  }
  // The full `npm audit` includes the dev/build toolchain. Non-runtime
  // advisories are a WARNING (documented), not a code/security blocker.
  // Only a runtime vulnerability is a hard fail.
  const isFullAudit = label === "full dependency audit";
  const status = code === 0 ? "PASS" : isFullAudit ? "WARN" : "FAIL";
  rows.push({
    category,
    label,
    status,
    detail: code === 0 ? "ok" : `exit ${code}`,
  });
}

// --- report --------------------------------------------------------------
console.log("\nFOREXAA PRODUCTION LAUNCH CHECK\n" + "-".repeat(34) + "\n");

const categories = ["CODE", "SECURITY", "SEO", "BROWSER QA", "PERFORMANCE", "OWNER INFRASTRUCTURE", "OWNER CONTENT/LEGAL", "MANUAL QA"];
for (const cat of categories) {
  const items = rows.filter((r) => r.category === cat);
  if (items.length === 0) continue;
  console.log(cat);
  for (const r of items) {
    console.log(`  ${r.status.padEnd(4)} ${r.label}${r.detail !== "ok" ? ` (${r.detail})` : ""}`);
  }
  console.log("");
}

// Owner content / legal + manual QA are not automated here; report as WARNING.
console.log("OWNER CONTENT/LEGAL");
console.log("  WARN  Search Console, privacy approval, screenshots, partners (owner-gated)\n");
console.log("MANUAL QA");
console.log("  WARN  real-device visual review, hover/animation quality (owner-gated)\n");

const hardFails = rows.filter((r) => r.status === "FAIL");
const codeFails = hardFails.filter((r) => r.category === "CODE" || r.category === "SECURITY");
const ownerInfra = hardFails.filter((r) => r.category === "OWNER INFRASTRUCTURE");

console.log("FINAL STATUS");
if (codeFails.length > 0) {
  console.log("NOT READY FOR ACTIVATION");
  console.log(`REASON: code/security blocker(s): ${codeFails.map((r) => r.label).join(", ")}`);
} else if (ownerInfra.length > 0) {
  console.log("READY FOR ACTIVATION — OWNER ACTIONS REQUIRED");
  console.log(`REASON: owner infrastructure: ${ownerInfra.map((r) => r.label).join(", ")}`);
} else {
  console.log("READY FOR ACTIVATION");
}
console.log("\nThis is a verification tool — it never sends email, migrates a database, or deploys.");

process.exitCode = codeFails.length > 0 ? 1 : 0;
