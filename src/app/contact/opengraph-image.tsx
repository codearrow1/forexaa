import { forexaaOgImage, ogSize } from "@/lib/seo/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "FOREXAA Contact — Talk to the Team or Request Pricing";

export default function OpengraphImage() {
  return forexaaOgImage({ title: "Talk to the FOREXAA team", section: "Contact" });
}
