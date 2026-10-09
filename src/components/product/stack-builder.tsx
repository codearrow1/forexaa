"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/cn";
import { GlassPanel } from "@/components/marketing/market-grid";
import { track } from "@/lib/analytics";

/**
 * BrokerageStackBuilder (Rule 6) — interactive conceptual stack builder.
 *
 * User selects: Business Type, Trading Platform, CRM, Liquidity,
 * Client Experience, Partner System, Risk.
 * Right side visually assembles the architecture.
 *
 * This is a CONCEPTUAL stack builder, not a checkout configurator.
 * No prices are shown. No combination is implied to be commercially
 * available unless confirmed.
 */

interface StackOption {
  id: string;
  label: string;
}

interface StackCategory {
  id: string;
  label: string;
  options: StackOption[];
}

const CATEGORIES: StackCategory[] = [
  {
    id: "business-type",
    label: "Business Type",
    options: [
      { id: "forex", label: "Forex Broker" },
      { id: "cfd", label: "CFD Broker" },
      { id: "crypto", label: "Crypto Broker" },
      { id: "prop", label: "Prop Firm" },
    ],
  },
  {
    id: "platform",
    label: "Trading Platform",
    options: [
      { id: "mt4", label: "MetaTrader 4" },
      { id: "mt5", label: "MetaTrader 5" },
      { id: "mt7", label: "MobiusTrader 7" },
      { id: "ctrader", label: "cTrader" },
      { id: "web", label: "Web Trading" },
    ],
  },
  {
    id: "crm",
    label: "CRM",
    options: [
      { id: "forex-crm", label: "Forex CRM" },
      { id: "back-office", label: "Back Office" },
      { id: "client-portal", label: "Client Portal" },
    ],
  },
  {
    id: "liquidity",
    label: "Liquidity",
    options: [
      { id: "aggregated", label: "Aggregated Liquidity" },
      { id: "single", label: "Single Provider" },
      { id: "bridge", label: "Bridge / ECN" },
    ],
  },
  {
    id: "client-experience",
    label: "Client Experience",
    options: [
      { id: "traders-room", label: "Trader's Room" },
      { id: "mobile", label: "Mobile App" },
      { id: "web-terminal", label: "Web Terminal" },
    ],
  },
  {
    id: "partner-system",
    label: "Partner System",
    options: [
      { id: "ib", label: "IB / Affiliate" },
      { id: "multi-level", label: "Multi-level IB" },
      { id: "no-partner", label: "No Partner System" },
    ],
  },
  {
    id: "risk",
    label: "Risk",
    options: [
      { id: "real-time", label: "Real-time Monitoring" },
      { id: "limits", label: "Limits & Controls" },
      { id: "alerts", label: "Automated Alerts" },
    ],
  },
];

export function BrokerageStackBuilder() {
  const [selections, setSelections] = useState<Record<string, string>>({});

  function select(categoryId: string, optionId: string) {
    setSelections((prev) => ({ ...prev, [categoryId]: optionId }));
    track("stack_builder_completed", { category: categoryId, option: optionId });
  }

  const selectedLabels = Object.values(selections);
  const allSelected = CATEGORIES.every((c) => selections[c.id]);

  return (
    <GlassPanel className="p-6">
      <div className="mb-6">
        <h2 className="type-h3">Build Your Technology Stack</h2>
        <p className="mt-2 type-small text-text-muted">
          Select the components you need. This is a conceptual builder —
          final availability is confirmed with the team.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
        {/* Selection panel */}
        <div className="flex flex-col gap-4">
          {CATEGORIES.map((category) => (
            <div key={category.id}>
              <span className="type-label text-text-muted">{category.label}</span>
              <div className="mt-2 flex flex-wrap gap-2">
                {category.options.map((option) => {
                  const isActive = selections[category.id] === option.id;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => select(category.id, option.id)}
                      aria-pressed={isActive}
                      className={cn(
                        "rounded-lg border px-3 py-2 type-small font-medium transition-colors",
                        isActive
                          ? "border-border-accent bg-primary/15 text-primary"
                          : "border-border bg-surface-elevated text-text-muted hover:text-text",
                      )}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Visual assembly */}
        <div
          className="flex min-h-[220px] w-full flex-col items-center justify-center rounded-xl border border-border bg-obsidian/50 p-4"
          role="status"
          aria-live="polite"
          aria-label="Your selected technology stack"
        >
          {selectedLabels.length === 0 ? (
            <p className="type-caption text-text-muted text-center">
              Select components to see your stack
            </p>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <div className="rounded-lg border border-border-accent bg-primary/10 px-4 py-2 type-small font-semibold text-primary">
                YOUR BROKERAGE
              </div>
              <span aria-hidden="true" className="h-3 w-px bg-border-strong" />
              <AnimatePresence mode="popLayout">
                {selectedLabels.map((label, i) => (
                  <motion.div
                    key={`${label}-${i}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="rounded-md border border-border bg-surface-elevated px-3 py-1.5 type-caption text-text"
                  >
                    {label}
                  </motion.div>
                ))}
              </AnimatePresence>
              {allSelected ? (
                <p className="type-caption text-success">Stack complete — ready to discuss.</p>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </GlassPanel>
  );
}
