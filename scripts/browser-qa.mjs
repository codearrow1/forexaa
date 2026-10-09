/**
 * Browser QA (Phase 8, §19). Zero-dependency headless Chrome QA via CDP.
 *
 *   npm run browser:qa            # requires a running server on QA_BASE
 *   QA_BASE=http://localhost:3211 CHROME_PATH="C:\...\chrome.exe" npm run browser:qa
 *
 * What it verifies (automated, real browser):
 *   - no horizontal overflow at 375/390/430/768/1024/1280/1440/1920
 *   - page renders with zero uncaught JS exceptions
 *   - prefers-reduced-motion renders content (no hidden content, no crash)
 *   - screenshots are captured for manual visual review (docs/qa/evidence/)
 *
 * Not covered by this script (documented, manual):
 *   - hover states, keyboard focus traversal, drawer/mega-menu interactions,
 *     animation quality. Those need a human or a full interaction framework
 *     (Playwright/Puppeteer), which this phase deliberately does not add.
 */
import { spawn } from "node:child_process";
import { mkdir, writeFile, mkdtemp, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import process from "node:process";

const BASE = process.env.QA_BASE ?? "http://localhost:3211";
const CHROME =
  process.env.CHROME_PATH ?? "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const EVIDENCE = process.env.QA_EVIDENCE_DIR ?? "docs/qa/evidence";
const PORT = 9333;

const ROUTES = [
  "/",
  "/broker-technology/crm",
  "/broker-technology/traders-room",
  "/platforms/mt4-mt5",
  "/solutions",
  "/solutions/new-brokerage",
  "/trust",
  "/company",
  "/contact",
];
const WIDTHS = [375, 390, 430, 768, 1024, 1280, 1440, 1920];
const TALL = 800;

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function waitForDebugger(url, timeoutMs = 20000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(`${url}/json/list`);
      const tabs = await res.json();
      const page = tabs.find((t) => t.type === "page");
      if (page) return page.webSocketDebuggerUrl;
    } catch {
      /* not up yet */
    }
    await sleep(500);
  }
  throw new Error("Chrome debugger did not come up");
}

class Cdp {
  constructor(wsUrl) {
    this.ws = new WebSocket(wsUrl);
    this.id = 0;
    this.pending = new Map();
    this.handlers = new Map();
    this.ready = new Promise((resolve, reject) => {
      this.ws.onopen = resolve;
      this.ws.onerror = reject;
    });
    this.ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.id && this.pending.has(msg.id)) {
        const { resolve, reject } = this.pending.get(msg.id);
        this.pending.delete(msg.id);
        if (msg.error) reject(new Error(msg.error.message));
        else resolve(msg.result);
      } else if (msg.method && this.handlers.has(msg.method)) {
        this.handlers.get(msg.method)(msg.params);
      }
    };
  }
  send(method, params = {}) {
    const id = ++this.id;
    this.ws.send(JSON.stringify({ id, method, params }));
    return new Promise((resolve, reject) => this.pending.set(id, { resolve, reject }));
  }
  on(method, handler) {
    this.handlers.set(method, handler);
  }
  async evaluate(expression, timeoutMs = 30000) {
    const call = this.send("Runtime.evaluate", {
      expression,
      returnByValue: true,
      awaitPromise: true,
    });
    const timeout = new Promise((_, rej) =>
      setTimeout(() => rej(new Error(`evaluate timed out: ${expression.slice(0, 60)}`)), timeoutMs),
    );
    const res = await Promise.race([call, timeout]);
    if (res.exceptionDetails) throw new Error(res.exceptionDetails.exception?.description ?? "evaluate error");
    return res.result.value;
  }
}

/** CDP keyboard event (keyDown + keyUp). */
async function key(cdp, keyName, code, vk) {
  await cdp.send("Input.dispatchKeyEvent", { type: "keyDown", key: keyName, code, windowsVirtualKeyCode: vk, nativeVirtualKeyCode: vk });
  await cdp.send("Input.dispatchKeyEvent", { type: "keyUp", key: keyName, code, windowsVirtualKeyCode: vk, nativeVirtualKeyCode: vk });
}

/** Click the center of the first element matching `selector`. */
async function click(cdp, selector) {
  const box = await cdp.evaluate(`(() => {
    const el = document.querySelector(${JSON.stringify(selector)});
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return JSON.stringify({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
  })()`);
  if (!box) return false;
  const { x, y } = JSON.parse(box);
  await cdp.send("Input.dispatchMouseEvent", { type: "mousePressed", x, y, button: "left", clickCount: 1 });
  await cdp.send("Input.dispatchMouseEvent", { type: "mouseReleased", x, y, button: "left", clickCount: 1 });
  return true;
}

