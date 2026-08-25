import { MOCK_PUBLIC_COMPETITIONS } from "./mockPublicData";
import type { PublicDataList, PublicCompetition } from "./publicDataTypes";

export async function getPublicCompetitions(): Promise<PublicDataList<PublicCompetition>> {
  const items = MOCK_PUBLIC_COMPETITIONS.filter((item) => item.publicStatsEnabled);
  return { items, meta: { source: "mock_public_snapshot", total: items.length, warning: "Dati dimostrativi." } };
}
