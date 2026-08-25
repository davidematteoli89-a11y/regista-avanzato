export type ArticleDraftStatus = "generated" | "draft" | "pending_review" | "approved" | "published" | "rejected" | "archived";
export type ArticleDraftVisibility = "private_admin" | "public_preview" | "public_full" | "login_required" | "substack_only" | "paid_substack_candidate";
export type ArticleDraftFormat = "short_article" | "long_article" | "match_story" | "talent_profile" | "historical_echo" | "news_analysis" | "tactical_note" | "listicle" | "weekly_column" | "substack_preview";
export type ArticleDraftSourceType = "story_library" | "news_radar" | "historical_echo" | "video_radar" | "match_trigger" | "stats_signal" | "manual_note" | "official_source" | "mock_data";
export type ArticleDraftRiskLevel = "low" | "medium" | "high" | "blocked";
export type ArticleEditorialTone = "clear_narrative" | "analytical" | "concise" | "cautious" | "cultural";
export type ArticleFactConfidence = "verified" | "likely" | "uncertain" | "opinion" | "unknown";
export type ArticleDestination = "website_article" | "website_preview" | "substack_free" | "substack_paid" | "weekly_digest" | "video_script_seed" | "private_note";
export type ArticleDraftRiskFlag = "rumor" | "injury" | "controversy" | "copyright" | "unverified_data" | "assertive_claim" | "video_rights";
export type ArticleDraftSectionKind = "title" | "subtitle" | "opening" | "context" | "why_interesting" | "available_data" | "historical_connection" | "editorial_angle" | "verification" | "cta";

export type ArticleDraftSource = {
  id: string;
  type: ArticleDraftSourceType;
  referenceId: string;
  label: string;
  shortSummary: string;
  referenceUrl: string | null;
  factConfidence: ArticleFactConfidence;
  riskFlags: ArticleDraftRiskFlag[];
  verifiedForDraft: boolean;
  copyrightReviewRequired: boolean;
  copiedLongText: false;
};

export type ArticleDraftRisk = {
  id: string;
  level: ArticleDraftRiskLevel;
  code: "missing_source" | "rumor" | "injury" | "controversy" | "unverified_data" | "copyright" | "assertive_claim" | "video_rights";
  message: string;
  blocksAutomaticPublication: true;
};

export type ArticleDraftReviewItem = {
  id: string;
  label: string;
  description: string;
  required: true;
  status: "pending" | "passed" | "blocked";
};

export type ArticleDraftSection = {
  id: string;
  kind: ArticleDraftSectionKind;
  heading: string;
  paragraphs: string[];
  factConfidence: ArticleFactConfidence;
  sourceIds: string[];
};

export type ArticleDraftFrontmatter = {
  title: string;
  subtitle: string;
  status: ArticleDraftStatus;
  visibility: ArticleDraftVisibility;
  format: ArticleDraftFormat;
  tone: ArticleEditorialTone;
  destinations: ArticleDestination[];
  source_ids: string[];
  human_review_required: true;
  auto_publish: false;
};

export type ArticleDraft = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  status: ArticleDraftStatus;
  visibility: ArticleDraftVisibility;
  format: ArticleDraftFormat;
  tone: ArticleEditorialTone;
  destinations: ArticleDestination[];
  sections: ArticleDraftSection[];
  sources: ArticleDraftSource[];
  risks: ArticleDraftRisk[];
  riskLevel: ArticleDraftRiskLevel;
  reviewChecklist: ArticleDraftReviewItem[];
  internalPrompt: string;
  markdownPreview: string;
  reviewedByHuman: boolean;
  generatedWithoutExternalAi: true;
  autoPublish: false;
  createdAt: string;
  updatedAt: string;
};

export type ArticleDraftSourceRef = { type: "story_library" | "news_radar" | "historical_echo" | "video_radar"; id: string };
export type ArticleDraftGenerationInput = {
  draftId?: string;
  workingTitle?: string;
  format: ArticleDraftFormat;
  tone: ArticleEditorialTone;
  destination: ArticleDestination;
  sourceRefs: ArticleDraftSourceRef[];
  includeCta?: boolean;
};

export type ArticleDraftGenerationResult = {
  success: boolean;
  draft: ArticleDraft;
  markdown: string;
  warnings: string[];
  externalAiCalls: 0;
  networkCalls: 0;
  filesWritten: 0;
  databaseWrites: 0;
  published: false;
};

export type ArticleSourceCollectionResult = { sources: ArticleDraftSource[]; missingRefs: ArticleDraftSourceRef[]; warnings: string[] };
