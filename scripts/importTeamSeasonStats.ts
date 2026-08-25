import { COMPETITIONS, getFullOfficialCompetitions } from "@/config/competitions";
import { checkDailyBudget } from "@/lib/apiUsage/checkDailyBudget";
import { routeFootballDataProvider, type ProviderRouteDecision } from "@/lib/dataProvider/providerRouter";
import type { ProviderUuidMap } from "@/lib/import/importTypes";
import { createSafeStatsImportPolicy, missingStatsWarning, validateStatsImportGuards } from "@/lib/import/statsImportGuards";
import { createStatsImportLogger } from "@/lib/import/statsImportLogger";
import type { StatsImportBatchResult, TeamSeasonStatsUpsertPayload } from "@/lib/import/statsImportTypes";
import { mapTeamSeasonStats } from "@/lib/import/teamStatsMapper";
import type { FullStatsScriptOptions } from "./importMatchStats";

export type TeamSeasonStatsImportResult = StatsImportBatchResult<TeamSeasonStatsUpsertPayload> & { routes: ProviderRouteDecision[] };

export async function importTeamSeasonStats(options: FullStatsScriptOptions = {}): Promise<TeamSeasonStatsImportResult> {
  const mode = options.mode ?? "dry_run"; const season = options.season ?? "2026/27-mock";
  const fullCompetitions = getFullOfficialCompetitions(); const nonFullSkipped = COMPETITIONS.length - fullCompetitions.length;
  const logger = createStatsImportLogger(mode); const policy = createSafeStatsImportPolicy(mode); const routes: ProviderRouteDecision[] = [];
  const budget = checkDailyBudget({ dailyRequestsUsed: options.stableDailyRequestsUsed ?? 0, monthlyRequestsUsed: options.stableMonthlyRequestsUsed ?? 0, dailyBudgetRequests: options.stableDailyBudgetRequests, monthlyBudgetRequests: options.stableMonthlyBudgetRequests });

  for (const competition of fullCompetitions) {
    const route = routeFootballDataProvider(competition.id); routes.push(route);
    const guards = validateStatsImportGuards(competition, competition.primary_provider, policy); const warnings = [...guards.warnings];
    if (!budget.canStart) warnings.push({ code: "TEAM_SEASON_BUDGET_SAFE_MOCK", message: budget.reason });
    if (!guards.allowed) { logger.recordProviderRequest(route.fallbackUsed, warnings); continue; }
    try {
      const response = await route.provider.getTeamStats({ competitionId: competition.id, season, requestSource: "development_test", latestRoundOnly: true });
      warnings.push(...response.errors.map((error) => ({ code: error.code, message: error.message })));
      if (response.data.seasonStats.length === 0) warnings.push(missingStatsWarning("team_season", competition.id));
      logger.recordProviderRequest(route.fallbackUsed, warnings);
      response.data.seasonStats.forEach((stats) => logger.record(mapTeamSeasonStats({ stats, competition, mode, sourceProviderId: route.resolvedProviderId, competitionUuid: options.competitionUuidByInternalKey?.[competition.id] ?? null, teamUuidByInternalId: options.teamUuidByInternalId, providerUuids: options.providerUuids as ProviderUuidMap | undefined })));
    } catch (error) {
      logger.recordProviderRequest(route.fallbackUsed, [{ code: "TEAM_SEASON_STATS_PROVIDER_FAILURE", message: `${error instanceof Error ? error.message : "Errore sconosciuto"}. Dati precedenti preservati.` }]);
    }
  }
  return { mode, operations: logger.getOperations<TeamSeasonStatsUpsertPayload>("team_season"), summary: logger.summarize(fullCompetitions.length, nonFullSkipped), routes };
}
