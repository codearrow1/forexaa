import { forexaaOgImage, ogSize } from "@/lib/seo/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "FOREXAA CRM";

export default function OpengraphImage() {
  return forexaaOgImage({ title: "crm", section: "BROKER-TECHNOLOGY" });
}
