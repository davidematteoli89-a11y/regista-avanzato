export type NewsletterDraftStatus = "generated" | "draft" | "pending_review" | "approved" | "scheduled_external" | "published_external" | "rejected" | "archived";
export type NewsletterDraftVisibility = "private_admin" | "substack_free" | "substack_paid" | "website_preview" | "paid_substack_candidate";
export type NewsletterDraftFormat = "weekly_digest" | "daily_radar_digest" | "talent_radar" | "minor_league_report" | "historical_echo_digest" | "video_watchlist" | "creator_pack" | "article_roundup" | "matchday_recap" | "scouting_notes";
export type NewsletterDraftPlan = "free" | "paid" | "mixed" | "internal_only";
export type NewsletterDraftSourceType = "story_library" | "news_radar" | "historical_echo" | "video_radar" | "article_draft" | "match_trigger" | "stats_signal" | "minor_league_signal" | "manual_note" | "official_source" | "mock_data";
export type NewsletterDraftRiskLevel = "low" | "medium" | "high" | "blocked";
export type NewsletterEditorialTone = "clear_editorial" | "narrative" | "analytical" | "concise" | "cautious" | "creator_friendly";
export type NewsletterFactConfidence = "verified" | "likely" | "uncertain" | "opinion" | "unknown";
export type NewsletterDestination = "substack_free" | "substack_paid" | "website_preview" | "weekly_digest" | "daily_radar" | "private_note";
export type NewsletterRiskFlag = "rumor" | "injury" | "controversy" | "unverified_data" | "copyright" | "unofficial_highlight" | "commercial_promise" | "scouting_claim" | "video_rights" | "assertive_claim";

export type NewsletterDraftSource = {
  id: string;
  type: NewsletterDraftSourceType;
  referenceId: string;
  label: string;
  shortSummary: string;
  referenceUrl: string | null;
  factConfidence: NewsletterFactConfidence;
  riskFlags: NewsletterRiskFlag[];
  verifiedForDraft: boolean;
  officialLinkVerified: boolean;
  copiedLongText: false;
  downloadedVideo: false;
};

export type NewsletterDraftRisk = {
  id: string;
  level: NewsletterDraftRiskLevel;
  code: "missing_source" | "rumor" | "injury" | "controversy" | "unverified_data" | "copyright" | "unofficial_highlight" | "commercial_promise" | "scouting_claim" | "video_rights" | "assertive_claim";
  message: string;
  blocksAutomaticPublishAndSend: true;
};

export type NewsletterDraftReviewItem = { id: string; label: string; description: string; required: true; status: "pending" | "passed" | "blocked" };
export type NewsletterDraftSection = { id: string; title: string; purpose: string; items: string[]; factConfidence: NewsletterFactConfidence; sourceIds: string[]; paidOnly: boolean };

export type NewsletterDraftFrontmatter = {
  title: string;
  subject: string;
  status: NewsletterDraftStatus;
  visibility: NewsletterDraftVisibility;
  format: NewsletterDraftFormat;
  plan: NewsletterDraftPlan;
  tone: NewsletterEditorialTone;
  destination: NewsletterDestination;
  source_ids: string[];
  human_review_required: true;
  auto_publish: false;
  auto_send: false;
};

export type NewsletterDraft = {
  id: string;
  slug: string;
  title: string;
  subject: string;
  preheader: string;
  status: NewsletterDraftStatus;
  visibility: NewsletterDraftVisibility;
  format: NewsletterDraftFormat;
  plan: NewsletterDraftPlan;
  tone: NewsletterEditorialTone;
  destination: NewsletterDestination;
  sections: NewsletterDraftSection[];
  sources: NewsletterDraftSource[];
  risks: NewsletterDraftRisk[];
  riskLevel: NewsletterDraftRiskLevel;
  reviewChecklist: NewsletterDraftReviewItem[];
  internalPrompt: string;
  markdownPreview: string;
  reviewedByHuman: boolean;
  generatedWithoutExternalAi: true;
  autoPublish: false;
  autoSend: false;
  createdAt: string;
  updatedAt: string;
};

export type NewsletterDraftSourceRef = { type: "story_library" | "news_radar" | "historical_echo" | "video_radar" | "article_draft" | "match_trigger"; id: string };
export type NewsletterDraftGenerationInput = { draftId?: string; workingTitle?: string; subject?: string; format: NewsletterDraftFormat; plan: NewsletterDraftPlan; tone: NewsletterEditorialTone; destination: NewsletterDestination; sourceRefs: NewsletterDraftSourceRef[]; includeCta?: boolean };
export type NewsletterDraftGenerationResult = { success: boolean; draft: NewsletterDraft; markdown: string; warnings: string[]; externalAiCalls: 0; substackApiCalls: 0; emailsSent: 0; networkCalls: 0; filesWritten: 0; databaseWrites: 0; published: false; sent: false };
export type NewsletterSourceCollectionResult = { sources: NewsletterDraftSource[]; missingRefs: NewsletterDraftSourceRef[]; warnings: string[] };
