import { getRoute, buildPageSeo } from "@/lib/seo/page-meta";
import { JsonLdGraph } from "@/components/shared/json-ld";
import { ProductPage } from "@/components/templates/product-page";
import { mt7 } from "@/content/products";
import { Mt7Visual, Mt7InterfaceScene } from "@/components/product/page-visuals";

const route = getRoute("/platforms/mt7");
const seo = buildPageSeo(route);
export const metadata = seo.metadata;

export default function Page() {
  return (
    <>
      <JsonLdGraph nodes={seo.jsonLd} />
      <ProductPage
        path="/platforms/mt7"
        product={mt7}
        visual={<Mt7Visual />}
        interfaceScene={<Mt7InterfaceScene />}
        
      />
    </>
  );
}
