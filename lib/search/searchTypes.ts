import type { SearchLimitStatus } from "@/lib/freeSearch/searchLimitTypes";

export const SEARCH_TYPES = [
  "all", "players", "teams", "competitions", "matches", "stories", "articles",
  "highlights", "video_radar", "historical_echo", "news",
] as const;

export type SearchType = (typeof SEARCH_TYPES)[number];
export type SearchEntityType = Exclude<SearchType, "all">;

export type SearchFilters = {
  countries: string[];
  competitionIds: string[];
  season: string | null;
  dateFrom: string | null;
  dateTo: string | null;
  onlyWithHighlights: boolean;
  onlyVideoRadar: boolean;
  limit: number;
};

export type SearchQuery = {
  text: string;
  type: SearchType;
  filters: SearchFilters;
};

export type SearchResult = {
  id: string;
  entityType: SearchEntityType;
  title: string;
  summary: string;
  href: string;
  country: string | null;
  competitionId: string | null;
  season: string | null;
  occurredAt: string | null;
  hasOfficialHighlights: boolean;
  hasVideoRadar: boolean;
  tags: string[];
  relevanceScore: number;
  source: "mock_index";
};

export type SearchResultGroup = {
  entityType: SearchEntityType;
  label: string;
  results: SearchResult[];
};

export type AdvancedSearchResponse = {
  mode: "safe_mock";
  query: SearchQuery;
  allowed: boolean;
  quotaConsumed: boolean;
  totalResults: number;
  groups: SearchResultGroup[];
  limitStatus: SearchLimitStatus;
  message: string;
  warnings: string[];
};

export type MockSearchIndexItem = Omit<SearchResult, "relevanceScore" | "source"> & {
  searchableText: string;
};
