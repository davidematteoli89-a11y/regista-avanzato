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
            <h2>Point 42 manual fixture write</h2>
            <p className="muted">
              Punto 42 è stato eseguito manualmente in Supabase SQL Editor staging. Questa
              interfaccia resta solo read-only: nessuna scrittura viene eseguita dall’app.
            </p>
          </div>
          <div className="admin-badge-row">
            <span className="admin-safety-badge">Authorized</span>
            <span className="admin-safety-badge">Manual SQL only</span>
            <span className="admin-safety-badge">Provider off</span>
            <span className="admin-safety-badge">Production untouched</span>
          </div>
        </div>
        <dl className="admin-metadata">
          <dt>Point 42 authorized</dt>
          <dd>true</dd>
          <dt>Write SQL prepared</dt>
          <dd>true</dd>
          <dt>Rollback SQL prepared</dt>
          <dd>true</dd>
          <dt>Post-verify SQL prepared</dt>
          <dd>true</dd>
          <dt>Manual fixture write executed</dt>
          <dd>true</dd>
          <dt>Execution channel</dt>
          <dd>manual_sql_editor_staging</dd>
          <dt>DB write</dt>
          <dd>true</dd>
          <dt>Written competitions</dt>
          <dd>1</dd>
          <dt>Written teams</dt>
          <dd>2</dd>
          <dt>Written standings</dt>
          <dd>2</dd>
          <dt>Total written rows</dt>
          <dd>5</dd>
          <dt>Post-write verification</dt>
          <dd>passed</dd>
          <dt>Rollback executed</dt>
          <dd>false</dd>
          <dt>Provider / Apify</dt>
          <dd>off / off</dd>
          <dt>Production touched</dt>
          <dd>false</dd>
          <dt>Deploy executed</dt>
          <dd>false</dd>
        </dl>
      </section>

      <section className="admin-section-card">
        <div className="admin-card-head">
          <div>
            <h2>Point 43 read-only UI/admin verification</h2>
            <p className="muted">
              Punto 43 verifica che lo stato post-write manuale sia visibile in admin solo come
              riepilogo read-only. Non aggiunge azioni, non legge provider e non esegue nuove
              scritture DB.
            </p>
          </div>
          <div className="admin-badge-row">
            <span className="admin-safety-badge">UI read-only</span>
            <span className="admin-safety-badge">No new DB write</span>
            <span className="admin-safety-badge">Provider off</span>
            <span className="admin-safety-badge">No deploy</span>
          </div>
        </div>
        <dl className="admin-metadata">
          <dt>Point 43 verification completed</dt>
          <dd>true</dd>
          <dt>Verification mode</dt>
          <dd>read_only</dd>
          <dt>Manual fixture write executed</dt>
          <dd>true</dd>
          <dt>Written competitions / teams / standings</dt>
          <dd>1 / 2 / 2</dd>
          <dt>Total written rows</dt>
          <dd>5</dd>
          <dt>Post-write verification passed</dt>
          <dd>true</dd>
          <dt>Rollback executed</dt>
          <dd>false</dd>
          <dt>Point 43 DB write</dt>
          <dd>false</dd>
          <dt>Provider fetch / provider import</dt>
          <dd>false / false</dd>
          <dt>Apify / Production / deploy</dt>
          <dd>false / false / false</dd>
          <dt>Next write allowed</dt>
          <dd>false</dd>
        </dl>
      </section>

      <section className="admin-section-card">
        <div className="admin-card-head">
          <div>
            <h2>Point 44 manual data consumption plan</h2>
            <p className="muted">
              Punto 44 pianifica come consumare i dati manuali in superfici admin e, solo in
              futuro, pubbliche. I dati correnti restano private_admin e non vengono esposti al
              pubblico da questa pagina.
            </p>
          </div>
          <div className="admin-badge-row">
            <span className="admin-safety-badge">Plan only</span>
            <span className="admin-safety-badge">Admin first</span>
            <span className="admin-safety-badge">Public disabled</span>
            <span className="admin-safety-badge">No DB write</span>
          </div>
        </div>
        <dl className="admin-metadata">
          <dt>Manual data consumption plan created</dt>
          <dd>true</dd>
          <dt>Data consumption mode</dt>
          <dd>read_only_plan</dd>
          <dt>Suggested next surfaces</dt>
          <dd>admin competitions list, admin competition detail, admin standings table</dd>
          <dt>Available competitions / teams / standings</dt>
          <dd>1 / 2 / 2</dd>
          <dt>Current visibility</dt>
          <dd>private_admin</dd>
          <dt>Public exposure</dt>
          <dd>not_enabled</dd>
          <dt>Provider / import</dt>
          <dd>off / disabled</dd>
          <dt>Point 44 DB write</dt>
          <dd>false</dd>
          <dt>Next write allowed</dt>
          <dd>false</dd>
        </dl>
      </section>

      <section className="admin-section-card">
        <div className="admin-card-head">
          <div>
            <h2>Manual import write plan</h2>
            <p className="muted">
              Punto 40-B documenta solo il piano no-apply per una futura scrittura manuale delle
              fixture candidate create. Questa sezione non contiene azioni, form, SQL operativo o
              bottoni di import.
            </p>
          </div>
          <div className="admin-badge-row">
            <span className="admin-safety-badge">No-apply</span>
            <span className="admin-safety-badge">No DB write</span>
            <span className="admin-safety-badge">Provider off</span>
            <span className="admin-safety-badge">Next write=false</span>
          </div>
        </div>
        <dl className="admin-metadata">
          <dt>Write plan created</dt>
          <dd>true</dd>
          <dt>Mode</dt>
          <dd>no_apply</dd>
          <dt>Create candidates</dt>
          <dd>5</dd>
          <dt>Update candidates</dt>
          <dd>0</dd>
          <dt>Skip candidates</dt>
          <dd>0</dd>
          <dt>Conflict count</dt>
          <dd>0</dd>
          <dt>Unresolved count</dt>
          <dd>0</dd>
          <dt>Proposed write order</dt>
          <dd>competitions → teams → standings</dd>
          <dt>Rollback plan created</dt>
          <dd>true</dd>
          <dt>Post-write verification plan created</dt>
          <dd>true</dd>
          <dt>DB write</dt>
          <dd>false</dd>
          <dt>Next write allowed</dt>
          <dd>false</dd>
        </dl>
      </section>

      <section className="admin-section-card">
        <div className="admin-card-head">
          <div>
            <h2>Read-only live view lookup</h2>
            <p className="muted">
              Punto 40-Fix-B registra il risultato manuale della query solo-SELECT contro le
              view verificate. Supabase SQL Editor staging ha risposto con successo e zero righe;
              nessuna query viene lanciata da questa interfaccia.
            </p>
          </div>
          <div className="admin-badge-row">
            <span className="admin-safety-badge">Lookup completed</span>
            <span className="admin-safety-badge">SQL Editor manual</span>
            <span className="admin-safety-badge">No DB write</span>
            <span className="admin-safety-badge">Next write=false</span>
          </div>
        </div>
        <dl className="admin-metadata">
          <dt>Lookup query prepared</dt>
          <dd>true</dd>
          <dt>Manual execution required</dt>
          <dd>false</dd>
          <dt>Query result</dt>
          <dd>success_no_rows_returned</dd>
          <dt>Query read-only</dt>
          <dd>true</dd>
          <dt>DB write</dt>
          <dd>false</dd>
          <dt>Provider fetch</dt>
          <dd>false</dd>
          <dt>View lookup executed</dt>
          <dd>true</dd>
          <dt>Live lookup rows</dt>
          <dd>0</dd>
          <dt>Existing competitions / teams / standings</dt>
          <dd>0 / 0 / 0</dd>
          <dt>Preview mode</dt>
          <dd>read_only_lookup_completed</dd>
          <dt>Create / update / skip / conflict</dt>
          <dd>5 / 0 / 0 / 0</dd>
          <dt>Unresolved count</dt>
          <dd>0</dd>
          <dt>Next write allowed</dt>
          <dd>false</dd>
        </dl>
      </section>

      <section className="admin-section-card">
        <div className="admin-card-head">
          <div>
            <h2>Manual fixture import preview</h2>
            <p className="muted">
              Punto 40-Fix-B ha risolto la preview locale delle fixture manuali usando il
              risultato manuale read-only delle view live. Tutte le fixture restano candidate
              create; nessuna scrittura è autorizzata.
            </p>
          </div>
          <div className="admin-badge-row">
            <span className="admin-safety-badge">Preview only</span>
            <span className="admin-safety-badge">Local-only</span>
            <span className="admin-safety-badge">No DB write</span>
            <span className="admin-safety-badge">Next write=false</span>
          </div>
        </div>
        <dl className="admin-metadata">
          <dt>Preview dry-run completed</dt>
          <dd>true</dd>
          <dt>Preview mode</dt>
          <dd>read_only_lookup_completed</dd>
          <dt>Provider fetch</dt>
          <dd>false</dd>
          <dt>DB write</dt>
          <dd>false</dd>
          <dt>Import real execution</dt>
          <dd>false</dd>
          <dt>Fixtures loaded</dt>
          <dd>true</dd>
          <dt>Competitions fixture count</dt>
          <dd>1</dd>
          <dt>Teams fixture count</dt>
          <dd>2</dd>
          <dt>Standings fixture count</dt>
          <dd>2</dd>
          <dt>Views verified count</dt>
          <dd>3</dd>
          <dt>View lookup executed</dt>
          <dd>true</dd>
          <dt>Live lookup rows</dt>
          <dd>0</dd>
          <dt>Create / update / skip / conflict</dt>
          <dd>5 / 0 / 0 / 0</dd>
          <dt>Unresolved count</dt>
          <dd>0</dd>
          <dt>Next write allowed</dt>
          <dd>false</dd>
        </dl>
      </section>

      <section className="admin-section-card">
        <div className="admin-card-head">
          <div>
            <h2>Read-only view integration</h2>
            <p className="muted">
              Punto 38 verifica che lo stato app/admin sia allineato alle view manual import
              applicate e verificate in staging. Questa sezione è solo informativa: non contiene
              azioni, form o collegamenti a import reali.
            </p>
          </div>
          <div className="admin-badge-row">
            <span className="admin-safety-badge">Admin read-only</span>
            <span className="admin-safety-badge">Import disabled</span>
            <span className="admin-safety-badge">Apify off</span>
            <span className="admin-safety-badge">Next write=false</span>
          </div>
        </div>
        <dl className="admin-metadata">
          <dt>Admin imports read-only</dt>
          <dd>true</dd>
          <dt>Metadata verification completed</dt>
          <dd>true</dd>
          <dt>Migration applied</dt>
          <dd>true</dd>
          <dt>Views expected</dt>
          <dd>3</dd>
          <dt>Views verified</dt>
          <dd>3</dd>
          <dt>Competitions view</dt>
          <dd>verified</dd>
          <dt>Teams view</dt>
          <dd>verified</dd>
          <dt>Standings view</dt>
          <dd>verified</dd>
          <dt>Post-apply verification passed</dt>
          <dd>true</dd>
          <dt>Provider/import off</dt>
          <dd>true</dd>
          <dt>Apify off</dt>
          <dd>true</dd>
          <dt>Production touched</dt>
          <dd>false</dd>
          <dt>Next write allowed</dt>
          <dd>false</dd>
        </dl>
      </section>

      <section className="admin-section-card">
        <div className="admin-card-head">
          <div>
            <h2>Manual SQL Editor apply</h2>
            <p className="muted">
              Punto 36-A prepara il canale SQL Editor manuale. L’agente non ha eseguito l’apply:
              serve conferma visiva ed esecuzione manuale nello staging Supabase.
            </p>
          </div>
          <div className="admin-badge-row">
            <span className="admin-safety-badge">Manual channel</span>
            <span className="admin-safety-badge">Apply succeeded</span>
            <span className="admin-safety-badge">Provider off</span>
            <span className="admin-safety-badge">Next write=false</span>
          </div>
        </div>
        <dl className="admin-metadata">
          <dt>Explicit authorization received</dt>
          <dd>true</dd>
          <dt>Apply channel</dt>
          <dd>manual_sql_editor</dd>
          <dt>Migration file</dt>
          <dd>
            <code>supabase/migrations/20260922120000_manual_import_read_only_views.sql</code>
          </dd>
          <dt>Staging target confirmed in dashboard</dt>
          <dd>true</dd>
          <dt>Production excluded</dt>
          <dd>true</dd>
          <dt>Migration applied</dt>
          <dd>true</dd>
          <dt>DB write scope</dt>
          <dd>schema_read_only_views_only</dd>
          <dt>Provider/import off</dt>
          <dd>true</dd>
          <dt>Views verified count</dt>
          <dd>3</dd>
          <dt>Post-apply verification passed</dt>
          <dd>true</dd>
          <dt>Next write allowed</dt>
          <dd>false</dd>
        </dl>
      </section>

      <section className="admin-section-card">
        <div className="admin-card-head">
          <div>
            <h2>View metadata verification</h2>
            <p className="muted">
              Punto 37 ha verificato solo metadata delle view manual import tramite
              <code> information_schema</code>. Nessun dato applicativo è stato letto e nessuna
              scrittura DB è disponibile da questa pagina.
            </p>
          </div>
          <div className="admin-badge-row">
            <span className="admin-safety-badge">Read-only metadata</span>
            <span className="admin-safety-badge">Views verified</span>
            <span className="admin-safety-badge">Provider off</span>
            <span className="admin-safety-badge">Next write=false</span>
          </div>
        </div>
        <dl className="admin-metadata">
          <dt>Metadata verification completed</dt>
          <dd>true</dd>
          <dt>Query read-only</dt>
          <dd>true</dd>
          <dt>DB write</dt>
          <dd>false</dd>
          <dt>Service role used</dt>
          <dd>false</dd>
          <dt>Views expected count</dt>
          <dd>3</dd>
          <dt>Views verified count</dt>
          <dd>3</dd>
          <dt>Competitions view</dt>
          <dd>manual_import_competitions_lookup — verified</dd>
          <dt>Teams view</dt>
          <dd>manual_import_teams_lookup — verified</dd>
          <dt>Standings view</dt>
          <dd>manual_import_standings_lookup — verified</dd>
          <dt>Column check status</dt>
          <dd>pass</dd>
          <dt>Post-apply verification passed</dt>
          <dd>true</dd>
          <dt>Provider/import off</dt>
          <dd>true</dd>
          <dt>Apify off</dt>
          <dd>true</dd>
          <dt>Production touched</dt>
          <dd>false</dd>
          <dt>Next write allowed</dt>
          <dd>false</dd>
        </dl>
      </section>

      <section className="admin-section-card">
        <div className="admin-card-head">
          <div>
            <h2>Staging apply result</h2>
            <p className="muted">
              Punto 35 ha creato la migration reale, ma non l’ha applicata perché il canale apply
              remoto sicuro resta bloccato dal divieto di db push/reset.
            </p>
          </div>
          <div className="admin-badge-row">
            <span className="admin-safety-badge">Authorization received</span>
            <span className="admin-safety-badge">Migration created</span>
            <span className="admin-safety-badge">Apply blocked</span>
            <span className="admin-safety-badge">Next write=false</span>
          </div>
        </div>
        <dl className="admin-metadata">
          <dt>Explicit authorization received</dt>
          <dd>true</dd>
          <dt>Real migration created</dt>
          <dd>true</dd>
          <dt>Real migration path</dt>
          <dd>
            <code>supabase/migrations/20260922120000_manual_import_read_only_views.sql</code>
          </dd>
          <dt>Staging target confirmed</dt>
          <dd>true</dd>
          <dt>Production excluded</dt>
          <dd>true</dd>
          <dt>Migration applied</dt>
          <dd>true</dd>
          <dt>DB write scope</dt>
          <dd>schema_read_only_views_only</dd>
          <dt>Provider/import off</dt>
          <dd>true</dd>
          <dt>Views verified count</dt>
          <dd>3</dd>
          <dt>Post-apply verification passed</dt>
          <dd>true</dd>
          <dt>Next write allowed</dt>
          <dd>false</dd>
        </dl>
      </section>

      <section className="admin-section-card">
        <div className="admin-card-head">
          <div>
            <h2>Final pre-apply gate</h2>
            <p className="muted">
              Punto 34 crea il gate finale documentale prima di qualunque futuro apply. Punto 35
              resta bloccato senza autorizzazione esplicita.
            </p>
          </div>
          <div className="admin-badge-row">
            <span className="admin-safety-badge">No-apply lock</span>
            <span className="admin-safety-badge">Authorization missing</span>
            <span className="admin-safety-badge">Ready for apply=false</span>
            <span className="admin-safety-badge">Next write=false</span>
          </div>
        </div>
        <dl className="admin-metadata">
          <dt>Final gate created</dt>
          <dd>true</dd>
          <dt>Authorization language defined</dt>
          <dd>true</dd>
          <dt>No-apply safety lock created</dt>
          <dd>true</dd>
          <dt>Explicit user authorization received</dt>
          <dd>false</dd>
          <dt>Point 35 blocked without explicit authorization</dt>
          <dd>true</dd>
          <dt>Migration draft outside supabase/migrations</dt>
          <dd>true</dd>
          <dt>Migration applied</dt>
          <dd>false</dd>
          <dt>DB write</dt>
          <dd>false</dd>
          <dt>Service role used</dt>
          <dd>false</dd>
          <dt>Ready for apply</dt>
          <dd>false</dd>
          <dt>Next write allowed</dt>
          <dd>false</dd>
        </dl>
      </section>

      <section className="admin-section-card">
        <div className="admin-card-head">
          <div>
            <h2>Staging apply plan</h2>
            <p className="muted">
              Punto 33 prepara solo il piano per un eventuale apply staging futuro. La draft resta
              fuori da <code>supabase/migrations</code> e nessuna scrittura è autorizzata.
            </p>
          </div>
          <div className="admin-badge-row">
            <span className="admin-safety-badge">Plan only</span>
            <span className="admin-safety-badge">No apply</span>
            <span className="admin-safety-badge">Ready for apply=false</span>
            <span className="admin-safety-badge">Next write=false</span>
          </div>
        </div>
        <dl className="admin-metadata">
          <dt>Staging apply plan created</dt>
          <dd>true</dd>
          <dt>Backup checklist created</dt>
          <dd>true</dd>
          <dt>Rollback checklist created</dt>
          <dd>true</dd>
          <dt>Pre-apply checklist created</dt>
          <dd>true</dd>
          <dt>Post-apply verification plan created</dt>
          <dd>true</dd>
          <dt>Draft still outside supabase/migrations</dt>
          <dd>true</dd>
          <dt>Migration applied</dt>
          <dd>false</dd>
          <dt>DB write</dt>
          <dd>false</dd>
          <dt>Service role used</dt>
          <dd>false</dd>
          <dt>Ready for apply</dt>
          <dd>false</dd>
          <dt>Next write allowed</dt>
          <dd>false</dd>
        </dl>
      </section>

      <section className="admin-section-card">
        <div className="admin-card-head">
          <div>
            <h2>Manual import plan</h2>
            <p className="muted">
              Il piano import manuale è solo una preparazione tecnica. Nessuna scrittura DB è
              disponibile da questa schermata.
            </p>
          </div>
          <div className="admin-badge-row">
            <span className="admin-safety-badge">Plan only</span>
            <span className="admin-safety-badge">No import button</span>
            <span className="admin-safety-badge">No DB write</span>
            <span className="admin-safety-badge">Requires future approval</span>
          </div>
        </div>
        <dl className="admin-metadata">
          <dt>Punto 19</dt>
          <dd>Preview fixture read-only disponibile</dd>
          <dt>Punto 20</dt>
          <dd>Import plan dry-run disponibile solo da CLI locale</dd>
          <dt>Comando locale</dt>
          <dd>
            <code>npm run dry-run:manual-import-plan</code>
          </dd>
          <dt>Import reale</dt>
          <dd>non disponibile</dd>
          <dt>DB write</dt>
          <dd>disabled</dd>
          <dt>Requisiti futuri</dt>
          <dd>approvazione esplicita, staging confermato, backup, rollback, audit e RLS</dd>
        </dl>
      </section>

      <section className="admin-section-card">
        <div className="admin-card-head">
          <div>
            <h2>Schema review resolution</h2>
            <p className="muted">
              Lo stato <code>needs_review</code> è motivato: lo schema locale conferma tabelle e
              colonne, ma restano decisioni operative prima di qualsiasi write staging.
            </p>
          </div>
          <div className="admin-badge-row">
            <span className="admin-safety-badge">ready areas=0</span>
            <span className="admin-safety-badge">needs review=3</span>
            <span className="admin-safety-badge">blocked=0</span>
            <span className="admin-safety-badge">Point 24 required</span>
          </div>
        </div>
        <dl className="admin-metadata">
          <dt>Competitions</dt>
          <dd>needs_review — required defaults and enum mapping need review</dd>
          <dt>Teams</dt>
          <dd>needs_review — competition lookup, slug and manual provider need review</dd>
          <dt>Standings</dt>
          <dd>needs_review — lookup, season, stage/matchday and goal difference need review</dd>
          <dt>Next write allowed</dt>
          <dd>false</dd>
          <dt>Punto 24 required</dt>
          <dd>true</dd>
          <dt>Write authorization required</dt>
          <dd>true</dd>
        </dl>
      </section>

      <section className="admin-section-card">
        <div className="admin-card-head">
          <div>
            <h2>Schema confirmation</h2>
            <p className="muted">
              Conferma schema basata solo su file locali e migrazioni versionate. Nessuna query DB
              viene eseguita.
            </p>
          </div>
          <div className="admin-badge-row">
            <span className="admin-safety-badge">Checked locally</span>
            <span className="admin-safety-badge">Needs review</span>
            <span className="admin-safety-badge">Write allowed=false</span>
            <span className="admin-safety-badge">No Production</span>
          </div>
        </div>
        <dl className="admin-metadata">
          <dt>Comando locale</dt>
          <dd>
            <code>npm run dry-run:manual-schema-confirmation</code>
          </dd>
          <dt>Competitions status</dt>
          <dd>needs_review</dd>
          <dt>Teams status</dt>
          <dd>needs_review</dd>
          <dt>Standings status</dt>
          <dd>needs_review</dd>
          <dt>Next write allowed</dt>
          <dd>false</dd>
          <dt>Punto 23</dt>
          <dd>richiesto per qualunque write staging, con autorizzazione esplicita</dd>
        </dl>
      </section>

      <section className="admin-section-card">
        <div className="admin-card-head">
          <div>
            <h2>Local schema deep review</h2>
            <p className="muted">
              Review locale campo-per-campo fixture → schema. Non interroga Supabase e non
              abilita import: serve solo a decidere il prossimo gate no-write.
            </p>
          </div>
          <div className="admin-badge-row">
            <span className="admin-safety-badge">Field matrix available</span>
            <span className="admin-safety-badge">DB read-only check recommended</span>
            <span className="admin-safety-badge">Next write=false</span>
            <span className="admin-safety-badge">Point 25 required</span>
          </div>
        </div>
        <dl className="admin-metadata">
          <dt>Competitions</dt>
          <dd>needs_review — dedup_key_unclear, type_transform_needed, documentation_only</dd>
          <dt>Competitions hint</dt>
          <dd>confirm internal_key/slug/season defaults and status/visibility policy</dd>
          <dt>Teams</dt>
          <dd>needs_review — fk_unclear, dedup_key_unclear, documentation_only</dd>
          <dt>Teams hint</dt>
          <dd>confirm competition lookup by provider_competition_id and team slug policy</dd>
          <dt>Standings</dt>
          <dd>needs_review — fk_unclear, naming_mismatch, type_transform_needed, documentation_only</dd>
          <dt>Standings hint</dt>
          <dd>confirm competition/team lookup, season/stage/matchday defaults and goal difference</dd>
          <dt>Ready fields</dt>
          <dd>12</dd>
          <dt>Needs review fields</dt>
          <dd>6</dd>
          <dt>Blocked fields</dt>
          <dd>0</dd>
          <dt>DB read-only check recommended</dt>
          <dd>true</dd>
          <dt>Next write allowed</dt>
          <dd>false</dd>
          <dt>Punto 25 required</dt>
          <dd>true</dd>
          <dt>Write authorization required</dt>
          <dd>true</dd>
        </dl>
      </section>

      <section className="admin-section-card">
        <div className="admin-card-head">
          <div>
            <h2>DB read-only schema check</h2>
            <p className="muted">
              Primo check DB staging con client anon/pubblico: nessuna scrittura, nessun
              service role e nessun payload completo salvato.
            </p>
          </div>
          <div className="admin-badge-row">
            <span className="admin-safety-badge">DB read=true</span>
            <span className="admin-safety-badge">DB write=false</span>
            <span className="admin-safety-badge">Service role=false</span>
            <span className="admin-safety-badge">Point 26 required</span>
          </div>
        </div>
        <dl className="admin-metadata">
          <dt>DB read-only check completed</dt>
          <dd>true</dd>
          <dt>Competitions DB status</dt>
          <dd>blocked — target table non confermata dal client anon/pubblico</dd>
          <dt>Teams DB status</dt>
          <dd>blocked — target table non confermata dal client anon/pubblico</dd>
          <dt>Standings DB status</dt>
          <dd>blocked — target table non confermata dal client anon/pubblico</dd>
          <dt>Confirmed tables count</dt>
          <dd>0</dd>
          <dt>Confirmed columns count</dt>
          <dd>0</dd>
          <dt>Missing columns count</dt>
          <dd>0 — non dichiarate mancanti; lookup non confermato</dd>
          <dt>Dedup key confidence</dt>
          <dd>blocked</dd>
          <dt>FK/reference confidence</dt>
          <dd>blocked</dd>
          <dt>Sample rows read</dt>
          <dd>0</dd>
          <dt>Payload printed</dt>
          <dd>false</dd>
          <dt>Next write allowed</dt>
          <dd>false</dd>
          <dt>Punto 26 required</dt>
          <dd>true</dd>
          <dt>Write authorization required</dt>
          <dd>true</dd>
        </dl>
      </section>

      <section className="admin-section-card">
        <div className="admin-card-head">
          <div>
            <h2>Supabase read-only access investigation</h2>
            <p className="muted">
              Diagnosi no-write del blocco read-only: il client anon/pubblico non basta ancora
              per confermare i lookup import manuale.
            </p>
          </div>
          <div className="admin-badge-row">
            <span className="admin-safety-badge">Investigation completed</span>
            <span className="admin-safety-badge">No service role</span>
            <span className="admin-safety-badge">DB writes=false</span>
            <span className="admin-safety-badge">Point 27 required</span>
          </div>
        </div>
        <dl className="admin-metadata">
          <dt>DB read-only check</dt>
          <dd>completed</dd>
          <dt>Direct table lookup result</dt>
          <dd>unknown</dd>
          <dt>Public view lookup result</dt>
          <dd>unknown</dd>
          <dt>Admin view lookup result</dt>
          <dd>not_attempted</dd>
          <dt>Likely blocker</dt>
          <dd>rls_or_missing_view_or_wrong_table_name_or_insufficient_anon_access</dd>
          <dt>Recommended resolution</dt>
          <dd>prepare dedicated read-only lookup view proposal or manual dashboard SELECT check</dd>
          <dt>Requires read-only view</dt>
          <dd>true</dd>
          <dt>Requires service role</dt>
          <dd>false</dd>
          <dt>DB writes</dt>
          <dd>false</dd>
          <dt>Next write allowed</dt>
          <dd>false</dd>
          <dt>Punto 27 required</dt>
          <dd>true</dd>
        </dl>
      </section>

      <section className="admin-section-card">
        <div className="admin-card-head">
          <div>
            <h2>Staging manual import readiness</h2>
            <p className="muted">
              Readiness simulata per un futuro import manuale staging. Il batch plan è solo
              preview e non è eseguibile da questa schermata.
            </p>
          </div>
          <div className="admin-badge-row">
            <span className="admin-safety-badge">Preview only</span>
            <span className="admin-safety-badge">Batch executable=false</span>
            <span className="admin-safety-badge">Provider calls disabled</span>
            <span className="admin-safety-badge">DB writes disabled</span>
          </div>
        </div>
        <dl className="admin-metadata">
          <dt>Comando locale</dt>
          <dd>
            <code>npm run dry-run:manual-import-readiness</code>
          </dd>
          <dt>Batch plan</dt>
          <dd>preview only</dd>
          <dt>Requires approval</dt>
          <dd>true</dd>
          <dt>Requires staging</dt>
          <dd>true</dd>
          <dt>Requires backup/rollback</dt>
          <dd>true</dd>
          <dt>Collision strategy</dt>
          <dd>create/update/skip preview</dd>
          <dt>Next step</dt>
          <dd>not executable yet; Punto 22 richiederebbe autorizzazione esplicita</dd>
        </dl>
      </section>

      <section className="admin-section-card">
        <div className="admin-card-head">
          <div>
            <h2>Read-only view proposal</h2>
            <p className="muted">
              Punto 28 trasforma i requisiti in una proposta migrazione documentale. Il file è
              fuori da <code>supabase/migrations</code>, non è auto-applicabile e non autorizza
              alcuna scrittura.
            </p>
          </div>
          <div className="admin-badge-row">
            <span className="admin-safety-badge">Read-only view needed</span>
            <span className="admin-safety-badge">Proposal draft ready</span>
            <span className="admin-safety-badge">No auto-apply</span>
            <span className="admin-safety-badge">Point 29 not authorized</span>
          </div>
        </div>
        <dl className="admin-metadata">
          <dt>Views proposed</dt>
          <dd>manual import competitions, teams and standings lookup</dd>
          <dt>Purpose</dt>
          <dd>confermare lookup import manuale senza service role e senza accesso diretto anon alle tabelle</dd>
          <dt>Proposal file</dt>
          <dd>
            <code>docs/migration_proposals/manual_import_read_only_views_p28.sql.md</code>
          </dd>
          <dt>Proposal status</dt>
          <dd>MIGRATION_PROPOSAL_ONLY / DO NOT APPLY / DO NOT RUN</dd>
          <dt>Migration prepared</dt>
          <dd>false</dd>
          <dt>Migration applied</dt>
          <dd>false</dd>
          <dt>Auto apply</dt>
          <dd>false</dd>
          <dt>Reviewed for execution</dt>
          <dd>false</dd>
          <dt>Service role</dt>
          <dd>false</dd>
          <dt>DB writes</dt>
          <dd>false</dd>
          <dt>Provider fetch</dt>
          <dd>false</dd>
          <dt>Next write allowed</dt>
          <dd>false</dd>
          <dt>Punto 29/write staging</dt>
          <dd>non autorizzato</dd>
        </dl>
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

      <section className="admin-section-card">
        <div className="admin-card-head">
          <div>
            <h2>Dashboard confirmation</h2>
            <p className="muted">
              Punto 30-B registra la verifica manuale Supabase Dashboard dichiarata dall&apos;utente.
              L&apos;utente ha dichiarato di aver eseguito la verifica visuale live senza SQL/write;
              i valori schema non sono stati forniti, quindi i placeholder restano unclear.
            </p>
          </div>
          <div className="admin-badge-row">
            <span className="admin-safety-badge">No SQL</span>
            <span className="admin-safety-badge">No DB write</span>
            <span className="admin-safety-badge">No service role</span>
            <span className="admin-safety-badge">Next write=false</span>
          </div>
        </div>
        <dl className="admin-metadata">
          <dt>Dashboard confirmation completed</dt>
          <dd>true</dd>
          <dt>SQL executed</dt>
          <dd>false</dd>
          <dt>DB write</dt>
          <dd>false</dd>
          <dt>Service role used</dt>
          <dd>false</dd>
          <dt>Placeholders resolved count</dt>
          <dd>0</dd>
          <dt>Placeholders unresolved count</dt>
          <dd>0</dd>
          <dt>Placeholders unclear count</dt>
          <dd>16</dd>
          <dt>Read-only view still required</dt>
          <dd>true</dd>
          <dt>Ready for migration draft</dt>
          <dd>false</dd>
          <dt>Next write allowed</dt>
          <dd>false</dd>
        </dl>
      </section>

      <section className="admin-section-card">
        <div className="admin-card-head">
          <div>
            <h2>Manual schema values collection</h2>
            <p className="muted">
              Punto 30-C prepara la raccolta manuale dei valori reali di schema da Supabase
              Dashboard. I valori non sono ancora stati forniti, quindi nessun placeholder viene
              risolto e nessuna migration draft è pronta.
            </p>
          </div>
          <div className="admin-badge-row">
            <span className="admin-safety-badge">Collection prepared</span>
            <span className="admin-safety-badge">Values required</span>
            <span className="admin-safety-badge">No migration</span>
            <span className="admin-safety-badge">Next write=false</span>
          </div>
        </div>
        <dl className="admin-metadata">
          <dt>Collection prepared</dt>
          <dd>true</dd>
          <dt>Real schema values provided</dt>
          <dd>false</dd>
          <dt>Placeholders resolved</dt>
          <dd>0</dd>
          <dt>Placeholders uncollected</dt>
          <dd>16</dd>
          <dt>Ready for migration draft</dt>
          <dd>false</dd>
          <dt>Next write allowed</dt>
          <dd>false</dd>
          <dt>Recommended next step</dt>
          <dd>user dashboard values required before Punto 30-D</dd>
        </dl>
      </section>

      <section className="admin-section-card">
        <div className="admin-card-head">
          <div>
            <h2>Local schema extraction</h2>
            <p className="muted">
              Punto 30-D legge solo migration e documenti locali versionati. Non usa Dashboard,
              non esegue query DB e non crea migration. I placeholder critici risultano risolti
              per lo schema locale, ma resta vietata qualunque scrittura.
            </p>
          </div>
          <div className="admin-badge-row">
            <span className="admin-safety-badge">Local files only</span>
            <span className="admin-safety-badge">DB query=false</span>
            <span className="admin-safety-badge">No migration</span>
            <span className="admin-safety-badge">Next write=false</span>
          </div>
        </div>
        <dl className="admin-metadata">
          <dt>Extraction completed</dt>
          <dd>true</dd>
          <dt>Dashboard used</dt>
          <dd>false</dd>
          <dt>DB query executed</dt>
          <dd>false</dd>
          <dt>DB write</dt>
          <dd>false</dd>
          <dt>Service role used</dt>
          <dd>false</dd>
          <dt>Placeholders resolved from local files</dt>
          <dd>16</dd>
          <dt>Placeholders unresolved</dt>
          <dd>0</dd>
          <dt>Placeholders unclear</dt>
          <dd>0</dd>
          <dt>Ready for migration draft</dt>
          <dd>true — solo draft non applicata/no-apply</dd>
          <dt>Next write allowed</dt>
          <dd>false</dd>
        </dl>
      </section>

      <section className="admin-section-card">
        <div className="admin-card-head">
          <div>
            <h2>Migration draft</h2>
            <p className="muted">
              Punto 31 crea una draft SQL revisionabile per view lookup read-only. Il file è
              fuori da <code>supabase/migrations</code>, non è applicato e non è pronto per apply.
            </p>
          </div>
          <div className="admin-badge-row">
            <span className="admin-safety-badge">Draft only</span>
            <span className="admin-safety-badge">No apply</span>
            <span className="admin-safety-badge">Manual review required</span>
            <span className="admin-safety-badge">Next write=false</span>
          </div>
        </div>
        <dl className="admin-metadata">
          <dt>Migration draft created</dt>
          <dd>true</dd>
          <dt>Draft path</dt>
          <dd>
            <code>docs/migration_drafts/manual_import_read_only_views_p31.sql.draft</code>
          </dd>
          <dt>In supabase/migrations</dt>
          <dd>false</dd>
          <dt>Migration applied</dt>
          <dd>false</dd>
          <dt>DB write</dt>
          <dd>false</dd>
          <dt>Service role used</dt>
          <dd>false</dd>
          <dt>Requires manual review</dt>
          <dd>true</dd>
          <dt>Requires explicit authorization</dt>
          <dd>true</dd>
          <dt>Ready for apply</dt>
          <dd>false</dd>
          <dt>Next write allowed</dt>
          <dd>false</dd>
        </dl>
      </section>

      <section className="admin-section-card">
        <div className="admin-card-head">
          <div>
            <h2>Migration draft review</h2>
            <p className="muted">
              Punto 32 revisiona staticamente la draft P31 e la hardena. La review non applica
              nulla e non abilita scritture.
            </p>
          </div>
          <div className="admin-badge-row">
            <span className="admin-safety-badge">Reviewed</span>
            <span className="admin-safety-badge">Hardened</span>
            <span className="admin-safety-badge">Ready for apply=false</span>
            <span className="admin-safety-badge">Next write=false</span>
          </div>
        </div>
        <dl className="admin-metadata">
          <dt>Migration draft reviewed</dt>
          <dd>true</dd>
          <dt>Draft hardened</dt>
          <dd>true</dd>
          <dt>Blocking issues count</dt>
          <dd>0</dd>
          <dt>Needs review count</dt>
          <dd>3</dd>
          <dt>Ready for staging apply candidate</dt>
          <dd>true — solo candidato per piano no-apply</dd>
          <dt>Ready for apply</dt>
          <dd>false</dd>
          <dt>Migration applied</dt>
          <dd>false</dd>
          <dt>DB write</dt>
          <dd>false</dd>
          <dt>Service role used</dt>
          <dd>false</dd>
          <dt>Next write allowed</dt>
          <dd>false</dd>
        </dl>
      </section>

      <section className="admin-section-card">
        <div className="admin-card-head">
          <div>
            <h2>Migration proposal review</h2>
            <p className="muted">
              Punto 29 revisiona la proposal read-only senza creare migration <code>.sql</code>,
              senza applicarla e senza autorizzare write staging.
            </p>
          </div>
          <div className="admin-badge-row">
            <span className="admin-safety-badge">Reviewed</span>
            <span className="admin-safety-badge">Hardened</span>
            <span className="admin-safety-badge">No migration file</span>
            <span className="admin-safety-badge">Point 30 required</span>
          </div>
        </div>
        <dl className="admin-metadata">
          <dt>Proposal reviewed</dt>
          <dd>true</dd>
          <dt>Proposal hardened</dt>
          <dd>true</dd>
          <dt>Executable migration created</dt>
          <dd>false</dd>
          <dt>Migration file created</dt>
          <dd>false</dd>
          <dt>Migration applied</dt>
          <dd>false</dd>
          <dt>Placeholders remaining count</dt>
          <dd>9</dd>
          <dt>Dashboard confirmation required</dt>
          <dd>true</dd>
          <dt>Future migration draft allowed</dt>
          <dd>false</dd>
          <dt>Next write allowed</dt>
          <dd>false</dd>
          <dt>Punto 30 required</dt>
          <dd>true — dashboard confirmation no-write consigliata</dd>
        </dl>
      </section>

      <AdminImportLogList logs={logs} />
    </main>
  );
}
