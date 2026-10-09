"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/cn";
import { DURATION, EASE } from "@/lib/motion/transitions";
import { ProductWindow, MetricTile, StatusBadge } from "@/components/product/visuals";
import { DataNode } from "@/components/marketing/market-grid";

/**
 * Hero architecture visual — the "Brokerage OS" command center.
 * A large, layered synthetic interface showing the connected stack:
 * Client Experience → CRM → Trading → Liquidity → Risk → Operations → Partners.
 * All synthetic/conceptual; no real data. Animated connection paths.
 */
export function HeroArchitecture({ reduced = false }: { reduced?: boolean }) {
  return (
    <ProductWindow title="FOREXAA — Brokerage OS" tag="Conceptual architecture" className="w-full">
      <div className="flex flex-col gap-4">
        {/* Top rail: system status */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <DataNode tone="mint" pulse />
            <span className="type-caption text-text-muted">
              All systems connected
            </span>
          </div>
          <StatusBadge tone="mint">Synthetic</StatusBadge>
        </div>

        {/* Central hub + modules */}
        <div className="relative">
          {/* Connection paths (SVG, animated) */}
          <svg
            aria-hidden="true"
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 600 320"
            fill="none"
            preserveAspectRatio="xMidYMid meet"
          >
            {[
              "M300 40 V120",
              "M120 160 H240",
              "M360 160 H480",
              "M300 200 V280",
              "M180 240 H420",
            ].map((d, i) => (
              <motion.path
                key={d}
                d={d}
                stroke="var(--color-primary)"
                strokeWidth="1"
                strokeOpacity="0.35"
                strokeDasharray="4 6"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: reduced ? 0 : DURATION.slow, delay: 0.4 + i * 0.1, ease: EASE.inOut }}
              />
            ))}
          </svg>

          {/* Grid of modules */}
          <div className="relative grid grid-cols-2 gap-3 sm:grid-cols-3">
            {[
              { label: "Client Experience", tone: "cyan" as const },
              { label: "CRM", tone: "violet" as const },
              { label: "Trading", tone: "cyan" as const },
              { label: "Liquidity", tone: "mint" as const },
              { label: "Risk", tone: "violet" as const },
              { label: "Operations", tone: "mint" as const },
            ].map((m, i) => (
              <motion.div
                key={m.label}
                className={cn(
                  "flex flex-col items-center gap-1.5 rounded-lg border bg-obsidian/60 px-3 py-3 text-center",
                  m.tone === "cyan" && "border-border-accent",
                  m.tone === "violet" && "border-secondary/40",
                  m.tone === "mint" && "border-success/30",
                )}
                initial={{ opacity: 0, y: reduced ? 0 : 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reduced ? 0 : DURATION.standard, delay: 0.3 + i * 0.06, ease: EASE.out }}
              >
                <DataNode tone={m.tone} />
                <span className="type-small font-medium text-text">{m.label}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom rail: metric strip */}
        <div className="grid grid-cols-3 gap-2.5">
          <MetricTile label="Modules" value="7" tone="cyan" />
          <MetricTile label="Connections" value="Live" tone="mint" />
          <MetricTile label="Stack" value="One" tone="violet" />
        </div>
      </div>
    </ProductWindow>
  );
}
