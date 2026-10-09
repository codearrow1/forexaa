import { getRoute, buildPageSeo } from "@/lib/seo/page-meta";
import { JsonLdGraph } from "@/components/shared/json-ld";
import { ProductPage } from "@/components/templates/product-page";
import { socialCopy } from "@/content/products";
import { SocialCopyVisual, SocialCopyInterfaceScene } from "@/components/product/page-visuals";

const route = getRoute("/solutions/social-copy");
const seo = buildPageSeo(route);
export const metadata = seo.metadata;

export default function Page() {
  return (
    <>
      <JsonLdGraph nodes={seo.jsonLd} />
      <ProductPage
        path="/solutions/social-copy"
        product={socialCopy}
        visual={<SocialCopyVisual />}
        interfaceScene={<SocialCopyInterfaceScene />}
        
      />
    </>
  );
}
