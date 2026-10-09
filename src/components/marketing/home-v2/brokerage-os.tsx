"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/cn";
import { DURATION, EASE } from "@/lib/motion/transitions";
import { useReducedMotionSafe } from "@/lib/motion/useReducedMotionSafe";
import { DataNode } from "@/components/marketing/market-grid";

/**
 * Brokerage OS — the homepage's signature section (Phase 12A, §12).
 *
 * A full-width, interactive architecture experience. Hovering/tapping a module
 * highlights its connections; the central system stays stable. 2D / layered /
 * enterprise / precise — not 3D, not a flowchart. Accessible: keyboard-focusable
 * modules, reduced-motion renders the full static diagram.
 */

const MODULES = [
  { id: "client", label: "Client Experience", tone: "cyan" as const, x: 50, y: 8 },
  { id: "crm", label: "CRM", tone: "violet" as const, x: 18, y: 38 },
  { id: "trading", label: "Trading", tone: "cyan" as const, x: 82, y: 38 },
  { id: "liquidity", label: "Liquidity", tone: "mint" as const, x: 18, y: 68 },
  { id: "risk", label: "Risk", tone: "violet" as const, x: 82, y: 68 },
  { id: "operations", label: "Operations", tone: "mint" as const, x: 50, y: 92 },
  { id: "partners", label: "Partners", tone: "cyan" as const, x: 50, y: 38 },
] as const;

type ModuleId = (typeof MODULES)[number]["id"];

/** Which modules each module connects to (for the highlight effect). */
const CONNECTIONS: Record<ModuleId, ModuleId[]> = {
  client: ["crm", "trading", "partners"],
  crm: ["client", "trading", "risk", "operations"],
  trading: ["client", "crm", "liquidity", "risk"],
  liquidity: ["trading", "risk", "operations"],
  risk: ["crm", "trading", "liquidity", "operations"],
  operations: ["crm", "liquidity", "risk", "partners"],
  partners: ["client", "operations"],
};

export function BrokerageOS() {
  const reduced = useReducedMotionSafe();
  const [active, setActive] = useState<ModuleId | null>(null);

  const isActive = (id: ModuleId) => active === id;
  const isConnected = (id: ModuleId) =>
    active !== null && CONNECTIONS[active].includes(id);
  const isDimmed = (id: ModuleId) =>
    active !== null && !isActive(id) && !isConnected(id);

  return (
    <section className="relative overflow-hidden py-24 md:py-32" aria-label="FOREXAA Brokerage OS">
      <div className="mx-auto flex max-w-[var(--container-width)] flex-col gap-12 px-5 sm:px-6 lg:px-8 3xl:px-10">
        {/* Heading */}
        <div className="flex flex-col gap-4 text-center">
          <span className="type-label text-primary">The Brokerage OS</span>
          <h2 className="type-section mx-auto max-w-3xl">
            One connected brokerage technology stack.
          </h2>
          <p className="type-lead mx-auto max-w-2xl text-text-muted">
            Not a collection of products. One system where every layer shares the
            same client record, risk view and operations flow.
          </p>
        </div>

        {/* Interactive architecture */}
        <div className="relative mx-auto w-full max-w-4xl">
          {/* Connection lines (SVG) */}
          <svg
            aria-hidden="true"
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            {MODULES.flatMap((m) =>
              CONNECTIONS[m.id]
                .filter((c) => c > m.id)
                .map((c) => {
                  const target = MODULES.find((t) => t.id === c);
                  if (!target) return null;
                  const highlighted =
                    active !== null &&
                    (m.id === active || c === active);
                  return (
                    <motion.line
                      key={`${m.id}-${c}`}
                      x1={m.x}
                      y1={m.y}
                      x2={target.x}
                      y2={target.y}
                      stroke="var(--color-primary)"
                      strokeWidth="0.3"
                      strokeOpacity={highlighted ? 0.7 : 0.15}
                      initial={false}
                      animate={{ strokeOpacity: highlighted ? 0.7 : 0.15 }}
                      transition={{ duration: reduced ? 0 : DURATION.fast }}
                    />
                  );
                }),
            )}
          </svg>

          {/* Modules */}
          <div className="relative grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {MODULES.map((m) => (
              <motion.button
                key={m.id}
                type="button"
                onMouseEnter={() => setActive(m.id)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(m.id)}
                onBlur={() => setActive(null)}
                className={cn(
                  "flex flex-col items-center gap-2 rounded-xl border bg-surface/60 px-4 py-5 text-center transition-colors",
                  isActive(m.id) && "border-border-accent bg-primary/10",
                  isConnected(m.id) && "border-border-strong bg-surface",
                  isDimmed(m.id) && "border-border opacity-40",
                )}
                initial={{ opacity: 0, y: reduced ? 0 : 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: reduced ? 0 : DURATION.standard, ease: EASE.out }}
                aria-pressed={isActive(m.id)}
              >
                <DataNode tone={m.tone} />
                <span className="type-small font-medium text-text">{m.label}</span>
              </motion.button>
            ))}

            {/* Central hub */}
            <motion.div
              className="col-span-2 flex flex-col items-center justify-center gap-2 rounded-xl border border-border-accent bg-obsidian/80 px-4 py-5 text-center sm:col-span-3 md:col-span-4"
              initial={{ opacity: 0, scale: reduced ? 1 : 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: reduced ? 0 : DURATION.standard, ease: EASE.out }}
            >
              <span className="type-caption font-mono text-primary">FOREXAA</span>
              <span className="type-h3 font-display font-semibold text-text">
                BROKERAGE OS
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
