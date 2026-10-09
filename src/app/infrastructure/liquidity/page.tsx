import { getRoute, buildPageSeo } from "@/lib/seo/page-meta";
import { JsonLdGraph } from "@/components/shared/json-ld";
import { ProductPage } from "@/components/templates/product-page";
import { liquidity } from "@/content/products";
import { LiquidityVisual, LiquidityInterfaceScene } from "@/components/product/page-visuals";

const route = getRoute("/infrastructure/liquidity");
const seo = buildPageSeo(route);
export const metadata = seo.metadata;

export default function Page() {
  return (
    <>
      <JsonLdGraph nodes={seo.jsonLd} />
      <ProductPage
        path="/infrastructure/liquidity"
        product={liquidity}
        visual={<LiquidityVisual />}
        interfaceScene={<LiquidityInterfaceScene />}
      />
    </>
  );
}
