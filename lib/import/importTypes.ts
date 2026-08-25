import type { CompetitionConfig, DataConfidence, TrackingLevel } from "@/config/competitions";
import type { ProviderId } from "@/config/providers";
import type { NormalizedCompetition, NormalizedTeam } from "@/lib/dataProvider/types";

export type ImportMode = "dry_run" | "mock" | "real_disabled";
export type ImportSource = "config" | ProviderId;
export type ImportOperation = "create" | "update" | "skip";
export type ImportEntityType = "competition" | "team" | "provider_request";

export type ImportWarning = {
  code: string;
  message: string;
  entityType?: ImportEntityType;
  entityKey?: string;
};

export type ImportError = {
  code: string;
  message: string;
  entityType?: ImportEntityType;
  entityKey?: string;
  retryable: boolean;
};

export type ImportOperationResult<T> = {
  entityType: ImportEntityType;
  entityKey: string;
  operation: ImportOperation;
  source: ImportSource;
  providerId: ProviderId | null;
  fallbackUsed: boolean;
  payload: T | null;
  deduplicationKey: string;
  warnings: ImportWarning[];
  errors: ImportError[];
};

export type ImportSummary = {
  mode: ImportMode;
  startedAt: string;
  finishedAt: string;
  processed: number;
  created: number;
  updated: number;
  skipped: number;
  competitionPayloads: number;
  teamPayloads: number;
  providerRequestLogs: number;
  fallbackCount: number;
  warnings: ImportWarning[];
  errors: ImportError[];
  wroteToSupabase: false;
  realProviderCalls: 0;
  apifyRuns: 0;
};

export type ProviderUuidMap = Partial<Record<ProviderId, string>>;

export type CompetitionImportInput = {
  competition: CompetitionConfig;
  normalized: NormalizedCompetition | null;
  mode: ImportMode;
  sourceProviderId: ProviderId;
  providerUuids?: ProviderUuidMap;
  season: string;
};

export type TeamImportInput = {
  team: NormalizedTeam;
  competition: CompetitionConfig;
  mode: ImportMode;
  sourceProviderId: ProviderId;
  competitionUuid?: string | null;
  providerUuids?: ProviderUuidMap;
};

/** Subset pronto per un futuro upsert nella tabella public.competitions. */
export type CompetitionUpsertPayload = {
  internal_key: string;
  api_competition_id: string | null;
  slug: string;
  name: string;
  country: string;
  continent: string;
  season: string;
  tracking_level: TrackingLevel;
  primary_provider: string | null;
  secondary_provider: string | null;
  enrichment_provider: string | null;
  update_frequency: CompetitionConfig["update_frequency"];
  weekly_import_day: number | null;
  public_stats_enabled: boolean;
  login_required_for_full_stats: boolean;
  manual_highlights_enabled: boolean;
  video_radar_enabled: boolean;
  apify_enabled: boolean;
  apify_priority: 1 | 2 | null;
  data_confidence: DataConfidence;
  coverage_notes: string;
  status: "draft";
  visibility: "private_admin";
  login_required: boolean;
};

/** `external_provider_id` viene conservato nel campo schema `api_team_id`. */
export type TeamUpsertPayload = {
  competition_id: string | null;
  source_provider_id: string | null;
  api_team_id: string | null;
  slug: string;
  name: string;
  short_name: string | null;
  country: string | null;
  status: "approved";
  visibility: "public_free";
  login_required: false;
  internal_notes: string | null;
};

export type ImportBatchResult<T> = {
  mode: ImportMode;
  operations: ImportOperationResult<T>[];
  summary: ImportSummary;
};

export type InitialImportPlan = {
  mode: ImportMode;
  season: string;
  competitionImport: ImportBatchResult<CompetitionUpsertPayload>;
  teamImport: ImportBatchResult<TeamUpsertPayload>;
  providers: Array<{
    competitionId: string;
    configuredProviderId: ProviderId | null;
    resolvedProviderId: ProviderId;
    fallbackUsed: boolean;
    reason: string;
  }>;
  warnings: ImportWarning[];
  wroteToSupabase: false;
  realProviderCalls: 0;
  apifyRuns: 0;
};
