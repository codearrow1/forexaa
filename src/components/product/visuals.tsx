import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { GlassPanel, DataNode } from "@/components/marketing/market-grid";

/**
 * Product visual system (Rule 9). Original, Aurora-Terminal visuals built
 * from primitives. All synthetic data MUST be labeled "Illustrative" — none
 * of these represent verified FOREXAA production screens (Rule 8).
 */

/** Small "this is illustrative" marker, placed on every synthetic visual. */
export function IllustrativeTag({ label = "Illustrative interface" }: { label?: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-pill border border-border bg-obsidian/60 px-2.5 py-1 type-caption text-text-muted">
      <DataNode tone="violet" className="!h-1.5 !w-1.5" />
      {label}
    </span>
  );
}

/** Product interface chrome: title bar + window dots + a corner tag. */
export function ProductWindow({
  title,
  children,
  tag,
  className,
}: {
  title: string;
  children: ReactNode;
  tag?: string;
  className?: string;
}) {
  return (
    <div className={cn("overflow-hidden rounded-xl", className)}>
      <div className="flex items-center justify-between border-b border-border bg-surface-elevated/60 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="flex gap-1.5" aria-hidden="true">
            <i className="h-2.5 w-2.5 rounded-full bg-danger/70" />
            <i className="h-2.5 w-2.5 rounded-full bg-warning/70" />
            <i className="h-2.5 w-2.5 rounded-full bg-success/70" />
          </span>
          <span className="type-small font-medium text-text-muted">{title}</span>
        </div>
        {tag ? <IllustrativeTag label={tag} /> : null}
      </div>
      <div className="bg-surface/40 p-4">{children}</div>
    </div>
  );
}

export function MetricTile({
  label,
  value,
  tone = "cyan",
}: {
  label: string;
  value: string;
  tone?: "cyan" | "violet" | "mint";
}) {
  const text =
    tone === "cyan" ? "text-primary" : tone === "violet" ? "text-secondary-soft" : "text-success";
  return (
    <div className="rounded-lg border border-border bg-obsidian/50 p-3">
      <div className="type-caption text-text-muted">{label}</div>
      <div className={cn("mt-1 type-h3 font-display font-semibold", text)}>{value}</div>
    </div>
  );
}

