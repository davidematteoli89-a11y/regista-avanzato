import type { ArticleDraftFormat } from "@/lib/articleGenerator/articleGeneratorTypes";

export function AdminArticleFormatBadge({ format }: { format: ArticleDraftFormat }) {
  return <span className="admin-status article-format-badge">{format.replaceAll("_", " ")}</span>;
}
