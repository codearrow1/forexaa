import { getRoute, buildPageSeo } from "@/lib/seo/page-meta";
import { JsonLdGraph } from "@/components/shared/json-ld";
import { ProductPage } from "@/components/templates/product-page";
import { crm } from "@/content/products";
import { CrmVisual, CrmInterfaceScene } from "@/components/product/page-visuals";

const route = getRoute("/broker-technology/crm");
const seo = buildPageSeo(route);
export const metadata = seo.metadata;

export default function Page() {
  return (
    <>
      <JsonLdGraph nodes={seo.jsonLd} />
      <ProductPage
        path="/broker-technology/crm"
        product={crm}
        visual={<CrmVisual />}
        interfaceScene={<CrmInterfaceScene />}
      />
    </>
  );
}
