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
        <span className="eyebrow">Public data only</span>
        <h1 id="public-competitions-title">Competizioni pubbliche</h1>
        <p>
          Archivio pubblico delle competizioni approvate: dati essenziali,
          squadre e classifiche leggibili senza login.
        </p>
      </header>

      <section className="preview-block" aria-labelledby="public-data-note-title">
        <PublicDataBadge>Dati pubblici approvati</PublicDataBadge>
        <h2 id="public-data-note-title">Coperture disponibili: {competitions.items.length}</h2>
        <p>
          Questa sezione mostra esclusivamente record `public_free` letti dai
          public reader. Nessuna bozza interna o contenuto riservato viene usato
          come fallback.
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
          <span className="stats-badge">Disponibili ora</span>
          <h2>{competitions.items.length} competizioni</h2>
          <p>
            Le pagine pubbliche leggono soltanto competizioni approvate e
            collegate a squadre/classifiche pubbliche.
          </p>
        </article>
        <article className="public-stat-card">
          <span className="stats-badge">Sola lettura</span>
          <h2>Nessuna azione operativa</h2>
          <p>
            La navigazione non avvia import, sincronizzazioni o modifiche ai
            dati pubblicati.
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
