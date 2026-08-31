import type { ProviderId } from "@/config/providers";
import { guardProviderWriteAttempt, type ProviderWriteGuardResult, type ProviderWritePolicy } from "./providerWriteGuards";

export type ProviderImportBatchPreview = {
  batchId: string;
  providerId: ProviderId;
  competitionSlug: string;
  mode: "dry_run" | "real_disabled";
  createdAt: string;
};

export type ProviderImportLogPreview = {
  table: "provider_import_logs";
  batchId: string;
  provider_id: "future_provider_uuid";
  competition_id: "future_competition_uuid";
  script_name: string;
  status: "pending";
  started_at: string;
  finished_at: null;
  items_imported: 0;
  errors: [];
  notes: string;
};

export type ApiUsageLogPreview = {
  table: "api_usage_logs";
  batchId: string;
  provider_id: "future_provider_uuid";
  endpoint: "dry-run/no-external-endpoint";
  request_count: 0;
  date: string;
  competition_id: "future_competition_uuid";
  script_name: string;
  response_status: null;
  estimated_cost_eur: 0;
  notes: string;
};

export type RollbackPlanPreview = {
  batchId: string;
  mode: "preview_only";
  tables: readonly ["provider_import_logs", "api_usage_logs", "import_logs"];
  strategy: "no_op_until_real_writer_exists";
  steps: readonly string[];
};

export type ProviderWriterPreview = {
  batch: ProviderImportBatchPreview;
  providerImportLogPreview: ProviderImportLogPreview;
  apiUsageLogPreview: ApiUsageLogPreview;
  rollbackPlanPreview: RollbackPlanPreview;
  guard: ProviderWriteGuardResult;
  realWritesEnabled: false;
  externalFetch: false;
  dbWrite: false;
};

function safeSlug(value: string): string {
  return value.trim().toLowerCase().replace(/[^a-z0-9-]+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "") || "unknown";
}

export function buildProviderImportBatchId(input: {
  providerId: ProviderId;
  competitionSlug: string;
  mode?: "dry_run" | "real_disabled";
  createdAt?: string;
}): string {
  const mode = input.mode ?? "dry_run";
  const createdAt = input.createdAt ?? new Date().toISOString();
  const timestamp = createdAt.replace(/[^0-9]/g, "").slice(0, 14);

  return [input.providerId, safeSlug(input.competitionSlug), mode, timestamp].join(":");
}

export function buildProviderImportLogPreview(input: {
  batchId: string;
  scriptName: string;
  startedAt: string;
}): ProviderImportLogPreview {
  return {
    table: "provider_import_logs",
    batchId: input.batchId,
    provider_id: "future_provider_uuid",
    competition_id: "future_competition_uuid",
    script_name: input.scriptName,
    status: "pending",
    started_at: input.startedAt,
    finished_at: null,
    items_imported: 0,
    errors: [],
    notes: "Preview D.5: writer provider disabilitato, nessuna insert eseguita.",
  };
}

export function buildApiUsageLogPreview(input: {
  batchId: string;
  scriptName: string;
  date: string;
}): ApiUsageLogPreview {
  return {
    table: "api_usage_logs",
    batchId: input.batchId,
    provider_id: "future_provider_uuid",
    endpoint: "dry-run/no-external-endpoint",
    request_count: 0,
    date: input.date,
    competition_id: "future_competition_uuid",
    script_name: input.scriptName,
    response_status: null,
    estimated_cost_eur: 0,
    notes: "Preview D.5: usage summary simulato, nessuna richiesta provider.",
  };
}

export function buildRollbackPlanPreview(batchId: string): RollbackPlanPreview {
  return {
    batchId,
    mode: "preview_only",
    tables: ["provider_import_logs", "api_usage_logs", "import_logs"],
    strategy: "no_op_until_real_writer_exists",
    steps: [
      "Non serve rollback in D.5 perché non vengono scritti dati.",
      "Quando esisterà il writer reale, usare batch_id/import_run_id per identificare ogni record.",
      "Rollback futuro: annullare prima dati dipendenti, poi import_logs, poi provider_import_logs/api_usage_logs.",
    ],
  };
}

export function buildProviderWriterPreview(input: {
  providerId: ProviderId;
  competitionSlug: string;
  scriptName?: string;
  policy?: ProviderWritePolicy;
  now?: string;
}): ProviderWriterPreview {
  const now = input.now ?? new Date().toISOString();
  const scriptName = input.scriptName ?? "dryRunProviderWriterGuards";
  const batchId = buildProviderImportBatchId({
    providerId: input.providerId,
    competitionSlug: input.competitionSlug,
    mode: input.policy?.mode ?? "dry_run",
    createdAt: now,
  });

  return {
    batch: {
      batchId,
      providerId: input.providerId,
      competitionSlug: input.competitionSlug,
      mode: input.policy?.mode ?? "dry_run",
      createdAt: now,
    },
    providerImportLogPreview: buildProviderImportLogPreview({ batchId, scriptName, startedAt: now }),
    apiUsageLogPreview: buildApiUsageLogPreview({ batchId, scriptName, date: now.slice(0, 10) }),
    rollbackPlanPreview: buildRollbackPlanPreview(batchId),
    guard: guardProviderWriteAttempt(input.providerId, input.policy),
    realWritesEnabled: false,
    externalFetch: false,
    dbWrite: false,
  };
}
