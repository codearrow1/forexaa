/**
 * Trust-center indexation registry (Rule 34-39 / 88).
 *
 * Trust topics that are purely operational/descriptive are indexable. Legal
 * text (privacy) stays noindex until counsel-approved copy is in place —
 * a real-but-incomplete legal page is worse than a controlled noindex.
 */

export interface TrustPageConfig {
  path: string;
  label: string;
  indexation: "index" | "noindex";
  title: string;
  description: string;
}

export const TRUST_PAGES: TrustPageConfig[] = [
  {
    path: "/trust",
    label: "Trust Center",
    indexation: "index",
    title: "Trust, security and transparency",
    description:
      "Explore how FOREXAA handles security, privacy, compliance and risk disclosure.",
  },
  {
    path: "/trust/security",
    label: "Security",
    indexation: "index",
    title: "Security architecture and controls",
    description:
      "Website and software security controls: transport, headers, CSP, validation and logging.",
  },
  {
    path: "/trust/privacy",
    label: "Privacy",
    indexation: "noindex",
    title: "Privacy",
    description:
      "How personal information is handled. The final policy is pending counsel approval.",
  },
  {
    path: "/trust/compliance",
    label: "Compliance",
    indexation: "index",
    title: "Compliance",
    description:
      "Regulatory clarity: FOREXAA is a technology provider, with no fabricated licenses.",
  },
  {
    path: "/trust/risk-disclosure",
    label: "Risk Disclosure",
    indexation: "index",
    title: "Risk Disclosure",
    description:
      "Trading-related risk disclosure. No legal advice or regulatory assurances are made.",
  },
];

export function trustIndexation(path: string): "index" | "noindex" | undefined {
  return TRUST_PAGES.find((p) => p.path === path)?.indexation;
}
