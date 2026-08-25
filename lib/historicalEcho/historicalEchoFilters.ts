import type { HistoricalEcho, HistoricalEchoConfidence, HistoricalEchoStatus, HistoricalEchoType, HistoricalEchoVisibility } from "./historicalEchoTypes";

export type HistoricalEchoFilters = {
  types?: readonly HistoricalEchoType[];
  statuses?: readonly HistoricalEchoStatus[];
  visibilities?: readonly HistoricalEchoVisibility[];
  confidences?: readonly HistoricalEchoConfidence[];
  text?: string | null;
};

export function filterHistoricalEchoes(echoes: readonly HistoricalEcho[], filters: HistoricalEchoFilters = {}): HistoricalEcho[] {
  const text = filters.text?.trim().toLocaleLowerCase("it-IT");
  return echoes.filter((echo) =>
    (!filters.types?.length || filters.types.includes(echo.type)) &&
    (!filters.statuses?.length || filters.statuses.includes(echo.status)) &&
    (!filters.visibilities?.length || filters.visibilities.includes(echo.visibility)) &&
    (!filters.confidences?.length || filters.confidences.includes(echo.score.confidence)) &&
    (!text || `${echo.title} ${echo.summary} ${echo.explanation}`.toLocaleLowerCase("it-IT").includes(text))
  );
}
