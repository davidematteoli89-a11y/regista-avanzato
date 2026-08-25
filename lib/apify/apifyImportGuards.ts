import type { CompetitionConfig } from "@/config/competitions";
import { getProviderById } from "@/config/providers";
import type { ApifyBudgetStatus } from "./checkApifyMonthlyBudget";
import type { ApifyImportGuardResult, WeeklyApifyImportScope } from "./apifyImportTypes";

export type ApifyImportGuardInput = {
  competition: CompetitionConfig;
  budget: ApifyBudgetStatus;
  scope?: WeeklyApifyImportScope;
  executionSource?: "scheduled_import" | "development_test" | "user_page";
  requestsFullHistory?: boolean;
  requestsLiveScraping?: boolean;
  requestsVideoDownload?: boolean;
  requestsSupabaseWrite?: boolean;
};

/** Il piano mock è sempre separato dall'autorizzazione a iniziare una run reale. */
export function guardApifyImport(input: ApifyImportGuardInput): ApifyImportGuardResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  const provider = getProviderById("apify_sofascore");
  const allowedTracking = input.competition.tracking_level === "apify_light_plus_p1" || input.competition.tracking_level === "apify_light_plus_p2";

  if (!allowedTracking) errors.push("Apify light accetta solo competizioni P1 o P2; FULL_OFFICIAL e TRIGGER sono bloccate.");
  if (!input.competition.apify_enabled || (input.competition.apify_priority !== 1 && input.competition.apify_priority !== 2)) errors.push("Competizione senza abilitazione/priorità Apify valida.");
  if ((input.scope ?? "latest_round") !== "latest_round") errors.push("Scope non consentito: è ammesso soltanto latest_round.");
  if (input.requestsFullHistory) errors.push("Import storico completo bloccato.");
  if (input.requestsLiveScraping) errors.push("Live scraping bloccato.");
  if (input.requestsVideoDownload) errors.push("Download video bloccato.");
  if (input.executionSource === "user_page") errors.push("Le pagine utente non possono avviare Apify.");
  if (input.requestsSupabaseWrite) errors.push("Le scritture Supabase sono disabilitate in questo step.");
  if (!input.budget.configurationValid) errors.push("Configurazione budget non valida.");
  if (input.budget.state === "hard_stop") errors.push("Hard stop mensile raggiunto.");
  if (!provider?.active) warnings.push("Provider Apify disattivato: il piano è simulabile, ma nessuna run può partire.");

  const canPlan = errors.length === 0;
  return {
    canPlan,
    canStartRun: canPlan && provider?.active === true && false,
    canWriteSupabase: false,
    preservesPreviousData: true,
    errors,
    warnings,
  };
}
