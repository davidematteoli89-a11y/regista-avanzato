import { canAutomaticallyPublishNewsletter, canAutomaticallySendNewsletter, isPrivateAdminNewsletterDraft } from "./newsletterAccessRules";
import { MOCK_NEWSLETTER_DRAFTS } from "./mockNewsletterDrafts";
import type { NewsletterDraft } from "./newsletterGeneratorTypes";

export type AdminNewsletterDraftDetail = { draft: NewsletterDraft; privateAdminOnly: true; canPublishAutomatically: false; canSendAutomatically: false; externalAiCalls: 0; substackApiCalls: 0; emailsSent: 0; databaseWrites: 0; filesWritten: 0 };

export async function getAdminNewsletterDraftDetail(draftId: string): Promise<AdminNewsletterDraftDetail | null> {
  const draft = MOCK_NEWSLETTER_DRAFTS.find((item) => item.id === draftId || item.slug === draftId);
  if (!draft) return null;
  return { draft, privateAdminOnly: isPrivateAdminNewsletterDraft(draft) as true, canPublishAutomatically: canAutomaticallyPublishNewsletter(draft), canSendAutomatically: canAutomaticallySendNewsletter(draft), externalAiCalls: 0, substackApiCalls: 0, emailsSent: 0, databaseWrites: 0, filesWritten: 0 };
}
