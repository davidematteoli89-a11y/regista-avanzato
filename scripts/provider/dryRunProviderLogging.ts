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

type ProviderImportLogShape = {
  table: "provider_import_logs";
  provider_id: "future_provider_uuid";
  competition_id: "future_competition_uuid";
  script_name: "dryRunProviderLogging";
  status: "pending";
  started_at: "future_timestamptz";
  finished_at: null;
  items_imported: 0;
  errors: [];
  notes: string;
};

type ApiUsageLogShape = {
  table: "api_usage_logs";
  provider_id: "future_provider_uuid";
  endpoint: "dry-run/no-external-endpoint";
  request_count: 0;
  date: "future_utc_date";
  competition_id: "future_competition_uuid";
  script_name: "dryRunProviderLogging";
  response_status: null;
  estimated_cost_eur: 0;
  notes: string;
};

type BudgetScenario = {
  name: "A" | "B" | "C";
  currentMonthSpend: number;
  estimatedRunCost: number;
};

type BudgetDecision = BudgetScenario & {
  projectedSpend: number;
  shouldRun: boolean;
  warning: boolean;
  hardStop: boolean;
  reason: string;
};

type SafetyCheck = {
  name: string;
  ok: boolean;
  detail: string;
};

const defaultTrackingByFactory: Record<string, CompetitionState["trackingLevel"]> = {
  FULL_OFFICIAL_DEFAULTS: "full_official",
  APIFY_PRIORITY_ONE_DEFAULTS: "apify_light_plus_p1",
  APIFY_PRIORITY_TWO_DEFAULTS: "apify_light_plus_p2",
  TRIGGER_DEFAULTS: "trigger",
};

const MONTHLY_BUDGET_LIMIT_EUR = 30;
const WARNING_THRESHOLD_EUR = 24;
const HARD_STOP_EUR = 30;

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

function buildProviderImportLogShape(): ProviderImportLogShape {
  return {
    table: "provider_import_logs",
    provider_id: "future_provider_uuid",
    competition_id: "future_competition_uuid",
    script_name: "dryRunProviderLogging",
    status: "pending",
    started_at: "future_timestamptz",
    finished_at: null,
    items_imported: 0,
    errors: [],
    notes: "D.4 dry-run only: no external fetch and no DB write.",
  };
}

function buildApiUsageLogShape(): ApiUsageLogShape {
  return {
    table: "api_usage_logs",
    provider_id: "future_provider_uuid",
    endpoint: "dry-run/no-external-endpoint",
    request_count: 0,
    date: "future_utc_date",
    competition_id: "future_competition_uuid",
    script_name: "dryRunProviderLogging",
    response_status: null,
    estimated_cost_eur: 0,
    notes: "D.4 dry-run only: simulated API usage, zero requests.",
  };
}

function decideBudget(scenario: BudgetScenario): BudgetDecision {
  const projectedSpend = scenario.currentMonthSpend + scenario.estimatedRunCost;
  const hardStop = scenario.currentMonthSpend >= HARD_STOP_EUR || projectedSpend > HARD_STOP_EUR;
  const warning = scenario.currentMonthSpend >= WARNING_THRESHOLD_EUR || projectedSpend >= WARNING_THRESHOLD_EUR;

  if (hardStop) {
    return {
      ...scenario,
      projectedSpend,
      shouldRun: false,
      warning,
      hardStop: true,
      reason: "hard_stop_reached",
    };
  }

  if (warning) {
    return {
      ...scenario,
      projectedSpend,
      shouldRun: true,
      warning: true,
      hardStop: false,
      reason: "warning_threshold_reached_manual_review_required",
    };
  }

  return {
    ...scenario,
    projectedSpend,
    shouldRun: true,
    warning: false,
    hardStop: false,
    reason: "budget_available_for_dry_run",
  };
}

