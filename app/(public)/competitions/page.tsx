import Link from "next/link";
import { getPublicCompetitions } from "@/lib/public-data/readers";

export const dynamic = "force-dynamic";

export default async function PublicCompetitionsPage() {
  const competitions = await getPublicCompetitions();

  return (
    <main className="stack" aria-labelledby="public-competitions-title">
      <header>
        <span className="eyebrow">Public data only</span>
        <h1 id="public-competitions-title">Competizioni</h1>
        <p>
          Statistiche, classifiche e racconti saranno pubblicati qui solo dopo
          revisione editoriale e controllo di visibilità pubblica.
        </p>
      </header>

      <section className="preview-block" aria-labelledby="public-data-note-title">
        <span className="stats-badge">Dati pubblici in arrivo</span>
        <h2 id="public-data-note-title">Solo contenuti approvati</h2>
        <p>
          Questa sezione mostra esclusivamente dati con visibilità pubblica.
          Le bozze e i dati di staging restano fuori dalla consultazione esterna.
        </p>
      </section>

      <section className="public-stats-grid" aria-label="Come funzionerà la sezione">
        <article className="public-stat-card">
          <span className="stats-badge">Revisione</span>
          <h2>Pubblicazione controllata</h2>
          <p>
            Ogni competizione passa da un controllo editoriale prima di comparire
            nelle pagine pubbliche.
          </p>
        </article>
        <article className="public-stat-card">
          <span className="stats-badge">Lettura pubblica</span>
          <h2>Dati filtrati</h2>
          <p>
            Le pagine pubbliche leggono soltanto record approvati per la
            consultazione esterna.
          </p>
        </article>
        <article className="public-stat-card">
          <span className="stats-badge">In preparazione</span>
          <h2>Prime coperture</h2>
          <p>
            Stiamo preparando le prime competizioni pubbliche con classifiche e
            schede sintetiche.
          </p>
        </article>
      </section>

      {competitions.items.length > 0 ? (
        <section className="public-stats-grid" aria-label="Competizioni pubbliche">
          {competitions.items.map((competition) => (
            <article className="public-stat-card" key={competition.id}>
              <span className="stats-badge">Public data only</span>
              <h2>{competition.name}</h2>
              <p>
                {[competition.country, competition.season].filter(Boolean).join(" · ") ||
                  "Dettagli in aggiornamento"}
              </p>
              <Link href={`/competitions/${competition.slug}`}>Apri dettaglio</Link>
            </article>
          ))}
        </section>
      ) : (
        <section className="empty-public-state" aria-live="polite">
          <span className="stats-badge">Public data only</span>
          <h2>Competizioni non ancora disponibili.</h2>
          <p>
            Dati non ancora disponibili. La consultazione pubblica partirà quando
            le prime competizioni saranno state approvate.
          </p>
          <Link className="button-link" href="/">
            Torna alla home
          </Link>
        </section>
      )}
    </main>
  );
}
