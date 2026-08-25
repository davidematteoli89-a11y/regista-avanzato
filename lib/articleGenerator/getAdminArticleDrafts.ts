import { MOCK_ARTICLE_DRAFTS } from "./mockArticleDrafts";
import type { ArticleDraftFormat, ArticleDraftRiskLevel, ArticleDraftStatus } from "./articleGeneratorTypes";

export type AdminArticleDraftFilters = { statuses?: readonly ArticleDraftStatus[]; formats?: readonly ArticleDraftFormat[]; riskLevels?: readonly ArticleDraftRiskLevel[]; text?: string | null };

export async function getAdminArticleDrafts(filters: AdminArticleDraftFilters = {}) {
  const text = filters.text?.trim().toLocaleLowerCase("it-IT");
  return MOCK_ARTICLE_DRAFTS.filter((draft) => (!filters.statuses?.length || filters.statuses.includes(draft.status)) && (!filters.formats?.length || filters.formats.includes(draft.format)) && (!filters.riskLevels?.length || filters.riskLevels.includes(draft.riskLevel)) && (!text || `${draft.title} ${draft.subtitle}`.toLocaleLowerCase("it-IT").includes(text))).map((draft) => ({ ...draft }));
}
