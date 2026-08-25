import type { TrackingLevel } from "@/config/competitions";
import type {
  NormalizedMatch,
  NormalizedMatchEvent,
  NormalizedPlayer,
  NormalizedPlayerMatchStats,
  NormalizedStanding,
  NormalizedTeam,
  NormalizedTeamMatchStats,
} from "@/lib/dataProvider/types";
import type { ApifyImportPriorityDecision } from "./getApifyImportPriority";

export type ApifySofaScoreConfig = {
  active: boolean;
  mockMode: boolean;
  actorId: string | null;
  tokenConfigured: boolean;
  monthlyBudgetEur: number;
  warningBudgetEur: number;
  hardStopEur: number;
  latestRoundOnly: true;
  liveScrapingEnabled: false;
  videoDownloadEnabled: false;
};

export type ApifySofaScoreActorInput = {
  competitionId: string;
  competitionName: string;
  trackingLevel: "apify_light_plus_p1" | "apify_light_plus_p2";
  priority: 1 | 2;
  scope: "latest_round";
  includeFixtures: boolean;
  includeResults: boolean;
  includeStandings: boolean;
  includePlayerStats: boolean;
  includeTeamStats: boolean;
  includeMatchStats: boolean;
  includeFullHistory: false;
  liveScraping: false;
  downloadVideos: false;
};

export type ApifySofaScoreRunResult = {
  started: boolean;
  mode: "safe_placeholder" | "future_actor";
  status: "skipped" | "succeeded" | "partial" | "failed";
  runId: string | null;
  datasetId: string | null;
  items: unknown[];
  estimatedCostEur: number;
  errors: string[];
  preservePreviousData: true;
};

type UnknownPayload = Record<string, unknown>;
export type ApifySofaScoreMatchPayload = UnknownPayload & { internalId?: unknown; externalId?: unknown; season?: unknown; kickoffAt?: unknown; status?: unknown; homeTeamId?: unknown; awayTeamId?: unknown };
export type ApifySofaScoreTeamPayload = UnknownPayload & { internalId?: unknown; externalId?: unknown; name?: unknown; shortName?: unknown; country?: unknown };
export type ApifySofaScorePlayerPayload = UnknownPayload & { internalId?: unknown; externalId?: unknown; teamId?: unknown; fullName?: unknown; position?: unknown };
export type ApifySofaScoreStandingPayload = UnknownPayload & { internalId?: unknown; externalId?: unknown; teamId?: unknown; position?: unknown; points?: unknown };
export type ApifySofaScoreEventPayload = UnknownPayload & { internalId?: unknown; externalId?: unknown; matchId?: unknown; teamId?: unknown; minute?: unknown; type?: unknown };
export type ApifySofaScoreStatsPayload = UnknownPayload & { internalId?: unknown; externalId?: unknown; kind?: unknown; matchId?: unknown; teamId?: unknown; playerId?: unknown };

export type ApifySofaScoreMappingResult = {
  teams: NormalizedTeam[];
  players: NormalizedPlayer[];
  matches: NormalizedMatch[];
  standings: NormalizedStanding[];
  events: NormalizedMatchEvent[];
  teamMatchStats: NormalizedTeamMatchStats[];
  playerMatchStats: NormalizedPlayerMatchStats[];
  errors: string[];
};

export type WeeklyApifyImportPlanItem = {
  competitionId: string;
  competitionName: string;
  trackingLevel: TrackingLevel;
  priority: 1 | 2;
  estimatedCostEur: number;
  decision: ApifyImportPriorityDecision;
  actorInput: ApifySofaScoreActorInput | null;
};

export type WeeklyApifyImportPlan = {
  mode: "safe_placeholder";
  createdAt: string;
  estimatedSpendBeforeEur: number;
  projectedSpendAfterEur: number;
  monthlyBudgetEur: number;
  warningBudgetEur: number;
  hardStopEur: number;
  priorityOne: WeeklyApifyImportPlanItem[];
  priorityTwo: WeeklyApifyImportPlanItem[];
  willStartRuns: false;
};

export type WeeklyApifyImportResult = {
  mode: "safe_placeholder";
  plan: WeeklyApifyImportPlan;
  startedRuns: 0;
  writtenToSupabase: false;
  message: string;
  summary: string;
};
