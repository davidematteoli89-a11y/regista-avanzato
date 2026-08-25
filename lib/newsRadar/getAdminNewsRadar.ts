import { MOCK_NEWS_RADAR_DATA } from "./mockNewsRadarData";
import { checkNewsRadarRules } from "./newsRadarRules";
import { filterNewsRadar, type NewsRadarFilters } from "./newsRadarFilters";
import { checkNewsSource } from "./newsSourceRules";

export async function getAdminNewsRadar(filters: NewsRadarFilters = {}) {
  return filterNewsRadar(MOCK_NEWS_RADAR_DATA, filters).map((item) => ({ ...item, sourceChecks: item.sources.map((source) => ({ sourceId: source.id, ...checkNewsSource(source) })), ruleCheck: checkNewsRadarRules(item) }));
}
