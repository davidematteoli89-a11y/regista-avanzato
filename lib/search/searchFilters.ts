import { SEARCH_TYPES, type MockSearchIndexItem, type SearchFilters, type SearchQuery, type SearchType } from "./searchTypes";

export const DEFAULT_SEARCH_FILTERS: SearchFilters = {
  countries: [], competitionIds: [], season: null, dateFrom: null, dateTo: null,
  onlyWithHighlights: false, onlyVideoRadar: false, limit: 24,
};

export function isSearchType(value: unknown): value is SearchType {
  return typeof value === "string" && SEARCH_TYPES.includes(value as SearchType);
}

export function normalizeSearchQuery(query: Partial<SearchQuery>): SearchQuery {
  const rawFilters = query.filters ?? DEFAULT_SEARCH_FILTERS;
  return {
    text: typeof query.text === "string" ? query.text.trim().slice(0, 120) : "",
    type: isSearchType(query.type) ? query.type : "all",
    filters: {
      countries: Array.isArray(rawFilters.countries) ? rawFilters.countries.filter(Boolean).slice(0, 10) : [],
      competitionIds: Array.isArray(rawFilters.competitionIds) ? rawFilters.competitionIds.filter(Boolean).slice(0, 10) : [],
      season: rawFilters.season?.trim() || null,
      dateFrom: rawFilters.dateFrom?.trim() || null,
      dateTo: rawFilters.dateTo?.trim() || null,
      onlyWithHighlights: rawFilters.onlyWithHighlights === true,
      onlyVideoRadar: rawFilters.onlyVideoRadar === true,
      limit: Math.min(50, Math.max(1, Math.floor(rawFilters.limit || DEFAULT_SEARCH_FILTERS.limit))),
    },
  };
}

const timestamp = (value: string | null): number | null => value ? Date.parse(value) : null;

export function matchesSearchFilters(item: MockSearchIndexItem, query: SearchQuery): boolean {
  const { filters } = query;
  if (query.type !== "all" && item.entityType !== query.type) return false;
  if (filters.countries.length > 0 && (!item.country || !filters.countries.includes(item.country))) return false;
  if (filters.competitionIds.length > 0 && (!item.competitionId || !filters.competitionIds.includes(item.competitionId))) return false;
  if (filters.season && item.season !== filters.season) return false;
  if (filters.onlyWithHighlights && !item.hasOfficialHighlights) return false;
  if (filters.onlyVideoRadar && !item.hasVideoRadar) return false;
  const occurred = timestamp(item.occurredAt);
  const from = timestamp(filters.dateFrom);
  const to = timestamp(filters.dateTo);
  if (from !== null && (occurred === null || occurred < from)) return false;
  if (to !== null && (occurred === null || occurred > to + 86_399_999)) return false;
  return true;
}
