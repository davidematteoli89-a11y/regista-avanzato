import type { CompetitionConfig } from "@/config/competitions";
import { getProviderById, type ProviderId } from "@/config/providers";
import type { ImportError, ImportMode, ImportWarning } from "./importTypes";

export type ImportExecutionPolicy = {
  mode: ImportMode;
  allowSupabaseWrites: boolean;
  allowRealProviderCalls: boolean;
  allowApifyRuns: boolean;
  liveScraping: boolean;
  downloadVideos: boolean;
};

export const SAFE_IMPORT_POLICY: ImportExecutionPolicy = {
  mode: "dry_run",
  allowSupabaseWrites: false,
  allowRealProviderCalls: false,
  allowApifyRuns: false,
  liveScraping: false,
  downloadVideos: false,
};

export function createSafeImportPolicy(mode: ImportMode = "dry_run"): ImportExecutionPolicy {
  return { ...SAFE_IMPORT_POLICY, mode };
}

export function guardSupabaseWrite(policy: ImportExecutionPolicy): ImportError | null {
  return {
    code: policy.allowSupabaseWrites ? "WRITE_REQUIRES_FUTURE_APPROVAL" : "SUPABASE_WRITE_NOT_ENABLED",
    message: policy.allowSupabaseWrites
      ? "La policy richiesta tenta di scrivere, ma questo step non abilita ancora un writer Supabase."
      : "Scrittura Supabase non esplicitamente abilitata: operazione bloccata.",
    retryable: false,
  };
}

export function guardProviderCall(providerId: ProviderId, policy: ImportExecutionPolicy): ImportWarning | ImportError | null {
  if (providerId === "mock_provider" || providerId === "manual_provider") return null;
  const provider = getProviderById(providerId);
  if (!provider?.active) return { code: "PROVIDER_INACTIVE", message: `${providerId} disattivato: usare fallback mock.`, entityType: "provider_request" };
  if (!policy.allowRealProviderCalls) return { code: "REAL_PROVIDER_BLOCKED", message: `Chiamata reale ${providerId} bloccata dalla policy ${policy.mode}.`, entityType: "provider_request", retryable: false };
  return null;
}

export function guardApify(competition: CompetitionConfig, policy: ImportExecutionPolicy): ImportWarning | ImportError | null {
  const provider = getProviderById("apify_sofascore");
  if (competition.tracking_level === "full_official") return { code: "APIFY_FULL_OFFICIAL_BLOCKED", message: "FULL_OFFICIAL non può usare Apify.", entityType: "provider_request", retryable: false };
  if (!provider?.active) return { code: "APIFY_INACTIVE", message: "Apify disattivato: nessuna run, usare mock o record minimo.", entityType: "provider_request" };
  if (!policy.allowApifyRuns) return { code: "APIFY_RUN_BLOCKED", message: "Run Apify bloccata dalla policy safe.", entityType: "provider_request", retryable: false };
  return null;
}

export function validateImportPolicy(policy: ImportExecutionPolicy): ImportError[] {
  const errors: ImportError[] = [];
  if (policy.allowSupabaseWrites) errors.push({ code: "SUPABASE_WRITE_BLOCKED", message: "Questo step non autorizza scritture Supabase.", retryable: false });
  if (policy.allowRealProviderCalls) errors.push({ code: "REAL_PROVIDER_CALL_BLOCKED", message: "Questo step non autorizza chiamate provider reali.", retryable: false });
  if (policy.allowApifyRuns) errors.push({ code: "APIFY_RUN_BLOCKED", message: "Questo step non autorizza run Apify.", retryable: false });
  if (policy.liveScraping) errors.push({ code: "LIVE_SCRAPING_BLOCKED", message: "Live scraping vietato.", retryable: false });
  if (policy.downloadVideos) errors.push({ code: "VIDEO_DOWNLOAD_BLOCKED", message: "Download video vietato.", retryable: false });
  return errors;
}
