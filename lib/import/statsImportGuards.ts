import type { CompetitionConfig } from "@/config/competitions";
import { getProviderById, type ProviderId } from "@/config/providers";
import type { StatsImportError, StatsImportMode, StatsImportWarning } from "./statsImportTypes";

export type StatsExecutionSource = "scheduled_import" | "development_test" | "user_request";

export type StatsImportPolicy = {
  mode: StatsImportMode;
  executionSource: StatsExecutionSource;
  allowSupabaseWrites: false;
  allowRealProviderCalls: false;
  allowApify: false;
};

export function createSafeStatsImportPolicy(
  mode: StatsImportMode = "dry_run",
  executionSource: StatsExecutionSource = "development_test",
): StatsImportPolicy {
  return { mode, executionSource, allowSupabaseWrites: false, allowRealProviderCalls: false, allowApify: false };
}

export function validateStatsImportGuards(
  competition: CompetitionConfig,
  configuredProviderId: ProviderId,
  policy: StatsImportPolicy,
): { allowed: boolean; warnings: StatsImportWarning[]; errors: StatsImportError[] } {
  const warnings: StatsImportWarning[] = [];
  const errors: StatsImportError[] = [];

  if (competition.tracking_level !== "full_official") errors.push({ code: "DEEP_STATS_NON_FULL_BLOCKED", message: `Statistiche profonde vietate per ${competition.tracking_level}.`, retryable: false });
  if (configuredProviderId === "apify_sofascore" || competition.apify_enabled) errors.push({ code: "APIFY_DEEP_STATS_BLOCKED", message: "Apify non può essere usato per questo import statistiche.", retryable: false });
  if (policy.executionSource === "user_request") errors.push({ code: "USER_SIDE_STATS_IMPORT_BLOCKED", message: "Import statistiche vietato durante richieste utente.", retryable: false });
  if (policy.allowSupabaseWrites) errors.push({ code: "STATS_WRITE_BLOCKED", message: "Scritture Supabase non autorizzate in questo step.", retryable: false });
  if (policy.allowRealProviderCalls) errors.push({ code: "REAL_STATS_PROVIDER_BLOCKED", message: "Chiamate provider reali non autorizzate in questo step.", retryable: false });
  if (policy.allowApify) errors.push({ code: "STATS_APIFY_POLICY_BLOCKED", message: "Policy Apify non consentita per statistiche profonde.", retryable: false });

  const provider = getProviderById(configuredProviderId);
  if (!provider?.active && configuredProviderId !== "mock_provider") warnings.push({ code: "STATS_PROVIDER_INACTIVE", message: `${configuredProviderId} disattivato: usare mock/dry-run.` });

  return { allowed: errors.length === 0, warnings, errors };
}

export function missingStatsWarning(scope: string, entityKey: string): StatsImportWarning {
  return { code: "PARTIAL_STATS_COVERAGE", message: `Dati ${scope} assenti o parziali: record non inventato e batch preservato.`, entityKey };
}
