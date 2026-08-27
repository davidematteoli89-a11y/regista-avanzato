import type { PublicDataList, PublicStanding } from "./publicDataTypes";
import { readPublicStandings } from "./supabasePublicViews";

export async function getPublicStandings(competitionId: string): Promise<PublicDataList<PublicStanding>> {
  return readPublicStandings(competitionId);
}
