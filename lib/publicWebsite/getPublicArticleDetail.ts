import { MOCK_PUBLIC_ARTICLES } from "./mockPublicWebsiteData";
import { getPublicArticleAccess, isPublicArticle } from "./publicWebsiteAccessRules";
import { mapArticleForPublic } from "./publicWebsiteMappers";

export async function getPublicArticleDetail(articleId: string, options: { isLoggedIn?: boolean } = {}) {
  const article = MOCK_PUBLIC_ARTICLES.find((item) => (item.id === articleId || item.slug === articleId) && isPublicArticle(item));
  if (!article) return null;
  const access = getPublicArticleAccess(article, options.isLoggedIn ?? false);
  return { article: mapArticleForPublic(article, access), access };
}
