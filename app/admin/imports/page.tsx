import { AdminImportLogList } from "@/components/admin/AdminImportLogList";
import { getAdminImports } from "@/lib/admin/getAdminImports";
import { getAdminProviderImportRuns } from "@/lib/admin/adminProviderImportRuns";

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

export default async function AdminImportsPage() {
  const [logs, importRuns] = await Promise.all([
    getAdminImports(),
    getAdminProviderImportRuns(),
  ]);

  return (
    <main className="admin-page">
      <header>
        <h2>Import</h2>
        <p>Pipeline dry-run/mock. Nessuna fetch, run o scrittura.</p>
      </header>

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
            <span className="admin-safety-badge">realWritesEnabled=false</span>
          </div>
        </div>

        {importRuns.warning ? <p className="admin-warning">{importRuns.warning}</p> : null}

        {importRuns.source === "empty" ? (
          <div className="admin-empty">
            <strong>Non ci sono ancora import run registrate.</strong>
            <span>
              È corretto in staging: i provider reali, Apify e le scritture sono ancora
              disabilitati.
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
