import type { AdminStat } from "@/lib/admin/adminTypes";
import { AdminStatusBadge } from "./AdminStatusBadge";
export function AdminStatCard({ stat }: { stat: AdminStat }) { return <article className="admin-stat-card"><div className="admin-card-head"><span>{stat.label}</span><AdminStatusBadge status={stat.status} /></div><strong className="admin-stat-value">{stat.value}</strong><p>{stat.note}</p></article>; }
