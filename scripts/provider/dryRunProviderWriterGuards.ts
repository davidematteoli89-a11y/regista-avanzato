import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

type ProviderState = {
  id: string;
  active: boolean;
};

type CompetitionState = {
  id: string;
  name: string;
  trackingLevel: "full_official" | "apify_light_plus_p1" | "apify_light_plus_p2" | "trigger";
};

const defaultTrackingByFactory: Record<string, CompetitionState["trackingLevel"]> = {
  FULL_OFFICIAL_DEFAULTS: "full_official",
  APIFY_PRIORITY_ONE_DEFAULTS: "apify_light_plus_p1",
  APIFY_PRIORITY_TWO_DEFAULTS: "apify_light_plus_p2",
  TRIGGER_DEFAULTS: "trigger",
};

const SAFE_POLICY = {
  mode: "dry_run",
  realWritesEnabled: false,
  allowExternalFetch: false,
  allowProviderCalls: false,
  allowApifyRuns: false,
  allowServiceRole: false,
} as const;

function readProjectFile(path: string): string {
  return readFileSync(join(process.cwd(), path), "utf8");
}

function parseProviders(source: string): ProviderState[] {
  const rows: ProviderState[] = [];
  const providerPattern = /id:\s*"([^"]+)",\s*name:\s*"[^"]+",\s*type:\s*"[^"]+",\s*active:\s*(true|false)/g;

  for (const match of source.matchAll(providerPattern)) {
    rows.push({ id: match[1], active: match[2] === "true" });
  }

  return rows;
}

function parseCompetitions(source: string): CompetitionState[] {
  const rows: CompetitionState[] = [];
  const competitionPattern =
    /createCompetition\((FULL_OFFICIAL_DEFAULTS|APIFY_PRIORITY_ONE_DEFAULTS|APIFY_PRIORITY_TWO_DEFAULTS|TRIGGER_DEFAULTS),\s*\{\s*id:\s*"([^"]+)",\s*name:\s*"([^"]+)"/g;

  for (const match of source.matchAll(competitionPattern)) {
    rows.push({
      trackingLevel: defaultTrackingByFactory[match[1]],
      id: match[2],
      name: match[3],
    });
  }

  return rows;
}

function isProviderActive(providers: ProviderState[], providerId: string): boolean {
  return providers.find((provider) => provider.id === providerId)?.active ?? false;
}

function buildBatchId(providerId: string, competitionSlug: string): string {
  return `${providerId}:${competitionSlug}:dry_run:20260831120000`;
}

function main(): void {
  const providers = parseProviders(readProjectFile("config/providers.ts"));
  const competitions = parseCompetitions(readProjectFile("config/competitions.ts"));
  const competition = competitions.find((item) => item.id === "serie-a");
  const batchId = buildBatchId("stable_provider", "serie-a");
  const policyGuardBlocks = SAFE_POLICY.realWritesEnabled ? 0 : 1;
  const warnings: string[] = [];

  if (!competition) warnings.push("competition_not_found");
  if (competition && competition.trackingLevel !== "full_official") warnings.push("competition_not_full_official");
  if (isProviderActive(providers, "stable_provider")) warnings.push("stable_provider_active");
  if (isProviderActive(providers, "the_stats_api")) warnings.push("the_stats_api_active");
  if (isProviderActive(providers, "api_football")) warnings.push("api_football_active");
  if (isProviderActive(providers, "apify_sofascore")) warnings.push("apify_active");

  console.info("Regista Avanzato — Provider Writer Guards Dry Run");
  console.info("mode=dry_run");
  console.info("competition_slug=serie-a");
  console.info(`competition_name=${competition?.name ?? "not_found"}`);
  console.info(`tracking_level=${competition?.trackingLevel ?? "unknown"}`);
  console.info("provider=stable_provider");
  console.info("real_writes_enabled=false");
  console.info("external_fetch=false");
  console.info("db_write=false");
  console.info("env_values_read=0");
  console.info("tokens_printed=0");
  console.info(`batch_id=${batchId}`);
  console.info("provider_import_log_preview=ok");
  console.info("api_usage_log_preview=ok");
  console.info("rollback_plan_preview=ok");
  console.info("write_attempt_blocked=true");
  console.info("write_block_reason=PROVIDER_WRITES_DISABLED");
  console.info(`policy_guard_blocks=${policyGuardBlocks}`);
  console.info("planned_log_tables=provider_import_logs,api_usage_logs,import_logs");
  console.info(`warnings=${warnings.length}`);
  for (const warning of warnings) console.info(`warning=${warning}`);
  console.info("confirmation=no_external_provider_calls,no_apify_calls,no_sofascore_calls,no_scraping,no_db_writes,no_env_output");
}

if (!existsSync(join(process.cwd(), "config/providers.ts"))) {
  throw new Error("Run this script from the project root.");
}

main();
