import { getPublicMatches } from "./getPublicMatches";
import { getPublicPlayers } from "./getPublicPlayers";
import { getPublicStandings } from "./getPublicStandings";
import { getPublicTeams } from "./getPublicTeams";
import type { PublicCompetitionDetail } from "./publicDataTypes";
import { readPublicCompetitionById } from "./supabasePublicViews";

export async function getPublicCompetitionDetail(competitionId: string): Promise<PublicCompetitionDetail | null> {
  const competition = await readPublicCompetitionById(competitionId);
  if (!competition) return null;

  const [standings, matches, teams, players] = await Promise.all([
    getPublicStandings(competitionId),
    getPublicMatches(competitionId),
    getPublicTeams(competitionId),
    getPublicPlayers(competitionId),
  ]);

  return { competition, standings: standings.items, recentMatches: matches.items, teams: teams.items, players: players.items };
}
