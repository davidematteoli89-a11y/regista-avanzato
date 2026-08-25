import Link from "next/link";
import { NewsletterPreview } from "@/components/public/NewsletterPreview";
import { SubstackPlanCard } from "@/components/public/SubstackPlanCard";
import { MOCK_WEEKLY_DIGEST, SUBSTACK_FREE_PLAN } from "@/lib/substack/substackPlans";

export default function NewsletterPage() {
  return (
    <main className="stack">
      <header>
        <span className="eyebrow">Newsletter gratuita</span>
        <h1>La settimana di Regista Avanzato, su Substack</h1>
        <p>Un digest editoriale gratuito con storie, talenti, link highlights ufficiali, una partita pazza e un collegamento storico.</p>
      </header>

      <section className="newsletter-intro-grid">
        <SubstackPlanCard plan={SUBSTACK_FREE_PLAN} />
        <aside className="access-box">
          <span className="eyebrow">Account gratuito sul sito</span>
          <h2>Continua l’esplorazione su Regista Avanzato</h2>
          <p>Il login free dà accesso alle statistiche complete, ai link highlights ufficiali e al Video Radar completo. La newsletter resta un canale esterno separato.</p>
          <div className="actions"><Link className="button-link" href="/registrati">Registrati gratis</Link><Link href="/login">Accedi</Link></div>
        </aside>
      </section>

      <NewsletterPreview digest={MOCK_WEEKLY_DIGEST} />
      <p className="notice">Questa è un’anteprima mock: nessuna newsletter viene generata, inviata o pubblicata automaticamente.</p>
    </main>
  );
}
