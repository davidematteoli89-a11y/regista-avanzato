import Link from "next/link";
import type { NewsRadarItem } from "@/lib/newsRadar/newsRadarTypes";
import { AdminNewsPriorityBadge } from "./AdminNewsPriorityBadge";

export function AdminNewsRadarCard({ item }: { item: NewsRadarItem }) {
  return <article className="admin-section-card"><div className="admin-card-head"><h2>{item.title}</h2><AdminNewsPriorityBadge priority={item.priority} /></div><p>{item.summary}</p><p><strong>{item.score.total}/100</strong> · {item.status} · {item.reviewStatus}</p><Link href={`/admin/news-radar/${item.id}`}>Apri review</Link></article>;
}
