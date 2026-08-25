import type { NewsRadarCategory } from "@/lib/newsRadar/newsRadarTypes";

export function NewsCategoryBadge({ category }: { category: NewsRadarCategory }) {
  return <span className="news-badge category">{category.replaceAll("_", " ")}</span>;
}
