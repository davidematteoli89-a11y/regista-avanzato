import type { PublicNewsRadarSource } from "@/lib/newsRadar/newsRadarTypes";

export function NewsSourceBadge({ source }: { source: PublicNewsRadarSource }) {
  return <span className={`news-badge source-${source.reliability}`}>{source.reliability === "official" ? "Fonte ufficiale" : `Fonte ${source.reliability}`}</span>;
}
