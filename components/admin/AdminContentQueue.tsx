import type { AdminContentQueueItem } from "@/lib/admin/adminTypes";
import { AdminReviewBadge } from "./AdminReviewBadge";
export function AdminContentQueue({ items }: { items: readonly AdminContentQueueItem[] }) { return items.length ? <div className="admin-log-list">{items.map((item) => <article key={item.id}><div className="admin-card-head"><strong>{item.title}</strong><AdminReviewBadge status={item.status} /></div><p>{item.area.replaceAll("_", " ")}</p><p className="muted">{item.note}</p></article>)}</div> : <p className="admin-empty-inline">Queue mock vuota.</p>; }
