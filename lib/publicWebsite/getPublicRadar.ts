import { MOCK_PUBLIC_RADAR_ITEMS } from "./mockPublicWebsiteData";
import { isPublicRadarItem, PUBLIC_WEBSITE_ACCESS } from "./publicWebsiteAccessRules";
import { filterPublicRadar, type PublicRadarFilters } from "./publicWebsiteFilters";
import { mapRadarForPublic } from "./publicWebsiteMappers";

export async function getPublicRadar(filters: PublicRadarFilters = {}) {
  return { items: filterPublicRadar(MOCK_PUBLIC_RADAR_ITEMS.filter(isPublicRadarItem), filters).map(mapRadarForPublic), access: PUBLIC_WEBSITE_ACCESS, disclaimer: "Segnali editoriali da seguire, non previsioni o certezze." };
}
