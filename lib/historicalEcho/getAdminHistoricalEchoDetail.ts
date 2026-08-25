import { MOCK_HISTORICAL_ECHO_DATA } from "./mockHistoricalEchoData";

export async function getAdminHistoricalEchoDetail(echoId: string) {
  const echo = MOCK_HISTORICAL_ECHO_DATA.find((item) => item.id === echoId || item.slug === echoId);
  return echo ? { echo: { ...echo }, canPublishAutomatically: false as const, writesPerformed: false as const } : null;
}
