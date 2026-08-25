import { HISTORICAL_ECHO_PUBLIC_ACCESS, canShowFullHistoricalEcho, isPublicHistoricalEcho } from "./historicalEchoAccessRules";
import { mapHistoricalEchoForPublic } from "./historicalEchoMappers";
import { MOCK_HISTORICAL_ECHO_DATA } from "./mockHistoricalEchoData";

export async function getPublicHistoricalEchoDetail(echoId: string) {
  const echo = MOCK_HISTORICAL_ECHO_DATA.find((item) => (item.id === echoId || item.slug === echoId) && isPublicHistoricalEcho(item));
  if (!echo) return null;
  const mapped = mapHistoricalEchoForPublic(echo);
  return {
    echo: canShowFullHistoricalEcho(echo) ? mapped : { ...mapped, comparisonPoints: [], relatedMatches: [], timeline: [] },
    isPreview: !canShowFullHistoricalEcho(echo),
    access: HISTORICAL_ECHO_PUBLIC_ACCESS,
  };
}
