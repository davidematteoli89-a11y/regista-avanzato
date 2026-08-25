import { COMPETITIONS, type CompetitionConfig } from "@/config/competitions";
import { getProviderById } from "@/config/providers";
import { checkApifyMonthlyBudget } from "@/lib/apify/checkApifyMonthlyBudget";
import { getApifyImportPriority } from "@/lib/apify/getApifyImportPriority";
import { checkDailyBudget } from "@/lib/apiUsage/checkDailyBudget";
import { routeFootballDataProvider, type ProviderRouteDecision } from "@/lib/dataProvider/providerRouter";
import type { NormalizedMatch } from "@/lib/dataProvider/types";
import { mapMatchImport } from "@/lib/import/matchImportMapper";
import { createSafeMatchImportPolicy, validateMatchImportGuards } from "@/lib/import/matchImportGuards";
import type {
  MatchImportBatchResult,
  MatchImportError,
  MatchImportOperationResult,
  MatchImportWarning,
  MatchUpsertPayload,
} from "@/lib/import/matchImportTypes";
import { detectMatchTriggers } from "@/lib/import/matchTriggerDetector";
import type { ImportMode, ProviderUuidMap } from "@/lib/import/importTypes";

export type FixturesImportOptions = {
  mode?: ImportMode;
  season?: string;
  competitionUuidByInternalKey?: Readonly<Record<string, string>>;
  teamUuidByInternalId?: Readonly<Record<string, string>>;
  providerUuids?: ProviderUuidMap;
  stableDailyRequestsUsed?: number;
  stableMonthlyRequestsUsed?: number;
  stableDailyBudgetRequests?: number | null;
  stableMonthlyBudgetRequests?: number | null;
  apifyEstimatedSpendEur?: number;
  apifyEstimatedRunCostEur?: number;
};

export type FixturesImportResult = MatchImportBatchResult<MatchUpsertPayload> & {
  routes: ProviderRouteDecision[];
  normalizedMatches: NormalizedMatch[];
};

const TRACKING_ORDER: Record<CompetitionConfig["tracking_level"], number> = { full_official: 0, apify_light_plus_p1: 1, apify_light_plus_p2: 2, trigger: 3 };

