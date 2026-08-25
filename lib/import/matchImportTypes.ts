import type { CompetitionConfig, DataConfidence } from "@/config/competitions";
import type { ProviderId } from "@/config/providers";
import type { MatchStatus, NormalizedMatch, NormalizedMatchEvent } from "@/lib/dataProvider/types";
import type { ImportMode, ProviderUuidMap } from "./importTypes";

export type MatchImportOperation = "create" | "update" | "skip";
export type MatchImportEntity = "match" | "match_event" | "provider_request";

export type MatchImportWarning = { code: string; message: string; entityType?: MatchImportEntity; entityKey?: string };
export type MatchImportError = { code: string; message: string; entityType?: MatchImportEntity; entityKey?: string; retryable: boolean };

export type MatchImportInput = {
  match: NormalizedMatch;
  competition: CompetitionConfig;
  mode: ImportMode;
  sourceProviderId: ProviderId;
  competitionUuid?: string | null;
  teamUuidByInternalId?: Readonly<Record<string, string>>;
  providerUuids?: ProviderUuidMap;
  highlightLink?: string | null;
  rawPayload?: unknown;
  allowRawPayload?: boolean;
};

export type MatchEventImportInput = {
  event: NormalizedMatchEvent;
  mode: ImportMode;
  sourceProviderId: ProviderId;
  matchUuid?: string | null;
  teamUuidByInternalId?: Readonly<Record<string, string>>;
  playerUuidByInternalId?: Readonly<Record<string, string>>;
  providerUuids?: ProviderUuidMap;
  rawPayload?: unknown;
  allowRawPayload?: boolean;
};

/** Campi allineati a `matches`; external_match_id → api_match_id, match_date → kickoff_at. */
export type MatchUpsertPayload = {
  competition_id: string | null;
  source_provider_id: string | null;
  api_match_id: string;
  season: string;
  round: string | null;
  kickoff_at: string;
  venue: string | null;
  home_team_id: string | null;
  away_team_id: string | null;
  home_score: number | null;
  away_score: number | null;
  status: MatchStatus;
  visibility: "public_free";
  login_required: boolean;
  internal_notes: string | null;
  data_confidence: DataConfidence;
};

/** Campi allineati a `match_events`; injury_time → stoppage_minute. */
export type MatchEventUpsertPayload = {
  match_id: string | null;
  team_id: string | null;
  player_id: string | null;
  assist_player_id: string | null;
  source_provider_id: string | null;
  api_event_id: string;
  event_type: string;
  event_detail: string;
  minute: number;
  stoppage_minute: number | null;
  raw_data: Record<string, unknown>;
  status: "approved";
  visibility: "public_free";
  login_required: false;
};

export type MatchImportOperationResult<T> = {
  entityType: MatchImportEntity;
  entityKey: string;
  operation: MatchImportOperation;
  provider: ProviderId;
  externalId: string | null;
  fallbackUsed: boolean;
  payload: T | null;
  deduplicationKey: string;
  highlightLink: string | null;
  rawPayloadIncluded: boolean;
  warnings: MatchImportWarning[];
  errors: MatchImportError[];
};

export type MatchTriggerType =
  | "high_scoring_match"
  | "comeback"
  | "late_goal"
  | "draw_4_4"
  | "result_5_4"
  | "big_win"
  | "hat_trick_candidate"
  | "young_player_candidate"
  | "historical_scoreline"
  | "upset_candidate";

export type MatchTrigger = {
  type: MatchTriggerType;
  matchId: string;
  severity: "medium" | "high";
  reason: string;
  evidence: Record<string, string | number | boolean>;
};

export type MatchImportSummary = {
  mode: ImportMode;
  competitionsChecked: number;
  matchesProcessed: number;
  matchPayloads: number;
  eventsProcessed: number;
  eventPayloads: number;
  created: number;
  updated: number;
  skipped: number;
  providerRequestLogs: number;
  fallbackCount: number;
  triggers: MatchTrigger[];
  warnings: MatchImportWarning[];
  errors: MatchImportError[];
  preservePreviousData: true;
  wroteToSupabase: false;
  realProviderCalls: 0;
  apifyRuns: 0;
};

export type MatchImportBatchResult<T> = { mode: ImportMode; operations: MatchImportOperationResult<T>[]; summary: MatchImportSummary };
