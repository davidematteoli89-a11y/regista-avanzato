import { COMPETITIONS, type CompetitionConfig } from "@/config/competitions";
import { getProviderById } from "@/config/providers";
import { checkApifyMonthlyBudget } from "@/lib/apify/checkApifyMonthlyBudget";
import { getApifyImportPriority } from "@/lib/apify/getApifyImportPriority";
import { checkDailyBudget } from "@/lib/apiUsage/checkDailyBudget";
import { routeFootballDataProvider, type ProviderRouteDecision } from "@/lib/dataProvider/providerRouter";
import { mapCompetitionImport } from "@/lib/import/competitionImportMapper";
import { createSafeImportPolicy, guardApify, guardProviderCall, validateImportPolicy } from "@/lib/import/importGuards";
import { createImportLogger } from "@/lib/import/importLogger";
import type {
  CompetitionUpsertPayload,
  ImportBatchResult,
  ImportError,
  ImportMode,
  ImportWarning,
  ProviderUuidMap,
} from "@/lib/import/importTypes";

export type CompetitionImportOptions = {
  mode?: ImportMode;
  season?: string;
  providerUuids?: ProviderUuidMap;
  stableDailyRequestsUsed?: number;
  stableMonthlyRequestsUsed?: number;
  stableDailyBudgetRequests?: number | null;
  stableMonthlyBudgetRequests?: number | null;
  apifyEstimatedSpendEur?: number;
  apifyEstimatedRunCostEur?: number;
};

export type CompetitionImportRunResult = ImportBatchResult<CompetitionUpsertPayload> & {
  routes: ProviderRouteDecision[];
};

const TRACKING_ORDER: Record<CompetitionConfig["tracking_level"], number> = {
  full_official: 0,
  apify_light_plus_p1: 1,
  apify_light_plus_p2: 2,
  trigger: 3,
};

export async function importCompetitions(options: CompetitionImportOptions = {}): Promise<CompetitionImportRunResult> {
  const mode = options.mode ?? "dry_run";
  const season = options.season ?? "2026/27-mock";
  const logger = createImportLogger(mode);
  const policy = createSafeImportPolicy(mode);
  const policyErrors = validateImportPolicy(policy);
  const routes: ProviderRouteDecision[] = [];
  const stableBudget = checkDailyBudget({
    dailyRequestsUsed: options.stableDailyRequestsUsed ?? 0,
    monthlyRequestsUsed: options.stableMonthlyRequestsUsed ?? 0,
    dailyBudgetRequests: options.stableDailyBudgetRequests,
    monthlyBudgetRequests: options.stableMonthlyBudgetRequests,
  });
  let apifyProjectedSpendEur = options.apifyEstimatedSpendEur ?? 0;
  const orderedCompetitions = [...COMPETITIONS].sort((a, b) => TRACKING_ORDER[a.tracking_level] - TRACKING_ORDER[b.tracking_level]);

  for (const competition of orderedCompetitions) {
    const route = routeFootballDataProvider(competition.id);
    routes.push(route);
    const warnings: ImportWarning[] = [];
    const errors: ImportError[] = [...policyErrors];
    const configuredProvider = getProviderById(competition.primary_provider);
    if (!configuredProvider) errors.push({ code: "UNKNOWN_PRIMARY_PROVIDER", message: `Provider ${competition.primary_provider} non trovato.`, entityType: "competition", entityKey: competition.id, retryable: false });

    const providerGuard = guardProviderCall(competition.primary_provider, policy);
    if (providerGuard) {
      if ("retryable" in providerGuard) errors.push(providerGuard);
      else warnings.push(providerGuard);
    }

    if (competition.tracking_level === "full_official" && !stableBudget.canStart) {
      warnings.push({ code: "STABLE_BUDGET_SAFE_MOCK", message: stableBudget.reason, entityType: "competition", entityKey: competition.id });
    }

    if (competition.tracking_level === "apify_light_plus_p1" || competition.tracking_level === "apify_light_plus_p2") {
      const apifyGuard = guardApify(competition, policy);
      if (apifyGuard) {
        if ("retryable" in apifyGuard) errors.push(apifyGuard);
        else warnings.push(apifyGuard);
      }
      const apifyBudget = checkApifyMonthlyBudget({ estimatedSpendEur: apifyProjectedSpendEur });
      const priorityDecision = getApifyImportPriority({
        budget: apifyBudget,
        requestedPriority: competition.apify_priority!,
        estimatedRunCostEur: options.apifyEstimatedRunCostEur ?? 0,
      });
      if (getProviderById("apify_sofascore")?.active && priorityDecision.shouldRun) {
        apifyProjectedSpendEur = priorityDecision.projectedSpendEur;
      }
      warnings.push({ code: "APIFY_PLAN_ONLY", message: `${priorityDecision.reason} Nessuna run viene avviata.`, entityType: "competition", entityKey: competition.id });
    }

    let normalized = null;
    if (competition.tracking_level !== "trigger") {
      const providerResult = await route.provider.getCompetitions({ competitionId: competition.id, season, requestSource: "development_test", latestRoundOnly: true });
      normalized = providerResult.data[0] ?? null;
      warnings.push(...providerResult.errors.map((error) => ({ code: error.code, message: error.message, entityType: "competition" as const, entityKey: competition.id })));
    } else {
      warnings.push({ code: "TRIGGER_MINIMAL_ONLY", message: "Competizione trigger: solo record minimo da config, nessuna richiesta provider.", entityType: "competition", entityKey: competition.id });
    }

    const operation = mapCompetitionImport({ competition, normalized, mode, sourceProviderId: route.resolvedProviderId, providerUuids: options.providerUuids, season });
    operation.warnings.push(...warnings);
    operation.errors.push(...errors);
    logger.record(operation);
    logger.recordProviderRequest({
      entityKey: competition.id,
      providerId: route.resolvedProviderId,
      fallbackUsed: route.fallbackUsed,
      warning: { code: "PROVIDER_REQUEST_PLACEHOLDER", message: `${route.reason} Request esterne registrate: 0.`, entityType: "provider_request", entityKey: competition.id },
    });
  }

  return {
    mode,
    operations: logger.getOperations<CompetitionUpsertPayload>("competition"),
    summary: logger.summarize(),
    routes,
  };
}
