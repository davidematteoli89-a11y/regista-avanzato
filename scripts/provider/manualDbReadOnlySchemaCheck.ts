import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";

type CheckStatus = "ready" | "needs_review" | "blocked";

type SanitizedQueryResult = {
  data: unknown;
  error: { code?: string } | null;
};

type LimitBuilder = {
  limit(count: number): Promise<SanitizedQueryResult>;
};

type FilterBuilder = LimitBuilder & {
  in(column: string, values: string[]): LimitBuilder;
};

type ReadOnlySupabaseClient = {
  from(table: string): {
    select(columns: string): FilterBuilder;
  };
};

type TableCheck = {
  table: "competitions" | "teams" | "standings";
  confirmed: boolean;
  readBlocked: boolean;
  errorCode: string;
  columnsConfirmedCount: number;
  missingColumnsCount: number;
  sampleRowsReadCount: number;
  status: CheckStatus;
};

const LOCAL_ENV_ALLOWLIST = new Set(["NEXT_PUBLIC_SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_ANON_KEY"]);

const COMPETITION_COLUMNS = [
  "id",
  "internal_key",
  "api_competition_id",
  "slug",
  "name",
  "country",
  "continent",
  "season",
  "tracking_level",
  "update_frequency",
  "status",
  "visibility",
] as const;

const TEAM_COLUMNS = [
  "id",
  "competition_id",
  "source_provider_id",
  "api_team_id",
  "slug",
  "name",
  "country",
] as const;

const STANDING_COLUMNS = [
  "id",
  "competition_id",
  "team_id",
  "source_provider_id",
  "season",
  "stage",
  "matchday",
  "rank",
  "played",
  "won",
  "drawn",
  "lost",
  "goals_for",
  "goals_against",
  "goal_difference",
  "points",
] as const;

const PUBLIC_COMPETITION_VIEW_COLUMNS = [
  "id",
  "internal_key",
  "slug",
  "name",
  "country",
  "continent",
  "season",
] as const;

const PUBLIC_TEAM_VIEW_COLUMNS = [
  "id",
  "competition_id",
  "slug",
  "name",
  "country",
] as const;

const PUBLIC_STANDING_VIEW_COLUMNS = [
  "id",
  "competition_id",
  "team_id",
  "season",
  "stage",
  "matchday",
  "rank",
  "played",
  "won",
  "drawn",
  "lost",
  "goals_for",
  "goals_against",
  "goal_difference",
  "points",
] as const;

function parseLocalEnvLine(line: string): { name: string; value: string } | null {
  const trimmed = line.trim();

  if (!trimmed || trimmed.startsWith("#")) return null;

  const separatorIndex = trimmed.indexOf("=");
  if (separatorIndex <= 0) return null;

  const name = trimmed.slice(0, separatorIndex).trim();
  if (!LOCAL_ENV_ALLOWLIST.has(name)) return null;

  const rawValue = trimmed.slice(separatorIndex + 1).trim();
  const value =
    (rawValue.startsWith("\"") && rawValue.endsWith("\"")) || (rawValue.startsWith("'") && rawValue.endsWith("'"))
      ? rawValue.slice(1, -1)
      : rawValue;

  return { name, value };
}

function readPublicEnvValue(name: "NEXT_PUBLIC_SUPABASE_URL" | "NEXT_PUBLIC_SUPABASE_ANON_KEY"): string | undefined {
  const existingValue = process.env[name];
  if (existingValue) return existingValue;

  const localEnvPath = join(process.cwd(), ".env.local");
  if (!existsSync(localEnvPath)) return undefined;

  const localEnvContent = readFileSync(localEnvPath, "utf8");

  for (const line of localEnvContent.split(/\r?\n/)) {
    const parsedLine = parseLocalEnvLine(line);

    if (parsedLine?.name === name) {
      return parsedLine.value;
    }
  }

  return undefined;
}

function statusForTable(confirmed: boolean, missingColumnsCount: number, readBlocked: boolean): CheckStatus {
  if (readBlocked) return "needs_review";
  if (!confirmed) return "blocked";
  if (missingColumnsCount > 0) return "blocked";
  return "ready";
}

function isSchemaMissingErrorCode(code: string | undefined): boolean {
  return code === "PGRST204" || code === "PGRST205";
}

function statusFromConfidence(...statuses: CheckStatus[]): CheckStatus {
  if (statuses.includes("blocked")) return "blocked";
  if (statuses.includes("needs_review")) return "needs_review";
  return "ready";
}

