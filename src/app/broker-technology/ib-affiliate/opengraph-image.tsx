import { forexaaOgImage, ogSize } from "@/lib/seo/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "FOREXAA IB AFFILIATE";

export default function OpengraphImage() {
  return forexaaOgImage({ title: "ib affiliate", section: "BROKER-TECHNOLOGY" });
}
