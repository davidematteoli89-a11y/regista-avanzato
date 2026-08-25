import { MOCK_NEWS_RADAR_DATA } from "./mockNewsRadarData";
import { getPublicNewsAccess, isPublicNewsRadarItem } from "./newsRadarAccessRules";
import { mapNewsForPublic } from "./newsRadarMappers";

export async function getPublicNewsDetail(newsId: string, options: { isLoggedIn?: boolean } = {}) {
  const item = MOCK_NEWS_RADAR_DATA.find((news) => (news.id === newsId || news.slug === newsId) && isPublicNewsRadarItem(news));
  if (!item) return null;
  const access = getPublicNewsAccess(item, options.isLoggedIn ?? false);
  return { news: mapNewsForPublic(item, access), access };
}
