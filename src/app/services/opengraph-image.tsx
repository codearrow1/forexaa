import { forexaaOgImage, ogSize } from "@/lib/seo/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "FOREXAA — Services";

export default function OpengraphImage() {
  return forexaaOgImage({
    title: "White Label, Legal & Migration Services",
    section: "Services",
  });
}
