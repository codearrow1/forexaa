import { forexaaOgImage, ogSize } from "@/lib/seo/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "FOREXAA — Infrastructure";

export default function OpengraphImage() {
  return forexaaOgImage({
    title: "Liquidity, Payments, Risk & APIs",
    section: "Infrastructure",
  });
}
