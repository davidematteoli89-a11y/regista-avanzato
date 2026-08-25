import { MOCK_PUBLIC_COMPETITIONS } from "./mockPublicData";
import { getPublicMatches } from "./getPublicMatches";
import { getPublicPlayers } from "./getPublicPlayers";
import { getPublicStandings } from "./getPublicStandings";
import { getPublicTeams } from "./getPublicTeams";
import type { PublicCompetitionDetail } from "./publicDataTypes";
export async function getPublicCompetitionDetail(competitionId: string): Promise<PublicCompetitionDetail | null> { const competition = MOCK_PUBLIC_COMPETITIONS.find((item) => item.id === competitionId); if (!competition) return null; const [standings, matches, teams, players] = await Promise.all([getPublicStandings(competitionId), getPublicMatches(competitionId), getPublicTeams(competitionId), getPublicPlayers(competitionId)]); return { competition, standings: standings.items, recentMatches: matches.items, teams: teams.items, players: players.items }; }
