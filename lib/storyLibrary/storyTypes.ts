export type StoryCategory = "legendary_match" | "player_profile" | "team_story" | "tactical_story" | "transfer_story" | "underdog_story" | "rivalry" | "record" | "comeback" | "scandal_or_controversy" | "cultural_story" | "italian_connection" | "historical_echo" | "talent_story";
export type StoryStatus = "draft" | "pending_review" | "approved" | "published" | "archived" | "rejected";
export type StoryVisibility = "private_admin" | "public_preview" | "public_full" | "substack_only" | "paid_substack_candidate";
export type StorySourceType = "original_note" | "markdown_file" | "pdf_reference" | "book_reference" | "article_reference" | "video_reference" | "official_source" | "database_trigger" | "manual_research";
export type StoryFormat = "short_story" | "longform_outline" | "profile" | "timeline" | "historical_note" | "video_script_seed";
export type StoryReviewStatus = "not_reviewed" | "needs_sources" | "copyright_check" | "fact_check" | "approved" | "rejected";
export type StoryImportStatus = "valid_preview" | "invalid" | "blocked_copyright" | "needs_review";

export type StorySource = { id: string; type: StorySourceType; title: string; author: string | null; publisher: string | null; sourceUrl: string | null; publishedAt: string | null; referenceNote: string; reliability: "high" | "medium" | "unverified"; humanReviewRequired: boolean; copyrightedFullTextStored: false };
export type StoryRelatedEntity = { type: "match" | "player" | "team" | "competition" | "article" | "video_radar" | "historical_echo"; id: string; label: string };
export type StoryTimelineEvent = { id: string; dateLabel: string; title: string; description: string; sourceIds: string[] };
export type StoryItem = { id: string; slug: string; title: string; category: StoryCategory; status: StoryStatus; visibility: StoryVisibility; format: StoryFormat; summary: string; originalBody: string; keyFacts: string[]; sourceIds: string[]; relatedEntities: StoryRelatedEntity[]; timeline: StoryTimelineEvent[]; tags: string[]; reviewStatus: StoryReviewStatus; reviewWarnings: string[]; createdAt: string; updatedAt: string; publishedAt: string | null; originalOrReworked: true; autoPublished: false };
export type StoryMarkdownFrontmatter = { title: string; category: StoryCategory; format: StoryFormat; source_type: StorySourceType; source_reference: string; summary: string; visibility?: StoryVisibility; tags?: string[] };
export type StoryCopyrightCheckResult = { allowed: boolean; autoPublishAllowed: false; requiresHumanReview: boolean; blocked: boolean; warnings: string[]; reason: string };
export type StoryImportPreview = { status: StoryImportStatus; valid: boolean; frontmatter: Partial<StoryMarkdownFrontmatter>; bodyPreview: string; bodyCharacterCount: number; sourceDetected: boolean; errors: string[]; warnings: string[]; copyright: StoryCopyrightCheckResult; autoPublish: false; wroteFiles: false; wroteDatabase: false };
