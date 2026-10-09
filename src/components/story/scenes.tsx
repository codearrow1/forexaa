"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/cn";
import { DURATION, EASE } from "@/lib/motion/transitions";
import { useReducedMotionSafe } from "@/lib/motion/useReducedMotionSafe";

/**
 * Advanced scene components (Rule 12/45/46).
 * Phase 13: dead scenes removed (TimelineScene, PinnedPanel,
 * HorizontalStory, ProductZoom) — only ArchitectureFlow remains in use.
 */

/**
 * Architecture flow (Rule 9): animated nodes + connecting lines.
 * Used for liquidity, brokerage OS, and system diagrams.
 */
export function ArchitectureFlow({
  layers,
  className,
}: {
  layers: readonly {
    label: string;
    detail?: string;
    items?: readonly string[];
    tone?: "cyan" | "violet" | "mint";
  }[];
  className?: string;
}) {
  const reduced = useReducedMotionSafe();
  return (
    <div className={cn("flex flex-col items-center gap-1", className)}>
      {layers.map((layer, i) => (
        <motion.div
          key={layer.label}
          className="flex w-full flex-col items-center"
          initial={{ opacity: 0, y: reduced ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: reduced ? 0 : DURATION.standard, delay: i * 0.1, ease: EASE.out }}
        >
          {i > 0 ? (
            <motion.span
              aria-hidden="true"
              className="my-1 h-6 w-px bg-gradient-to-b from-border-strong to-primary/50"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: reduced ? 0 : DURATION.fast }}
            />
          ) : null}
          <div
            className={cn(
              "flex flex-col items-center gap-0.5 rounded-xl border bg-obsidian/60 px-6 py-4",
              layer.tone === "cyan" && "border-border-accent",
              layer.tone === "violet" && "border-secondary/40",
              layer.tone === "mint" && "border-success/30",
            )}
          >
            <span className="type-body font-semibold text-text">{layer.label}</span>
            {layer.detail ? (
              <span className="type-caption text-text-muted">{layer.detail}</span>
            ) : null}
          </div>
          {layer.items ? (
            <div className="mt-2 flex flex-wrap justify-center gap-1.5">
              {layer.items.map((item) => (
                <span
                  key={item}
                  className="rounded-md border border-border bg-surface-elevated px-2.5 py-1 type-caption text-text-muted"
                >
                  {item}
                </span>
              ))}
            </div>
          ) : null}
        </motion.div>
      ))}
    </div>
  );
}
