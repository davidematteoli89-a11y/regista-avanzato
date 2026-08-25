import type { ProviderId } from "@/config/providers";
import type { ImportMode } from "@/lib/import/importTypes";
import type { MatchImportWarning, MatchTrigger } from "@/lib/import/matchImportTypes";
import { importFixtures, type FixturesImportOptions, type FixturesImportResult } from "./importFixtures";
import { importMatchEvents, type MatchEventsImportResult } from "./importMatchEvents";

export type DailyMatchesImportPlan = {
  mode: ImportMode;
  season: string;
  fixtures: FixturesImportResult;
  events: MatchEventsImportResult;
  providers: Array<{ competitionId: string; resolvedProviderId: ProviderId; fallbackUsed: boolean; reason: string }>;
  triggers: MatchTrigger[];
  warnings: MatchImportWarning[];
  wroteToSupabase: false;
  realProviderCalls: 0;
  apifyRuns: 0;
  publishedContent: 0;
};

export async function buildDailyMatchesImportPlan(options: FixturesImportOptions = {}): Promise<DailyMatchesImportPlan> {
  const mode = options.mode ?? "dry_run";
  const season = options.season ?? "2026/27-mock";
  const fixtures = await importFixtures({ ...options, mode, season });
  const events = await importMatchEvents({ ...options, mode, season }, fixtures);
  return {
    mode,
    season,
    fixtures,
    events,
    providers: fixtures.routes.map((route) => ({ competitionId: route.competitionId, resolvedProviderId: route.resolvedProviderId, fallbackUsed: route.fallbackUsed, reason: route.reason })),
    triggers: events.summary.triggers,
    warnings: [...fixtures.summary.warnings, ...events.summary.warnings],
    wroteToSupabase: false,
    realProviderCalls: 0,
    apifyRuns: 0,
    publishedContent: 0,
  };
}

export function formatDailyMatchesImportPlan(plan: DailyMatchesImportPlan): string {
  const providerCounts = plan.providers.reduce<Record<string, number>>((counts, item) => {
    counts[item.resolvedProviderId] = (counts[item.resolvedProviderId] ?? 0) + 1;
    return counts;
  }, {});
  const providers = Object.entries(providerCounts).map(([id, count]) => `${id}=${count}`).join(",");
  return [
    "[daily-matches-import]",
    `mode=${plan.mode}`,
    `season=${plan.season}`,
    `competitions_checked=${plan.fixtures.summary.competitionsChecked}`,
    `mock_matches_would_upsert=${plan.fixtures.summary.matchPayloads}`,
    `mock_events_would_upsert=${plan.events.summary.eventPayloads}`,
    `triggers_detected=${plan.triggers.length}`,
    `providers=${providers || "none"}`,
    `fallbacks=${plan.providers.filter((item) => item.fallbackUsed).length}`,
    `warnings=${plan.warnings.length}`,
    "supabase_writes=0",
    "real_provider_calls=0",
    "apify_runs=0",
    "published_content=0",
  ].join(" | ");
}

/** Costruisce e stampa soltanto il piano; non è uno scheduler e non pubblica contenuti. */
export async function runDailyMatchesImport(options: FixturesImportOptions = {}): Promise<DailyMatchesImportPlan> {
  const plan = await buildDailyMatchesImportPlan(options);
  console.info(formatDailyMatchesImportPlan(plan));
  return plan;
}