function collectSafetyChecks(providers: ProviderState[], competition: CompetitionState | undefined): SafetyCheck[] {
  return [
    {
      name: "stable_provider_off",
      ok: !isProviderActive(providers, "stable_provider"),
      detail: "stable_provider deve restare spento in D.4.",
    },
    {
      name: "the_stats_api_off",
      ok: !isProviderActive(providers, "the_stats_api"),
      detail: "TheStatsAPI deve restare spento.",
    },
    {
      name: "api_football_off",
      ok: !isProviderActive(providers, "api_football"),
      detail: "API-Football deve restare spento.",
    },
    {
      name: "apify_off",
      ok: !isProviderActive(providers, "apify_sofascore"),
      detail: "Apify/SofaScore deve restare spento.",
    },
    {
      name: "competition_full_official",
      ok: competition?.trackingLevel === "full_official",
      detail: "Il dry-run stable provider è previsto su una competizione FULL_OFFICIAL.",
    },
    {
      name: "no_external_fetch",
      ok: true,
      detail: "Lo script non contiene fetch/http client e usa solo file locali.",
    },
    {
      name: "no_db_write",
      ok: true,
      detail: "Lo script non apre client Supabase e non esegue SQL.",
    },
    {
      name: "no_token_read",
      ok: true,
      detail: "Lo script non legge process.env né .env.local.",
    },
  ];
}

function formatFields(shape: Record<string, unknown>): string {
  return Object.keys(shape).join(",");
}

function formatSafetyChecks(checks: SafetyCheck[]): string {
  return checks.map((check) => `${check.name}:${check.ok ? "ok" : "fail"}`).join(", ");
}

function formatBudgetDecision(decision: BudgetDecision): string {
  return [
    `scenario_${decision.name}=current_month_spend:${decision.currentMonthSpend}`,
    `estimated_run_cost:${decision.estimatedRunCost}`,
    `projected_spend:${decision.projectedSpend}`,
    `should_run:${decision.shouldRun}`,
    `warning:${decision.warning}`,
    `hard_stop:${decision.hardStop}`,
    `reason:${decision.reason}`,
  ].join(",");
}

function main(): void {
  const providers = parseProviders(readProjectFile("config/providers.ts"));
  const competitions = parseCompetitions(readProjectFile("config/competitions.ts"));
  const competition = competitions.find((item) => item.id === "serie-a");
  const providerImportLogShape = buildProviderImportLogShape();
  const apiUsageLogShape = buildApiUsageLogShape();
  const budgetScenarios = [
    decideBudget({ name: "A", currentMonthSpend: 0, estimatedRunCost: 0 }),
    decideBudget({ name: "B", currentMonthSpend: 24, estimatedRunCost: 1 }),
    decideBudget({ name: "C", currentMonthSpend: 30, estimatedRunCost: 1 }),
  ];
  const safetyChecks = collectSafetyChecks(providers, competition);
  const warnings = safetyChecks.filter((check) => !check.ok);
  const primaryDecision = decideBudget({ name: "A", currentMonthSpend: 0, estimatedRunCost: 0 });

  console.info("Regista Avanzato — Provider Logging/Budget Dry Run");
  console.info("mode=dry_run");
  console.info("competition_slug=serie-a");
  console.info(`competition_name=${competition?.name ?? "not_found"}`);
  console.info(`tracking_level=${competition?.trackingLevel ?? "unknown"}`);
  console.info("provider=stable_provider");
  console.info("external_fetch=false");
  console.info("db_write=false");
  console.info("env_values_read=0");
  console.info("tokens_printed=0");
  console.info("");
  console.info(`provider_import_log_shape=${warnings.length ? "needs_review" : "ok"}`);
  console.info(`provider_import_log_fields=${formatFields(providerImportLogShape)}`);
  console.info(`api_usage_log_shape=${warnings.length ? "needs_review" : "ok"}`);
  console.info(`api_usage_log_fields=${formatFields(apiUsageLogShape)}`);
  console.info("apify_budget_guard=ok");
  console.info(`monthly_budget_limit=${MONTHLY_BUDGET_LIMIT_EUR}`);
  console.info(`warning_threshold=${WARNING_THRESHOLD_EUR}`);
  console.info(`hard_stop=${HARD_STOP_EUR}`);
  console.info("estimated_cost=0");
  console.info(`should_run=${primaryDecision.shouldRun} reason=${primaryDecision.reason}`);
  console.info("");
  for (const decision of budgetScenarios) console.info(formatBudgetDecision(decision));
  console.info("");
  console.info(`safety_checks=${formatSafetyChecks(safetyChecks)}`);
  console.info(`warnings=${warnings.length}`);
  for (const warning of warnings) console.info(`warning=${warning.name} | ${warning.detail}`);
  console.info("");
  console.info("confirmation=no_external_provider_calls,no_apify_calls,no_sofascore_calls,no_scraping,no_db_writes,no_env_output");
}

if (!existsSync(join(process.cwd(), "config/providers.ts"))) {
  throw new Error("Run this script from the project root.");
}

main();
