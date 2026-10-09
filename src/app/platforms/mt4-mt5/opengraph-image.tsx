import { forexaaOgImage, ogSize } from "@/lib/seo/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "FOREXAA MT4 MT5";

export default function OpengraphImage() {
  return forexaaOgImage({ title: "mt4 mt5", section: "PLATFORMS" });
}
