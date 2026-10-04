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

type MockTeamPayload = {
  table: "teams";
  api_team_id: string;
  slug: string;
  name: string;
  short_name: string;
  status: "approved";
  visibility: "public_free";
};

type MockMatchPayload = {
  table: "matches";
  api_match_id: string;
  season: string;
  round: string;
  kickoff_at: string;
  home_team_slug: string;
  away_team_slug: string;
  home_score: number | null;
  away_score: number | null;
  status: "scheduled" | "finished";
  visibility: "public_free";
};

type MockStandingPayload = {
  table: "standings";
  season: string;
  team_slug: string;
  rank: number;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goals_for: number;
  goals_against: number;
  goal_difference: number;
  points: number;
};

type DryRunPayload = {
  teams: MockTeamPayload[];
  matches: MockMatchPayload[];
  standings: MockStandingPayload[];
  providerImportLogPreview: {
    table: "provider_import_logs";
    provider_candidate: "stable_provider";
    competition_slug: string;
    mode: "dry_run";
    status: "planned";
  };
};

type SafetyCheck = {
  name: string;
  ok: boolean;
  detail: string;
};

type DryRunWarning = {
  code: string;
  message: string;
};

const defaultTrackingByFactory: Record<string, CompetitionState["trackingLevel"]> = {
  FULL_OFFICIAL_DEFAULTS: "full_official",
  APIFY_PRIORITY_ONE_DEFAULTS: "apify_light_plus_p1",
  APIFY_PRIORITY_TWO_DEFAULTS: "apify_light_plus_p2",
  TRIGGER_DEFAULTS: "trigger",
};

function readProjectFile(path: string): string {
  return readFileSync(join(process.cwd(), path), "utf8");
}

