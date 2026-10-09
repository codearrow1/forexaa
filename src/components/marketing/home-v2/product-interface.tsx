import {
  ProductWindow,
  MetricTile,
  ChartPanel,
  StatusBadge,
  NavigationRail,
  ActivityFeed,
  ArchitectureDiagram,
  IntegrationNode,
} from "@/components/product/visuals";
import { DataNode } from "@/components/marketing/market-grid";

/**
 * Large, realistic synthetic product interfaces (Phase 12A, §5–7).
 * Server-rendered (no client JS). Each looks like plausible brokerage
 * software. All data is synthetic/conceptual and labeled as such.
 */

export function CRMInterface() {
  return (
    <ProductWindow title="FOREXAA CRM — Client lifecycle" tag="Illustrative interface">
      <div className="grid gap-4 sm:grid-cols-[180px_1fr]">
        <NavigationRail
          items={["Overview", "Leads", "Clients", "Accounts", "Finance", "Partners", "Support", "Reports"]}
          active="Clients"
        />
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-4">
            <MetricTile label="Active clients" value="—" tone="cyan" />
            <MetricTile label="In onboarding" value="—" tone="violet" />
            <MetricTile label="Funded (30d)" value="—" tone="mint" />
            <MetricTile label="Open tasks" value="—" tone="cyan" />
          </div>
          <div className="rounded-lg border border-border bg-obsidian/50 p-3">
            <div className="mb-2 type-caption text-text-muted">Client pipeline (synthetic)</div>
            <div className="grid grid-cols-4 gap-2">
              {["Lead", "KYC", "Account", "Funded"].map((stage, i) => (
                <div key={stage} className="flex flex-col items-center gap-1.5">
                  <div className="flex w-full items-center justify-center rounded-md border border-border bg-surface-elevated px-2 py-2 type-caption text-text-muted">
                    {stage}
                  </div>
                  <span className="type-caption font-mono text-primary">{String(i + 1).padStart(2, "0")}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-lg border border-border bg-obsidian/50 p-3">
            <div className="mb-2 type-caption text-text-muted">Recent activity (synthetic)</div>
            <ActivityFeed
              items={[
                { label: "Client onboarding completed", meta: "Step 5 of 5", tone: "mint" },
                { label: "Withdrawal pending review", meta: "Finance", tone: "violet" },
                { label: "Partner payout scheduled", meta: "IB", tone: "cyan" },
                { label: "KYC document verified", meta: "Compliance", tone: "mint" },
              ]}
            />
          </div>
        </div>
      </div>
    </ProductWindow>
  );
}

export function TraderRoomInterface() {
  return (
    <ProductWindow title="Trader's Room — Client portal" tag="Illustrative interface">
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
        <MetricTile label="Accounts" value="3" tone="cyan" />
        <MetricTile label="Total balance" value="—" tone="mint" />
        <MetricTile label="Open positions" value="—" tone="violet" />
        <MetricTile label="Verification" value="Verified" tone="mint" />
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-lg border border-border bg-obsidian/50 p-3">
          <div className="mb-2 type-caption text-text-muted">Funding (synthetic)</div>
          <div className="flex flex-col gap-2">
            {["Deposit", "Withdrawal", "Payout"].map((f) => (
              <div key={f} className="flex items-center justify-between rounded-md border border-border bg-surface-elevated px-3 py-2">
                <span className="type-small text-text">{f}</span>
                <StatusBadge tone="mint">Available</StatusBadge>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-lg border border-border bg-obsidian/50 p-3">
          <div className="mb-2 type-caption text-text-muted">Trading accounts (synthetic)</div>
          <div className="flex flex-col gap-2">
            {["MT4 — Main", "MT5 — Secondary", "cTrader — Demo"].map((a) => (
              <div key={a} className="flex items-center justify-between rounded-md border border-border bg-surface-elevated px-3 py-2">
                <span className="type-small text-text">{a}</span>
                <DataNode tone="cyan" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </ProductWindow>
  );
}

export function TradingInterface() {
  return (
    <ProductWindow title="Trading — Execution" tag="Illustrative interface">
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-lg border border-border bg-obsidian/50 p-3">
          <div className="mb-2 type-caption text-text-muted">Watchlist (synthetic)</div>
          <div className="flex flex-col gap-1.5">
            {[
              { s: "EURUSD", b: "1.0842", a: "1.0844" },
              { s: "GBPUSD", b: "1.2631", a: "1.2633" },
              { s: "XAUUSD", b: "2384.1", a: "2384.6" },
              { s: "BTCUSD", b: "67240", a: "67258" },
            ].map((r) => (
              <div key={r.s} className="flex items-center justify-between rounded-md border border-border bg-surface-elevated px-3 py-2">
                <span className="type-small font-medium text-text">{r.s}</span>
                <div className="flex gap-3 type-caption">
                  <span className="text-text-muted">{r.b}</span>
                  <span className="text-text-muted">{r.a}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <ChartPanel title="Conceptual price (synthetic)" points={[40, 52, 46, 60, 55, 68, 62, 72, 66, 76]} tone="cyan" />
          <div className="grid grid-cols-2 gap-2.5">
            <MetricTile label="Margin" value="—" tone="violet" />
            <MetricTile label="Positions" value="—" tone="cyan" />
          </div>
        </div>
      </div>
    </ProductWindow>
  );
}

export function LiquidityInterface() {
  return (
    <ProductWindow title="Liquidity — Aggregation & routing" tag="Conceptual architecture">
      <ArchitectureDiagram
        caption="Conceptual — your exact topology is designed for your deployment."
        layers={[
          { label: "Liquidity sources", detail: "Your providers", tone: "violet", items: ["LP A", "LP B", "LP C"] },
          { label: "FOREXAA connectivity", detail: "Aggregation & control", tone: "cyan" },
          { label: "Pricing / routing", detail: "Your markup & spread rules", tone: "cyan" },
          { label: "Risk / execution", detail: "Your limits & controls", tone: "violet" },
          { label: "Client accounts", detail: "Where clients execute", tone: "mint", items: ["MT4", "MT5", "MT7", "cTrader"] },
        ]}
      />
    </ProductWindow>
  );
}

export function RiskInterface() {
  return (
    <ProductWindow title="Risk — Control plane" tag="Illustrative interface">
      <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-4">
        <MetricTile label="Exposure" value="—" tone="cyan" />
        <MetricTile label="Margin" value="—" tone="violet" />
        <MetricTile label="Positions" value="—" tone="mint" />
        <MetricTile label="Accounts" value="—" tone="cyan" />
      </div>
      <div className="rounded-lg border border-border bg-obsidian/50 p-3">
        <div className="mb-2 type-caption text-text-muted">Risk state (synthetic)</div>
        <div className="flex flex-wrap gap-2">
          <StatusBadge tone="mint">Normal</StatusBadge>
          <StatusBadge tone="cyan">Watch</StatusBadge>
          <StatusBadge tone="violet">Elevated</StatusBadge>
        </div>
      </div>
      <ChartPanel title="Conceptual exposure (synthetic)" points={[30, 42, 38, 50, 46, 58, 52, 60, 56, 64]} tone="violet" />
    </ProductWindow>
  );
}

export function PartnerNetwork() {
  return (
    <ProductWindow title="Partner network — Conceptual" tag="Conceptual structure">
      <div className="flex flex-col items-center gap-1.5">
        <IntegrationNode label="Broker" tone="cyan" />
        <span aria-hidden="true" className="h-3 w-px bg-border-strong" />
        <IntegrationNode label="Master Partner" tone="violet" />
        <span aria-hidden="true" className="h-3 w-px bg-border-strong" />
        <div className="flex gap-3">
          <div className="flex flex-col items-center gap-1.5">
            <IntegrationNode label="Partner A" tone="mint" />
            <div className="flex gap-2">
              <span className="rounded-md border border-border bg-surface-elevated px-2 py-1 type-caption text-text-muted">Trader 1</span>
              <span className="rounded-md border border-border bg-surface-elevated px-2 py-1 type-caption text-text-muted">Trader 2</span>
            </div>
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <IntegrationNode label="Partner B" tone="mint" />
            <span className="rounded-md border border-border bg-surface-elevated px-2 py-1 type-caption text-text-muted">Trader 3</span>
          </div>
        </div>
      </div>
    </ProductWindow>
  );
}

export function OperationsInterface() {
  return (
    <ProductWindow title="Back Office — Operations" tag="Illustrative interface">
      <div className="grid grid-cols-2 gap-2.5">
        <MetricTile label="KYC queue" value="—" tone="violet" />
        <MetricTile label="Pending payouts" value="—" tone="cyan" />
        <MetricTile label="Exposure util." value="—" tone="mint" />
        <MetricTile label="Open tickets" value="—" tone="cyan" />
      </div>
      <div className="rounded-lg border border-border bg-obsidian/50 p-3">
        <div className="mb-2 type-caption text-text-muted">Today (synthetic)</div>
        <ActivityFeed
          items={[
            { label: "KYC escalated for review", meta: "Compliance", tone: "violet" },
            { label: "Payout batch released", meta: "Finance", tone: "mint" },
            { label: "Risk alert cleared", meta: "Risk", tone: "cyan" },
          ]}
        />
      </div>
    </ProductWindow>
  );
}
