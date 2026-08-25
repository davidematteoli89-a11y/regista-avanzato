import { importCompetitions, type CompetitionImportOptions } from "./importCompetitions";
import { importTeams, type TeamImportOptions } from "./importTeams";
import type { ImportMode, InitialImportPlan } from "@/lib/import/importTypes";

export type InitialImportOptions = CompetitionImportOptions & TeamImportOptions & {
  mode?: ImportMode;
};

export async function buildInitialImportPlan(options: InitialImportOptions = {}): Promise<InitialImportPlan> {
  const mode = options.mode ?? "dry_run";
  const season = options.season ?? "2026/27-mock";
  const competitionImport = await importCompetitions({ ...options, mode, season });
  const teamImport = await importTeams({ ...options, mode, season });
  const providers = competitionImport.routes.map((route) => ({
    competitionId: route.competitionId,
    configuredProviderId: route.configuredProviderId,
    resolvedProviderId: route.resolvedProviderId,
    fallbackUsed: route.fallbackUsed,
    reason: route.reason,
  }));

  return {
    mode,
    season,
    competitionImport,
    teamImport,
    providers,
    warnings: [...competitionImport.summary.warnings, ...teamImport.summary.warnings],
    wroteToSupabase: false,
    realProviderCalls: 0,
    apifyRuns: 0,
  };
}

export function formatInitialImportPlan(plan: InitialImportPlan): string {
  const providerCounts = plan.providers.reduce<Record<string, number>>((counts, route) => {
    counts[route.resolvedProviderId] = (counts[route.resolvedProviderId] ?? 0) + 1;
    return counts;
  }, {});
  const providerSummary = Object.entries(providerCounts).map(([provider, count]) => `${provider}=${count}`).join(",");
  const fallbacks = plan.providers.filter((route) => route.fallbackUsed).length;

  return [
    "[initial-import]",
    `mode=${plan.mode}`,
    `season=${plan.season}`,
    `competitions_would_upsert=${plan.competitionImport.summary.competitionPayloads}`,
    `mock_teams_would_upsert=${plan.teamImport.summary.teamPayloads}`,
    `providers=${providerSummary || "none"}`,
    `fallbacks=${fallbacks}`,
    `warnings=${plan.warnings.length}`,
    "supabase_writes=0",
    "real_provider_calls=0",
    "apify_runs=0",
  ].join(" | ");
}

/** Stampa soltanto il piano dry-run; non esegue automaticamente alcun import reale. */
export async function runInitialImport(options: InitialImportOptions = {}): Promise<InitialImportPlan> {
  const plan = await buildInitialImportPlan(options);
  console.info(formatInitialImportPlan(plan));
  return plan;
}
