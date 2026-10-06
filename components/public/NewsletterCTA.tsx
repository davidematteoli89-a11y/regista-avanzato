import { SubstackCTA } from "./SubstackCTA";

export function NewsletterCTA() {
  return (
    <section className="newsletter-magazine-cta">
      <div>
        <span className="eyebrow">Newsletter</span>
        <h2>Segui il progetto fuori dal rumore quotidiano</h2>
        <p>
          La newsletter raccoglierà storie, campionati radar e segnali editoriali.
          Se Substack non è configurato, la CTA resta disabilitata senza URL inventate.
        </p>
      </div>
      <SubstackCTA label="Iscriviti gratis" compact />
    </section>
  );
}
