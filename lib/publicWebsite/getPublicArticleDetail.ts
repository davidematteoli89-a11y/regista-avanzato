import { MOCK_PUBLIC_ARTICLES } from "./mockPublicWebsiteData";
import { readEditorialArticleFromSupabase } from "../publicData/supabaseEditorialViews";
import { getPublicArticleAccess, isPublicArticle } from "./publicWebsiteAccessRules";
import { mapArticleForPublic } from "./publicWebsiteMappers";

export async function getPublicArticleDetail(articleId: string, options: { isLoggedIn?: boolean } = {}) {
  const supabaseArticle = await readEditorialArticleFromSupabase(articleId);
  if (supabaseArticle) {
    const canViewFull = supabaseArticle.visibility === "public_full" || (supabaseArticle.visibility === "login_required" && Boolean(options.isLoggedIn));
    return {
      article: canViewFull ? supabaseArticle : { ...supabaseArticle, bodySections: [] },
      access: {
        canViewFull,
        requiresLogin: supabaseArticle.visibility === "login_required" && !options.isLoggedIn,
        redirectsToSubstack: supabaseArticle.visibility === "substack_only" || supabaseArticle.visibility === "paid_substack_candidate",
        isPreview: !canViewFull,
        consumesSearchQuota: false as const,
        message: canViewFull ? "Articolo letto da Supabase staging." : "Anteprima pubblica approvata.",
      },
    };
  }
  if (supabaseArticle === null) return null;

  const article = MOCK_PUBLIC_ARTICLES.find((item) => (item.id === articleId || item.slug === articleId) && isPublicArticle(item));
  if (!article) return null;
  const access = getPublicArticleAccess(article, options.isLoggedIn ?? false);
  return { article: mapArticleForPublic(article, access), access };
}
