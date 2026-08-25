import Link from "next/link";
import type { PublicNewsRadarItem } from "@/lib/newsRadar/newsRadarTypes";
import { NewsCategoryBadge } from "./NewsCategoryBadge";
import { NewsSourceBadge } from "./NewsSourceBadge";
import { NewsStatusBadge } from "./NewsStatusBadge";

export function NewsCard({ item }: { item: PublicNewsRadarItem }) {
  return <article className="news-card"><div className="stats-badge-row"><NewsCategoryBadge category={item.category} /><NewsStatusBadge status={item.status} />{item.sources[0] && <NewsSourceBadge source={item.sources[0]} />}</div><h2>{item.title}</h2><p>{item.summary}</p><div className="search-result-meta">{item.signals.map((signal) => <span key={signal.id}>{signal.label}</span>)}</div><Link href={`/news/${item.slug}`}>{item.visibility === "public_full" ? "Leggi la news" : "Apri l’anteprima"}</Link></article>;
}
