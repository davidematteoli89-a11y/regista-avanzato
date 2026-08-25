import { SubstackCTA } from "./SubstackCTA";

export function NewsletterCTA() {
  return <section className="newsletter-magazine-cta"><div><span className="eyebrow">Digest settimanale</span><h2>Le storie migliori, nella tua settimana</h2><p>Il canale newsletter resta su Substack: nessun pagamento o premium interno è gestito dal sito.</p></div><SubstackCTA label="Iscriviti gratis" compact /></section>;
}
