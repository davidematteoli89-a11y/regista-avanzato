import type { NewsRadarCategory, NewsRadarItem, NewsRadarPriority, NewsRadarSignalType, NewsRadarStatus, NewsRadarVisibility } from "./newsRadarTypes";

export type NewsRadarFilters = { categories?: readonly NewsRadarCategory[]; statuses?: readonly NewsRadarStatus[]; visibilities?: readonly NewsRadarVisibility[]; priorities?: readonly NewsRadarPriority[]; signalTypes?: readonly NewsRadarSignalType[]; text?: string | null };

export function filterNewsRadar(items: readonly NewsRadarItem[], filters: NewsRadarFilters = {}): NewsRadarItem[] {
  const text = filters.text?.trim().toLocaleLowerCase("it-IT");
  return items.filter((item) => (!filters.categories?.length || filters.categories.includes(item.category)) && (!filters.statuses?.length || filters.statuses.includes(item.status)) && (!filters.visibilities?.length || filters.visibilities.includes(item.visibility)) && (!filters.priorities?.length || filters.priorities.includes(item.priority)) && (!filters.signalTypes?.length || item.signals.some((signal) => filters.signalTypes?.includes(signal.type))) && (!text || `${item.title} ${item.summary} ${item.signals.map((signal) => signal.label).join(" ")}`.toLocaleLowerCase("it-IT").includes(text)));
}
