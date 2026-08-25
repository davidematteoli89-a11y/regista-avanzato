import type { NewsletterDigestPreview, NewsletterPreviewItem } from "@/lib/substack/substackTypes";
import { SubstackCTA } from "./SubstackCTA";

function PreviewSection({ title, items }: { title: string; items: readonly NewsletterPreviewItem[] }) {
  return <section><h3>{title}</h3><div className="newsletter-preview-list">{items.map((item) => <article key={item.id}><strong>{item.title}</strong><p>{item.description}</p>{item.officialLinkOnly && <span className="muted">Solo link ufficiale</span>}</article>)}</div></section>;
}

export function NewsletterPreview({ digest }: { digest: NewsletterDigestPreview }) {
  return (
    <article className="newsletter-preview stack">
      <header><span className="eyebrow">Digest gratuito — esempio mock</span><h2>{digest.weekTitle}</h2><p>{digest.intro}</p></header>
      <PreviewSection title="3 storie" items={digest.stories} />
      <PreviewSection title="3 talenti da seguire" items={digest.talents} />
      <PreviewSection title="3 video/link highlights ufficiali" items={digest.highlights} />
      <PreviewSection title="La partita pazza" items={[digest.crazyMatch]} />
      <PreviewSection title="Historical Echo" items={[digest.historicalEcho]} />
      <SubstackCTA label={digest.finalCta} compact />
    </article>
  );
}
