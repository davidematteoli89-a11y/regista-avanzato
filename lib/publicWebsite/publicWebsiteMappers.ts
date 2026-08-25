import type { PublicArticle, PublicArticleView, PublicContentAccess, PublicRadarItem, PublicRadarView } from "./publicWebsiteTypes";

export function mapArticleForPublic(article: PublicArticle, access: PublicContentAccess): PublicArticleView {
  const { internalNotes: _internalNotes, ...safe } = article;
  return { ...safe, bodySections: access.canViewFull ? safe.bodySections : [], sources: safe.sources.filter((source) => source.publiclyVisible) };
}

export function mapRadarForPublic(item: PublicRadarItem): PublicRadarView {
  const { internalScore: _internalScore, internalWarnings: _internalWarnings, ...safe } = item;
  return safe;
}
