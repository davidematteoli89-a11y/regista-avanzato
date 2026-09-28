import Link from "next/link";
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
      <main className="stack">
        <header>
          <span className="eyebrow">Public data only</span>
          <h1>Dati competizione non ancora disponibili.</h1>
          <p>
            Questa pagina mostra solo dati approvati con visibilità pubblica. I
            dati privati di staging non vengono esposti.
          </p>
        </header>

        <section className="empty-public-state" aria-live="polite">
          <span className="stats-badge">Empty state</span>
          <h2>Nessuna competizione pubblica trovata.</h2>
          <p>
            Quando una competizione verrà resa pubblica, qui appariranno squadre
            e classifica filtrate dai public reader.
          </p>
          <Link href="/competitions">Torna alle competizioni</Link>
        </section>
      </main>
    );
  }

  return (
    <main className="stack">
      <header>
        <span className="eyebrow">Public data only</span>
        <h1>{bundle.competition.name}</h1>
        <p>
          {[bundle.competition.country, bundle.competition.season].filter(Boolean).join(" · ") ||
            "Dettagli in aggiornamento"}
        </p>
      </header>

      <section className="public-stat-card">
        <h2>Squadre pubbliche</h2>
        {bundle.teams.length > 0 ? (
          <ul>
            {bundle.teams.map((team) => (
              <li key={team.id}>{team.name}</li>
            ))}
          </ul>
        ) : (
          <p>Dati squadre non ancora disponibili.</p>
        )}
      </section>

      <section className="public-stat-card">
        <h2>Classifica pubblica</h2>
        {bundle.standings.length > 0 ? (
          <div className="table-scroll">
            <table className="stats-table">
              <thead>
                <tr>
                  <th>Pos.</th>
                  <th>Squadra</th>
                  <th>Punti</th>
                  <th>Giocate</th>
                </tr>
              </thead>
              <tbody>
                {bundle.standings.map((standing) => (
                  <tr key={standing.id}>
                    <td>{standing.rank}</td>
                    <td>{standing.teamName}</td>
                    <td>{standing.points}</td>
                    <td>{standing.played}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>Dati classifica non ancora disponibili.</p>
        )}
      </section>
    </main>
  );
}
