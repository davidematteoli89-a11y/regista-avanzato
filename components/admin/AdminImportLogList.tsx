import type { AdminImportLog } from "@/lib/admin/adminTypes";
import { AdminStatusBadge } from "./AdminStatusBadge";
export function AdminImportLogList({ logs }: { logs: readonly AdminImportLog[] }) { return <div className="admin-log-list">{logs.map((log) => <article key={log.id}><div className="admin-card-head"><strong>{log.label}</strong><AdminStatusBadge status={log.status} /></div><p>{log.scope}</p><p>Preparati: {log.recordsPrepared} · chiamate reali: {log.realCalls} · scritture: {log.writes}</p><p className="muted">{log.note} Ultimo dato valido preservato.</p></article>)}</div>; }