function printUnavailable(): void {
  console.info("Regista Avanzato — Manual DB Read-Only Schema Check");
  console.info("mode=manual_db_read_only_schema_check");
  console.info("external_fetch=false");
  console.info("provider_fetch=false");
  console.info("db_read=false");
  console.info("db_write=false");
  console.info("service_role_used=false");
  console.info("token_printed=false");
  console.info("public_env_present=false");
  console.info("tables_checked=competitions,teams,standings");
  console.info("competitions_table_confirmed=false");
  console.info("teams_table_confirmed=false");
  console.info("standings_table_confirmed=false");
  console.info("base_table_read_blocked_count=0");
  console.info("public_views_confirmed_count=0");
  console.info("competitions_columns_confirmed_count=0");
  console.info("teams_columns_confirmed_count=0");
  console.info("standings_columns_confirmed_count=0");
  console.info("missing_columns_count=0");
  console.info("fk_or_reference_confidence=blocked");
  console.info("dedup_key_confidence=needs_review");
  console.info("sample_rows_read_count=0");
  console.info("payload_printed=false");
  console.info("next_write_allowed=false");
  console.info("blocked_real_execution=true");
  console.info("confirmation=blocked_no_public_supabase_env,no_service_role,no_db_write,no_provider_fetch,no_env_output");
}

async function checkTable(
  supabase: ReadOnlySupabaseClient,
  table: TableCheck["table"],
  columns: readonly string[],
): Promise<TableCheck> {
  const { data, error } = await supabase
    .from(table)
    .select(columns.join(","))
    .limit(1);

  const confirmed = !error;
  const readBlocked = Boolean(error?.code === "42501" || error?.code === "PGRST301");
  const missingColumnsCount = confirmed || readBlocked || !isSchemaMissingErrorCode(error?.code) ? 0 : columns.length;
  const sampleRowsReadCount = Array.isArray(data) ? data.length : 0;

  return {
    table,
    confirmed,
    readBlocked,
    errorCode: error?.code ?? "none",
    columnsConfirmedCount: confirmed ? columns.length : 0,
    missingColumnsCount,
    sampleRowsReadCount,
    status: statusForTable(confirmed, missingColumnsCount, readBlocked),
  };
}

async function checkPublicView(
  supabase: ReadOnlySupabaseClient,
  viewName: "public_competitions" | "public_teams" | "public_standings",
  columns: readonly string[],
): Promise<{ confirmed: boolean; columnsConfirmedCount: number; sampleRowsReadCount: number }> {
  const { data, error } = await supabase
    .from(viewName)
    .select(columns.join(","))
    .limit(1);

  return {
    confirmed: !error,
    columnsConfirmedCount: error ? 0 : columns.length,
    sampleRowsReadCount: Array.isArray(data) ? data.length : 0,
  };
}

async function countFixtureLookupMatches(
  supabase: ReadOnlySupabaseClient,
  fixtureCompetitions: { provider_competition_id: string }[],
  fixtureTeams: { provider_team_id: string }[],
): Promise<{ competitionMatches: number; teamMatches: number }> {
  const competitionIds = fixtureCompetitions.map((competition) => competition.provider_competition_id).filter(Boolean);
  const teamIds = fixtureTeams.map((team) => team.provider_team_id).filter(Boolean);
  let competitionMatches = 0;
  let teamMatches = 0;

  if (competitionIds.length > 0) {
    const { data } = await supabase
      .from("competitions")
      .select("id,api_competition_id")
      .in("api_competition_id", competitionIds)
      .limit(10);

    competitionMatches = Array.isArray(data) ? data.length : 0;
  }

  if (teamIds.length > 0) {
    const { data } = await supabase
      .from("teams")
      .select("id,api_team_id,competition_id")
      .in("api_team_id", teamIds)
      .limit(20);

    teamMatches = Array.isArray(data) ? data.length : 0;
  }

  return { competitionMatches, teamMatches };
}

