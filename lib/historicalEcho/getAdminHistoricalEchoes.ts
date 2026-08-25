import { filterHistoricalEchoes, type HistoricalEchoFilters } from "./historicalEchoFilters";
import { MOCK_HISTORICAL_ECHO_DATA } from "./mockHistoricalEchoData";

export async function getAdminHistoricalEchoes(filters: HistoricalEchoFilters = {}) {
  return filterHistoricalEchoes(MOCK_HISTORICAL_ECHO_DATA, filters).map((echo) => ({ ...echo, internalWarnings: [...echo.internalWarnings] }));
}
