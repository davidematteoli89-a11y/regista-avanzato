import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

type ProviderAuditRow = {
  id: string;
  name: string;
  type: string;
  active: boolean;
  priority: number;
  monthlyBudget: string;
};

type CompetitionAuditRow = {
  id: string;
  name: string;
  trackingLevel: "full_official" | "apify_light_plus_p1" | "apify_light_plus_p2" | "trigger";
};

type AuditWarning = {
  code: string;
  message: string;
};

const expectedProviderState: Record<string, boolean> = {
  mock_provider: true,
  manual_provider: true,
  stable_provider: false,
  the_stats_api: false,
  api_football: false,
  apify_sofascore: false,
};

const defaultTrackingByFactory: Record<string, CompetitionAuditRow["trackingLevel"]> = {
  FULL_OFFICIAL_DEFAULTS: "full_official",
  APIFY_PRIORITY_ONE_DEFAULTS: "apify_light_plus_p1",
  APIFY_PRIORITY_TWO_DEFAULTS: "apify_light_plus_p2",
  TRIGGER_DEFAULTS: "trigger",
};

function readProjectFile(path: string): string {
  return readFileSync(join(process.cwd(), path), "utf8");
}

function parseProviders(source: string): ProviderAuditRow[] {
  const rows: ProviderAuditRow[] = [];
  const providerPattern =
    /\{\s*id:\s*"([^"]+)",\s*name:\s*"([^"]+)",\s*type:\s*"([^"]+)",\s*active:\s*(true|false),\s*priority:\s*(\d+),\s*monthly_budget_eur:\s*([^,\n]+)/g;

  for (const match of source.matchAll(providerPattern)) {
    rows.push({
      id: match[1],
      name: match[2],
      type: match[3],
      active: match[4] === "true",
      priority: Number(match[5]),
      monthlyBudget: match[6].trim(),
    });
  }

  return rows.sort((a, b) => a.priority - b.priority);
}

