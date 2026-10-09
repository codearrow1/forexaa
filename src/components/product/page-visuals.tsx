import {
  ProductWindow,
  MetricTile,
  ChartPanel,
  NavigationRail,
  ActivityFeed,
  ArchitectureDiagram,
  IntegrationNode,
  StatusBadge,
  IllustrativeTag,
  DataTable,
} from "@/components/product/visuals";
import { GlassPanel } from "@/components/marketing/market-grid";

/* Every visual below is ORIGINAL + synthetic (Rule 8/9/58). No competitor
 * screenshots, no pretending a fake UI is the real product. Metric values
 * are qualitative (Phase 13 honest-data rules) — never fabricated figures. */

export function CrmVisual() {
  return (
    <ProductWindow title="FOREXAA CRM — Overview" tag="Illustrative interface">
      <div className="grid gap-4 sm:grid-cols-[140px_1fr]">
        <NavigationRail
          items={[
            "Overview",
            "Leads",
            "Clients",
            "Accounts",
            "Finance",
            "Partners",
            "Support",
            "Reports",
          ]}
          active="Overview"
        />
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-4">
            <MetricTile label="Client records" value="Unified" tone="cyan" />
            <MetricTile label="Lead pipeline" value="Live" tone="violet" />
            <MetricTile label="Money movement" value="Tracked" tone="mint" />
            <MetricTile label="Support queue" value="Routed" tone="cyan" />
          </div>
          <div className="rounded-lg border border-border bg-obsidian/50 p-3">
            <div className="mb-2 type-caption text-text-muted">
              Activity (synthetic)
            </div>
            <ActivityFeed
              items={[
                {
                  label: "Client onboarding completed",
                  meta: "Step 5 of 5",
                  tone: "mint",
                },
                {
                  label: "Withdrawal pending review",
                  meta: "Finance",
                  tone: "violet",
                },
                { label: "Partner payout scheduled", meta: "IB", tone: "cyan" },
              ]}
            />
          </div>
        </div>
      </div>
    </ProductWindow>
  );
}

/**
 * Full-width CRM interface scene (Phase 13 reference implementation):
 * navigation rail + client pipeline + record detail, all qualitative.
 */
