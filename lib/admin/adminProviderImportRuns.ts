import "server-only";

import { getSupabaseRuntimeStatus } from "@/lib/auth/config";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type AdminProviderImportRunSource = "supabase_staging" | "empty" | "unavailable";

export type AdminProviderImportRun = {
  id: string;
  batchId: string;
  providerKey: string;
  competitionSlug: string | null;
  mode: string;
  status: string;
  externalFetch: boolean;
  dbWrite: boolean;
  estimatedCost: number | null;
  actualCost: number | null;
  recordsPlanned: number;
  recordsInserted: number;
  recordsUpdated: number;
  recordsSkipped: number;
  warningsCount: number;
  startedAt: string | null;
  finishedAt: string | null;
  createdAt: string;
};

export type AdminProviderImportRunsResult = {
  source: AdminProviderImportRunSource;
  runs: AdminProviderImportRun[];
  warning: string | null;
};

type ProviderImportRunRow = {
  id: string;
  batch_id: string;
  provider_key: string;
  competition_slug: string | null;
  mode: string;
  status: string;
  external_fetch: boolean;
  db_write: boolean;
  estimated_cost_eur: number | string | null;
  actual_cost_eur: number | string | null;
  records_planned: number;
  records_inserted: number;
  records_updated: number;
  records_skipped: number;
  warnings_count: number;
  started_at: string | null;
  finished_at: string | null;
  created_at: string;
};

function toNumberOrNull(value: number | string | null): number | null {
  if (value === null) return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function mapProviderImportRun(row: ProviderImportRunRow): AdminProviderImportRun {
  return {
    id: row.id,
    batchId: row.batch_id,
    providerKey: row.provider_key,
    competitionSlug: row.competition_slug,
    mode: row.mode,
    status: row.status,
    externalFetch: row.external_fetch,
    dbWrite: row.db_write,
    estimatedCost: toNumberOrNull(row.estimated_cost_eur),
    actualCost: toNumberOrNull(row.actual_cost_eur),
    recordsPlanned: row.records_planned,
    recordsInserted: row.records_inserted,
    recordsUpdated: row.records_updated,
    recordsSkipped: row.records_skipped,
    warningsCount: row.warnings_count,
    startedAt: row.started_at,
    finishedAt: row.finished_at,
    createdAt: row.created_at,
  };
}

export async function getAdminProviderImportRuns(
  limit = 20,
): Promise<AdminProviderImportRunsResult> {
  if (!getSupabaseRuntimeStatus().configured) {
    return {
      source: "unavailable",
      runs: [],
      warning: "Supabase non configurato: reader provider_import_runs non disponibile in safe mode.",
    };
  }

  try {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
      .from("provider_import_runs")
      .select(
        [
          "id",
          "batch_id",
          "provider_key",
          "competition_slug",
          "mode",
          "status",
          "external_fetch",
          "db_write",
          "estimated_cost_eur",
          "actual_cost_eur",
          "records_planned",
          "records_inserted",
          "records_updated",
          "records_skipped",
          "warnings_count",
          "started_at",
          "finished_at",
          "created_at",
        ].join(", "),
      )
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) {
      return {
        source: "unavailable",
        runs: [],
        warning: "Reader provider_import_runs non disponibile o bloccato da RLS.",
      };
    }

    const runs = ((data ?? []) as unknown as ProviderImportRunRow[]).map(mapProviderImportRun);

    return {
      source: runs.length > 0 ? "supabase_staging" : "empty",
      runs,
      warning: null,
    };
  } catch {
    return {
      source: "unavailable",
      runs: [],
      warning: "Reader provider_import_runs non disponibile in questo ambiente.",
    };
  }
}
