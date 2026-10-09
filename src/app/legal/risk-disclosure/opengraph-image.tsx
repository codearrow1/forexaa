import { forexaaOgImage, ogSize } from "@/lib/seo/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "FOREXAA Risk Disclosure";

export default function OpengraphImage() {
  return forexaaOgImage({ title: "Risk Disclosure", section: "Legal" });
}
