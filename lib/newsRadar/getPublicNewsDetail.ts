import { MOCK_NEWS_RADAR_DATA } from "./mockNewsRadarData";
import { readNewsDetailFromSupabase } from "../publicData/supabaseEditorialViews";
import { getPublicNewsAccess, isPublicNewsRadarItem } from "./newsRadarAccessRules";
import { mapNewsForPublic } from "./newsRadarMappers";

export async function getPublicNewsDetail(newsId: string, options: { isLoggedIn?: boolean } = {}) {
  const supabaseNews = await readNewsDetailFromSupabase(newsId);
  if (supabaseNews) {
    const canViewFull = supabaseNews.visibility === "public_full" || (supabaseNews.visibility === "login_required" && Boolean(options.isLoggedIn));
    return {
      news: canViewFull ? supabaseNews : { ...supabaseNews, body: [] },
      access: {
        canViewFull,
        isPreview: !canViewFull,
        requiresLogin: supabaseNews.visibility === "login_required" && !options.isLoggedIn,
        redirectsToSubstack: supabaseNews.visibility === "substack_only" || supabaseNews.visibility === "paid_substack_candidate",
        consumesSearchQuota: false as const,
        message: canViewFull ? "News letta da Supabase staging." : "Anteprima pubblica approvata.",
      },
    };
  }
  if (supabaseNews === null) return null;

  const item = MOCK_NEWS_RADAR_DATA.find((news) => (news.id === newsId || news.slug === newsId) && isPublicNewsRadarItem(news));
  if (!item) return null;
  const access = getPublicNewsAccess(item, options.isLoggedIn ?? false);
  return { news: mapNewsForPublic(item, access), access };
}