/** Focus the first element matching `selector`. */
async function focusEl(cdp, selector) {
  return cdp.evaluate(`(() => {
    const el = document.querySelector(${JSON.stringify(selector)});
    if (!el) return false;
    el.focus();
    return true;
  })()`);
}

/**
 * Interaction checks via CDP keyboard + pointer (no new browser framework):
 *  - keyboard Tab navigation moves focus through real controls
 *  - mobile drawer opens, receives focus, closes on Escape
 *  - mega menu opens on Enter, closes on Escape
 */
async function interactionChecks(cdp, route, row) {
  // 1. Keyboard navigation (desktop width)
  await cdp.send("Emulation.setDeviceMetricsOverride", { width: 1280, height: TALL, deviceScaleFactor: 1, mobile: false });
  await cdp.send("Page.reload");
  await sleep(1200);
  let focused = 0;
  let lastTag = "none";
  for (let i = 0; i < 6; i++) {
    await key(cdp, "Tab", "Tab", 9);
    const tag = await cdp.evaluate(`document.activeElement ? document.activeElement.tagName + (document.activeElement.getAttribute('aria-label') ? ':' + document.activeElement.getAttribute('aria-label').slice(0, 30) : '') : "none"`);
    if (tag && tag !== "BODY" && tag !== "HTML" && tag !== "none") focused++;
    lastTag = tag;
  }
  row(route, "keyboard Tab navigation", focused >= 3 && lastTag !== "BODY", `focused ${focused}/6 controls, last=${lastTag}`);

  // 2. Mobile drawer (375): open via trigger, verify dialog + focus, Escape closes
  await cdp.send("Emulation.setDeviceMetricsOverride", { width: 375, height: TALL, deviceScaleFactor: 1, mobile: true });
  await cdp.send("Page.reload");
  await sleep(1200);
  const drawerOpened = await click(cdp, 'button[aria-label="Open navigation menu"]');
  await sleep(600);
  const ds = JSON.parse(await cdp.evaluate(`JSON.stringify({
    dialog: !!document.querySelector('[role="dialog"]'),
    focusInDialog: (() => { const d = document.querySelector('[role="dialog"]'); return d ? d.contains(document.activeElement) : false; })()
  })`));
  await key(cdp, "Escape", "Escape", 27);
  await sleep(600);
  const drawerClosed = await cdp.evaluate(`!document.querySelector('[role="dialog"]')`);
  row(route, "mobile drawer open/close", drawerOpened && ds.dialog && ds.focusInDialog && drawerClosed, `opened=${drawerOpened} dialog=${ds.dialog} focusIn=${ds.focusInDialog} closed=${drawerClosed}`);

  // 3. Mega menu (1280): focus trigger + Enter opens, Escape closes
  await cdp.send("Emulation.setDeviceMetricsOverride", { width: 1280, height: TALL, deviceScaleFactor: 1, mobile: false });
  await cdp.send("Page.reload");
  await sleep(1200);
  const mmOpened = await focusEl(cdp, 'button[aria-haspopup="true"]');
  await key(cdp, "Enter", "Enter", 13);
  await sleep(400);
  const mmExpanded = await cdp.evaluate(`(() => { const b = document.querySelector('button[aria-haspopup="true"]'); return b ? b.getAttribute('aria-expanded') : null; })()`);
  await key(cdp, "Escape", "Escape", 27);
  await sleep(400);
  const mmClosed = await cdp.evaluate(`(() => { const b = document.querySelector('button[aria-haspopup="true"]'); return b ? b.getAttribute('aria-expanded') : null; })()`);
  row(route, "mega menu open/close", mmOpened && mmExpanded === "true" && mmClosed === "false", `opened=${mmOpened} expanded=${mmExpanded} closed=${mmClosed}`);
}

