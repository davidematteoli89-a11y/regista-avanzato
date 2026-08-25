import { MOCK_PUBLIC_ARTICLES } from "./mockPublicWebsiteData";
import { getPublicArticleAccess, isPublicArticle, PUBLIC_WEBSITE_ACCESS } from "./publicWebsiteAccessRules";
import { filterPublicArticles, type PublicArticleFilters } from "./publicWebsiteFilters";
import { mapArticleForPublic } from "./publicWebsiteMappers";

export async function getPublicArticles(filters: PublicArticleFilters = {}) {
  const items = filterPublicArticles(MOCK_PUBLIC_ARTICLES.filter(isPublicArticle), filters).map((article) => ({ ...mapArticleForPublic(article, getPublicArticleAccess(article, false)), bodySections: [] }));
  return { items, access: PUBLIC_WEBSITE_ACCESS, message: "Articoli mock approvati o pubblicati; draft, pending e rejected esclusi." };
}
