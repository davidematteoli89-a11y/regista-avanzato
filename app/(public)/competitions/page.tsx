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
          Statistiche, classifiche e storie saranno pubblicate qui dopo la
          revisione editoriale.
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
            I dati pubblici saranno visibili solo dopo revisione e pubblicazione.
            Nel frattempo puoi tornare alla homepage editoriale.
          </p>
          <Link className="button-link" href="/">
            Torna alla home
          </Link>
        </section>
      )}
    </main>
  );
}