async function main() {
  await mkdir(EVIDENCE, { recursive: true });
  // Isolated profile so a running user Chrome session can't interfere with
  // the debugger port.
  const profileDir = await mkdtemp(path.join(os.tmpdir(), "forexaa-qa-"));

  // Spawn chrome.exe directly (no shell) so the space in the path is safe
  // and no DEP0190 shell-escaping warning is emitted.
  const chrome = spawn(
    CHROME,
    [
      "--headless=new",
      `--remote-debugging-port=${PORT}`,
      `--user-data-dir=${profileDir}`,
      "--no-sandbox",
      "--disable-gpu",
      "--disable-background-networking",
      "about:blank",
    ],
    { stdio: "ignore" },
  );

  const results = [];
  let failures = 0;
  const row = (route, check, ok, detail) => {
    results.push({ route, check, ok, detail });
    if (!ok) failures++;
  };

  try {
    const wsUrl = await waitForDebugger(`http://127.0.0.1:${PORT}`);
    const cdp = new Cdp(wsUrl);
    await cdp.ready;
    await cdp.send("Runtime.enable");
    await cdp.send("Page.enable");
    await cdp.send("Emulation.setDeviceMetricsOverride", {
      width: 1280,
      height: TALL,
      deviceScaleFactor: 1,
      mobile: false,
    });

    let jsErrors = [];
    let consoleErrors = [];
    cdp.on("Runtime.exceptionThrown", (p) => {
      jsErrors.push(p.exceptionDetails?.exception?.description ?? p.exceptionDetails?.text ?? "unknown");
    });
    cdp.on("Runtime.consoleAPICalled", (p) => {
      if (p.type === "error" && p.args?.length) {
        const text = p.args.map((a) => a.value ?? a.description ?? a.unserializableValue ?? "").join(" ").slice(0, 300);
        consoleErrors.push(text);
      }
    });

    // --- load each route, check overflow at each width, capture screenshots
    for (const route of ROUTES) {
      jsErrors = [];
      await cdp.send("Page.navigate", { url: `${BASE}${route}` });
      await sleep(1500); // settle (no interaction here; deterministic enough for QA)

      for (const width of WIDTHS) {
        await cdp.send("Emulation.setDeviceMetricsOverride", {
          width,
          height: TALL,
          deviceScaleFactor: 1,
          mobile: width <= 430,
        });
        await sleep(300);
        const m = await cdp.evaluate(`JSON.stringify({
          scrollWidth: document.documentElement.scrollWidth,
          clientWidth: document.documentElement.clientWidth,
          title: document.title,
          mainVisible: (() => { const el = document.querySelector('main'); return el ? getComputedStyle(el).visibility !== 'hidden' && el.offsetHeight > 0 : false; })()
        })`);
        const { scrollWidth, clientWidth, title, mainVisible } = JSON.parse(m);
        const overflow = scrollWidth > clientWidth + 1; // 1px tolerance (sub-pixel)
        row(route, `overflow@${width}`, !overflow, `scrollWidth ${scrollWidth} vs clientWidth ${clientWidth}`);
        if (width === 375 || width === 1280) {
          row(route, `main-renders@${width}`, mainVisible, title);
          const shot = await cdp.send("Page.captureScreenshot", { format: "png" });
          const safe = route.replace(/[^a-z0-9]/gi, "_");
          await writeFile(`${EVIDENCE}\\${safe}@${width}.png`, Buffer.from(shot.data, "base64"));
        }
      }

      // --- prefers-reduced-motion: content must remain visible + no exceptions
      await cdp.send("Emulation.setDeviceMetricsOverride", {
        width: 1280,
        height: TALL,
        deviceScaleFactor: 1,
        mobile: false,
      });
      await cdp.send("Emulation.setEmulatedMedia", {
        features: [{ name: "prefers-reduced-motion", value: "reduce" }],
      });
      await cdp.send("Page.reload");
      await sleep(1500);
      const rm = await cdp.evaluate(`JSON.stringify({
        mainVisible: (() => { const el = document.querySelector('main'); return el ? el.offsetHeight > 0 : false; })(),
        h1: document.querySelector('h1') ? true : false
      })`);
      const rmOk = JSON.parse(rm).mainVisible && JSON.parse(rm).h1;
      row(route, "reduced-motion renders", rmOk, "content visible under prefers-reduced-motion");
      await cdp.send("Emulation.setEmulatedMedia", { features: [] });

      // --- interaction checks (keyboard + drawer + mega menu)
      await interactionChecks(cdp, route, row);

      const hydrationConsole = consoleErrors.filter((t) => /#412|hydrat|nonce/i.test(t));
      row(route, "no hydration console errors", hydrationConsole.length === 0, hydrationConsole.slice(0, 2).join(" | "));
      row(route, "no uncaught JS exceptions", jsErrors.length === 0, jsErrors.slice(0, 3).join(" | "));
    }

    for (const r of results) {
      console.log(`  ${r.ok ? "PASS" : "FAIL"}  ${r.route.padEnd(24)} ${r.check.padEnd(28)} ${r.detail}`);
    }
    console.log(`\nBrowser QA: ${results.length - failures}/${results.length} checks passed, ${failures} failed.`);
    console.log(`Screenshots: ${EVIDENCE}\\ (manual visual review) for hover/keyboard/animation quality.`);
    process.exitCode = failures > 0 ? 1 : 0;
  } finally {
    chrome.kill();
    await rm(profileDir, { recursive: true, force: true }).catch(() => {});
  }
}

main().catch((error) => {
  console.error("browser-qa failed:", error.message);
  process.exitCode = 1;
});
