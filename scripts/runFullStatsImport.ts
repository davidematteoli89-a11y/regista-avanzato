import type { ProviderId } from "@/config/providers";
import type { StatsImportMode, StatsImportWarning } from "@/lib/import/statsImportTypes";
import { importMatchStats, type FullStatsScriptOptions, type TeamMatchStatsImportResult } from "./importMatchStats";
import { importPlayerSeasonStats, type PlayerSeasonStatsImportResult } from "./importPlayerSeasonStats";
import { importPlayerStats, type PlayerMatchStatsImportResult } from "./importPlayerStats";
import { importTeamSeasonStats, type TeamSeasonStatsImportResult } from "./importTeamSeasonStats";

export type FullStatsImportPlan = {
  mode: StatsImportMode;
  season: string;
  teamMatch: TeamMatchStatsImportResult;
  teamSeason: TeamSeasonStatsImportResult;
  playerMatch: PlayerMatchStatsImportResult;
  playerSeason: PlayerSeasonStatsImportResult;
  fullCompetitionsChecked: number;
  nonFullCompetitionsSkipped: number;
  teamStatsPrepared: number;
  playerStatsPrepared: number;
  providers: Array<{ competitionId: string; providerId: ProviderId; fallbackUsed: boolean; reason: string }>;
  warnings: StatsImportWarning[];
  wroteToSupabase: false;
  realProviderCalls: 0;
  apifyRuns: 0;
  publishedContent: 0;
};

export async function buildFullStatsImportPlan(options: FullStatsScriptOptions = {}): Promise<FullStatsImportPlan> {
  const mode = options.mode ?? "dry_run"; const season = options.season ?? "2026/27-mock";
  const [teamMatch, teamSeason, playerMatch, playerSeason] = await Promise.all([
    importMatchStats({ ...options, mode, season }),
    importTeamSeasonStats({ ...options, mode, season }),
    importPlayerStats({ ...options, mode, season }),
    importPlayerSeasonStats({ ...options, mode, season }),
  ]);
  return {
    mode,
    season,
    teamMatch,
    teamSeason,
    playerMatch,
    playerSeason,
    fullCompetitionsChecked: teamMatch.summary.competitionsChecked,
    nonFullCompetitionsSkipped: teamMatch.summary.nonFullCompetitionsSkipped,
    teamStatsPrepared: teamMatch.summary.teamMatchPayloads + teamSeason.summary.teamSeasonPayloads,
    playerStatsPrepared: playerMatch.summary.playerMatchPayloads + playerSeason.summary.playerSeasonPayloads,
    providers: teamMatch.routes.map((route) => ({ competitionId: route.competitionId, providerId: route.resolvedProviderId, fallbackUsed: route.fallbackUsed, reason: route.reason })),
    warnings: [...teamMatch.summary.warnings, ...teamSeason.summary.warnings, ...playerMatch.summary.warnings, ...playerSeason.summary.warnings],
    wroteToSupabase: false,
    realProviderCalls: 0,
    apifyRuns: 0,
    publishedContent: 0,
  };
}

export function formatFullStatsImportPlan(plan: FullStatsImportPlan): string {
  const providerCounts = plan.providers.reduce<Record<string, number>>((counts, item) => {
    counts[item.providerId] = (counts[item.providerId] ?? 0) + 1;
    return counts;
  }, {});
  return [
    "[full-stats-import]",
    `mode=${plan.mode}`,
    `season=${plan.season}`,
    `full_competitions=${plan.fullCompetitionsChecked}`,
    `non_full_skipped=${plan.nonFullCompetitionsSkipped}`,
    `team_stats_would_upsert=${plan.teamStatsPrepared}`,
    `player_stats_would_upsert=${plan.playerStatsPrepared}`,
    `providers=${Object.entries(providerCounts).map(([id, count]) => `${id}=${count}`).join(",") || "none"}`,
    `fallbacks=${plan.providers.filter((item) => item.fallbackUsed).length}`,
    `warnings=${plan.warnings.length}`,
    "supabase_writes=0",
    "real_provider_calls=0",
    "apify_runs=0",
    "published_content=0",
  ].join(" | ");
}

export async function runFullStatsImport(options: FullStatsScriptOptions = {}): Promise<FullStatsImportPlan> {
  const plan = await buildFullStatsImportPlan(options);
  console.info(formatFullStatsImportPlan(plan));
  return plan;
}
