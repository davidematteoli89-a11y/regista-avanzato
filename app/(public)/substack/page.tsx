import { SubstackPlanCard } from "@/components/public/SubstackPlanCard";
import { SubstackReportPreview } from "@/components/public/SubstackReportPreview";
import { MOCK_PAID_REPORT, SUBSTACK_PLANS } from "@/lib/substack/substackPlans";

export default function SubstackPage() {
  return (
    <main className="stack">
      <header>
        <span className="eyebrow">Canale editoriale esterno</span>
        <h1>Regista Avanzato su Substack</h1>
        <p>La versione free estende gratuitamente il sito; la versione paid raccoglie report editoriali più approfonditi. Pagamento e gestione dell’iscrizione restano interamente su Substack.</p>
      </header>

      <section className="substack-plans-grid">
        {SUBSTACK_PLANS.map((plan) => <SubstackPlanCard key={plan.id} plan={plan} />)}
      </section>

      <SubstackReportPreview report={MOCK_PAID_REPORT} />

      <section className="access-box">
        <h2>Cosa promettiamo — e cosa no</h2>
        <p>I contenuti sono analisi editoriali basate sulle fonti e sui dati disponibili. Non promettiamo dati live, copertura sempre completa o scouting professionale certificato.</p>
        <p>Il sito mantiene contenuti pubblici, statistiche e anteprime. Substack ospiterà digest e report editoriali free/paid; non esiste un premium interno.</p>
      </section>
    </main>
  );
}
