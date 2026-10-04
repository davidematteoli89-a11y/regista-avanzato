import { HISTORICAL_ECHO_PUBLIC_ACCESS, canShowFullHistoricalEcho, isPublicHistoricalEcho } from "./historicalEchoAccessRules";
import { readHistoricalEchoDetailFromSupabase } from "../publicData/supabaseEditorialViews";
import { mapHistoricalEchoForPublic } from "./historicalEchoMappers";
import { MOCK_HISTORICAL_ECHO_DATA } from "./mockHistoricalEchoData";

export async function getPublicHistoricalEchoDetail(echoId: string) {
  const supabaseEcho = await readHistoricalEchoDetailFromSupabase(echoId);
  if (supabaseEcho) {
    const isPreview = supabaseEcho.visibility !== "public_full";
    return {
      echo: isPreview ? { ...supabaseEcho, comparisonPoints: [], relatedMatches: [], timeline: [] } : supabaseEcho,
      isPreview,
      access: HISTORICAL_ECHO_PUBLIC_ACCESS,
    };
  }
  if (supabaseEcho === null) return null;

  const echo = MOCK_HISTORICAL_ECHO_DATA.find((item) => (item.id === echoId || item.slug === echoId) && isPublicHistoricalEcho(item));
  if (!echo) return null;
  const mapped = mapHistoricalEchoForPublic(echo);
  return {
    echo: canShowFullHistoricalEcho(echo) ? mapped : { ...mapped, comparisonPoints: [], relatedMatches: [], timeline: [] },
    isPreview: !canShowFullHistoricalEcho(echo),
    access: HISTORICAL_ECHO_PUBLIC_ACCESS,
  };
}
