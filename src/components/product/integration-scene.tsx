import { ScrollScene } from "@/components/story/primitives";
import { Heading } from "@/components/ui/heading";
import { GlassPanel } from "@/components/marketing/market-grid";
import { IntegrationNode, IllustrativeTag } from "@/components/product/visuals";

/**
 * IntegrationScene (Phase 13 §7): a non-pinned, motion-light topology that
 * replaces the retired HorizontalStory. Shows this product at the centre
 * with its integration surface around it.
 *
 * Conceptual only — no live-connection or performance claims.
 */
export function IntegrationScene({
  name,
  items,
}: {
  name: string;
  items: readonly string[];
}) {
  if (items.length === 0) return null;
  return (
    <ScrollScene className="!py-16">
      <div className="flex flex-col gap-5">
        <Heading
          eyebrow="Integrations"
          level={2}
          description="Conceptual — the exact topology is scoped to your deployment."
        >
          Where {name} plugs in
        </Heading>
        <GlassPanel className="p-6 md:p-8">
          <div className="flex flex-col items-center gap-3">
            <IntegrationNode label={name} detail="This product" tone="cyan" />
            <span aria-hidden="true" className="h-5 w-px bg-border-strong" />
            <span aria-hidden="true" className="hidden h-px w-64 bg-border-strong sm:block" />
            <div className="flex flex-wrap justify-center gap-3">
              {items.map((item, i) => (
                <IntegrationNode
                  key={item}
                  label={item}
                  tone={i % 2 === 0 ? "violet" : "mint"}
                />
              ))}
            </div>
          </div>
          <div className="mt-6 text-center">
            <IllustrativeTag label="Conceptual connections" />
          </div>
        </GlassPanel>
      </div>
    </ScrollScene>
  );
}