/** Simple static sparkline/line chart panel (SVG, no JS). */
export function ChartPanel({
  title,
  points,
  tone = "cyan",
}: {
  title: string;
  points: number[];
  tone?: "cyan" | "violet" | "mint";
}) {
  const stroke =
    tone === "cyan" ? "var(--color-primary)" : tone === "violet" ? "var(--color-secondary)" : "var(--color-success)";
  const w = 280;
  const h = 80;
  const max = Math.max(...points, 1);
  const path = points
    .map((p, i) => {
      const x = (i / (points.length - 1)) * w;
      const y = h - (p / max) * (h - 8) - 4;
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");
  return (
    <div className="rounded-lg border border-border bg-obsidian/50 p-3">
      <div className="mb-2 type-caption text-text-muted">{title}</div>
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full" role="img" aria-label={`${title} trend (illustrative)`}>
        <path d={path} fill="none" stroke={stroke} strokeWidth="1.75" strokeLinecap="round" />
      </svg>
    </div>
  );
}

/** Left-hand navigation rail used in dashboard previews. */
export function NavigationRail({ items, active }: { items: readonly string[]; active: string }) {
  return (
    <nav aria-label="Illustrative product navigation" className="flex flex-col gap-1">
      {items.map((item) => (
        <span
          key={item}
          className={cn(
            "rounded-md px-2.5 py-1.5 type-small",
            item === active ? "bg-primary/15 font-medium text-primary" : "text-text-muted",
          )}
        >
          {item}
        </span>
      ))}
    </nav>
  );
}

/** A compact synthetic data table (no claims, labels only unless given). */
export function DataTable({
  columns,
  rows,
  caption,
}: {
  columns: readonly string[];
  rows: readonly (readonly string[])[];
  caption: string;
}) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border bg-obsidian/40">
      <table className="min-w-full type-small">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="border-b border-border bg-surface-elevated/50">
            {columns.map((col) => (
              <th key={col} scope="col" className="px-3 py-2.5 text-left type-caption text-text-muted">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, r) => (
            <tr key={r} className="border-b border-border/60 last:border-0">
              {row.map((cell, c) => (
                <td key={c} className="px-3 py-2.5 text-text-muted">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Status pill (e.g. Connected / In review). */
export function StatusBadge({ children, tone = "mint" }: { children: ReactNode; tone?: "cyan" | "violet" | "mint" | "warning" }) {
  const map = {
    cyan: "text-primary border-border-accent bg-primary/10",
    violet: "text-secondary-soft border-secondary/40 bg-secondary/10",
    mint: "text-success border-success/30 bg-success/10",
    warning: "text-warning border-warning/30 bg-warning/10",
  } as const;
  return (
    <span className={cn("inline-flex items-center rounded-pill border px-2.5 py-0.5 type-caption font-medium", map[tone])}>
      {children}
    </span>
  );
}

/** A single node in an integration/architecture diagram. */
export function IntegrationNode({
  label,
  detail,
  tone = "cyan",
}: {
  label: string;
  detail?: string;
  tone?: "cyan" | "violet" | "mint";
}) {
  const border =
    tone === "cyan" ? "border-border-accent" : tone === "violet" ? "border-secondary/40" : "border-success/30";
  return (
    <div className={cn("flex flex-col items-start gap-0.5 rounded-lg border bg-obsidian/50 px-4 py-3", border)}>
      <span className="type-small font-semibold text-text">{label}</span>
      {detail ? <span className="type-caption text-text-muted">{detail}</span> : null}
    </div>
  );
}

/**
 * Vertical architecture diagram: ordered layers with connectors.
 * Purely static HTML (accessible), no JS.
 */
export function ArchitectureDiagram({
  layers,
  caption,
}: {
  layers: ReadonlyArray<{ label: string; detail?: string; items?: readonly string[]; tone?: "cyan" | "violet" | "mint" }>;
  caption?: string;
}) {
  return (
    <GlassPanel className="p-6">
      <div className="flex flex-col items-center gap-1">
        {layers.map((layer, i) => (
          <div key={layer.label} className="flex w-full flex-col items-center">
            {i > 0 ? (
              <span aria-hidden="true" className="my-1 h-4 w-px bg-border-strong" />
            ) : null}
            <IntegrationNode label={layer.label} detail={layer.detail} tone={layer.tone} />
            {layer.items ? (
              <div className="mt-2 flex flex-wrap justify-center gap-1.5">
                {layer.items.map((item) => (
                  <span key={item} className="rounded-md border border-border bg-surface-elevated px-2 py-0.5 type-caption text-text-muted">
                    {item}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        ))}
      </div>
      {caption ? <p className="mt-5 text-center type-caption text-text-muted">{caption}</p> : null}
    </GlassPanel>
  );
}

/** Horizontal step workflow (e.g. CRM lifecycle, IB tree). */
export function WorkflowDiagram({ steps, note }: { steps: readonly string[]; note?: string }) {
  return (
    <div>
      <ol className="flex flex-wrap items-center gap-2" aria-label="Workflow steps">
        {steps.map((step, i) => (
          <li key={step} className="flex items-center gap-2">
            <span className="flex items-center gap-2 rounded-lg border border-border bg-surface-elevated px-3 py-2 type-small text-text">
              <span className="type-caption font-mono text-primary">{String(i + 1).padStart(2, "0")}</span>
              {step}
            </span>
            {i < steps.length - 1 ? (
              <span aria-hidden="true" className="text-text-muted">
                →
              </span>
            ) : null}
          </li>
        ))}
      </ol>
      {note ? <p className="mt-3 type-small text-text-muted">{note}</p> : null}
    </div>
  );
}

/** Activity feed list (synthetic). */
export function ActivityFeed({ items }: { items: readonly { label: string; meta: string; tone?: "cyan" | "violet" | "mint" }[] }) {
  return (
    <ul className="flex flex-col divide-y divide-border/60">
      {items.map((item, i) => (
        <li key={i} className="flex items-center justify-between gap-3 py-2.5">
          <span className="flex items-center gap-2 type-small text-text">
            <DataNode tone={item.tone ?? "cyan"} className="!h-1.5 !w-1.5" />
            {item.label}
          </span>
          <span className="type-caption text-text-muted">{item.meta}</span>
        </li>
      ))}
    </ul>
  );
}
