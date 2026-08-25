import { MOCK_PUBLIC_MATCHES } from "./mockPublicData";
import type { PublicDataList, PublicMatch } from "./publicDataTypes";
export async function getPublicMatches(competitionId?: string): Promise<PublicDataList<PublicMatch>> { const items = competitionId ? MOCK_PUBLIC_MATCHES.filter((item) => item.competitionId === competitionId) : [...MOCK_PUBLIC_MATCHES]; return { items, meta: { source: "mock_public_snapshot", total: items.length, warning: items.length ? "Calendario e risultati dimostrativi." : "Nessuna partita mock disponibile." } }; }
