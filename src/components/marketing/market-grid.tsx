import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";

/**
 * Market Grid — FOREXAA's signature visual language.
 *
 * Represents liquidity, data, connections and platform architecture.
 * All primitives are lightweight CSS/SVG (Rule 19: no WebGL yet).
 * Each is intentionally subtle: low opacity, slow motion, reduced-motion safe.
 */

/** Faint background grid, fixed to a container. */
export function GridBackground({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0",
        "bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)]",
        "bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]",
        className,
      )}
    />
  );
}

/** A soft radial color field. `color` is a CSS color value. */
export function GlowField({
  color,
  position = "top",
  size = 520,
  opacity = 0.5,
  className,
}: {
  color: "cyan" | "violet" | "mint";
  position?: "top" | "left" | "right" | "center";
  size?: number;
  opacity?: number;
  className?: string;
}) {
  const map = {
    cyan: "var(--color-primary)",
    violet: "var(--color-secondary)",
    mint: "var(--color-success)",
  } as const;
  const pos: Record<string, string> = {
    top: "top-[-10%] left-1/2 -translate-x-1/2",
    left: "top-1/4 left-[-8%]",
    right: "top-1/4 right-[-8%]",
    center: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
  };
  const style: CSSProperties = {
    width: size,
    height: size,
    opacity,
    background: `radial-gradient(circle, ${map[color]} 0%, transparent 70%)`,
    filter: "blur(60px)",
  };
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute rounded-full", pos[position], className)}
      style={style}
    />
  );
}

/** A single node in the market grid. */
export function DataNode({
  tone = "cyan",
  pulse = false,
  className,
}: {
  tone?: "cyan" | "violet" | "mint";
  pulse?: boolean;
  className?: string;
}) {
  const map = {
    cyan: "bg-primary shadow-glow-cyan",
    violet: "bg-secondary shadow-glow-violet",
    mint: "bg-success",
  } as const;
  return (
    <span
      aria-hidden="true"
      className={cn(
        "relative inline-block h-2.5 w-2.5 rounded-full",
        map[tone],
        pulse && "animate-pulse",
        className,
      )}
    />
  );
}

/** SVG connection line between nodes. */
export function ConnectionLine({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={cn("text-primary/30", className)}
      width="120"
      height="1"
      viewBox="0 0 120 1"
      fill="none"
    >
      <line x1="0" y1="0.5" x2="120" y2="0.5" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

/** A thin animated market line (sparkline). */
export function MarketLine({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={cn("text-primary/60", className)}
      width="160"
      height="40"
      viewBox="0 0 160 40"
      fill="none"
      preserveAspectRatio="none"
    >
      <path
        d="M0 32 L20 28 L40 30 L60 18 L80 22 L100 12 L120 16 L140 8 L160 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** A glass panel surface for hero/architecture visuals. */
export function GlassPanel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border border-border-strong/60",
        "bg-surface/50 backdrop-blur-md shadow-card",
        className,
      )}
    >
      {children}
    </div>
  );
}

/** A small dashboard tile used in architecture previews. */
export function DashboardTile({
  label,
  value,
  tone = "cyan",
  className,
}: {
  label: string;
  value: string;
  tone?: "cyan" | "violet" | "mint";
  className?: string;
}) {
  const toneText = {
    cyan: "text-primary",
    violet: "text-secondary-soft",
    mint: "text-success",
  } as const;
  return (
    <div
      className={cn(
        "rounded-lg border border-border bg-surface-elevated p-3",
        className,
      )}
    >
      <div className="type-caption text-text-muted">{label}</div>
      <div className={cn("type-h3 font-display font-semibold", toneText[tone])}>{value}</div>
    </div>
  );
}
