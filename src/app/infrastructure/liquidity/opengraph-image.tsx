import { forexaaOgImage, ogSize } from "@/lib/seo/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "FOREXAA LIQUIDITY";

export default function OpengraphImage() {
  return forexaaOgImage({ title: "liquidity", section: "INFRASTRUCTURE" });
}
