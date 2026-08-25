import { COMPETITIONS, getFullOfficialCompetitions } from "@/config/competitions";
import { checkDailyBudget } from "@/lib/apiUsage/checkDailyBudget";
import { routeFootballDataProvider, type ProviderRouteDecision } from "@/lib/dataProvider/providerRouter";
import { createSafeStatsImportPolicy, missingStatsWarning, validateStatsImportGuards } from "@/lib/import/statsImportGuards";
import { createStatsImportLogger } from "@/lib/import/statsImportLogger";
import type { StatsImportBatchResult, StatsImportMode, TeamMatchStatsUpsertPayload } from "@/lib/import/statsImportTypes";
import { mapTeamMatchStats } from "@/lib/import/teamStatsMapper";
import type { ProviderUuidMap } from "@/lib/import/importTypes";

export type FullStatsScriptOptions = {
  mode?: StatsImportMode;
  season?: string;
  competitionUuidByInternalKey?: Readonly<Record<string, string>>;
  matchUuidByInternalId?: Readonly<Record<string, string>>;
  teamUuidByInternalId?: Readonly<Record<string, string>>;
  playerUuidByInternalId?: Readonly<Record<string, string>>;
  providerUuids?: ProviderUuidMap;
  stableDailyRequestsUsed?: number;
  stableMonthlyRequestsUsed?: number;
  stableDailyBudgetRequests?: number | null;
  stableMonthlyBudgetRequests?: number | null;
};

export type TeamMatchStatsImportResult = StatsImportBatchResult<TeamMatchStatsUpsertPayload> & { routes: ProviderRouteDecision[] };

export async function importMatchStats(options: FullStatsScriptOptions = {}): Promise<TeamMatchStatsImportResult> {
  const mode = options.mode ?? "dry_run"; const season = options.season ?? "2026/27-mock";
  const fullCompetitions = getFullOfficialCompetitions(); const nonFullSkipped = COMPETITIONS.length - fullCompetitions.length;
  const logger = createStatsImportLogger(mode); const policy = createSafeStatsImportPolicy(mode); const routes: ProviderRouteDecision[] = [];
  const budget = checkDailyBudget({ dailyRequestsUsed: options.stableDailyRequestsUsed ?? 0, monthlyRequestsUsed: options.stableMonthlyRequestsUsed ?? 0, dailyBudgetRequests: options.stableDailyBudgetRequests, monthlyBudgetRequests: options.stableMonthlyBudgetRequests });

  for (const competition of fullCompetitions) {
    const route = routeFootballDataProvider(competition.id); routes.push(route);
    const guards = validateStatsImportGuards(competition, competition.primary_provider, policy);
    const warnings = [...guards.warnings];
    if (!budget.canStart) warnings.push({ code: "STATS_STABLE_BUDGET_SAFE_MOCK", message: budget.reason });
    if (!guards.allowed) { logger.recordProviderRequest(route.fallbackUsed, warnings); continue; }
    try {
      const response = await route.provider.getMatchStats({ competitionId: competition.id, season, requestSource: "development_test", latestRoundOnly: true });
      warnings.push(...response.errors.map((error) => ({ code: error.code, message: error.message })));
      if (response.data.matchStats.length === 0) warnings.push(missingStatsWarning("team_match", competition.id));
      logger.recordProviderRequest(route.fallbackUsed, warnings);
      response.data.matchStats.forEach((stats) => logger.record(mapTeamMatchStats({ stats, competition, mode, sourceProviderId: route.resolvedProviderId, matchUuidByInternalId: options.matchUuidByInternalId, teamUuidByInternalId: options.teamUuidByInternalId, providerUuids: options.providerUuids })));
    } catch (error) {
      logger.recordProviderRequest(route.fallbackUsed, [{ code: "TEAM_MATCH_STATS_PROVIDER_FAILURE", message: `${error instanceof Error ? error.message : "Errore sconosciuto"}. Dati precedenti preservati.` }]);
    }
  }
  return { mode, operations: logger.getOperations<TeamMatchStatsUpsertPayload>("team_match"), summary: logger.summarize(fullCompetitions.length, nonFullSkipped), routes };
}
