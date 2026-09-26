import Link from "next/link";
import { getManualCompetitionBySlugReadOnly } from "@/lib/manual-data/readers";

type Params = { slug: string };

function formatNullable(value: string | number | null | undefined) {
  return value === null || value === undefined || value === "" ? "—" : String(value);
}

export default async function AdminManualCompetitionDetailPage({
  params,
}: {
  params: Params | Promise<Params>;
}) {
  const { slug } = await Promise.resolve(params);
  const decodedSlug = decodeURIComponent(slug);
  const result = await getManualCompetitionBySlugReadOnly(decodedSlug);

  if (!result.competition) {
    return (
      <main className="admin-page">
        <header>
          <h2>Manual competition non trovata</h2>
          <p>Reader read-only senza scritture. Nessun dato pubblico esposto.</p>
          <Link href="/admin/data/competitions">Torna alle manual competitions</Link>
        </header>
        {result.warning ? <p className="admin-warning">{result.warning}</p> : null}
      </main>
    );
  }

  const competition = result.competition;

  return (
    <main className="admin-page">
      <header>
        <h2>{competition.name}</h2>
        <p>Dettaglio admin read-only per competition manuale staging.</p>
        <p>
          <Link href="/admin/data/competitions">Torna alle manual competitions</Link>
        </p>
      </header>

      <section className="admin-section-card">
        <div className="admin-card-head">
          <div>
            <h2>Competition summary</h2>
            <p className="muted">Nessuna azione di scrittura disponibile.</p>
          </div>
          <div className="admin-badge-row">
            <span className="admin-safety-badge">Read-only</span>
            <span className="admin-safety-badge">Admin only</span>
            <span className="admin-safety-badge">Public disabled</span>
            <span className="admin-safety-badge">Provider off</span>
          </div>
        </div>
        <dl className="admin-metadata">
          <dt>Name</dt>
          <dd>{competition.name}</dd>
          <dt>Slug / internal key</dt>
          <dd>{formatNullable(competition.slug ?? competition.internalKey)}</dd>
          <dt>API competition id</dt>
          <dd>{formatNullable(competition.apiCompetitionId)}</dd>
          <dt>Country</dt>
          <dd>{formatNullable(competition.country)}</dd>
          <dt>Season</dt>
          <dd>{formatNullable(competition.season)}</dd>
          <dt>Status</dt>
          <dd>{formatNullable(competition.status)}</dd>
          <dt>Visibility</dt>
          <dd>{formatNullable(competition.visibility)}</dd>
          <dt>Point 45 DB write</dt>
          <dd>false</dd>
        </dl>
        {result.warning ? <p className="admin-warning">{result.warning}</p> : null}
      </section>

      <section className="admin-section-card">
        <h2>Teams</h2>
        {result.teams.length === 0 ? (
          <p className="admin-empty-inline">Nessuna squadra manuale leggibile.</p>
        ) : (
          <div className="table-scroll">
            <table className="stats-table admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Short name</th>
                  <th>API team id</th>
                  <th>Country</th>
                  <th>Status</th>
                  <th>Visibility</th>
                </tr>
              </thead>
              <tbody>
                {result.teams.map((team) => (
                  <tr key={team.id}>
                    <td>{team.name}</td>
                    <td>{formatNullable(team.shortName)}</td>
                    <td>{formatNullable(team.apiTeamId)}</td>
                    <td>{formatNullable(team.country)}</td>
                    <td>{formatNullable(team.status)}</td>
                    <td>{formatNullable(team.visibility)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="admin-section-card">
        <h2>Standings</h2>
        {result.standings.length === 0 ? (
          <p className="admin-empty-inline">Nessuna classifica manuale leggibile.</p>
        ) : (
          <div className="table-scroll">
            <table className="stats-table admin-table">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Team</th>
                  <th>Played</th>
                  <th>Won</th>
                  <th>Drawn</th>
                  <th>Lost</th>
                  <th>GF</th>
                  <th>GA</th>
                  <th>GD</th>
                  <th>Points</th>
                  <th>Stage</th>
                  <th>Matchday</th>
                  <th>Status</th>
                  <th>Visibility</th>
                </tr>
              </thead>
              <tbody>
                {result.standings.map((standing) => (
                  <tr key={standing.id}>
                    <td>{standing.rank}</td>
                    <td>{standing.teamName} · {formatNullable(standing.teamApiId)}</td>
                    <td>{standing.played}</td>
                    <td>{standing.won}</td>
                    <td>{standing.drawn}</td>
                    <td>{standing.lost}</td>
                    <td>{standing.goalsFor}</td>
                    <td>{standing.goalsAgainst}</td>
                    <td>{standing.goalDifference}</td>
                    <td>{standing.points}</td>
                    <td>{formatNullable(standing.stage)}</td>
                    <td>{formatNullable(standing.matchday)}</td>
                    <td>{formatNullable(standing.status)}</td>
                    <td>{formatNullable(standing.visibility)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}
