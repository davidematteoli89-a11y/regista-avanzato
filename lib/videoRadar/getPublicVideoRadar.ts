import { MOCK_VIDEO_RADAR_ITEMS } from "./mockVideoRadarData";
import { filterVideoRadarItems, type VideoRadarFilters } from "./videoRadarFilters";
import type { PublicVideoRadarResult, VideoAccessState, VideoRadarItem } from "./videoRadarTypes";
const previewItem = (item: VideoRadarItem): VideoRadarItem => ({ ...item, editorialNotes: null, officialVideoUrl: null });
export async function getPublicVideoRadar(access: VideoAccessState, filters: VideoRadarFilters = {}): Promise<PublicVideoRadarResult> { const approved = filterVideoRadarItems(MOCK_VIDEO_RADAR_ITEMS, { ...filters, statuses: ["approved"] }); const items = access.canViewFullRadar ? approved : approved.slice(0, 2).map(previewItem); return { items, preview: !access.canViewFullRadar, message: access.canViewFullRadar ? "Video Radar mock completo: solo elementi approvati." : "Anteprima pubblica; accedi per il Video Radar completo.", consumesSearchQuota: false }; }
