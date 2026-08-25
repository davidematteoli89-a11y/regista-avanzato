import type { ArticleDraft } from "./articleGeneratorTypes";

export function isPrivateAdminArticleDraft(draft: ArticleDraft): boolean { return draft.visibility === "private_admin"; }
export function canAutomaticallyPublishArticleDraft(_draft: ArticleDraft): false { return false; }
export const ARTICLE_GENERATOR_ACCESS = { adminOnly: true as const, writesDatabase: false as const, writesFiles: false as const, callsExternalAi: false as const, autoPublishes: false as const };
