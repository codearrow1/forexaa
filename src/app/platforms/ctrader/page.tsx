import { getRoute, buildPageSeo } from "@/lib/seo/page-meta";
import { JsonLdGraph } from "@/components/shared/json-ld";
import { ProductPage } from "@/components/templates/product-page";
import { ctrader } from "@/content/products";
import { CtraderVisual, CtraderInterfaceScene } from "@/components/product/page-visuals";

const route = getRoute("/platforms/ctrader");
const seo = buildPageSeo(route);
export const metadata = seo.metadata;

export default function Page() {
  return (
    <>
      <JsonLdGraph nodes={seo.jsonLd} />
      <ProductPage
        path="/platforms/ctrader"
        product={ctrader}
        visual={<CtraderVisual />}
        interfaceScene={<CtraderInterfaceScene />}
        
      />
    </>
  );
}
