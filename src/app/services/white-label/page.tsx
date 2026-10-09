import { getRoute, buildPageSeo } from "@/lib/seo/page-meta";
import { JsonLdGraph } from "@/components/shared/json-ld";
import { ProductPage } from "@/components/templates/product-page";
import { whiteLabel } from "@/content/products";
import { WhiteLabelVisual, WhiteLabelInterfaceScene } from "@/components/product/page-visuals";

const route = getRoute("/services/white-label");
const seo = buildPageSeo(route);
export const metadata = seo.metadata;

export default function Page() {
  return (
    <>
      <JsonLdGraph nodes={seo.jsonLd} />
      <ProductPage
        path="/services/white-label"
        product={whiteLabel}
        visual={<WhiteLabelVisual />}
        interfaceScene={<WhiteLabelInterfaceScene />}
        
      />
    </>
  );
}
