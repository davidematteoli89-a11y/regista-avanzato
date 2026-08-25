import { COMPETITIONS, getFullOfficialCompetitions } from "@/config/competitions";
import { checkDailyBudget } from "@/lib/apiUsage/checkDailyBudget";
import { routeFootballDataProvider, type ProviderRouteDecision } from "@/lib/dataProvider/providerRouter";
import { createSafeStatsImportPolicy, missingStatsWarning, validateStatsImportGuards } from "@/lib/import/statsImportGuards";
import { createStatsImportLogger } from "@/lib/import/statsImportLogger";
import type { PlayerMatchStatsUpsertPayload, StatsImportBatchResult } from "@/lib/import/statsImportTypes";
import { mapPlayerMatchStats } from "@/lib/import/playerStatsMapper";
import type { FullStatsScriptOptions } from "./importMatchStats";

export type PlayerMatchStatsImportResult = StatsImportBatchResult<PlayerMatchStatsUpsertPayload> & { routes: ProviderRouteDecision[] };

export async function importPlayerStats(options: FullStatsScriptOptions = {}): Promise<PlayerMatchStatsImportResult> {
  const mode = options.mode ?? "dry_run"; const season = options.season ?? "2026/27-mock";
  const fullCompetitions = getFullOfficialCompetitions(); const nonFullSkipped = COMPETITIONS.length - fullCompetitions.length;
  const logger = createStatsImportLogger(mode); const policy = createSafeStatsImportPolicy(mode); const routes: ProviderRouteDecision[] = [];
  const budget = checkDailyBudget({ dailyRequestsUsed: options.stableDailyRequestsUsed ?? 0, monthlyRequestsUsed: options.stableMonthlyRequestsUsed ?? 0, dailyBudgetRequests: options.stableDailyBudgetRequests, monthlyBudgetRequests: options.stableMonthlyBudgetRequests });

  for (const competition of fullCompetitions) {
    const route = routeFootballDataProvider(competition.id); routes.push(route);
    const guards = validateStatsImportGuards(competition, competition.primary_provider, policy); const warnings = [...guards.warnings];
    if (!budget.canStart) warnings.push({ code: "PLAYER_MATCH_BUDGET_SAFE_MOCK", message: budget.reason });
    if (!guards.allowed) { logger.recordProviderRequest(route.fallbackUsed, warnings); continue; }
    try {
      const response = await route.provider.getPlayerStats({ competitionId: competition.id, season, requestSource: "development_test", latestRoundOnly: true });
      warnings.push(...response.errors.map((error) => ({ code: error.code, message: error.message })));
      if (response.data.matchStats.length === 0) warnings.push(missingStatsWarning("player_match", competition.id));
      logger.recordProviderRequest(route.fallbackUsed, warnings);
      response.data.matchStats.forEach((stats) => logger.record(mapPlayerMatchStats({ stats, competition, mode, sourceProviderId: route.resolvedProviderId, matchUuidByInternalId: options.matchUuidByInternalId, teamUuidByInternalId: options.teamUuidByInternalId, playerUuidByInternalId: options.playerUuidByInternalId, providerUuids: options.providerUuids })));
    } catch (error) {
      logger.recordProviderRequest(route.fallbackUsed, [{ code: "PLAYER_MATCH_STATS_PROVIDER_FAILURE", message: `${error instanceof Error ? error.message : "Errore sconosciuto"}. Dati precedenti preservati.` }]);
    }
  }
  return { mode, operations: logger.getOperations<PlayerMatchStatsUpsertPayload>("player_match"), summary: logger.summarize(fullCompetitions.length, nonFullSkipped), routes };
}
