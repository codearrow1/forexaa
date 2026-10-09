import { getRoute, buildPageSeo } from "@/lib/seo/page-meta";
import { JsonLdGraph } from "@/components/shared/json-ld";
import { ProductPage } from "@/components/templates/product-page";
import { backOffice } from "@/content/products";
import { BackOfficeVisual, BackOfficeInterfaceScene } from "@/components/product/page-visuals";

const route = getRoute("/broker-technology/back-office");
const seo = buildPageSeo(route);
export const metadata = seo.metadata;

export default function Page() {
  return (
    <>
      <JsonLdGraph nodes={seo.jsonLd} />
      <ProductPage
        path="/broker-technology/back-office"
        product={backOffice}
        visual={<BackOfficeVisual />}
        interfaceScene={<BackOfficeInterfaceScene />}
        
      />
    </>
  );
}
