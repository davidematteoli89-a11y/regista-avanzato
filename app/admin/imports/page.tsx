import { AdminImportLogList } from "@/components/admin/AdminImportLogList";
import { getAdminImports } from "@/lib/admin/getAdminImports";
import { getAdminProviderImportRuns } from "@/lib/admin/adminProviderImportRuns";
import { getManualFixturePreview } from "@/lib/provider/manualFixtures";

function formatBoolean(value: boolean) {
  return value ? "true" : "false";
}

function formatNumber(value: number | null) {
  return value === null ? "—" : String(value);
}

function formatDate(value: string | null) {
  if (!value) return "—";
  return new Intl.DateTimeFormat("it-IT", {
    dateStyle: "short",
    timeStyle: "short",
    timeZone: "UTC",
  }).format(new Date(value));
}

function formatValidationList(items: string[]) {
  return items.length === 0 ? "none" : items.join(", ");
}

export default async function AdminImportsPage() {
  const manualFixturePreview = getManualFixturePreview();
  const [logs, importRuns] = await Promise.all([
    getAdminImports(),
    getAdminProviderImportRuns(),
  ]);

  return (
    <main className="admin-page">
      <header>
        <h2>Import</h2>
        <p>
          Pipeline dry-run/mock. Nessun provider reale è attivo; dati manuali/mock e fixture
          locali restano l&apos;unico percorso consentito. Nessuna fetch, run o scrittura.
        </p>
      </header>

      <section className="admin-section-card">
        <div className="admin-card-head">
          <div>
            <h2>Manual fixture preview</h2>
            <p className="muted">
              Nessun provider reale è attivo. Questa schermata mostra solo fixture locali/manuali
              in modalità read-only. Nessun dato viene importato nel database.
            </p>
          </div>
          <div className="admin-badge-row">
            <span className="admin-safety-badge">Read-only</span>
            <span className="admin-safety-badge">No DB write</span>
            <span className="admin-safety-badge">Provider suspended</span>
            <span className="admin-safety-badge">Manual/mock mode</span>
          </div>
        </div>

        <div className="stats-grid admin-stats-grid">
          <div className="admin-stat-card">
            <span>Competizioni fixture</span>
            <strong>{manualFixturePreview.competitionsCount}</strong>
          </div>
          <div className="admin-stat-card">
            <span>Squadre fixture</span>
            <strong>{manualFixturePreview.teamsCount}</strong>
          </div>
          <div className="admin-stat-card">
            <span>Righe classifica</span>
            <strong>{manualFixturePreview.standingsRowsCount}</strong>
          </div>
          <div className="admin-stat-card">
            <span>Reference valid</span>
            <strong>{formatBoolean(manualFixturePreview.referencesValid)}</strong>
          </div>
          <div className="admin-stat-card">
            <span>Mapping teorico</span>
            <strong>{formatBoolean(manualFixturePreview.mappingTheoreticalPossible)}</strong>
          </div>
          <div className="admin-stat-card">
            <span>DB write</span>
            <strong>{formatBoolean(manualFixturePreview.dbWrite)}</strong>
          </div>
        </div>

        <dl className="admin-metadata">
          <dt>TheStatsAPI / Stats API</dt>
          <dd>suspended</dd>
          <dt>API-Football</dt>
          <dd>suspended/no retry</dd>
          <dt>Apify</dt>
          <dd>off</dd>
          <dt>Manual data</dt>
          <dd>active/safe</dd>
          <dt>Mock data</dt>
          <dd>active/safe</dd>
          <dt>Real imports</dt>
          <dd>disabled</dd>
          <dt>External fetch</dt>
          <dd>{formatBoolean(manualFixturePreview.externalFetch)}</dd>
          <dt>Token read</dt>
          <dd>{formatBoolean(manualFixturePreview.tokenRead)}</dd>
          <dt>Token printed</dt>
          <dd>{formatBoolean(manualFixturePreview.tokenPrinted)}</dd>
        </dl>

        <div className="admin-warning">
          <strong>Validazione fixture</strong>
          <ul>
            <li>missing_required_fields: {formatValidationList(manualFixturePreview.missingRequiredFields)}</li>
            <li>reference_errors: {formatValidationList(manualFixturePreview.referenceErrors)}</li>
            <li>warnings: {formatValidationList(manualFixturePreview.warnings)}</li>
            <li>errors: {formatValidationList(manualFixturePreview.errors)}</li>
          </ul>
        </div>

        <div className="table-scroll">
          <table className="stats-table admin-table">
            <thead>
              <tr>
                <th>Competition ID</th>
                <th>Name</th>
                <th>Country</th>
                <th>Category</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {manualFixturePreview.competitions.map((competition) => (
                <tr key={competition.provider_competition_id}>
                  <td>{competition.provider_competition_id}</td>
                  <td>{competition.name}</td>
                  <td>{competition.country}</td>
                  <td>{competition.category}</td>
                  <td>{competition.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="table-scroll">
          <table className="stats-table admin-table">
            <thead>
              <tr>
                <th>Team ID</th>
                <th>Name</th>
                <th>Competition ref</th>
                <th>Country</th>
              </tr>
            </thead>
            <tbody>
              {manualFixturePreview.teams.map((team) => (
                <tr key={team.provider_team_id}>
                  <td>{team.provider_team_id}</td>
                  <td>{team.name}</td>
                  <td>{team.provider_competition_id}</td>
                  <td>{team.country}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="table-scroll">
          <table className="stats-table admin-table">
            <thead>
              <tr>
                <th>Competition ID</th>
                <th>Team ID</th>
                <th>Rank</th>
                <th>Played</th>
                <th>W</th>
                <th>D</th>
                <th>L</th>
                <th>GF</th>
                <th>GA</th>
                <th>Pts</th>
              </tr>
            </thead>
            <tbody>
              {manualFixturePreview.standings.map((standing) => (
                <tr key={`${standing.provider_competition_id}-${standing.provider_team_id}`}>
                  <td>{standing.provider_competition_id}</td>
                  <td>{standing.provider_team_id}</td>
                  <td>{standing.rank}</td>
                  <td>{standing.played}</td>
                  <td>{standing.wins}</td>
                  <td>{standing.draws}</td>
                  <td>{standing.losses}</td>
                  <td>{standing.goals_for}</td>
                  <td>{standing.goals_against}</td>
                  <td>{standing.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="admin-section-card">
        <div className="admin-card-head">
          <div>
            <h2>Provider import runs</h2>
            <p className="muted">
              Lettura server-side read-only da <code>provider_import_runs</code>, rispettando RLS.
            </p>
          </div>
          <div className="admin-badge-row">
            <span className="admin-safety-badge">Read-only</span>
            <span className="admin-safety-badge">Provider off</span>
            <span className="admin-safety-badge">Apify off</span>
            <span className="admin-safety-badge">Manual/mock available</span>
            <span className="admin-safety-badge">Real imports disabled</span>
            <span className="admin-safety-badge">realWritesEnabled=false</span>
          </div>
        </div>

        {importRuns.warning ? <p className="admin-warning">{importRuns.warning}</p> : null}

        {importRuns.source === "empty" ? (
          <div className="admin-empty">
            <strong>Non ci sono ancora import run registrate.</strong>
            <span>
              È corretto in staging: i provider reali, Apify, import live e scritture sono
              ancora disabilitati. Eventuali prove restano limitate a mock/manual data e
              dry-run locali da fixture.
            </span>
          </div>
        ) : null}

        {importRuns.runs.length > 0 ? (
          <div className="table-scroll">
            <table className="stats-table admin-table">
              <thead>
                <tr>
                  <th>Batch</th>
                  <th>Provider</th>
                  <th>Competizione</th>
                  <th>Mode</th>
                  <th>Status</th>
                  <th>Fetch</th>
                  <th>DB write</th>
                  <th>Costi</th>
                  <th>Record</th>
                  <th>Warnings</th>
                  <th>Created</th>
                </tr>
              </thead>
              <tbody>
                {importRuns.runs.map((run) => (
                  <tr key={run.id}>
                    <td>{run.batchId}</td>
                    <td>{run.providerKey}</td>
                    <td>{run.competitionSlug ?? "—"}</td>
                    <td>{run.mode}</td>
                    <td>{run.status}</td>
                    <td>{formatBoolean(run.externalFetch)}</td>
                    <td>{formatBoolean(run.dbWrite)}</td>
                    <td>
                      stimato {formatNumber(run.estimatedCost)} € · reale{" "}
                      {formatNumber(run.actualCost)} €
                    </td>
                    <td>
                      planned {run.recordsPlanned} · inserted {run.recordsInserted} · updated{" "}
                      {run.recordsUpdated} · skipped {run.recordsSkipped}
                    </td>
                    <td>{run.warningsCount}</td>
                    <td>{formatDate(run.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
      </section>

      <AdminImportLogList logs={logs} />
    </main>
  );
}
