import type { CompetitionConfig } from "@/config/competitions";
import { getProviderById, type ProviderId } from "@/config/providers";
import type { ImportMode } from "./importTypes";
import type { MatchImportError, MatchImportWarning } from "./matchImportTypes";

export type MatchImportPolicy = {
  mode: ImportMode;
  allowSupabaseWrites: false;
  allowRealProviderCalls: false;
  allowApifyRuns: false;
  liveScraping: false;
  downloadVideos: false;
  fullHistory: false;
  scope: "latest_round";
};

export function createSafeMatchImportPolicy(mode: ImportMode = "dry_run"): MatchImportPolicy {
  return {
    mode,
    allowSupabaseWrites: false,
    allowRealProviderCalls: false,
    allowApifyRuns: false,
    liveScraping: false,
    downloadVideos: false,
    fullHistory: false,
    scope: "latest_round",
  };
}

export function guardMatchSupabaseWrite(): MatchImportError {
  return { code: "MATCH_WRITE_BLOCKED", message: "Writer Supabase non disponibile in questo step.", retryable: false };
}

export function validateMatchImportGuards(
  competition: CompetitionConfig,
  configuredProviderId: ProviderId,
  policy: MatchImportPolicy,
): { warnings: MatchImportWarning[]; errors: MatchImportError[] } {
  const warnings: MatchImportWarning[] = [];
  const errors: MatchImportError[] = [];
  const provider = getProviderById(configuredProviderId);

  if (!provider?.active && configuredProviderId !== "mock_provider") warnings.push({ code: "MATCH_PROVIDER_INACTIVE", message: `${configuredProviderId} disattivato: usare mock e zero chiamate reali.`, entityType: "provider_request", entityKey: competition.id });
  if (policy.allowRealProviderCalls) errors.push({ code: "REAL_MATCH_PROVIDER_BLOCKED", message: "Chiamate provider reali non autorizzate.", retryable: false });
  if (policy.allowSupabaseWrites) errors.push({ code: "MATCH_SUPABASE_WRITE_BLOCKED", message: "Scritture Supabase non autorizzate.", retryable: false });
  if (policy.liveScraping) errors.push({ code: "LIVE_MATCH_SCRAPING_BLOCKED", message: "Live scraping vietato.", retryable: false });
  if (policy.downloadVideos) errors.push({ code: "MATCH_VIDEO_DOWNLOAD_BLOCKED", message: "Download video vietato.", retryable: false });
  if (policy.fullHistory) errors.push({ code: "MASSIVE_HISTORY_BLOCKED", message: "Import storico massivo vietato.", retryable: false });

  const apifyTracking = competition.tracking_level === "apify_light_plus_p1" || competition.tracking_level === "apify_light_plus_p2";
  if (competition.tracking_level === "full_official" && configuredProviderId === "apify_sofascore") errors.push({ code: "FULL_OFFICIAL_APIFY_BLOCKED", message: "FULL_OFFICIAL non può usare Apify.", retryable: false });
  if (apifyTracking && policy.scope !== "latest_round") errors.push({ code: "APIFY_SCOPE_BLOCKED", message: "Apify light deve usare esclusivamente latest_round.", retryable: false });
  if (apifyTracking && !getProviderById("apify_sofascore")?.active) warnings.push({ code: "MATCH_APIFY_INACTIVE", message: "Apify disattivato: piano mock, nessuna run.", entityType: "provider_request", entityKey: competition.id });
  if (policy.allowApifyRuns) errors.push({ code: "MATCH_APIFY_RUN_BLOCKED", message: "Run Apify non autorizzate in questo step.", retryable: false });

  return { warnings, errors };
}
