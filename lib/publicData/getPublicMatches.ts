import type { PublicDataList, PublicMatch } from "./publicDataTypes";
import { readPublicMatches } from "./supabasePublicViews";

export async function getPublicMatches(competitionId?: string): Promise<PublicDataList<PublicMatch>> {
  return readPublicMatches(competitionId);
}
