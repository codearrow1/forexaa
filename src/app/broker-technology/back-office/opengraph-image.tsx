import { forexaaOgImage, ogSize } from "@/lib/seo/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "FOREXAA BACK OFFICE";

export default function OpengraphImage() {
  return forexaaOgImage({ title: "back office", section: "BROKER-TECHNOLOGY" });
}
