import Link from "next/link";
import { PublicCompetitionCard } from "@/components/public/PublicCompetitionCard";
import { PublicDataBadge } from "@/components/public/PublicDataBadge";
import { getPublicCompetitions } from "@/lib/public-data/readers";

export const dynamic = "force-dynamic";

export default async function PublicCompetitionsPage() {
  const competitions = await getPublicCompetitions();

  return (
    <main className="stack" aria-labelledby="public-competitions-title">
      <header>
        <Link href="/">Home</Link>
        <span className="eyebrow">Osservatorio Regista Avanzato</span>
        <h1 id="public-competitions-title">Campionati nel radar</h1>
        <p>
          Competizioni pubbliche nel radar: una prima selezione di campionati
          monitorati da Regista Avanzato. In questa fase MVP i dati sono curati
          manualmente e servono a testare struttura, esperienza pubblica e
          racconto.
        </p>
      </header>

      <section className="preview-block" aria-labelledby="public-data-note-title">
        <PublicDataBadge>Public data only</PublicDataBadge>
        <h2 id="public-data-note-title">Competizioni disponibili: {competitions.items.length}</h2>
        <p>
          I dati visibili sono un campione pubblico iniziale. Le competizioni
          pubbliche restano curate manualmente: i provider automatici sono
          disattivati fino ad autorizzazione esplicita.
        </p>
      </section>

      <section className="public-stats-grid" aria-label="Come leggere questa sezione">
        <article className="public-stat-card">
          <span className="stats-badge">Radar</span>
          <h2>Campionati osservati</h2>
          <p>
            Ogni scheda nasce per dare un punto di ingresso leggibile a un
            campionato fuori dal racconto mainstream.
          </p>
        </article>
        <article className="public-stat-card">
          <span className="stats-badge">Disponibili ora</span>
          <h2>{competitions.items.length} competizioni</h2>
          <p>
            La selezione crescerà solo dopo nuove revisioni e autorizzazioni
            esplicite sui dati da pubblicare.
          </p>
        </article>
        <article className="public-stat-card">
          <span className="stats-badge">MVP</span>
          <h2>Dati curati manualmente</h2>
          <p>
            Questa versione valida esperienza, struttura e racconto prima di
            qualsiasi import automatico.
          </p>
        </article>
      </section>

      {competitions.items.length > 0 ? (
        <section className="public-stats-grid" aria-label="Competizioni pubbliche">
          {competitions.items.map((competition) => (
            <PublicCompetitionCard competition={competition} key={competition.id} />
          ))}
        </section>
      ) : (
        <section className="empty-public-state" aria-live="polite">
          <span className="stats-badge">MVP pubblico</span>
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
