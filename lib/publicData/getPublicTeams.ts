import { MOCK_PUBLIC_TEAMS } from "./mockPublicData";
import type { PublicDataList, PublicTeam } from "./publicDataTypes";
export async function getPublicTeams(competitionId?: string): Promise<PublicDataList<PublicTeam>> { const items = competitionId ? MOCK_PUBLIC_TEAMS.filter((item) => item.competitionId === competitionId) : [...MOCK_PUBLIC_TEAMS]; return { items, meta: { source: "mock_public_snapshot", total: items.length, warning: items.length ? "Squadre dimostrative." : "Copertura squadre non disponibile nel mock." } }; }
