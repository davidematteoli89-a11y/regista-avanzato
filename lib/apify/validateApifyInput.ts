import type { CompetitionConfig } from "@/config/competitions";
import type { ApifySofaScoreActorInput, ApifySofaScoreConfig } from "./apifySofaScoreTypes";

export type ValidateApifyInputOptions = {
  estimatedSpendEur: number;
  estimatedRunCostEur?: number;
};

export type ApifyInputValidationResult = {
  valid: boolean;
  errors: string[];
  warnings: string[];
  projectedSpendEur: number;
};

export function validateApifyInput(
  input: ApifySofaScoreActorInput,
  competition: CompetitionConfig,
  config: ApifySofaScoreConfig,
  options: ValidateApifyInputOptions,
): ApifyInputValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  const estimatedSpendEur = Number.isFinite(options.estimatedSpendEur) && options.estimatedSpendEur >= 0 ? options.estimatedSpendEur : config.hardStopEur;
  const estimatedRunCostEur = Number.isFinite(options.estimatedRunCostEur) && (options.estimatedRunCostEur ?? 0) >= 0 ? options.estimatedRunCostEur ?? 0 : 0;
  const projectedSpendEur = estimatedSpendEur + estimatedRunCostEur;

  if (config.active && !config.actorId) errors.push("Actor ID obbligatorio quando Apify è attivo.");
  if (!config.active && config.actorId) errors.push("Actor ID non deve essere presente quando Apify è disattivato.");
  if (!config.mockMode && config.active && !config.tokenConfigured) errors.push("Token server-side non configurato per la futura modalità reale.");
  if (config.mockMode && !config.tokenConfigured) warnings.push("Modalità mock: token non richiesto e nessuna run verrà avviata.");

  if (estimatedSpendEur >= config.hardStopEur || projectedSpendEur >= config.hardStopEur) errors.push("Hard stop Apify raggiunto o raggiunto dalla run proposta.");
  else if (estimatedSpendEur >= config.warningBudgetEur && input.priority === 2) errors.push("Sopra warning sono consentite soltanto competizioni priority 1.");

  if (input.scope !== "latest_round" || !config.latestRoundOnly) errors.push("Lo scope deve essere latest_round.");
  if (input.includeFullHistory) errors.push("Import storico completo non consentito.");
  if (input.liveScraping || config.liveScrapingEnabled) errors.push("Live scraping non consentito.");
  if (input.downloadVideos || config.videoDownloadEnabled) errors.push("Download video non consentito.");
  if (competition.tracking_level !== "apify_light_plus_p1" && competition.tracking_level !== "apify_light_plus_p2") errors.push("Tracking level non consentito per Apify.");
  if (!competition.apify_enabled) errors.push("Apify non abilitato sulla competizione.");
  if (competition.apify_priority !== 1 && competition.apify_priority !== 2) errors.push("Priorità Apify mancante o non valida.");
  if (competition.apify_priority !== input.priority) errors.push("Priorità input diversa dalla configurazione della competizione.");
  if (competition.id !== input.competitionId) errors.push("Competition ID non coerente con l'input actor.");

  return { valid: errors.length === 0, errors, warnings, projectedSpendEur };
}
