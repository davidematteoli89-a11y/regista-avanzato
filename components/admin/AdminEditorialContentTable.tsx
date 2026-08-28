import Link from "next/link";
import type { AdminEditorialReadResult } from "@/lib/admin/adminEditorialTypes";
import { AdminStatusBadge } from "./AdminStatusBadge";

function labelDate(value: string | null) {
  return value ? new Date(value).toLocaleDateString("it-IT") : "—";
}

export function AdminEditorialContentTable({ result }: { result: AdminEditorialReadResult }) {
  return (
    <section className="admin-section-card">
      <div className="admin-card-head">
        <div>
          <h2>Contenuti da Supabase staging</h2>
          <p className="muted">
            Fonte: {result.source}. Provider {result.providerCalls}, Apify {result.apifyCalls}, AI {result.aiCalls}, scritture reali {String(result.realWritesEnabled)}.
          </p>
        </div>
        <AdminStatusBadge status={result.source === "supabase_staging" ? "active" : "mock"} />
      </div>
      {result.warning && <p className="notice">{result.warning}</p>}
      {result.items.length ? (
        <div className="table-scroll">
          <table className="stats-table admin-table">
            <thead>
              <tr>
                <th>Titolo</th>
                <th>Area</th>
                <th>Stato</th>
                <th>Visibilità</th>
                <th>Review</th>
                <th>Pubblicato</th>
                <th>Warning</th>
                <th>Note admin</th>
              </tr>
            </thead>
            <tbody>
              {result.items.map((item) => (
                <tr key={`${item.area}-${item.id}`}>
                  <td>{item.detailHref ? <Link href={item.detailHref}>{item.title}</Link> : item.title}</td>
                  <td>{item.area}</td>
                  <td>{item.status}</td>
                  <td>{item.visibility}</td>
                  <td>{item.reviewStatus ?? "—"}</td>
                  <td>{labelDate(item.publishedAt)}</td>
                  <td>{item.internalWarnings.length}</td>
                  <td>{item.internalNotes ? "presenti" : "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="admin-empty-inline">Nessun contenuto editoriale disponibile nella fonte corrente.</p>
      )}
      <p className="muted">Le note interne e gli score possono comparire solo in admin. Le pagine pubbliche continuano a leggere esclusivamente public view filtrate.</p>
    </section>
  );
}
