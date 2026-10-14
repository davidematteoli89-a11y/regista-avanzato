import { SubstackCTA } from "./SubstackCTA";

export function NewsletterCTA() {
  return (
    <section className="newsletter-magazine-cta">
      <div>
        <span className="eyebrow">Newsletter</span>
        <h2>Segui il progetto fuori dal rumore quotidiano</h2>
        <p>
          Storie, tattica, cultura e attualità calcistica direttamente nella tua
          inbox, sul canale Substack ufficiale di Regista Avanzato.
        </p>
      </div>
      <SubstackCTA label="Iscriviti gratis" compact />
    </section>
  );
}
