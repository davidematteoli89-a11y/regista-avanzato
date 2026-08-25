import type { PublicArticleCategory } from "@/lib/publicWebsite/publicWebsiteTypes";

export function EditorialBadge({ category }: { category: PublicArticleCategory }) {
  return <span className="editorial-badge">{category.replaceAll("_", " ")}</span>;
}
