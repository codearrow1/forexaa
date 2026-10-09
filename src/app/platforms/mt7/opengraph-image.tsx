import { forexaaOgImage, ogSize } from "@/lib/seo/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "FOREXAA MT7";

export default function OpengraphImage() {
  return forexaaOgImage({ title: "mt7", section: "PLATFORMS" });
}
