import { MOCK_PUBLIC_STANDINGS } from "./mockPublicData";
import type { PublicDataList, PublicStanding } from "./publicDataTypes";
export async function getPublicStandings(competitionId: string): Promise<PublicDataList<PublicStanding>> { const items = MOCK_PUBLIC_STANDINGS.filter((item) => item.competitionId === competitionId); return { items, meta: { source: "mock_public_snapshot", total: items.length, warning: items.length ? "Classifica dimostrativa." : "Classifica non disponibile nel dataset mock." } }; }
