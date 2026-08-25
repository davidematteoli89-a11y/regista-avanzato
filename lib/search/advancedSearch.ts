import type { SearchLimitStatus } from "@/lib/freeSearch/searchLimitTypes";
import { MOCK_SEARCH_INDEX } from "./mockSearchIndex";
import { matchesSearchFilters, normalizeSearchQuery } from "./searchFilters";
import { groupSearchResults, mapSearchResult } from "./searchResultMapper";
import type { AdvancedSearchResponse, SearchQuery } from "./searchTypes";

export type AdvancedSearchInput = {
  query: Partial<SearchQuery>;
  limitStatus: SearchLimitStatus;
};

/** Motore in memoria: non controlla/incrementa quota e non usa rete, provider o Supabase. */
export async function advancedSearch(input: AdvancedSearchInput): Promise<AdvancedSearchResponse> {
  const query = normalizeSearchQuery(input.query);
  if (!input.limitStatus.allowed) {
    return { mode: "safe_mock", query, allowed: false, quotaConsumed: false, totalResults: 0, groups: [], limitStatus: input.limitStatus, message: input.limitStatus.reason, warnings: ["Ricerca non eseguita: autorizzazione/quota ricevuta dal caller non disponibile."] };
  }
  const terms = query.text.toLocaleLowerCase("it-IT").split(/\s+/).filter((term) => term.length >= 2 || /^\d$/.test(term));
  const results = MOCK_SEARCH_INDEX
    .filter((item) => matchesSearchFilters(item, query))
    .filter((item) => terms.length === 0 || terms.some((term) => item.searchableText.toLocaleLowerCase("it-IT").includes(term)))
    .map((item) => mapSearchResult(item, terms))
    .sort((left, right) => right.relevanceScore - left.relevanceScore)
    .slice(0, query.filters.limit);
  return {
    mode: "safe_mock", query, allowed: true, quotaConsumed: false, totalResults: results.length,
    groups: groupSearchResults(results), limitStatus: input.limitStatus,
    message: `${results.length} risultati mock. La quota non è stata consumata in questo step.`,
    warnings: ["Indice dimostrativo in memoria: nessun risultato proviene da Supabase o provider esterni."],
  };
}

export function getAdvancedSearchPreview() {
  return MOCK_SEARCH_INDEX.slice(0, 3).map((item) => mapSearchResult(item, []));
}