async function main(): Promise<void> {
  const supabaseUrl = readPublicEnvValue("NEXT_PUBLIC_SUPABASE_URL");
  const supabaseAnonKey = readPublicEnvValue("NEXT_PUBLIC_SUPABASE_ANON_KEY");

  if (!supabaseUrl || !supabaseAnonKey) {
    printUnavailable();
    return;
  }

  const modulePath = new URL("../../lib/provider/manualFixtures.ts", import.meta.url).href;
  const { getManualFixturePreview } = (await import(modulePath)) as typeof import("../../lib/provider/manualFixtures");
  const preview = getManualFixturePreview();

  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
      detectSessionInUrl: false,
    },
  }) as unknown as ReadOnlySupabaseClient;

  const [competitions, teams, standings] = await Promise.all([
    checkTable(supabase, "competitions", COMPETITION_COLUMNS),
    checkTable(supabase, "teams", TEAM_COLUMNS),
    checkTable(supabase, "standings", STANDING_COLUMNS),
  ]);
  const [publicCompetitions, publicTeams, publicStandings] = await Promise.all([
    checkPublicView(supabase, "public_competitions", PUBLIC_COMPETITION_VIEW_COLUMNS),
    checkPublicView(supabase, "public_teams", PUBLIC_TEAM_VIEW_COLUMNS),
    checkPublicView(supabase, "public_standings", PUBLIC_STANDING_VIEW_COLUMNS),
  ]);

  const lookupMatches = await countFixtureLookupMatches(supabase, preview.competitions, preview.teams);
  const allChecks = [competitions, teams, standings];
  const dbConfirmedTablesCount = allChecks.filter((check) => check.confirmed).length;
  const dbConfirmedColumnsCount = allChecks.reduce((total, check) => total + check.columnsConfirmedCount, 0);
  const dbMissingColumnsCount = allChecks.reduce((total, check) => total + check.missingColumnsCount, 0);
  const baseTableReadBlockedCount = allChecks.filter((check) => check.readBlocked).length;
  const publicViews = [publicCompetitions, publicTeams, publicStandings];
  const publicViewsConfirmedCount = publicViews.filter((check) => check.confirmed).length;
  const publicViewColumnsConfirmedCount = publicViews.reduce((total, check) => total + check.columnsConfirmedCount, 0);
  const sampleRowsReadCount =
    allChecks.reduce((total, check) => total + check.sampleRowsReadCount, 0) +
    publicViews.reduce((total, check) => total + check.sampleRowsReadCount, 0);
  const lookupNeedsReview = lookupMatches.competitionMatches < preview.competitionsCount || lookupMatches.teamMatches < preview.teamsCount;
  const fkOrReferenceConfidence: CheckStatus = statusFromConfidence(
    competitions.status,
    teams.status,
    standings.status,
    lookupNeedsReview ? "needs_review" : "ready",
  );
  const dedupKeyConfidence: CheckStatus =
    dbConfirmedTablesCount === 3 && dbMissingColumnsCount === 0
      ? "needs_review"
      : publicViewsConfirmedCount > 0
        ? "needs_review"
        : "blocked";
  const finalCompetitionsStatus = competitions.status === "blocked" && publicCompetitions.confirmed ? "needs_review" : competitions.status;
  const finalTeamsStatus = teams.status === "blocked" && publicTeams.confirmed ? "needs_review" : teams.status;
  const finalStandingsStatus = standings.status === "blocked" && publicStandings.confirmed ? "needs_review" : standings.status;

  console.info("Regista Avanzato — Manual DB Read-Only Schema Check");
  console.info("mode=manual_db_read_only_schema_check");
  console.info("external_fetch=false");
  console.info("provider_fetch=false");
  console.info("db_read=true");
  console.info("db_write=false");
  console.info("service_role_used=false");
  console.info("token_printed=false");
  console.info("public_env_present=true");
  console.info("tables_checked=competitions,teams,standings");
  console.info(`competitions_table_confirmed=${competitions.confirmed}`);
  console.info(`teams_table_confirmed=${teams.confirmed}`);
  console.info(`standings_table_confirmed=${standings.confirmed}`);
  console.info(`competitions_read_error_code=${competitions.errorCode}`);
  console.info(`teams_read_error_code=${teams.errorCode}`);
  console.info(`standings_read_error_code=${standings.errorCode}`);
  console.info(`base_table_read_blocked_count=${baseTableReadBlockedCount}`);
  console.info(`public_views_confirmed_count=${publicViewsConfirmedCount}`);
  console.info(`public_view_columns_confirmed_count=${publicViewColumnsConfirmedCount}`);
  console.info(`competitions_columns_confirmed_count=${competitions.columnsConfirmedCount}`);
  console.info(`teams_columns_confirmed_count=${teams.columnsConfirmedCount}`);
  console.info(`standings_columns_confirmed_count=${standings.columnsConfirmedCount}`);
  console.info(`db_confirmed_tables_count=${dbConfirmedTablesCount}`);
  console.info(`db_confirmed_columns_count=${dbConfirmedColumnsCount}`);
  console.info(`missing_columns_count=${dbMissingColumnsCount}`);
  console.info(`fixture_competition_lookup_matches=${lookupMatches.competitionMatches}`);
  console.info(`fixture_team_lookup_matches=${lookupMatches.teamMatches}`);
  console.info(`fk_or_reference_confidence=${fkOrReferenceConfidence}`);
  console.info(`dedup_key_confidence=${dedupKeyConfidence}`);
  console.info(`competitions_db_status=${finalCompetitionsStatus}`);
  console.info(`teams_db_status=${finalTeamsStatus}`);
  console.info(`standings_db_status=${finalStandingsStatus}`);
  console.info(`sample_rows_read_count=${sampleRowsReadCount}`);
  console.info("payload_printed=false");
  console.info("next_write_allowed=false");
  console.info("blocked_real_execution=true");
  console.info("confirmation=select_only,anon_public_client,no_service_role,no_db_write,no_provider_fetch,no_payload_output");
}

await main();
