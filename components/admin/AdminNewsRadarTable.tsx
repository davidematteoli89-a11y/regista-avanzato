import Link from "next/link";
import type { NewsRadarItem } from "@/lib/newsRadar/newsRadarTypes";
import { AdminNewsPriorityBadge } from "./AdminNewsPriorityBadge";

export function AdminNewsRadarTable({ items }: { items: readonly NewsRadarItem[] }) {
  return <div className="table-scroll"><table className="stats-table admin-table"><thead><tr><th>Titolo</th><th>Categoria</th><th>Stato</th><th>Priorità</th><th>Score</th><th>Review</th></tr></thead><tbody>{items.map((item) => <tr key={item.id}><td><Link href={`/admin/news-radar/${item.id}`}>{item.title}</Link></td><td>{item.category}</td><td>{item.status}</td><td><AdminNewsPriorityBadge priority={item.priority} /></td><td>{item.score.total}/100</td><td>{item.reviewStatus}</td></tr>)}</tbody></table></div>;
}
