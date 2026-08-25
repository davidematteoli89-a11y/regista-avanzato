import type { PublicArticle, PublicArticleCategory, PublicArticleFormat, PublicArticleVisibility, PublicRadarItem, PublicRadarType } from "./publicWebsiteTypes";

export type PublicArticleFilters = { categories?: readonly PublicArticleCategory[]; formats?: readonly PublicArticleFormat[]; visibilities?: readonly PublicArticleVisibility[]; featured?: boolean; text?: string | null };
export type PublicRadarFilters = { types?: readonly PublicRadarType[]; text?: string | null };

export function filterPublicArticles(articles: readonly PublicArticle[], filters: PublicArticleFilters = {}): PublicArticle[] {
  const text = filters.text?.trim().toLocaleLowerCase("it-IT");
  return articles.filter((article) => (!filters.categories?.length || filters.categories.includes(article.category)) && (!filters.formats?.length || filters.formats.includes(article.format)) && (!filters.visibilities?.length || filters.visibilities.includes(article.visibility)) && (filters.featured === undefined || article.featured === filters.featured) && (!text || `${article.title} ${article.summary} ${article.tags.join(" ")}`.toLocaleLowerCase("it-IT").includes(text)));
}

export function filterPublicRadar(items: readonly PublicRadarItem[], filters: PublicRadarFilters = {}): PublicRadarItem[] {
  const text = filters.text?.trim().toLocaleLowerCase("it-IT");
  return items.filter((item) => (!filters.types?.length || filters.types.includes(item.type)) && (!text || `${item.title} ${item.summary} ${item.signalLabel}`.toLocaleLowerCase("it-IT").includes(text)));
}
