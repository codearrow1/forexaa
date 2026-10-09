export interface FaqItem {
  question: string;
  answer: string;
}

/**
 * Reusable FAQ section (Rule 37). Native <details> = accessible, no JS,
 * reduced-motion safe. Items must be genuine buyer questions, concise.
 */
export function FaqAccordion({
  items,
  title = "Frequently asked questions",
}: {
  items: readonly FaqItem[];
  title?: string;
}) {
  if (items.length === 0) return null;
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6">
      <h2 className="type-section text-center">{title}</h2>
      <div className="flex flex-col gap-2.5">
        {items.map((faq) => (
          <details
            key={faq.question}
            className="group rounded-xl border border-border bg-surface p-5 [&_summary::-webkit-details-marker]:hidden"
          >
            <summary className="flex cursor-pointer items-center justify-between gap-4 type-body font-semibold text-text">
              {faq.question}
              <span
                aria-hidden="true"
                className="text-text-muted transition-transform duration-(--duration-fast) group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="mt-3 type-small text-text-muted">{faq.answer}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
