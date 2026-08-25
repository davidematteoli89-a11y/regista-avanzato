import type { CompetitionConfig, DataConfidence } from "@/config/competitions";
import type { ProviderId } from "@/config/providers";
import type {
  NormalizedPlayerMatchStats,
  NormalizedPlayerSeasonStats,
  NormalizedTeamMatchStats,
  NormalizedTeamSeasonStats,
} from "@/lib/dataProvider/types";
import type { ProviderUuidMap } from "./importTypes";

export type StatsImportMode = "dry_run" | "mock" | "real_disabled";
export type StatsImportScope = "team_match" | "team_season" | "player_match" | "player_season";
export type StatsImportSource = ProviderId;
export type StatsImportOperation = "create" | "update" | "skip";

export type StatsImportWarning = { code: string; message: string; scope?: StatsImportScope; entityKey?: string };
export type StatsImportError = { code: string; message: string; scope?: StatsImportScope; entityKey?: string; retryable: boolean };

export type TeamOptionalStats = {
  xgFor?: number | null;
  xgAgainst?: number | null;
  shots?: number | null;
  shotsOnTarget?: number | null;
  possessionAvg?: number | null;
  formLast5?: string | null;
  yellowCards?: number | null;
  redCards?: number | null;
};

export type PlayerOptionalStats = {
  shots?: number | null;
  shotsOnTarget?: number | null;
  keyPasses?: number | null;
  dribblesCompleted?: number | null;
  duelsWon?: number | null;
  tackles?: number | null;
  interceptions?: number | null;
  saves?: number | null;
  yellowCards?: number | null;
  redCards?: number | null;
  xg?: number | null;
  xa?: number | null;
};

type StatsImportBase = {
  competition: CompetitionConfig;
  mode: StatsImportMode;
  sourceProviderId: ProviderId;
  providerUuids?: ProviderUuidMap;
};

export type TeamMatchStatsImportInput = StatsImportBase & {
  stats: NormalizedTeamMatchStats;
  matchUuidByInternalId?: Readonly<Record<string, string>>;
  teamUuidByInternalId?: Readonly<Record<string, string>>;
  optional?: TeamOptionalStats;
};

export type TeamSeasonStatsImportInput = StatsImportBase & {
  stats: NormalizedTeamSeasonStats;
  competitionUuid?: string | null;
  teamUuidByInternalId?: Readonly<Record<string, string>>;
  optional?: TeamOptionalStats;
};

export type PlayerMatchStatsImportInput = StatsImportBase & {
  stats: NormalizedPlayerMatchStats;
  matchUuidByInternalId?: Readonly<Record<string, string>>;
  teamUuidByInternalId?: Readonly<Record<string, string>>;
  playerUuidByInternalId?: Readonly<Record<string, string>>;
  optional?: PlayerOptionalStats;
};

export type PlayerSeasonStatsImportInput = StatsImportBase & {
  stats: NormalizedPlayerSeasonStats;
  competitionUuid?: string | null;
  teamUuidByInternalId?: Readonly<Record<string, string>>;
  playerUuidByInternalId?: Readonly<Record<string, string>>;
  optional?: PlayerOptionalStats;
};

export type TeamMatchStatsUpsertPayload = {
  match_id: string | null;
  team_id: string | null;
  source_provider_id: string | null;
  possession_pct: number | null;
  shots: number | null;
  shots_on_target: number | null;
  corners: number | null;
  fouls: number | null;
  yellow_cards: number | null;
  red_cards: number | null;
  expected_goals: number | null;
  extra_stats: Record<string, string | number | boolean>;
  data_confidence: DataConfidence;
};

export type TeamSeasonStatsUpsertPayload = {
  competition_id: string | null;
  team_id: string | null;
  source_provider_id: string | null;
  season: string;
  matches_played: number;
  wins: number;
  draws: number;
  losses: number;
  goals_for: number;
  goals_against: number;
  clean_sheets: number | null;
  expected_goals_for: number | null;
  expected_goals_against: number | null;
  extra_stats: Record<string, string | number | boolean>;
  data_confidence: DataConfidence;
};

export type PlayerMatchStatsUpsertPayload = {
  match_id: string | null;
  player_id: string | null;
  team_id: string | null;
  source_provider_id: string | null;
  starter: boolean | null;
  minutes_played: number | null;
  goals: number;
  assists: number;
  shots: number | null;
  shots_on_target: number | null;
  passes_completed: number | null;
  passes_attempted: number | null;
  tackles: number | null;
  interceptions: number | null;
  saves: number | null;
  rating: number | null;
  extra_stats: Record<string, string | number | boolean>;
  data_confidence: DataConfidence;
};

export type PlayerSeasonStatsUpsertPayload = {
  competition_id: string | null;
  player_id: string | null;
  team_id: string | null;
  source_provider_id: string | null;
  season: string;
  appearances: number;
  starts: number;
  minutes_played: number;
  goals: number;
  assists: number;
  clean_sheets: number | null;
  average_rating: number | null;
  extra_stats: Record<string, string | number | boolean>;
  data_confidence: DataConfidence;
};

export type StatsImportOperationResult<T> = {
  scope: StatsImportScope;
  entityKey: string;
  operation: StatsImportOperation;
  source: StatsImportSource;
  fallbackUsed: boolean;
  payload: T | null;
  deduplicationKey: string;
  warnings: StatsImportWarning[];
  errors: StatsImportError[];
};

export type StatsImportSummary = {
  mode: StatsImportMode;
  competitionsChecked: number;
  nonFullCompetitionsSkipped: number;
  teamMatchPayloads: number;
  teamSeasonPayloads: number;
  playerMatchPayloads: number;
  playerSeasonPayloads: number;
  teamStatsPrepared: number;
  playerStatsPrepared: number;
  created: number;
  updated: number;
  skipped: number;
  providerRequestLogs: number;
  fallbackCount: number;
  warnings: StatsImportWarning[];
  errors: StatsImportError[];
  wroteToSupabase: false;
  realProviderCalls: 0;
  apifyRuns: 0;
  publishedContent: 0;
};

export type StatsImportBatchResult<T> = { mode: StatsImportMode; operations: StatsImportOperationResult<T>[]; summary: StatsImportSummary };