function parseCompetitions(source: string): CompetitionAuditRow[] {
  const rows: CompetitionAuditRow[] = [];
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

function countByTrackingLevel(competitions: CompetitionAuditRow[]): Record<CompetitionAuditRow["trackingLevel"], number> {
  return competitions.reduce<Record<CompetitionAuditRow["trackingLevel"], number>>(
    (counts, competition) => {
      counts[competition.trackingLevel] += 1;
      return counts;
    },
    {
      full_official: 0,
      apify_light_plus_p1: 0,
      apify_light_plus_p2: 0,
      trigger: 0,
    },
  );
}

function collectWarnings(providers: ProviderAuditRow[], docs: Record<string, string>, seedMigration: string): AuditWarning[] {
  const warnings: AuditWarning[] = [];

  for (const provider of providers) {
    const expectedActive = expectedProviderState[provider.id];
    if (typeof expectedActive === "boolean" && provider.active !== expectedActive) {
      warnings.push({
        code: "PROVIDER_STATE_MISMATCH",
        message: `${provider.id} active=${provider.active}, atteso=${expectedActive}.`,
      });
    }
  }

  const realProvidersActive = providers.filter((provider) =>
    ["stable_provider", "the_stats_api", "api_football"].includes(provider.id) && provider.active,
  );
  for (const provider of realProvidersActive) {
    warnings.push({
      code: "REAL_PROVIDER_ACTIVE",
      message: `${provider.id} risulta attivo nel config locale: D.2 richiede provider reali spenti.`,
    });
  }

  const apifyProvider = providers.find((provider) => provider.id === "apify_sofascore");
  if (apifyProvider?.active) {
    warnings.push({
      code: "APIFY_ACTIVE",
      message: "apify_sofascore risulta attivo nel config locale: D.2 richiede Apify spento.",
    });
  }

  if (!seedMigration.includes("import_enabled") || !seedMigration.includes("false")) {
    warnings.push({
      code: "IMPORT_ENABLED_SEED_UNCLEAR",
      message: "La migrazione seed non rende evidente import_enabled=false.",
    });
  }

  const apifyBudgetDoc = docs["docs/apify_budget_safety_plan.md"] ?? "";
  if (!apifyBudgetDoc.includes("hard stop") || !apifyBudgetDoc.includes("30")) {
    warnings.push({
      code: "APIFY_BUDGET_GUARD_DOC_MISSING",
      message: "La documentazione budget Apify non cita chiaramente hard stop 30 €.",
    });
  }

  return warnings;
}

function formatList(items: string[]): string {
  return items.length ? items.join(", ") : "none";
}

function main(): void {
  const providerSource = readProjectFile("config/providers.ts");
  const competitionSource = readProjectFile("config/competitions.ts");
  const seedMigration = readProjectFile("supabase/migrations/0006_seed_base_data.sql");
  const docs = {
    "docs/provider_activation_plan.md": readProjectFile("docs/provider_activation_plan.md"),
    "docs/provider_dry_run_plan.md": readProjectFile("docs/provider_dry_run_plan.md"),
    "docs/apify_budget_safety_plan.md": readProjectFile("docs/apify_budget_safety_plan.md"),
  };

  const providers = parseProviders(providerSource);
  const competitions = parseCompetitions(competitionSource);
  const counts = countByTrackingLevel(competitions);
  const warnings = collectWarnings(providers, docs, seedMigration);
  const providerIds = providers.map((provider) => `${provider.id}:${provider.active ? "on" : "off"}`);
  const fullOfficialIds = competitions.filter((competition) => competition.trackingLevel === "full_official").map((competition) => competition.id);
  const apifyP1Ids = competitions.filter((competition) => competition.trackingLevel === "apify_light_plus_p1").map((competition) => competition.id);
  const apifyP2Ids = competitions.filter((competition) => competition.trackingLevel === "apify_light_plus_p2").map((competition) => competition.id);

  console.info("Regista Avanzato — Provider Config Audit");
  console.info("mode=local_read_only");
  console.info("external_fetches=0");
  console.info("database_writes=0");
  console.info("env_values_read=0");
  console.info("tokens_printed=0");
  console.info("");
  console.info(`providers_total=${providers.length}`);
  console.info(`providers_state=${formatList(providerIds)}`);
  console.info(`expected_state=mock_provider:on, manual_provider:on, stable_provider:off, the_stats_api:off, api_football:off, apify_sofascore:off`);
  console.info("");
  console.info(`competitions_total=${competitions.length}`);
  console.info(`full_official=${counts.full_official}`);
  console.info(`apify_light_plus_p1=${counts.apify_light_plus_p1}`);
  console.info(`apify_light_plus_p2=${counts.apify_light_plus_p2}`);
  console.info(`trigger=${counts.trigger}`);
  console.info("");
  console.info(`full_official_ids=${formatList(fullOfficialIds)}`);
  console.info(`apify_p1_ids=${formatList(apifyP1Ids)}`);
  console.info(`apify_p2_ids=${formatList(apifyP2Ids)}`);
  console.info("");
  console.info(`seed_import_enabled_default=${seedMigration.includes("import_enabled = excluded.import_enabled") && seedMigration.includes("  false,") ? "false" : "needs_review"}`);
  console.info(`apify_budget_doc=${docs["docs/apify_budget_safety_plan.md"].includes("hard stop") ? "present" : "needs_review"}`);
  console.info("");

  if (warnings.length) {
    console.info(`warnings=${warnings.length}`);
    for (const warning of warnings) {
      console.info(`warning=${warning.code} | ${warning.message}`);
    }
  } else {
    console.info("warnings=0");
  }

  console.info("");
  console.info("confirmation=no_external_provider_calls,no_apify_calls,no_sofascore_calls,no_scraping,no_db_writes,no_env_output");
}

if (!existsSync(join(process.cwd(), "config/providers.ts"))) {
  throw new Error("Run this script from the project root.");
}

main();
