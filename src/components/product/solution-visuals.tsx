"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/cn";
import { DURATION, EASE } from "@/lib/motion/transitions";
import { useReducedMotionSafe } from "@/lib/motion/useReducedMotionSafe";

/**
 * Distinct signature visuals for the three remaining solution pages
 * (Phase 6 Rule 24/25). Each tells a different story with a different motion
 * language — no cloned animation.
 */

function Panel({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotionSafe();
  return (
    <motion.div
      className={cn(
        "flex flex-col items-center gap-2 rounded-xl border border-border bg-surface-elevated/60 p-4 text-center",
        className,
      )}
      initial={{ opacity: 0, y: reduced ? 0 : 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: reduced ? 0 : DURATION.standard, delay, ease: EASE.out }}
    >
      {children}
    </motion.div>
  );
}

function Connector({ label }: { label: string }) {
  const reduced = useReducedMotionSafe();
  return (
    <motion.div
      className="flex flex-col items-center gap-1"
      initial={{ opacity: 0, scaleX: reduced ? 1 : 0 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: reduced ? 0 : DURATION.fast }}
    >
      <span aria-hidden="true" className="h-px w-10 bg-gradient-to-r from-border-strong to-primary/60" />
      <span className="type-caption font-mono text-primary">{label}</span>
      <span aria-hidden="true" className="h-px w-10 bg-gradient-to-r from-primary/60 to-border-strong" />
    </motion.div>
  );
}

/** Existing Broker — Before → Connect → Improve. */
export function ExistingBrokerVisual() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="grid w-full gap-3 sm:grid-cols-3">
        <Panel>
          <span className="type-caption font-mono text-text-muted">BEFORE</span>
          <span className="type-body font-semibold text-text">Existing stack</span>
          <span className="type-small text-text-muted">
            Platform, CRM, partners and support run as separate systems.
          </span>
        </Panel>
        <Panel delay={0.1}>
          <span className="type-caption font-mono text-primary">CONNECT</span>
          <span className="type-body font-semibold text-text">Integrate</span>
          <span className="type-small text-text-muted">
            FOREXAA connects to what you already run — no full rebuild.
          </span>
        </Panel>
        <Panel delay={0.2}>
          <span className="type-caption font-mono text-success">IMPROVE</span>
          <span className="type-body font-semibold text-text">Modernize</span>
          <span className="type-small text-text-muted">
            Replace or add components; operations get stronger over time.
          </span>
        </Panel>
      </div>
      <Connector label="phased migration" />
      <p className="type-small max-w-md text-center text-text-muted">
        Each step is scoped to your operation. Migration is planned, not
        instantaneous — your brokerage keeps running through the transition.
      </p>
    </div>
  );
}

/** Prop Firm — Trader → Challenge → Risk → Payout → Scale. */
export function PropFirmVisual() {
  const reduced = useReducedMotionSafe();
  const steps = [
    { label: "Trader", detail: "Acquisition & onboarding", tone: "cyan" },
    { label: "Challenge", detail: "Evaluation workflow", tone: "violet" },
    { label: "Risk", detail: "Rules enforced in real time", tone: "mint" },
    { label: "Payout", detail: "Profit distribution", tone: "cyan" },
    { label: "Scale", detail: "Grow the book", tone: "violet" },
  ] as const;
  return (
    <div className="flex w-full flex-col items-center gap-1">
      {steps.map((step, i) => (
        <motion.div
          key={step.label}
          className="flex w-full max-w-sm flex-col items-center"
          initial={{ opacity: 0, y: reduced ? 0 : 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: reduced ? 0 : DURATION.standard, delay: i * 0.08 }}
        >
          {i > 0 ? (
            <span aria-hidden="true" className="my-1 h-4 w-px bg-gradient-to-b from-border-strong to-primary/50" />
          ) : null}
          <div
            className={cn(
              "flex w-full items-center justify-between rounded-xl border bg-obsidian/60 px-5 py-3",
              step.tone === "cyan" && "border-border-accent",
              step.tone === "violet" && "border-secondary/40",
              step.tone === "mint" && "border-success/30",
            )}
          >
            <span className="type-body font-semibold text-text">{step.label}</span>
            <span className="type-caption text-text-muted">{step.detail}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/** Multi-Asset — Markets → Unified Client → Operations → Risk. */
export function MultiAssetVisual() {
  const reduced = useReducedMotionSafe();
  const markets = ["Forex", "Metals", "Indices", "Crypto", "Stocks"];
  return (
    <div className="flex w-full flex-col items-center gap-6">
      <div className="flex flex-wrap justify-center gap-2">
        {markets.map((m, i) => (
          <motion.span
            key={m}
            className="rounded-lg border border-border bg-surface-elevated px-3 py-1.5 type-small font-medium text-text"
            initial={{ opacity: 0, y: reduced ? 0 : -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: reduced ? 0 : DURATION.fast, delay: i * 0.05 }}
          >
            {m}
          </motion.span>
        ))}
      </div>
      <motion.span
        aria-hidden="true"
        className="h-6 w-px bg-gradient-to-b from-border-strong to-primary/60"
        initial={{ scaleY: reduced ? 1 : 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
      />
      <div className="grid w-full gap-3 sm:grid-cols-3">
        <Panel>
          <span className="type-caption font-mono text-primary">UNIFIED</span>
          <span className="type-body font-semibold text-text">One client</span>
          <span className="type-small text-text-muted">
            A single client record across every instrument.
          </span>
        </Panel>
        <Panel delay={0.1}>
          <span className="type-caption font-mono text-success">OPERATIONS</span>
          <span className="type-body font-semibold text-text">One back office</span>
          <span className="type-small text-text-muted">
            Clients, accounts, money and partners in one console.
          </span>
        </Panel>
        <Panel delay={0.2}>
          <span className="type-caption font-mono text-text-muted">RISK</span>
          <span className="type-body font-semibold text-text">Cross-asset</span>
          <span className="type-small text-text-muted">
            Exposure and limits monitored across the entire book.
          </span>
        </Panel>
      </div>
    </div>
  );
}
