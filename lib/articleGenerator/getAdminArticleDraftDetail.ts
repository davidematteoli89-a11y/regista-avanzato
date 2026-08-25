import { MOCK_ARTICLE_DRAFTS, MOCK_ARTICLE_GENERATION_RESULTS } from "./mockArticleDrafts";
import { canAutomaticallyPublishArticleDraft, isPrivateAdminArticleDraft } from "./articleAccessRules";

export async function getAdminArticleDraftDetail(draftId: string) {
  const draft = MOCK_ARTICLE_DRAFTS.find((item) => item.id === draftId || item.slug === draftId);
  if (!draft) return null;
  const result = MOCK_ARTICLE_GENERATION_RESULTS.find((item) => item.draft.id === draft.id);
  return { draft: { ...draft }, generationWarnings: [...(result?.warnings ?? [])], privateAdminOnly: isPrivateAdminArticleDraft(draft), canPublishAutomatically: canAutomaticallyPublishArticleDraft(draft), writesPerformed: false as const, externalAiCalls: 0 as const };
}
