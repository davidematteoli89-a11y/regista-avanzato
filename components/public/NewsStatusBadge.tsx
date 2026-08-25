import type { NewsRadarStatus } from "@/lib/newsRadar/newsRadarTypes";

export function NewsStatusBadge({ status }: { status: NewsRadarStatus }) {
  return <span className={`news-badge status-${status}`}>{status.replaceAll("_", " ")}</span>;
}
