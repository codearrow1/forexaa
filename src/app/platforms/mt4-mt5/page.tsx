import { getRoute, buildPageSeo } from "@/lib/seo/page-meta";
import { JsonLdGraph } from "@/components/shared/json-ld";
import { ProductPage } from "@/components/templates/product-page";
import { mt4Mt5 } from "@/content/products";
import { Mt4Mt5Visual, Mt4Mt5InterfaceScene } from "@/components/product/page-visuals";

const route = getRoute("/platforms/mt4-mt5");
const seo = buildPageSeo(route);
export const metadata = seo.metadata;

export default function Page() {
  return (
    <>
      <JsonLdGraph nodes={seo.jsonLd} />
      <ProductPage
        path="/platforms/mt4-mt5"
        product={mt4Mt5}
        visual={<Mt4Mt5Visual />}
        interfaceScene={<Mt4Mt5InterfaceScene />}
        
      />
    </>
  );
}
