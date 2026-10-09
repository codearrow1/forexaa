import type { ProductContent, SolutionChain } from "@/types/content";
import { crm } from "./crm";
import { tradersRoom } from "./traders-room";
import { backOffice } from "./back-office";
import { ibAffiliate } from "./ib-affiliate";
import { mt4Mt5 } from "./mt4-mt5";
import { mt7 } from "./mt7";
import { ctrader } from "./ctrader";
import { liquidity } from "./liquidity";
import { whiteLabel } from "./white-label";
import { socialCopy } from "./social-copy";

/** Re-export the individual product modules so pages can import by name. */
export { crm, tradersRoom, backOffice, ibAffiliate, mt4Mt5, mt7, ctrader, liquidity, whiteLabel, socialCopy };

/**
 * Product index (Rule 44). One file per product; this module is the single
 * registry the ProductPage template, mega-menu, related-products system and
 * tests all read from.
 */
export const PRODUCTS: Record<string, ProductContent> = {
  [crm.slug]: crm,
  [tradersRoom.slug]: tradersRoom,
  [backOffice.slug]: backOffice,
  [ibAffiliate.slug]: ibAffiliate,
  [mt4Mt5.slug]: mt4Mt5,
  [mt7.slug]: mt7,
  [ctrader.slug]: ctrader,
  [liquidity.slug]: liquidity,
  [whiteLabel.slug]: whiteLabel,
  [socialCopy.slug]: socialCopy,
};

/** Product slug → registry route path. */
export const PRODUCT_PATHS: Record<string, string> = {
  [crm.slug]: "/broker-technology/crm",
  [tradersRoom.slug]: "/broker-technology/traders-room",
  [backOffice.slug]: "/broker-technology/back-office",
  [ibAffiliate.slug]: "/broker-technology/ib-affiliate",
  [mt4Mt5.slug]: "/platforms/mt4-mt5",
  [mt7.slug]: "/platforms/mt7",
  [ctrader.slug]: "/platforms/ctrader",
  [liquidity.slug]: "/infrastructure/liquidity",
  [whiteLabel.slug]: "/services/white-label",
  [socialCopy.slug]: "/solutions/social-copy",
};

export function productBySlug(slug: string): ProductContent | undefined {
  return PRODUCTS[slug];
}

export function productPath(slug: string): string | undefined {
  return PRODUCT_PATHS[slug];
}

/**
 * Solution → product chains (Rule 32). Data-only; future Solution pages
 * render these without duplicating content.
 */
export const SOLUTION_CHAINS: readonly SolutionChain[] = [
  {
    slug: "prop-firm",
    name: "Prop Firm",
    description: "Run challenges, evaluation and funding on the shared stack.",
    chain: ["crm", "mt7", "back-office", "liquidity"],
  },
  {
    slug: "new-brokerage",
    name: "New Brokerage",
    description: "Launch end to end on one connected deployment.",
    chain: ["crm", "mt4-mt5", "liquidity", "white-label"],
  },
  {
    slug: "multi-asset",
    name: "Multi-Asset Broker",
    description: "FX, CFD, metals and crypto from one operation.",
    chain: ["crm", "mt7", "ctrader", "liquidity"],
  },
] as const;
