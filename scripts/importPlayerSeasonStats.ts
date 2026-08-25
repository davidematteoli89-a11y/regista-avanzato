import { COMPETITIONS, getFullOfficialCompetitions } from "@/config/competitions";
import { checkDailyBudget } from "@/lib/apiUsage/checkDailyBudget";
import { routeFootballDataProvider, type ProviderRouteDecision } from "@/lib/dataProvider/providerRouter";
import { createSafeStatsImportPolicy, missingStatsWarning, validateStatsImportGuards } from "@/lib/import/statsImportGuards";
import { createStatsImportLogger } from "@/lib/import/statsImportLogger";
import type { PlayerSeasonStatsUpsertPayload, StatsImportBatchResult } from "@/lib/import/statsImportTypes";
import { mapPlayerSeasonStats } from "@/lib/import/playerStatsMapper";
import type { FullStatsScriptOptions } from "./importMatchStats";

export type PlayerSeasonStatsImportResult = StatsImportBatchResult<PlayerSeasonStatsUpsertPayload> & { routes: ProviderRouteDecision[] };

export async function importPlayerSeasonStats(options: FullStatsScriptOptions = {}): Promise<PlayerSeasonStatsImportResult> {
  const mode = options.mode ?? "dry_run"; const season = options.season ?? "2026/27-mock";
  const fullCompetitions = getFullOfficialCompetitions(); const nonFullSkipped = COMPETITIONS.length - fullCompetitions.length;
  const logger = createStatsImportLogger(mode); const policy = createSafeStatsImportPolicy(mode); const routes: ProviderRouteDecision[] = [];
  const budget = checkDailyBudget({ dailyRequestsUsed: options.stableDailyRequestsUsed ?? 0, monthlyRequestsUsed: options.stableMonthlyRequestsUsed ?? 0, dailyBudgetRequests: options.stableDailyBudgetRequests, monthlyBudgetRequests: options.stableMonthlyBudgetRequests });

  for (const competition of fullCompetitions) {
    const route = routeFootballDataProvider(competition.id); routes.push(route);
    const guards = validateStatsImportGuards(competition, competition.primary_provider, policy); const warnings = [...guards.warnings];
    if (!budget.canStart) warnings.push({ code: "PLAYER_SEASON_BUDGET_SAFE_MOCK", message: budget.reason });
    if (!guards.allowed) { logger.recordProviderRequest(route.fallbackUsed, warnings); continue; }
    try {
      const response = await route.provider.getPlayerStats({ competitionId: competition.id, season, requestSource: "development_test", latestRoundOnly: true });
      warnings.push(...response.errors.map((error) => ({ code: error.code, message: error.message })));
      if (response.data.seasonStats.length === 0) warnings.push(missingStatsWarning("player_season", competition.id));
      logger.recordProviderRequest(route.fallbackUsed, warnings);
      response.data.seasonStats.forEach((stats) => logger.record(mapPlayerSeasonStats({ stats, competition, mode, sourceProviderId: route.resolvedProviderId, competitionUuid: options.competitionUuidByInternalKey?.[competition.id] ?? null, teamUuidByInternalId: options.teamUuidByInternalId, playerUuidByInternalId: options.playerUuidByInternalId, providerUuids: options.providerUuids })));
    } catch (error) {
      logger.recordProviderRequest(route.fallbackUsed, [{ code: "PLAYER_SEASON_STATS_PROVIDER_FAILURE", message: `${error instanceof Error ? error.message : "Errore sconosciuto"}. Dati precedenti preservati.` }]);
    }
  }
  return { mode, operations: logger.getOperations<PlayerSeasonStatsUpsertPayload>("player_season"), summary: logger.summarize(fullCompetitions.length, nonFullSkipped), routes };
}
