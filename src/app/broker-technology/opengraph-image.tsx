import { forexaaOgImage, ogSize } from "@/lib/seo/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "FOREXAA — Broker Technology";

export default function OpengraphImage() {
  return forexaaOgImage({
    title: "Forex CRM, Back Office & Trader's Room",
    section: "Broker Technology",
  });
}
