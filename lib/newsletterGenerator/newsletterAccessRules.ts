import type { NewsletterDraft } from "./newsletterGeneratorTypes";
export function isPrivateAdminNewsletterDraft(draft: NewsletterDraft): boolean { return draft.visibility === "private_admin"; }
export function canAutomaticallyPublishNewsletter(_draft: NewsletterDraft): false { return false; }
export function canAutomaticallySendNewsletter(_draft: NewsletterDraft): false { return false; }
export const NEWSLETTER_GENERATOR_ACCESS = { adminOnly: true as const, callsSubstackApi: false as const, sendsEmail: false as const, callsExternalAi: false as const, writesFiles: false as const, writesDatabase: false as const, autoPublishes: false as const, autoSends: false as const };
