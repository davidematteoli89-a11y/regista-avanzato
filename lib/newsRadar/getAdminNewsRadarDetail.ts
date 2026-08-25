import { MOCK_NEWS_RADAR_DATA } from "./mockNewsRadarData";
import { checkNewsRadarRules } from "./newsRadarRules";
import { checkNewsSource } from "./newsSourceRules";

export async function getAdminNewsRadarDetail(newsId: string) {
  const item = MOCK_NEWS_RADAR_DATA.find((news) => news.id === newsId || news.slug === newsId);
  return item ? { news: { ...item }, sourceChecks: item.sources.map((source) => ({ sourceId: source.id, ...checkNewsSource(source) })), ruleCheck: checkNewsRadarRules(item), writesPerformed: false as const, autoPublishAllowed: false as const } : null;
}