export function CrmInterfaceScene() {
  const columns = [
    {
      name: "Lead",
      tone: "cyan" as const,
      cards: [
        { id: "CL-••24", meta: "IB network · New" },
        { id: "CL-••31", meta: "Direct · New" },
      ],
    },
    {
      name: "KYC in review",
      tone: "violet" as const,
      cards: [
        { id: "CL-••18", meta: "Documents pending" },
        { id: "CL-••07", meta: "Escalated to compliance" },
      ],
    },
    {
      name: "Funded",
      tone: "mint" as const,
      cards: [{ id: "CL-••45", meta: "First deposit · Processed" }],
    },
    {
      name: "Active",
      tone: "cyan" as const,
      cards: [
        { id: "CL-••12", meta: "Live account · Trading" },
        { id: "CL-••39", meta: "Live account · Trading" },
      ],
    },
  ];
  return (
    <ProductWindow
      title="FOREXAA CRM — Pipeline & client record"
      tag="Illustrative interface"
    >
      <div className="grid gap-4 lg:grid-cols-[150px_1fr_240px]">
        <NavigationRail
          items={[
            "Overview",
            "Leads",
            "Clients",
            "Accounts",
            "Finance",
            "Partners",
            "Support",
            "Reports",
          ]}
          active="Clients"
        />
        <div className="flex flex-col gap-3">
          <div className="type-caption text-text-muted">Client pipeline</div>
          <div className="grid grid-cols-2 gap-2.5 xl:grid-cols-4">
            {columns.map((col) => (
              <div
                key={col.name}
                className="flex flex-col gap-2 rounded-lg border border-border bg-obsidian/50 p-2.5"
              >
                <div className="flex items-center justify-between">
                  <span className="type-caption font-medium text-text-muted">
                    {col.name}
                  </span>
                  <span
                    aria-hidden="true"
                    className={`h-1.5 w-1.5 rounded-full ${col.tone === "cyan" ? "bg-primary" : col.tone === "violet" ? "bg-secondary" : "bg-success"}`}
                  />
                </div>
                {col.cards.map((card) => (
                  <div
                    key={card.id}
                    className="rounded-md border border-border bg-surface-elevated/70 px-2.5 py-2"
                  >
                    <div className="type-caption font-medium text-text">
                      {card.id}
                    </div>
                    <div className="type-caption text-text-muted">
                      {card.meta}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            <StatusBadge tone="mint">KYC · Verified</StatusBadge>
            <StatusBadge tone="cyan">Attribution · Partner-linked</StatusBadge>
            <StatusBadge tone="violet">Payouts · State-tracked</StatusBadge>
          </div>
        </div>
        <div className="flex flex-col gap-3 rounded-lg border border-border bg-obsidian/50 p-3">
          <div className="type-caption text-text-muted">Client record</div>
          <dl className="flex flex-col gap-2">
            {[
              ["Account", "Live"],
              ["KYC", "Verified"],
              ["Partner", "IB network"],
              ["Platform", "MT5"],
              ["Support", "1 open ticket"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="flex items-center justify-between gap-2"
              >
                <dt className="type-caption text-text-muted">{label}</dt>
                <dd className="type-caption font-medium text-text">{value}</dd>
              </div>
            ))}
          </dl>
          <div className="border-t border-border/60 pt-2">
            <ActivityFeed
              items={[
                { label: "Deposit received", meta: "Finance", tone: "mint" },
                { label: "Document uploaded", meta: "KYC", tone: "violet" },
              ]}
            />
          </div>
        </div>
      </div>
    </ProductWindow>
  );
}

export function TradersRoomVisual() {
  return (
    <ProductWindow
      title="Trader's Room — Client portal"
      tag="Illustrative interface"
    >
      <div className="flex flex-col gap-3">
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
          <MetricTile label="Accounts" value="Demo + Live" tone="cyan" />
          <MetricTile label="Balances" value="Multi-currency" tone="mint" />
          <MetricTile label="Open requests" value="Tracked" tone="violet" />
          <MetricTile label="Onboarding" value="Guided" tone="cyan" />
        </div>
        <div className="flex flex-wrap items-center gap-2.5">
          <StatusBadge tone="mint">Last deposit · Processed</StatusBadge>
          <StatusBadge tone="violet">Withdrawal · In review</StatusBadge>
          <StatusBadge tone="cyan">Statement · Available</StatusBadge>
          <StatusBadge tone="warning">Documents · 2 pending</StatusBadge>
        </div>
      </div>
    </ProductWindow>
  );
}

export function BackOfficeVisual() {
  return (
    <ProductWindow
      title="Back Office — Operations"
      tag="Illustrative interface"
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="grid grid-cols-2 gap-2.5">
          <MetricTile label="KYC queue" value="Routed" tone="violet" />
          <MetricTile label="Pending payouts" value="In review" tone="cyan" />
          <MetricTile label="Exposure" value="Monitored" tone="mint" />
          <MetricTile label="Open tickets" value="Assigned" tone="cyan" />
        </div>
        <div className="rounded-lg border border-border bg-obsidian/50 p-3">
          <div className="mb-2 type-caption text-text-muted">
            Today (synthetic)
          </div>
          <ActivityFeed
            items={[
              {
                label: "KYC escalated for review",
                meta: "Compliance",
                tone: "violet",
              },
              { label: "Payout batch released", meta: "Finance", tone: "mint" },
              { label: "Risk alert cleared", meta: "Risk", tone: "cyan" },
            ]}
          />
        </div>
      </div>
    </ProductWindow>
  );
}

export function IbAffiliateVisual() {
  return (
    <GlassPanel className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <span className="type-label text-text">Partner tree (synthetic)</span>
        <IllustrativeTag label="Conceptual structure" />
      </div>
      <div className="flex flex-col items-center gap-1.5">
        <IntegrationNode label="Broker" tone="cyan" />
        <span aria-hidden="true" className="h-3 w-px bg-border-strong" />
        <IntegrationNode label="Master Partner" tone="violet" />
        <span aria-hidden="true" className="h-3 w-px bg-border-strong" />
        <div className="flex gap-3">
          <div className="flex flex-col items-center gap-1.5">
            <IntegrationNode label="Partner A" tone="mint" />
            <div className="flex gap-2">
              <span className="rounded-md border border-border bg-surface-elevated px-2 py-1 type-caption text-text-muted">
                Trader 1
              </span>
              <span className="rounded-md border border-border bg-surface-elevated px-2 py-1 type-caption text-text-muted">
                Trader 2
              </span>
            </div>
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <IntegrationNode label="Partner B" tone="mint" />
            <span className="rounded-md border border-border bg-surface-elevated px-2 py-1 type-caption text-text-muted">
              Trader 3
            </span>
          </div>
        </div>
      </div>
    </GlassPanel>
  );
}

export function Mt4Mt5Visual() {
  return (
    <ProductWindow
      title="Deployment — MetaTrader 4 / 5"
      tag="Illustrative deployment"
    >
      <div className="flex flex-col gap-3">
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
          <MetricTile label="Platforms" value="MT4 / MT5" tone="cyan" />
          <MetricTile label="Accounts" value="Demo + Live" tone="violet" />
          <MetricTile label="CRM sync" value="Connected" tone="mint" />
          <MetricTile label="Liquidity" value="Routed" tone="cyan" />
        </div>
        <div className="flex flex-wrap gap-2.5">
          <StatusBadge tone="mint">Branding · Yours</StatusBadge>
          <StatusBadge tone="cyan">Trading conditions · Yours</StatusBadge>
          <StatusBadge tone="violet">
            Scope · Confirmed per deployment
          </StatusBadge>
        </div>
      </div>
    </ProductWindow>
  );
}

export function Mt7Visual() {
  return (
    <ProductWindow
      title="Terminal preview — MobiusTrader 7"
      tag="Illustrative interface"
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <ChartPanel
          title="Multi-market view (synthetic)"
          points={[12, 14, 13, 18, 17, 22, 21, 26]}
          tone="cyan"
        />
        <div className="grid grid-cols-2 gap-2.5">
          <MetricTile label="Markets" value="Multi" tone="cyan" />
          <MetricTile label="Access" value="Web · Mobile" tone="violet" />
          <MetricTile label="Social" value="Where enabled" tone="mint" />
          <MetricTile label="CRM sync" value="Connected" tone="cyan" />
        </div>
      </div>
    </ProductWindow>
  );
}

export function CtraderVisual() {
  return (
    <ProductWindow
      title="Terminal preview — cTrader"
      tag="Illustrative interface"
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-lg border border-border bg-obsidian/50 p-3">
          <div className="mb-2 type-caption text-text-muted">
            Market depth (synthetic)
          </div>
          <div className="flex flex-col gap-1.5">
            {[42, 58, 35, 64, 48, 72].map((width, i) => (
              <div
                key={i}
                className="h-1.5 rounded-full bg-secondary/40"
                style={{ width: `${width}%` }}
              />
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2.5">
          <MetricTile label="Market data" value="Institutional" tone="cyan" />
          <MetricTile label="Access" value="Web · Mobile" tone="violet" />
          <MetricTile label="CRM sync" value="Connected" tone="mint" />
          <MetricTile label="Liquidity" value="Routed" tone="cyan" />
        </div>
      </div>
    </ProductWindow>
  );
}

export function LiquidityVisual() {
  return (
    <ArchitectureDiagram
      caption="Conceptual — your exact topology is designed for your deployment."
      layers={[
        {
          label: "Liquidity sources",
          detail: "Your providers",
          tone: "violet",
          items: ["Source A", "Source B", "Source C"],
        },
        {
          label: "FOREXAA connectivity layer",
          detail: "Aggregation & control",
          tone: "cyan",
        },
        {
          label: "Pricing / aggregation",
          detail: "Your markup & spread rules",
          tone: "cyan",
        },
        {
          label: "Risk / routing",
          detail: "Your limits & controls",
          tone: "violet",
        },
        {
          label: "Trading platforms",
          detail: "Where clients execute",
          tone: "mint",
          items: ["MT4", "MT5", "MT7", "cTrader"],
        },
      ]}
    />
  );
}

export function WhiteLabelVisual() {
  return (
    <ProductWindow title="The white-label stack" tag="Illustrative deployment">
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
        <MetricTile label="Platform" value="Your brand" tone="cyan" />
        <MetricTile label="CRM & ops" value="Connected" tone="violet" />
        <MetricTile label="Liquidity" value="Routed" tone="mint" />
        <MetricTile label="Client portal" value="Yours" tone="cyan" />
      </div>
    </ProductWindow>
  );
}

export function SocialCopyVisual() {
  const panels = [
    {
      name: "Social trading",
      detail: "Clients see live strategies and performance.",
      tone: "cyan" as const,
    },
    {
      name: "Copy trading",
      detail: "A client's orders mirror a strategy, scaled to their capital.",
      tone: "violet" as const,
    },
    {
      name: "PAMM",
      detail: "Pooled funds allocated by percentage, commission tracked.",
      tone: "mint" as const,
    },
    {
      name: "MAM",
      detail: "A manager runs segregated accounts with per-account control.",
      tone: "cyan" as const,
    },
  ];
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {panels.map((panel) => (
        <GlassPanel key={panel.name} className="p-4">
          <div className="flex items-center justify-between">
            <span className="type-body font-semibold text-text">
              {panel.name}
            </span>
            <StatusBadge tone={panel.tone}>Synthetic example</StatusBadge>
          </div>
          <p className="mt-2 type-small text-text-muted">{panel.detail}</p>
        </GlassPanel>
      ))}
    </div>
  );
}

/* ── Phase 13 interface scenes (full-width, qualitative values only) ───── */

export function TradersRoomInterfaceScene() {
  return (
    <ProductWindow
      title="Trader's Room — Client portal"
      tag="Illustrative interface"
    >
      <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="type-caption text-text-muted">Accounts</span>
            <StatusBadge tone="cyan">Your brand</StatusBadge>
          </div>
          <div className="flex flex-col gap-2">
            {[
              { id: "ACC-••41", meta: "MT5 · Live", state: "Active" },
              { id: "ACC-••58", meta: "MT4 · Live", state: "Active" },
              { id: "ACC-••63", meta: "MT5 · Demo", state: "Explore" },
            ].map((row) => (
              <div
                key={row.id}
                className="flex items-center justify-between rounded-lg border border-border bg-obsidian/50 px-3 py-2.5"
              >
                <div>
                  <div className="type-small font-medium text-text">
                    {row.id}
                  </div>
                  <div className="type-caption text-text-muted">{row.meta}</div>
                </div>
                <StatusBadge tone={row.state === "Explore" ? "violet" : "mint"}>
                  {row.state}
                </StatusBadge>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            <StatusBadge tone="mint">Deposit · Processed</StatusBadge>
            <StatusBadge tone="violet">Withdrawal · In review</StatusBadge>
            <StatusBadge tone="cyan">Statement · Available</StatusBadge>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <span className="type-caption text-text-muted">
            Onboarding checklist
          </span>
          <div className="flex flex-col gap-2 rounded-lg border border-border bg-obsidian/50 p-3">
            {[
              { step: "Profile completed", state: "Done" },
              { step: "Documents uploaded", state: "Done" },
              { step: "Account approved", state: "Done" },
              { step: "First deposit", state: "Next" },
              { step: "Trading enabled", state: "Waiting" },
            ].map((row) => (
              <div
                key={row.step}
                className="flex items-center justify-between gap-3"
              >
                <span className="type-small text-text">{row.step}</span>
                <StatusBadge
                  tone={
                    row.state === "Done"
                      ? "mint"
                      : row.state === "Next"
                        ? "cyan"
                        : "violet"
                  }
                >
                  {row.state}
                </StatusBadge>
              </div>
            ))}
          </div>
          <div className="rounded-lg border border-border bg-obsidian/50 p-3">
            <div className="mb-2 type-caption text-text-muted">
              Requests (synthetic)
            </div>
            <ActivityFeed
              items={[
                {
                  label: "Withdrawal submitted",
                  meta: "Finance",
                  tone: "violet",
                },
                {
                  label: "New device verified",
                  meta: "Security",
                  tone: "cyan",
                },
                {
                  label: "Statement generated",
                  meta: "Documents",
                  tone: "mint",
                },
              ]}
            />
          </div>
        </div>
      </div>
    </ProductWindow>
  );
}

export function BackOfficeInterfaceScene() {
  const queues = [
    {
      name: "KYC review",
      tone: "violet" as const,
      rows: [
        { id: "KYC-••12", state: "Documents pending" },
        { id: "KYC-••08", state: "Escalated" },
        { id: "KYC-••21", state: "Ready to approve" },
      ],
    },
    {
      name: "Payouts",
      tone: "cyan" as const,
      rows: [
        { id: "PAY-••34", state: "In review" },
        { id: "PAY-••35", state: "Scheduled" },
      ],
    },
    {
      name: "Risk & exposure",
      tone: "mint" as const,
      rows: [
        { id: "RSK-••07", state: "Monitored" },
        { id: "RSK-••09", state: "Cleared" },
      ],
    },
    {
      name: "Support tickets",
      tone: "cyan" as const,
      rows: [
        { id: "TKT-••51", state: "Assigned · Finance" },
        { id: "TKT-••52", state: "Assigned · Ops" },
      ],
    },
  ];
  return (
    <ProductWindow
      title="Back Office — Operations console"
      tag="Illustrative interface"
    >
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {queues.map((queue) => (
          <div
            key={queue.name}
            className="flex flex-col gap-2 rounded-lg border border-border bg-obsidian/50 p-3"
          >
            <div className="flex items-center justify-between">
              <span className="type-caption font-medium text-text-muted">
                {queue.name}
              </span>
              <span
                aria-hidden="true"
                className={`h-1.5 w-1.5 rounded-full ${queue.tone === "cyan" ? "bg-primary" : queue.tone === "violet" ? "bg-secondary" : "bg-success"}`}
              />
            </div>
            {queue.rows.map((row) => (
              <div
                key={row.id}
                className="rounded-md border border-border bg-surface-elevated/70 px-2.5 py-2"
              >
                <div className="type-caption font-medium text-text">
                  {row.id}
                </div>
                <div className="type-caption text-text-muted">{row.state}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap gap-2 border-t border-border/60 pt-3">
        <StatusBadge tone="mint">Routing rules · Enforced</StatusBadge>
        <StatusBadge tone="cyan">Role permissions · Scoped</StatusBadge>
        <StatusBadge tone="violet">Audit trail · Recorded</StatusBadge>
      </div>
    </ProductWindow>
  );
}

export function IbAffiliateInterfaceScene() {
  return (
    <ProductWindow
      title="IB & Affiliate — Attribution"
      tag="Illustrative interface"
    >
      <div className="grid gap-4 lg:grid-cols-[1.6fr_1fr]">
        <div className="flex flex-col gap-3">
          <DataTable
            caption="Partner attribution (synthetic)"
            columns={["Relationship", "Attribution", "Commission"]}
            rows={[
              ["Broker → Master partner", "Direct", "Tracked"],
              ["Master → Partner A", "Tiered", "Tracked"],
              ["Partner A → Traders", "Referral-linked", "Accrued"],
              ["Partner B → Traders", "Referral-linked", "Accrued"],
            ]}
          />
          <div className="flex flex-wrap gap-2">
            <StatusBadge tone="mint">Tree · Verified</StatusBadge>
            <StatusBadge tone="cyan">Conversions · Attributed</StatusBadge>
            <StatusBadge tone="violet">Payouts · Scheduled</StatusBadge>
          </div>
        </div>
        <div className="rounded-lg border border-border bg-obsidian/50 p-3">
          <div className="mb-2 type-caption text-text-muted">
            Payout queue (synthetic)
          </div>
          <ActivityFeed
            items={[
              {
                label: "Partner commission accrued",
                meta: "Master partner",
                tone: "cyan",
              },
              {
                label: "Trader referred — conversion recorded",
                meta: "Partner A",
                tone: "mint",
              },
              {
                label: "Payout batch prepared",
                meta: "Finance",
                tone: "violet",
              },
              { label: "Statement available", meta: "Partner B", tone: "cyan" },
            ]}
          />
        </div>
      </div>
    </ProductWindow>
  );
}

export function Mt4Mt5InterfaceScene() {
  return (
    <ProductWindow
      title="MetaTrader — Deployment console"
      tag="Illustrative deployment"
    >
      <div className="grid gap-4 lg:grid-cols-[1.6fr_1fr]">
        <DataTable
          caption="Deployment components (synthetic)"
          columns={["Component", "Scope", "State"]}
          rows={[
            ["Trading server", "MT4 / MT5", "Connected"],
            ["Account types", "Demo + Live", "Configured"],
            ["Branding", "Your logo & palette", "Applied"],
            ["Trading conditions", "Your rules", "Applied"],
            ["CRM sync", "Accounts & payments", "Live"],
            ["Liquidity routing", "Your providers", "Routed"],
          ]}
        />
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-2.5">
            <MetricTile label="Environment" value="Staged" tone="violet" />
            <MetricTile label="Sync" value="Two-way" tone="mint" />
          </div>
          <div className="rounded-lg border border-border bg-obsidian/50 p-3">
            <div className="mb-2 type-caption text-text-muted">
              Deployment activity (synthetic)
            </div>
            <ActivityFeed
              items={[
                {
                  label: "Account approved → pushed to CRM",
                  meta: "Sync",
                  tone: "mint",
                },
                {
                  label: "Trade set updated on server",
                  meta: "Platform",
                  tone: "cyan",
                },
                {
                  label: "Brand assets applied",
                  meta: "Config",
                  tone: "violet",
                },
              ]}
            />
          </div>
        </div>
      </div>
    </ProductWindow>
  );
}

export function Mt7InterfaceScene() {
  return (
    <ProductWindow
      title="MobiusTrader 7 — Terminal & connections"
      tag="Illustrative interface"
    >
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="flex flex-col gap-3">
          <ChartPanel
            title="Multi-market view (synthetic)"
            points={[14, 16, 15, 20, 19, 24, 23, 28]}
            tone="cyan"
          />
          <div className="flex flex-wrap gap-2">
            <StatusBadge tone="cyan">Markets · Multi</StatusBadge>
            <StatusBadge tone="violet">Social · Where enabled</StatusBadge>
            <StatusBadge tone="mint">CRM sync · Connected</StatusBadge>
          </div>
        </div>
        <ArchitectureDiagram
          caption="Conceptual — end-to-end wiring for your deployment."
          layers={[
            {
              label: "Terminal",
              detail: "Web · Desktop · Mobile",
              tone: "cyan",
            },
            {
              label: "Trading & social features",
              detail: "Where enabled for your brand",
              tone: "violet",
            },
            {
              label: "CRM sync",
              detail: "Accounts, balances, activity",
              tone: "cyan",
            },
            {
              label: "Back office & reporting",
              detail: "Operations on the same record",
              tone: "mint",
            },
          ]}
        />
      </div>
    </ProductWindow>
  );
}

export function CtraderInterfaceScene() {
  return (
    <ProductWindow title="cTrader — Terminal" tag="Illustrative interface">
      <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
        <div className="flex flex-col gap-3">
          <div className="rounded-lg border border-border bg-obsidian/50 p-3">
            <div className="mb-2 type-caption text-text-muted">
              Market depth (synthetic)
            </div>
            <div className="flex flex-col gap-1.5">
              {[68, 54, 78, 46, 62, 38, 71].map((width, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span
                    className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary/70"
                    aria-hidden="true"
                  />
                  <div
                    className="h-1.5 rounded-full bg-secondary/40"
                    style={{ width: `${width}%` }}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <StatusBadge tone="cyan">Data · Institutional</StatusBadge>
            <StatusBadge tone="violet">
              Access · Web / Desktop / Mobile
            </StatusBadge>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <DataTable
            caption="Terminal connections (synthetic)"
            columns={["Connection", "State"]}
            rows={[
              ["FOREXAA CRM", "Accounts & settings synced"],
              ["Back office", "Operations linked"],
              ["Trader's Room", "Portal linked"],
              ["Liquidity", "Routing configured"],
            ]}
          />
          <div className="rounded-lg border border-border bg-obsidian/50 p-3">
            <div className="mb-2 type-caption text-text-muted">
              Session activity (synthetic)
            </div>
            <ActivityFeed
              items={[
                {
                  label: "Order placed from chart",
                  meta: "Trading",
                  tone: "cyan",
                },
                {
                  label: "Watchlist updated",
                  meta: "Workspace",
                  tone: "violet",
                },
                { label: "Position closed", meta: "Trading", tone: "mint" },
              ]}
            />
          </div>
        </div>
      </div>
    </ProductWindow>
  );
}

export function LiquidityInterfaceScene() {
  return (
    <ProductWindow
      title="Liquidity — Routing & pricing"
      tag="Illustrative interface"
    >
      <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <div className="flex flex-col gap-3">
          <DataTable
            caption="Liquidity sources (conceptual)"
            columns={["Source", "Role", "State"]}
            rows={[
              ["Provider A", "Primary aggregation", "Active"],
              ["Provider B", "Secondary aggregation", "Active"],
              ["Provider C", "Fallback", "Standby"],
              ["Internal stream", "Your book", "Routed"],
            ]}
          />
          <div className="flex flex-wrap gap-2">
            <StatusBadge tone="mint">Aggregation · Live</StatusBadge>
            <StatusBadge tone="cyan">Risk checks · Enforced</StatusBadge>
            <StatusBadge tone="violet">Fallback · Configured</StatusBadge>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="rounded-lg border border-border bg-obsidian/50 p-3">
            <div className="mb-2 type-caption text-text-muted">
              Pricing rules (your configuration)
            </div>
            <dl className="flex flex-col gap-2">
              {[
                ["Markup", "Your spread rules"],
                ["Symbol overrides", "Per symbol"],
                ["Session handling", "Per session"],
                ["Risk limits", "Your thresholds"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="flex items-center justify-between gap-2"
                >
                  <dt className="type-caption text-text-muted">{label}</dt>
                  <dd className="type-caption font-medium text-text">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="rounded-lg border border-border bg-obsidian/50 p-3">
            <div className="mb-2 type-caption text-text-muted">
              Flow activity (synthetic)
            </div>
            <ActivityFeed
              items={[
                {
                  label: "Price stream aggregated",
                  meta: "Pricing",
                  tone: "cyan",
                },
                {
                  label: "Order routed to platform",
                  meta: "Execution",
                  tone: "mint",
                },
                { label: "Risk check passed", meta: "Risk", tone: "violet" },
              ]}
            />
          </div>
        </div>
      </div>
    </ProductWindow>
  );
}

export function WhiteLabelInterfaceScene() {
  const layers = [
    {
      layer: "Trading platform",
      touches: ["Logo", "Colour scheme", "App icon"],
    },
    { layer: "Client portal", touches: ["Your domain", "Logo", "Typography"] },
    { layer: "CRM & reporting", touches: ["Statements", "Email templates"] },
    { layer: "Onboarding flow", touches: ["Copy", "Document set"] },
  ];
  return (
    <ProductWindow
      title="White-label — Your brand across the stack"
      tag="Illustrative deployment"
    >
      <div className="grid gap-3 sm:grid-cols-2">
        {layers.map((row) => (
          <div
            key={row.layer}
            className="flex flex-col gap-2.5 rounded-lg border border-border bg-obsidian/50 p-3.5"
          >
            <div className="flex items-center justify-between">
              <span className="type-small font-semibold text-text">
                {row.layer}
              </span>
              <StatusBadge tone="mint">Yours</StatusBadge>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {row.touches.map((touch) => (
                <span
                  key={touch}
                  className="rounded-md border border-border bg-surface-elevated px-2 py-0.5 type-caption text-text-muted"
                >
                  {touch}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap gap-2 border-t border-border/60 pt-3">
        <StatusBadge tone="cyan">FOREXAA operates the stack</StatusBadge>
        <StatusBadge tone="violet">Your clients see your brand</StatusBadge>
      </div>
    </ProductWindow>
  );
}

export function SocialCopyInterfaceScene() {
  return (
    <ProductWindow
      title="Social & copy — Strategy panel"
      tag="Illustrative interface"
    >
      <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr]">
        <div className="flex flex-col gap-3">
          <DataTable
            caption="Strategies (synthetic)"
            columns={["Strategy", "Model", "Allocation", "Commission"]}
            rows={[
              ["Strategy Alpha", "Copy trading", "By percentage", "Tracked"],
              ["Strategy Beta", "PAMM", "Pooled share", "Tracked"],
              ["Strategy Gamma", "MAM", "Segregated", "Tracked"],
            ]}
          />
          <div className="rounded-lg border border-border bg-obsidian/50 p-3">
            <div className="mb-2 type-caption text-text-muted">
              Allocation split (illustrative shape)
            </div>
            <div className="flex h-2 overflow-hidden rounded-full bg-obsidian">
              <span className="h-full w-[45%] bg-primary/70" />
              <span className="h-full w-[30%] bg-secondary/70" />
              <span className="h-full w-[25%] bg-success/70" />
            </div>
            <div className="mt-2 flex flex-wrap gap-3">
              <span className="type-caption text-text-muted">
                ■ Strategy Alpha
              </span>
              <span className="type-caption text-text-muted">
                ■ Strategy Beta
              </span>
              <span className="type-caption text-text-muted">
                ■ Strategy Gamma
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="rounded-lg border border-border bg-obsidian/50 p-3">
            <div className="mb-2 type-caption text-text-muted">
              Investor states (synthetic)
            </div>
            <ActivityFeed
              items={[
                {
                  label: "Investor subscribed to strategy",
                  meta: "Copy",
                  tone: "cyan",
                },
                {
                  label: "Allocation rebalanced",
                  meta: "PAMM",
                  tone: "violet",
                },
                { label: "Commission accrued", meta: "Manager", tone: "mint" },
              ]}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <StatusBadge tone="cyan">
              Performance · Published to investors
            </StatusBadge>
            <StatusBadge tone="mint">Attribution · Per investor</StatusBadge>
          </div>
        </div>
      </div>
    </ProductWindow>
  );
}

/** /solutions hub opening visual — one stack configured per business model. */
export function SolutionsHubScene() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border-accent/60 bg-surface-elevated/60 p-6 md:p-8">
      <IllustrativeTag label="Conceptual structure" />
      <div className="mt-6 grid gap-6 lg:grid-cols-[1.15fr_1fr] lg:items-center">
        <div className="rounded-xl border border-border bg-surface p-5">
          <span className="type-label text-primary">Core stack</span>
          <p className="mt-2 type-h3">One connected FOREXAA platform</p>
          <ul className="mt-4 grid grid-cols-2 gap-2">
            {[
              "CRM",
              "Back office",
              "Trading platform",
              "Liquidity & risk",
              "Payments",
              "Trader's room",
            ].map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 rounded-lg border border-border bg-surface-elevated px-3 py-2 type-caption text-text-muted"
              >
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-2.5">
          <span className="type-caption text-text-muted">Configured for</span>
          {[
            "New Brokerage",
            "Existing Brokerage",
            "Prop Firm",
            "Multi-Asset Broker",
            "Investment Platform",
          ].map((model) => (
            <div
              key={model}
              className="flex items-center gap-3 rounded-lg border border-border bg-surface px-4 py-2.5"
            >
              <span
                aria-hidden="true"
                className="type-caption font-mono text-primary"
              >
                {"->"}
              </span>
              <span className="type-small font-medium text-text">{model}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
