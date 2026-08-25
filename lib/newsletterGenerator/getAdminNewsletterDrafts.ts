import { MOCK_NEWSLETTER_DRAFTS } from "./mockNewsletterDrafts";
import type { NewsletterDraft, NewsletterDraftFormat, NewsletterDraftPlan, NewsletterDraftRiskLevel } from "./newsletterGeneratorTypes";

export type AdminNewsletterDraftFilters = { format?: NewsletterDraftFormat; plan?: NewsletterDraftPlan; riskLevel?: NewsletterDraftRiskLevel };

export async function getAdminNewsletterDrafts(filters: AdminNewsletterDraftFilters = {}): Promise<NewsletterDraft[]> {
  return MOCK_NEWSLETTER_DRAFTS.filter((draft) => draft.visibility === "private_admin")
    .filter((draft) => !filters.format || draft.format === filters.format)
    .filter((draft) => !filters.plan || draft.plan === filters.plan)
    .filter((draft) => !filters.riskLevel || draft.riskLevel === filters.riskLevel)
    .map((draft) => ({ ...draft, sections: draft.sections.map((section) => ({ ...section, items: [...section.items], sourceIds: [...section.sourceIds] })), sources: [...draft.sources], risks: [...draft.risks], reviewChecklist: [...draft.reviewChecklist] }));
}
