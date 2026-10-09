/**
 * Canonical URL helper.
 *
 * Canonicals are absolute and derived from configuration (never from
 * user-controlled query params — Rule 10). Trailing slashes are normalized
 * away; query strings are never part of a canonical URL.
 */

import { publicSiteUrl } from "@/lib/env";

export function canonicalUrl(path: string): string {
  const base = publicSiteUrl().replace(/\/+$/, "");
  const cleanPath = path === "/" ? "" : path.replace(/\/+$/, "");
  return cleanPath === "" ? base : `${base}${cleanPath}`;
}
