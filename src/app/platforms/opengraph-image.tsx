import { forexaaOgImage, ogSize } from "@/lib/seo/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "FOREXAA — Platforms";

export default function OpengraphImage() {
  return forexaaOgImage({
    title: "Trading Platforms: MT4, MT5, MT7, cTrader, Web & Mobile",
    section: "Platforms",
  });
}
