import type { PublicDataList, PublicTeam } from "./publicDataTypes";
import { readPublicTeams } from "./supabasePublicViews";

export async function getPublicTeams(competitionId?: string): Promise<PublicDataList<PublicTeam>> {
  return readPublicTeams(competitionId);
}
