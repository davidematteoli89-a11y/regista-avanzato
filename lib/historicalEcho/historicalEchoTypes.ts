import type { StoryCategory, StoryItem } from "../storyLibrary/storyTypes";

export type HistoricalEchoType =
  | "scoreline_echo"
  | "comeback_echo"
  | "late_goal_echo"
  | "underdog_echo"
  | "rivalry_echo"
  | "talent_echo"
  | "italian_connection_echo"
  | "tactical_echo"
  | "historical_anniversary"
  | "record_echo"
  | "cultural_echo"
  | "video_radar_echo"
  | "substack_report_candidate";

export type HistoricalEchoTriggerType =
  | "result_5_4"
  | "draw_4_4"
  | "high_scoring_match"
  | "big_win"
  | "comeback"
  | "late_goal"
  | "hat_trick_candidate"
  | "young_player_candidate"
  | "italian_club_mention"
  | "ex_serie_a_player"
  | "anniversary"
  | "same_scoreline"
  | "same_fixture"
  | "same_country"
  | "similar_tactical_pattern"
  | "story_keyword_match";

export type HistoricalEchoStatus = "candidate" | "pending_review" | "approved" | "published" | "rejected" | "archived";
export type HistoricalEchoVisibility = "private_admin" | "public_preview" | "public_full" | "substack_only" | "paid_substack_candidate";
export type HistoricalEchoConfidence = "low" | "medium" | "high";
export type HistoricalEchoDestination = "story_library" | "modern_match" | "video_radar" | "substack" | "future_article";

export type HistoricalEchoSource = {
  id: string;
  type: "story_library" | "modern_match" | "manual_note" | "video_radar";
  referenceId: string;
  label: string;
  verified: boolean;
};

export type HistoricalEchoTrigger = {
  id: string;
  type: HistoricalEchoTriggerType;
  label: string;
  strength: "strong" | "medium" | "weak";
  keywords: string[];
  modernMatchId: string | null;
  observedAt: string;
};

export type HistoricalEchoRule = {
  id: string;
  name: string;
  triggerTypes: HistoricalEchoTriggerType[];
  echoType: HistoricalEchoType;
  preferredStoryCategories: StoryCategory[];
  weight: number;
  minimumReviewScore: number;
  description: string;
  requiresHumanReview: true;
  allowedDestinations: HistoricalEchoDestination[];
};

export type HistoricalEchoScore = {
  total: number;
  triggerStrength: number;
  storySimilarity: number;
  sourceQuality: number;
  editorialValue: number;
  confidence: HistoricalEchoConfidence;
  reasons: string[];
};

export type HistoricalEchoComparisonPoint = {
  id: string;
  label: string;
  modernValue: string;
  historicalValue: string;
  similarity: "direct" | "partial" | "contextual";
};

export type HistoricalEchoRelatedStory = {
  storyId: string;
  slug: string;
  title: string;
  category: StoryCategory;
  summary: string;
};

export type HistoricalEchoRelatedMatch = {
  id: string;
  label: string;
  scoreline: string | null;
  dateLabel: string;
  isModern: boolean;
};

export type HistoricalEchoEditorialSuggestion = {
  headline: string;
  angle: string;
  destinations: HistoricalEchoDestination[];
  status: "idea_only";
};

export type HistoricalEchoCandidate = {
  id: string;
  trigger: HistoricalEchoTrigger;
  relatedStory: HistoricalEchoRelatedStory;
  proposedType: HistoricalEchoType;
  score: HistoricalEchoScore;
  explanation: string;
  warnings: string[];
  editorialSuggestion: HistoricalEchoEditorialSuggestion;
  autoPublish: false;
};

export type HistoricalEcho = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  type: HistoricalEchoType;
  status: HistoricalEchoStatus;
  visibility: HistoricalEchoVisibility;
  trigger: HistoricalEchoTrigger;
  score: HistoricalEchoScore;
  explanation: string;
  comparisonPoints: HistoricalEchoComparisonPoint[];
  relatedStory: HistoricalEchoRelatedStory;
  relatedMatches: HistoricalEchoRelatedMatch[];
  sources: HistoricalEchoSource[];
  editorialSuggestion: HistoricalEchoEditorialSuggestion;
  internalWarnings: string[];
  timeline: { id: string; dateLabel: string; title: string; description: string }[];
  reviewedByHuman: boolean;
  autoPublished: false;
  createdAt: string;
  updatedAt: string;
};

export type PublicHistoricalEcho = Omit<HistoricalEcho, "trigger" | "score" | "sources" | "internalWarnings" | "editorialSuggestion"> & {
  confidence: HistoricalEchoConfidence;
  confidenceLabel: string;
  publicReason: string;
};

export type HistoricalEchoEngineInput = {
  triggers: readonly HistoricalEchoTrigger[];
  stories?: readonly StoryItem[];
  maximumCandidates?: number;
};
