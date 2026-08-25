import type { MockSearchIndexItem, SearchEntityType, SearchResult, SearchResultGroup } from "./searchTypes";

const GROUP_LABELS: Record<SearchEntityType, string> = {
  players: "Giocatori", teams: "Squadre", competitions: "Campionati", matches: "Partite",
  stories: "Storie", articles: "Articoli", highlights: "Highlights ufficiali",
  video_radar: "Video Radar", historical_echo: "Historical Echo", news: "News Radar",
};

export function mapSearchResult(item: MockSearchIndexItem, terms: readonly string[]): SearchResult {
  const haystack = item.searchableText.toLocaleLowerCase("it-IT");
  const matches = terms.filter((term) => haystack.includes(term)).length;
  const { searchableText: _searchableText, ...result } = item;
  return { ...result, relevanceScore: terms.length === 0 ? 0.5 : Number((matches / terms.length).toFixed(3)), source: "mock_index" };
}

export function groupSearchResults(results: readonly SearchResult[]): SearchResultGroup[] {
  const grouped = new Map<SearchEntityType, SearchResult[]>();
  for (const result of results) grouped.set(result.entityType, [...(grouped.get(result.entityType) ?? []), result]);
  return [...grouped.entries()].map(([entityType, items]) => ({ entityType, label: GROUP_LABELS[entityType], results: items }));
}
