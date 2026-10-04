import Link from "next/link";
import { unpublishAdminEditorialContentAction, updateAdminEditorialInternalNotesAction } from "@/lib/admin/adminEditorialActions";
import type { AdminEditorialReadResult } from "@/lib/admin/adminEditorialTypes";
import { AdminStatusBadge } from "./AdminStatusBadge";

function labelDate(value: string | null) {
  return value ? new Date(value).toLocaleDateString("it-IT") : "—";
}

function contentTypeForArea(area: string) {
  if (area === "articles") return "article";
  if (area === "news") return "news";
  if (area === "stories") return "story";
  if (area === "historical_echo") return "historical_echo";
  return null;
}

export function AdminEditorialContentTable({ result }: { result: AdminEditorialReadResult }) {
  const showManualActions = result.source === "supabase_staging" && result.realWritesEnabled;

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
                {showManualActions && <th>Azione manuale</th>}
              </tr>
            </thead>
            <tbody>
              {result.items.map((item) => {
                const contentType = contentTypeForArea(item.area);

                return (
                  <tr key={`${item.area}-${item.id}`}>
                    <td>{item.detailHref ? <Link href={item.detailHref}>{item.title}</Link> : item.title}</td>
                    <td>{item.area}</td>
                    <td>{item.status}</td>
                    <td>{item.visibility}</td>
                    <td>{item.reviewStatus ?? "—"}</td>
                    <td>{labelDate(item.publishedAt)}</td>
                    <td>{item.internalWarnings.length}</td>
                    <td>{item.internalNotes ? "presenti" : "—"}</td>
                    {showManualActions && (
                      <td>
                        {contentType ? (
                          <div className="admin-inline-actions-stack">
                            <form action={updateAdminEditorialInternalNotesAction} className="admin-inline-action-form">
                              <input type="hidden" name="contentType" value={contentType} />
                              <input type="hidden" name="contentId" value={item.id} />
                              <label>
                                <span>Note interne</span>
                                <textarea name="internalNotes" defaultValue={item.internalNotes ?? ""} maxLength={4000} rows={2} />
                              </label>
                              <div className="admin-inline-action-footer">
                                <span className="admin-status">Staging manual action</span>
                                <button type="submit" className="button-secondary">
                                  Salva note
                                </button>
                              </div>
                            </form>
                            {item.status === "published" && (
                              <form action={unpublishAdminEditorialContentAction} className="admin-inline-action-form admin-inline-action-form-danger">
                                <input type="hidden" name="contentType" value={contentType} />
                                <input type="hidden" name="contentId" value={item.id} />
                                <p className="muted">Non elimina il contenuto. Lo rimuove dalla pubblicazione.</p>
                                <label>
                                  <span>Destinazione</span>
                                  <select name="targetStatus" defaultValue="draft">
                                    <option value="draft">draft</option>
                                    <option value="archived">archived</option>
                                  </select>
                                </label>
                                <label>
                                  <span>Motivo</span>
                                  <textarea name="reason" maxLength={1000} rows={2} placeholder="Motivo della rimozione pubblicazione" />
                                </label>
                                <label className="admin-inline-checkbox">
                                  <input type="checkbox" name="confirmUnpublish" required />
                                  <span>Confermo rimozione pubblicazione</span>
                                </label>
                                <div className="admin-inline-action-footer">
                                  <span className="admin-status status-inactive">Staging destructive-like action</span>
                                  <button type="submit" className="button-secondary button-danger">
                                    Rimuovi da pubblicazione
                                  </button>
                                </div>
                              </form>
                            )}
                          </div>
                        ) : (
                          "—"
                        )}
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="admin-empty-inline">Nessun contenuto editoriale disponibile nella fonte corrente.</p>
      )}
      <p className="muted">
        Le note interne e gli score possono comparire solo in admin. Le pagine pubbliche continuano a leggere esclusivamente public view filtrate. La rimozione pubblicazione è disponibile solo per contenuti published in staging; publish, delete e create restano disabilitati.
      </p>
    </section>
  );
}
