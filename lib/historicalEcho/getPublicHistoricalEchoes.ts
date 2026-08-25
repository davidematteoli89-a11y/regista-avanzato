import { HISTORICAL_ECHO_PUBLIC_ACCESS, isPublicHistoricalEcho } from "./historicalEchoAccessRules";
import { filterHistoricalEchoes, type HistoricalEchoFilters } from "./historicalEchoFilters";
import { mapHistoricalEchoForPublic } from "./historicalEchoMappers";
import { MOCK_HISTORICAL_ECHO_DATA } from "./mockHistoricalEchoData";

export async function getPublicHistoricalEchoes(filters: HistoricalEchoFilters = {}) {
  const items = filterHistoricalEchoes(MOCK_HISTORICAL_ECHO_DATA.filter(isPublicHistoricalEcho), filters).map(mapHistoricalEchoForPublic);
  return { items, access: HISTORICAL_ECHO_PUBLIC_ACCESS, message: "Collegamenti editoriali mock approvati; nessun dato live o confronto automatico pubblicato." };
}