export async function importFixtures(options: FixturesImportOptions = {}): Promise<FixturesImportResult> {
  const mode = options.mode ?? "dry_run";
  const season = options.season ?? "2026/27-mock";
  const policy = createSafeMatchImportPolicy(mode);
  const routes: ProviderRouteDecision[] = [];
  const operations: MatchImportOperationResult<MatchUpsertPayload>[] = [];
  const normalizedMatches: NormalizedMatch[] = [];
  const batchKeys = new Set<string>();
  const requestWarnings: MatchImportWarning[] = [];
  const requestErrors: MatchImportError[] = [];
  const stableBudget = checkDailyBudget({
    dailyRequestsUsed: options.stableDailyRequestsUsed ?? 0,
    monthlyRequestsUsed: options.stableMonthlyRequestsUsed ?? 0,
    dailyBudgetRequests: options.stableDailyBudgetRequests,
    monthlyBudgetRequests: options.stableMonthlyBudgetRequests,
  });
  let apifyProjectedSpendEur = options.apifyEstimatedSpendEur ?? 0;
  const ordered = [...COMPETITIONS].sort((a, b) => TRACKING_ORDER[a.tracking_level] - TRACKING_ORDER[b.tracking_level]);

  for (const competition of ordered) {
    const route = routeFootballDataProvider(competition.id);
    routes.push(route);
    const guards = validateMatchImportGuards(competition, competition.primary_provider, policy);
    requestWarnings.push(...guards.warnings);
    requestErrors.push(...guards.errors);

    if (competition.tracking_level === "full_official" && !stableBudget.canStart) {
      requestWarnings.push({ code: "MATCH_STABLE_BUDGET_SAFE_MOCK", message: stableBudget.reason, entityType: "provider_request", entityKey: competition.id });
    }
    if (competition.tracking_level === "apify_light_plus_p1" || competition.tracking_level === "apify_light_plus_p2") {
      const budget = checkApifyMonthlyBudget({ estimatedSpendEur: apifyProjectedSpendEur });
      const decision = getApifyImportPriority({ budget, requestedPriority: competition.apify_priority!, estimatedRunCostEur: options.apifyEstimatedRunCostEur ?? 0 });
      requestWarnings.push({ code: "MATCH_APIFY_PLAN_ONLY", message: `${decision.reason} Run avviate: 0.`, entityType: "provider_request", entityKey: competition.id });
      if (getProviderById("apify_sofascore")?.active && decision.shouldRun) apifyProjectedSpendEur = decision.projectedSpendEur;
    }

    try {
      const context = { competitionId: competition.id, season, requestSource: "development_test" as const, latestRoundOnly: true };
      const resultsResponse = await route.provider.getResults(context);
      const fixturesResponse = competition.tracking_level === "trigger"
        ? { data: [] as NormalizedMatch[], errors: [] }
        : await route.provider.getFixtures(context);
      requestWarnings.push(...[...resultsResponse.errors, ...fixturesResponse.errors].map((error) => ({ code: error.code, message: error.message, entityType: "provider_request" as const, entityKey: competition.id })));

      for (const match of [...resultsResponse.data, ...fixturesResponse.data]) {
        normalizedMatches.push(match);
        let operation = mapMatchImport({
          match,
          competition,
          mode,
          sourceProviderId: route.resolvedProviderId,
          competitionUuid: options.competitionUuidByInternalKey?.[competition.id] ?? null,
          teamUuidByInternalId: options.teamUuidByInternalId,
          providerUuids: options.providerUuids,
          highlightLink: null,
          allowRawPayload: false,
        });
        if (operation.operation !== "skip" && batchKeys.has(operation.deduplicationKey)) {
          operation = { ...operation, operation: "skip", payload: null, warnings: [...operation.warnings, { code: "DUPLICATE_MATCH_IN_BATCH", message: `Match duplicato saltato: ${operation.deduplicationKey}`, entityType: "match", entityKey: match.id }] };
        } else if (operation.operation !== "skip") batchKeys.add(operation.deduplicationKey);
        operations.push(operation);
      }
    } catch (error) {
      requestErrors.push({ code: "MATCH_PROVIDER_FAILURE", message: error instanceof Error ? error.message : "Errore provider sconosciuto", entityType: "provider_request", entityKey: competition.id, retryable: true });
      requestWarnings.push({ code: "PRESERVE_PREVIOUS_MATCH_DATA", message: "Import saltato: preservare l'ultimo dato valido già salvato.", entityType: "provider_request", entityKey: competition.id });
    }
  }

  const operationWarnings = operations.flatMap((item) => item.warnings);
  const operationErrors = operations.flatMap((item) => item.errors);
  const triggers = normalizedMatches.flatMap((match) => detectMatchTriggers(match));
  return {
    mode,
    operations,
    routes,
    normalizedMatches,
    summary: {
      mode,
      competitionsChecked: routes.length,
      matchesProcessed: operations.length,
      matchPayloads: operations.filter((item) => item.payload).length,
      eventsProcessed: 0,
      eventPayloads: 0,
      created: operations.filter((item) => item.operation === "create").length,
      updated: operations.filter((item) => item.operation === "update").length,
      skipped: operations.filter((item) => item.operation === "skip").length,
      providerRequestLogs: routes.length,
      fallbackCount: routes.filter((route) => route.fallbackUsed).length,
      triggers,
      warnings: [...requestWarnings, ...operationWarnings],
      errors: [...requestErrors, ...operationErrors],
      preservePreviousData: true,
      wroteToSupabase: false,
      realProviderCalls: 0,
      apifyRuns: 0,
    },
  };
}
