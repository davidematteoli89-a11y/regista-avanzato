import { MOCK_PUBLIC_PLAYERS } from "./mockPublicData";
import type { PublicDataList, PublicPlayer } from "./publicDataTypes";
export async function getPublicPlayers(competitionId?: string): Promise<PublicDataList<PublicPlayer>> { const items = competitionId ? MOCK_PUBLIC_PLAYERS.filter((item) => item.competitionId === competitionId) : [...MOCK_PUBLIC_PLAYERS]; return { items, meta: { source: "mock_public_snapshot", total: items.length, warning: items.length ? "Giocatori dimostrativi." : "Copertura giocatori non disponibile nel mock." } }; }
