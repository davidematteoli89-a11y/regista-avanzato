import type { PublicDataList, PublicCompetition } from "./publicDataTypes";
import { readPublicCompetitions } from "./supabasePublicViews";

export async function getPublicCompetitions(): Promise<PublicDataList<PublicCompetition>> {
  return readPublicCompetitions();
}
