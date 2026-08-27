import { MOCK_NEWS_RADAR_DATA } from "./mockNewsRadarData";
import { readNewsFromSupabase } from "../publicData/supabaseEditorialViews";
import { getPublicNewsAccess, isPublicNewsRadarItem, NEWS_RADAR_PUBLIC_ACCESS } from "./newsRadarAccessRules";
import { filterNewsRadar, type NewsRadarFilters } from "./newsRadarFilters";
import { mapNewsForPublic } from "./newsRadarMappers";

export async function getPublicNews(filters: NewsRadarFilters = {}) {
  const supabaseData = await readNewsFromSupabase();
  if (supabaseData) {
    return { items: supabaseData.items, access: NEWS_RADAR_PUBLIC_ACCESS, message: `${supabaseData.message} Score tecnici, warning admin e payload interni restano esclusi.` };
  }

  const items = filterNewsRadar(MOCK_NEWS_RADAR_DATA.filter(isPublicNewsRadarItem), filters).map((item) => ({ ...mapNewsForPublic(item, getPublicNewsAccess(item)), body: [] }));
  return { items, access: NEWS_RADAR_PUBLIC_ACCESS, message: "Solo news mock approvate/pubblicate con fonti compatibili con il pubblico." };
}
