export type NewsRadarCategory = "official_news" | "transfer_market" | "injury_update" | "tactical_analysis" | "talent_signal" | "minor_league_signal" | "italian_connection" | "historical_echo_candidate" | "video_radar_candidate" | "controversy" | "data_signal" | "cultural_story" | "match_preview" | "match_reaction";
export type NewsRadarStatus = "draft" | "candidate" | "pending_review" | "approved" | "published" | "rejected" | "archived";
export type NewsRadarVisibility = "private_admin" | "public_preview" | "public_full" | "login_required" | "substack_only" | "paid_substack_candidate";
export type NewsSourceType = "official_club" | "official_league" | "official_federation" | "official_player" | "verified_journalist" | "media_outlet" | "database_signal" | "manual_research" | "social_signal" | "rumor" | "unknown";
export type NewsSourceReliability = "official" | "high" | "medium" | "low" | "unverified";
export type NewsRadarPriority = "low" | "medium" | "high" | "urgent";
export type NewsRadarSignalType = "club_italiano_citato" | "ex_serie_a" | "giovane_talento" | "partita_pazza" | "risultato_storico" | "trasferimento" | "infortunio" | "debutto" | "record" | "controversia" | "fonte_ufficiale" | "rumor_da_verificare" | "possibile_storia" | "possibile_video" | "possibile_substack";
export type NewsRadarReviewStatus = "not_reviewed" | "needs_sources" | "fact_check" | "editorial_review" | "approved" | "rejected";
export type NewsRadarDestination = "article" | "public_radar" | "substack_free" | "substack_paid" | "historical_echo" | "video_radar" | "weekly_digest";

export type NewsRadarSource = {
  id: string;
  name: string;
  type: NewsSourceType;
  reliability: NewsSourceReliability;
  referenceUrl: string | null;
  referenceLabel: string;
  publiclyVisible: boolean;
  internalNote: string | null;
  checkedOfflineOnly: true;
};

export type NewsRadarSignal = {
  id: string;
  type: NewsRadarSignalType;
  label: string;
  strength: "weak" | "medium" | "strong";
};

export type NewsRadarScore = {
  total: number;
  sourceScore: number;
  signalScore: number;
  penaltyScore: number;
  reasons: string[];
};

export type NewsRadarEditorialSuggestion = {
  headline: string;
  cautiousHeadline: string;
  angle: string;
  destinations: NewsRadarDestination[];
  status: "idea_only";
};

export type NewsRadarRelatedEntity = {
  type: "club" | "player" | "competition" | "match" | "story" | "historical_echo" | "video_radar";
  id: string;
  label: string;
  href: string | null;
};

export type NewsRadarItem = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  body: string[];
  category: NewsRadarCategory;
  status: NewsRadarStatus;
  visibility: NewsRadarVisibility;
  sources: NewsRadarSource[];
  signals: NewsRadarSignal[];
  score: NewsRadarScore;
  priority: NewsRadarPriority;
  reviewStatus: NewsRadarReviewStatus;
  editorialSuggestion: NewsRadarEditorialSuggestion;
  relatedEntities: NewsRadarRelatedEntity[];
  internalWarnings: string[];
  duplicateCandidate: boolean;
  reviewedByHuman: boolean;
  certaintyClaimed: false;
  autoPublished: false;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type PublicNewsRadarSource = Omit<NewsRadarSource, "internalNote" | "publiclyVisible">;
export type PublicNewsRadarItem = Omit<NewsRadarItem, "score" | "priority" | "internalWarnings" | "editorialSuggestion" | "duplicateCandidate" | "reviewedByHuman" | "sources"> & { sources: PublicNewsRadarSource[] };
export type NewsRadarPublicAccess = { canViewFull: boolean; isPreview: boolean; requiresLogin: boolean; redirectsToSubstack: boolean; consumesSearchQuota: false; message: string };
export type NewsRadarSourceCheck = { validForCandidate: boolean; allowedPublicly: boolean; requiresHumanReview: boolean; warnings: string[]; classification: "official" | "verified" | "media" | "signal" | "rumor" | "unknown" };
export type NewsRadarRuleCheck = { autoPublishAllowed: false; requiresHumanReview: boolean; publicEligible: boolean; sensationalHeadlineBlocked: boolean; warnings: string[]; suggestedDestinations: NewsRadarDestination[] };
export type NewsRadarScoringInput = { sources: readonly NewsRadarSource[]; signals: readonly NewsRadarSignal[]; duplicateCandidate?: boolean; sourceMissing?: boolean };
