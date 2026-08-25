import { MOCK_HIGHLIGHT_LINKS } from "./mockPublicData";
import type { PublicHighlightLink } from "./publicDataTypes";
export async function getPublicHighlightLinks(matchId: string, includeFullLinks = false): Promise<PublicHighlightLink[]> { const items = MOCK_HIGHLIGHT_LINKS.filter((item) => item.matchId === matchId); return includeFullLinks ? items : items.map((item) => ({ ...item, url: null })); }
