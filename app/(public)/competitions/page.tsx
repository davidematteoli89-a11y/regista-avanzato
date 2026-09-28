import Link from "next/link";
import { getPublicCompetitions } from "@/lib/public-data/readers";

export const dynamic = "force-dynamic";

export default async function PublicCompetitionsPage() {
  const competitions = await getPublicCompetitions();

  return (
    <main className="stack">
      <header>
        <span className="eyebrow">Public data only</span>
        <h1>Competitions</h1>
        <p>
          Competizioni pubbliche approvate per la consultazione esterna. I dati
          staging privati non vengono esposti.
        </p>
      </header>

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
            Pubblicheremo questa sezione solo quando esisteranno dati con
            visibilità pubblica. I contenuti privati di staging restano esclusi.
          </p>
        </section>
      )}
    </main>
  );
}
