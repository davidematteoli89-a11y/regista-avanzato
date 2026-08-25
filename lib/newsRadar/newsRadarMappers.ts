import type { NewsRadarItem, NewsRadarPublicAccess, PublicNewsRadarItem } from "./newsRadarTypes";

export function mapNewsForPublic(item: NewsRadarItem, access: NewsRadarPublicAccess): PublicNewsRadarItem {
  const { score: _score, priority: _priority, internalWarnings: _warnings, editorialSuggestion: _suggestion, duplicateCandidate: _duplicate, reviewedByHuman: _reviewed, sources, ...safe } = item;
  return { ...safe, body: access.canViewFull ? safe.body : [], sources: sources.filter((source) => source.publiclyVisible).map(({ internalNote: _note, publiclyVisible: _public, ...source }) => source) };
}