function getCompetitionSlug(): string {
  const argument = process.argv.find((item) => item.startsWith("--competition="));
  return argument?.split("=")[1]?.trim() || "serie-a";
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

function buildMockStablePayload(competitionSlug: string): DryRunPayload {
  const teams: MockTeamPayload[] = [
    { table: "teams", api_team_id: "dry-stable-serie-a-team-1", slug: "registi-fc", name: "Registi FC", short_name: "REG", status: "approved", visibility: "public_free" },
    { table: "teams", api_team_id: "dry-stable-serie-a-team-2", slug: "avanguardia-fc", name: "Avanguardia FC", short_name: "AVA", status: "approved", visibility: "public_free" },
    { table: "teams", api_team_id: "dry-stable-serie-a-team-3", slug: "metodo-calcio", name: "Metodo Calcio", short_name: "MET", status: "approved", visibility: "public_free" },
    { table: "teams", api_team_id: "dry-stable-serie-a-team-4", slug: "atlante-pressing", name: "Atlante Pressing", short_name: "ATL", status: "approved", visibility: "public_free" },
  ];

  const matches: MockMatchPayload[] = [
    {
      table: "matches",
      api_match_id: "dry-stable-serie-a-match-1",
      season: "2026/27-dry-run",
      round: "1",
      kickoff_at: "2026-09-12T18:45:00.000Z",
      home_team_slug: "registi-fc",
      away_team_slug: "avanguardia-fc",
      home_score: 2,
      away_score: 1,
      status: "finished",
      visibility: "public_free",
    },
    {
      table: "matches",
      api_match_id: "dry-stable-serie-a-match-2",
      season: "2026/27-dry-run",
      round: "1",
      kickoff_at: "2026-09-13T16:00:00.000Z",
      home_team_slug: "metodo-calcio",
      away_team_slug: "atlante-pressing",
      home_score: null,
      away_score: null,
      status: "scheduled",
      visibility: "public_free",
    },
  ];

  const standings: MockStandingPayload[] = [
    { table: "standings", season: "2026/27-dry-run", team_slug: "registi-fc", rank: 1, played: 1, won: 1, drawn: 0, lost: 0, goals_for: 2, goals_against: 1, goal_difference: 1, points: 3 },
    { table: "standings", season: "2026/27-dry-run", team_slug: "metodo-calcio", rank: 2, played: 0, won: 0, drawn: 0, lost: 0, goals_for: 0, goals_against: 0, goal_difference: 0, points: 0 },
    { table: "standings", season: "2026/27-dry-run", team_slug: "atlante-pressing", rank: 3, played: 0, won: 0, drawn: 0, lost: 0, goals_for: 0, goals_against: 0, goal_difference: 0, points: 0 },
    { table: "standings", season: "2026/27-dry-run", team_slug: "avanguardia-fc", rank: 4, played: 1, won: 0, drawn: 0, lost: 1, goals_for: 1, goals_against: 2, goal_difference: -1, points: 0 },
  ];

  return {
    teams,
    matches,
    standings,
    providerImportLogPreview: {
      table: "provider_import_logs",
      provider_candidate: "stable_provider",
      competition_slug: competitionSlug,
      mode: "dry_run",
      status: "planned",
    },
  };
}

function collectSafetyChecks(providers: ProviderState[]): SafetyCheck[] {
  return [
    {
      name: "stable_provider_off",
      ok: !isProviderActive(providers, "stable_provider"),
      detail: "stable_provider deve restare spento in D.3.",
    },
    {
      name: "the_stats_api_off",
      ok: !isProviderActive(providers, "the_stats_api"),
      detail: "TheStatsAPI non deve essere chiamato.",
    },
    {
      name: "api_football_off",
      ok: !isProviderActive(providers, "api_football"),
      detail: "API-Football non deve essere chiamato.",
    },
    {
      name: "apify_off",
      ok: !isProviderActive(providers, "apify_sofascore"),
      detail: "Apify/SofaScore fuori scope per stable provider dry-run.",
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

function collectWarnings(competition: CompetitionState | undefined, safetyChecks: SafetyCheck[]): DryRunWarning[] {
  const warnings: DryRunWarning[] = [];

  if (!competition) {
    warnings.push({ code: "COMPETITION_NOT_FOUND", message: "Competizione non trovata nel catalogo locale." });
  } else if (competition.trackingLevel !== "full_official") {
    warnings.push({
      code: "COMPETITION_NOT_FULL_OFFICIAL",
      message: `${competition.id} ha tracking_level=${competition.trackingLevel}; stable provider previsto solo per full_official.`,
    });
  }

  for (const check of safetyChecks) {
    if (!check.ok) warnings.push({ code: `SAFETY_${check.name.toUpperCase()}`, message: check.detail });
  }

  return warnings;
}

function formatSafetyChecks(checks: SafetyCheck[]): string {
  return checks.map((check) => `${check.name}:${check.ok ? "ok" : "fail"}`).join(", ");
}

function main(): void {
  const competitionSlug = getCompetitionSlug();
  const providers = parseProviders(readProjectFile("config/providers.ts"));
  const competitions = parseCompetitions(readProjectFile("config/competitions.ts"));
  const competition = competitions.find((item) => item.id === competitionSlug);
  const payload = buildMockStablePayload(competitionSlug);
  const safetyChecks = collectSafetyChecks(providers);
  const warnings = collectWarnings(competition, safetyChecks);
  const plannedTables = ["teams", "matches", "standings", "provider_import_logs"];

  console.info("Regista Avanzato — Stable Provider Dry Run");
  console.info(`competition_slug=${competitionSlug}`);
  console.info(`competition_name=${competition?.name ?? "not_found"}`);
  console.info(`tracking_level=${competition?.trackingLevel ?? "unknown"}`);
  console.info("provider_candidate=stable_provider");
  console.info("external_provider_candidates=the_stats_api/api_football");
  console.info("mode=dry_run");
  console.info("fetch_external=false");
  console.info("db_write=false");
  console.info("env_values_read=0");
  console.info("tokens_printed=0");
  console.info(`planned_tables=${plannedTables.join(",")}`);
  console.info("");
  console.info(`mapped_teams_count=${payload.teams.length}`);
  console.info(`mapped_matches_count=${payload.matches.length}`);
  console.info(`mapped_standings_count=${payload.standings.length}`);
  console.info(`provider_import_log_preview=${payload.providerImportLogPreview.table}:${payload.providerImportLogPreview.status}`);
  console.info("");
  console.info(`teams=${payload.teams.map((team) => `${team.slug}:${team.api_team_id}`).join(",")}`);
  console.info(`matches=${payload.matches.map((match) => `${match.api_match_id}:${match.home_team_slug}-${match.away_team_slug}:${match.status}`).join(",")}`);
  console.info(`standings=${payload.standings.map((standing) => `${standing.rank}.${standing.team_slug}:${standing.points}`).join(",")}`);
  console.info("");
  console.info(`safety_checks=${formatSafetyChecks(safetyChecks)}`);
  console.info(`warnings=${warnings.length}`);
  for (const warning of warnings) console.info(`warning=${warning.code} | ${warning.message}`);
  console.info("");
  console.info("confirmation=no_external_provider_calls,no_apify_calls,no_sofascore_calls,no_scraping,no_db_writes,no_env_output");
}

if (!existsSync(join(process.cwd(), "config/providers.ts"))) {
  throw new Error("Run this script from the project root.");
}

main();
