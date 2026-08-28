import { Blobs, Container, Eyebrow, Reveal, SplitText } from "@/components/ui/primitives";

/** Her iç sayfanın açılışı - tutarlı ritim için tek yerden. */
export function PageHeader({
  index,
  eyebrow,
  title,
  lead,
  meta,
  gradientLastWords = 2,
}: {
  index?: string;
  eyebrow: string;
  title: string;
  lead?: string;
  meta?: string[];
  gradientLastWords?: number;
}) {
  return (
    <header className="relative overflow-hidden pb-16 pt-12 sm:pb-24 sm:pt-16">
      <Blobs tone="mixed" className="opacity-70" />
      <Container size="wide" className="relative">
        <Reveal>
          <Eyebrow index={index}>{eyebrow}</Eyebrow>
        </Reveal>

        <SplitText
          as="h1"
          text={title}
          gradientLastWords={gradientLastWords}
          className="mt-7 max-w-5xl font-display text-h1 font-extrabold text-balance"
        />

        {lead && (
          <Reveal delay={0.12}>
            <p className="mt-7 max-w-2xl text-lead text-pretty text-ink-soft">{lead}</p>
          </Reveal>
        )}

        {meta && meta.length > 0 && (
          <Reveal delay={0.2}>
            <ul className="mt-9 flex flex-wrap gap-2">
              {meta.map((m) => (
                <li
                  key={m}
                  className="rounded-(--radius-pill) border border-line bg-paper/70 px-4 py-2 text-xs font-semibold text-ink-soft backdrop-blur"
                >
                  {m}
                </li>
              ))}
            </ul>
          </Reveal>
        )}
      </Container>
    </header>
  );
}
