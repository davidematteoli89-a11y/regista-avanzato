import Link from "next/link";
import { getManualCompetitionsReadOnly } from "@/lib/manual-data/readers";

export default async function AdminManualCompetitionsPage() {
  const result = await getManualCompetitionsReadOnly();

  return (
    <main className="admin-page">
      <header>
        <h2>Manual Competitions</h2>
        <p>
          Admin read-only surface per dati manuali staging. I record `private_admin` non sono
          esposti pubblicamente.
        </p>
        <p>
          <Link href="/admin/imports">Torna a Import</Link>
        </p>
      </header>

      <section className="admin-section-card">
        <div className="admin-card-head">
          <div>
            <h2>Safety status</h2>
            <p className="muted">Reader solo SELECT, sessione admin/RLS, nessuna azione di scrittura.</p>
          </div>
          <div className="admin-badge-row">
            <span className="admin-safety-badge">Provider off</span>
            <span className="admin-safety-badge">Import provider off</span>
            <span className="admin-safety-badge">Apify off</span>
            <span className="admin-safety-badge">Production untouched</span>
            <span className="admin-safety-badge">Public exposure disabled</span>
            <span className="admin-safety-badge">private_admin</span>
          </div>
        </div>
        <dl className="admin-metadata">
          <dt>Source</dt>
          <dd>{result.source}</dd>
          <dt>Expected manual competitions</dt>
          <dd>1</dd>
          <dt>Current visibility</dt>
          <dd>private_admin</dd>
          <dt>Point 45 DB write</dt>
          <dd>false</dd>
          <dt>Service role</dt>
          <dd>false</dd>
        </dl>
        {result.warning ? <p className="admin-warning">{result.warning}</p> : null}
      </section>

      <section className="admin-section-card">
        <h2>Competitions</h2>
        {result.items.length === 0 ? (
          <p className="admin-empty-inline">Nessuna competition manuale leggibile in questo ambiente.</p>
        ) : (
          <div className="table-scroll">
            <table className="stats-table admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Slug / internal key</th>
                  <th>Country</th>
                  <th>Season</th>
                  <th>Status</th>
                  <th>Visibility</th>
                  <th>Detail</th>
                </tr>
              </thead>
              <tbody>
                {result.items.map((competition) => {
                  const slug = competition.slug ?? competition.internalKey ?? competition.apiCompetitionId ?? competition.id;

                  return (
                    <tr key={competition.id}>
                      <td>{competition.name}</td>
                      <td>{competition.slug ?? competition.internalKey ?? "—"}</td>
                      <td>{competition.country ?? "—"}</td>
                      <td>{competition.season ?? "—"}</td>
                      <td>{competition.status ?? "—"}</td>
                      <td>{competition.visibility ?? "—"}</td>
                      <td>
                        <Link href={`/admin/data/competitions/${encodeURIComponent(slug)}`}>
                          Dettaglio read-only
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}
