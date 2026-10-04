import Link from "next/link";
import { PublicDataBadge } from "@/components/public/PublicDataBadge";
import { PublicStandingsTable } from "@/components/public/PublicStandingsTable";
import { getPublicCompetitionBundleBySlug } from "@/lib/public-data/readers";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function PublicCompetitionDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const bundle = await getPublicCompetitionBundleBySlug(slug);

  if (!bundle.competition) {
    return (
      <main className="stack" aria-labelledby="public-competition-empty-title">
        <header>
          <span className="eyebrow">Public data only</span>
          <h1 id="public-competition-empty-title">Competizione non ancora disponibile</h1>
          <p>
            I dati pubblici per questa competizione non sono ancora stati
            pubblicati o non hanno superato la revisione editoriale.
          </p>
        </header>

        <section className="preview-block" aria-labelledby="public-competition-note-title">
          <span className="stats-badge">Revisione editoriale</span>
          <h2 id="public-competition-note-title">Dati in preparazione</h2>
          <p>
            Squadre, classifiche e riepiloghi saranno visibili qui solo quando
            verranno approvati per la consultazione pubblica.
          </p>
        </section>

        <section className="public-stats-grid" aria-label="Stato della pubblicazione">
          <article className="public-stat-card">
            <span className="stats-badge">Accesso pubblico</span>
            <h2>Nessun dato approvato</h2>
            <p>
              Questa pagina non usa scorciatoie verso contenuti interni o dati di
              staging.
            </p>
          </article>
          <article className="public-stat-card">
            <span className="stats-badge">Sicurezza</span>
            <h2>Solo lettura</h2>
            <p>
              La pagina mostra esclusivamente risultati dei public reader e non
              avvia import, sincronizzazioni o modifiche.
            </p>
          </article>
          <article className="public-stat-card">
            <span className="stats-badge">Prossimo passo</span>
            <h2>Revisione editoriale</h2>
            <p>
              Quando i dati saranno approvati, qui compariranno riepilogo,
              squadre e classifica pubblica.
            </p>
          </article>
        </section>

        <section className="empty-public-state" aria-live="polite">
          <span className="stats-badge">Public data only</span>
          <h2>Dati competizione non ancora disponibili.</h2>
          <p>
            Quando una competizione sarà pubblica, questa pagina mostrerà solo
            informazioni filtrate dai public reader.
          </p>
          <Link className="button-link" href="/competitions">
            Torna alle competizioni
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="stack" aria-labelledby="public-competition-title">
      <header>
        <Link href="/competitions">← Torna alle competizioni</Link>
        <span className="eyebrow">Public data only</span>
        <h1 id="public-competition-title">{bundle.competition.name}</h1>
        <p>
          {[bundle.competition.country, bundle.competition.season].filter(Boolean).join(" · ") ||
            "Dettagli in aggiornamento"}
        </p>
      </header>

      <section className="public-stats-grid" aria-label="Riepilogo pubblico competizione">
        <article className="public-stat-card">
          <PublicDataBadge>Competizione pubblica</PublicDataBadge>
          <h2>{bundle.competition.name}</h2>
          <p>
            {[bundle.competition.country, bundle.competition.season].filter(Boolean).join(" · ") ||
              "Dettagli in aggiornamento"}
          </p>
        </article>
        <article className="public-stat-card">
          <span className="stats-badge">Squadre</span>
          <h2>{bundle.teams.length}</h2>
          <p>Squadre visibili nella scheda pubblica della competizione.</p>
        </article>
        <article className="public-stat-card">
          <span className="stats-badge">Classifica</span>
          <h2>{bundle.standings.length} righe</h2>
          <p>Righe classifica approvate per la consultazione senza login.</p>
        </article>
      </section>

      <section className="public-stat-card" aria-labelledby="public-teams-title">
        <h2 id="public-teams-title">Squadre pubbliche</h2>
        {bundle.teams.length > 0 ? (
          <ul>
            {bundle.teams.map((team) => (
              <li key={team.id}>
                {team.name}
                {team.shortName ? ` · ${team.shortName}` : ""}
              </li>
            ))}
          </ul>
        ) : (
          <p>Dati squadre non ancora disponibili.</p>
        )}
      </section>

      <section className="public-stat-card" aria-labelledby="public-standings-title">
        <h2 id="public-standings-title">Classifica pubblica</h2>
        <PublicStandingsTable standings={bundle.standings} />
      </section>

      <section className="preview-block" aria-labelledby="public-data-safety-title">
        <PublicDataBadge>Sola lettura</PublicDataBadge>
        <h2 id="public-data-safety-title">Dati pubblici verificati</h2>
        <p>
          Questa pagina non contiene azioni operative e non usa fallback verso
          dati interni. Se un dato non è pubblico, resta nascosto.
        </p>
      </section>
    </main>
  );
}
