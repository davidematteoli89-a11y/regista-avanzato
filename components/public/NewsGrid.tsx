import type { PublicNewsRadarItem } from "@/lib/newsRadar/newsRadarTypes";
import { EmptyPublicState } from "./EmptyPublicState";
import { NewsCard } from "./NewsCard";

export function NewsGrid({ items }: { items: readonly PublicNewsRadarItem[] }) {
  return items.length ? <div className="news-grid">{items.map((item) => <NewsCard key={item.id} item={item} />)}</div> : <EmptyPublicState title="Nessuna news approvata" message="Rumor e candidati non revisionati restano nell’area admin." />;
}
