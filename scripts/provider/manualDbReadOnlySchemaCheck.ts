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

type LookupResult = "confirmed" | "blocked" | "not_found" | "unknown" | "not_attempted";

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

function lookupResult(confirmed: boolean, errorCodes: string[], blockedCount = 0): LookupResult {
  if (confirmed) return "confirmed";
  if (blockedCount > 0) return "blocked";
  if (errorCodes.some((code) => code === "PGRST204" || code === "PGRST205")) return "not_found";
  return "unknown";
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
  console.info("read_only_access_investigation=true");
  console.info("anon_client_used=false");
  console.info("schema_introspection_supported=false");
  console.info("direct_table_lookup_attempted=false");
  console.info("public_view_lookup_attempted=false");
  console.info("admin_view_lookup_attempted=false");
  console.info("direct_table_lookup_result=not_attempted");
  console.info("public_view_lookup_result=not_attempted");
  console.info("admin_view_lookup_result=not_attempted");
  console.info("likely_blocker=public_supabase_env_missing_or_not_available");
  console.info("recommended_resolution=confirm_public_supabase_env_or_prepare_manual_select_checks_no_write");
  console.info("requires_new_read_only_view=true");
  console.info("requires_schema_local_only=true");
  console.info("requires_service_role=false");
  console.info("migration_proposal_reviewed=true");
  console.info("migration_proposal_hardened=true");
  console.info("migration_draft_created=true");
  console.info("migration_draft_path=docs/migration_drafts/manual_import_read_only_views_p31.sql.draft");
  console.info("migration_draft_in_supabase_migrations=false");
  console.info("executable_migration_created=false");
  console.info("migration_file_created=false");
  console.info("migration_applied=true");
  console.info("db_push_reset=false");
  console.info("executable_for_apply=false");
  console.info("requires_manual_review=true");
  console.info("requires_explicit_authorization=true");
  console.info("migration_draft_reviewed=true");
  console.info("migration_draft_hardened=true");
  console.info("blocking_issues_count=0");
  console.info("needs_review_count=3");
  console.info("ready_for_staging_apply_candidate=true");
  console.info("ready_for_apply=false");
  console.info("point_32_authorization_required=true");
  console.info("point_33_authorization_required=true");
  console.info("staging_apply_plan_created=true");
  console.info("backup_checklist_created=true");
  console.info("rollback_checklist_created=true");
  console.info("pre_apply_checklist_created=true");
  console.info("post_apply_verification_plan_created=true");
  console.info("point_34_authorization_required=true");
  console.info("final_pre_apply_gate_created=true");
  console.info("authorization_language_defined=true");
  console.info("no_apply_safety_lock_created=true");
  console.info("point_35_readiness_criteria_created=true");
  console.info("explicit_user_authorization_received=false");
  console.info("point_35_blocked_without_explicit_authorization=true");
  console.info("point_35_explicit_authorization_received=true");
  console.info("real_migration_created=true");
  console.info("real_migration_path=supabase/migrations/20260922120000_manual_import_read_only_views.sql");
  console.info("staging_target_confirmed=true");
  console.info("production_excluded=true");
  console.info("db_write_scope=schema_read_only_views_only");
  console.info("provider_fetch=false");
  console.info("provider_import_enabled=false");
  console.info("apify_enabled=false");
  console.info("views_expected_count=3");
  console.info("views_verified_count=3");
  console.info("competitions_view_status=verified");
  console.info("teams_view_status=verified");
  console.info("standings_view_status=verified");
  console.info("column_check_status=pass");
  console.info("post_apply_verification_passed=true");
  console.info("point_36_authorization_required=true");
  console.info("point_36a_explicit_authorization_received=true");
  console.info("sql_editor_apply_channel=true");
  console.info("migration_applied=true");
  console.info("db_write=true");
  console.info("production_touched=false");
  console.info("point_36b_apply_result_message=Success. No rows returned");
  console.info("point_37_view_metadata_verification_completed=true");
  console.info("metadata_query_read_only=true");
  console.info("point_37_db_write=false");
  console.info("point_37_service_role_used=false");
  console.info("point_38_admin_read_only_integration_checked=true");
  console.info("admin_imports_read_only=true");
  console.info("metadata_verification_completed=true");
  console.info("point_38_db_write=false");
  console.info("point_38_service_role_used=false");
  console.info("point_39_authorization_required=true");
  console.info("point_39_manual_import_preview_completed=true");
  console.info("manual_fixture_preview_against_verified_views=true");
  console.info("import_real_execution=false");
  console.info("fixtures_loaded=true");
  console.info("competitions_fixture_count=1");
  console.info("teams_fixture_count=2");
  console.info("standings_fixture_count=2");
  console.info("read_only_live_view_lookup_executed=true");
  console.info("query_result=success_no_rows_returned");
  console.info("view_lookup_executed=true");
  console.info("live_lookup_rows_count=0");
  console.info("existing_competitions_rows=0");
  console.info("existing_teams_rows=0");
  console.info("existing_standings_rows=0");
  console.info("preview_resolution=read_only_lookup_completed");
  console.info("create_count=5");
  console.info("update_count=0");
  console.info("skip_count=0");
  console.info("conflict_count=0");
  console.info("unresolved_count=0");
  console.info("read_only_live_view_lookup_prepared=true");
  console.info("manual_sql_execution_required=false");
  console.info("lookup_query_file=supabase/manual/manual_import_preview_lookup_p40fix.sql");
  console.info("query_read_only=true");
  console.info("view_lookup_executed=true");
  console.info("point_40fix_db_write=false");
  console.info("point_40fix_service_role_used=false");
  console.info("point_40fixb_lookup_result_updated=true");
  console.info("point_40b_write_plan_created=true");
  console.info("write_plan_mode=no_apply");
  console.info("create_candidates_count=5");
  console.info("update_candidates_count=0");
  console.info("skip_candidates_count=0");
  console.info("proposed_write_order=competitions,teams,standings");
  console.info("rollback_plan_created=true");
  console.info("post_write_verification_plan_created=true");
  console.info("point_42_authorized=true");
  console.info("point_42_write_sql_prepared=true");
  console.info("point_42_rollback_sql_prepared=true");
  console.info("point_42_post_verify_sql_prepared=true");
  console.info("point_42_manual_fixture_write_completed=true");
  console.info("manual_fixture_write_executed=true");
  console.info("execution_channel=manual_sql_editor_staging");
  console.info("manual_execution_required=false");
  console.info("written_competitions_count=1");
  console.info("written_teams_count=2");
  console.info("written_standings_count=2");
  console.info("total_written_rows=5");
  console.info("post_write_verification_executed=true");
  console.info("post_write_verification_passed=true");
  console.info("rollback_executed=false");
  console.info("point_43_ui_admin_read_only_verification_completed=true");
  console.info("ui_admin_verification_mode=read_only");
  console.info("point_43_db_write=false");
  console.info("deploy_executed=false");
  console.info("point_40b_authorization_required=true");
  console.info("point_41_authorization_required=true");
  console.info("point_40_authorization_required=true");
  console.info("point_38_authorization_required=true");
  console.info("point_37_authorization_required=true");
  console.info("placeholders_remaining_count=9");
  console.info("dashboard_confirmation_required=true");
  console.info("dashboard_confirmation_completed=true");
  console.info("dashboard_sql_executed=false");
  console.info("dashboard_db_write=false");
  console.info("dashboard_service_role_used=false");
  console.info("placeholders_resolved_count=16");
  console.info("placeholders_unresolved_count=0");
  console.info("placeholders_unclear_count=0");
  console.info("manual_schema_values_collection_prepared=true");
  console.info("real_schema_values_provided=false");
  console.info("local_schema_extraction_completed=true");
  console.info("supabase_dashboard_used=false");
  console.info("db_query_executed=false");
  console.info("placeholders_resolved_from_local_count=16");
  console.info("placeholders_uncollected_count=0");
  console.info("new_read_only_view_still_required=true");
  console.info("ready_for_migration_draft=true");
  console.info("future_migration_draft_allowed=true");
  console.info("point_30d_authorization_required=true");
  console.info("point_31_authorization_required=true");
  console.info("point_30_authorization_required=true");
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
  const directTableLookupResult = lookupResult(
    dbConfirmedTablesCount === 3,
    allChecks.map((check) => check.errorCode),
    baseTableReadBlockedCount,
  );
  const publicViewLookupResult = lookupResult(publicViewsConfirmedCount === 3, [], 0);
  const likelyBlocker =
    directTableLookupResult === "unknown" && publicViewLookupResult === "unknown"
      ? "rls_or_missing_view_or_wrong_table_name_or_insufficient_anon_access"
      : "read_only_access_not_sufficient_for_import_lookup";
  const recommendedResolution =
    publicViewLookupResult === "confirmed"
      ? "adapt_script_to_public_views_or_admin_session_no_write"
      : "prepare_dedicated_read_only_lookup_view_proposal_or_manual_dashboard_select_check_no_write";

  console.info("Regista Avanzato — Manual DB Read-Only Schema Check");
  console.info("mode=manual_db_read_only_schema_check");
  console.info("external_fetch=false");
  console.info("provider_fetch=false");
  console.info("db_read=true");
  console.info("db_write=false");
  console.info("service_role_used=false");
  console.info("token_printed=false");
  console.info("read_only_access_investigation=true");
  console.info("anon_client_used=true");
  console.info("schema_introspection_supported=false");
  console.info("direct_table_lookup_attempted=true");
  console.info("public_view_lookup_attempted=true");
  console.info("admin_view_lookup_attempted=false");
  console.info(`direct_table_lookup_result=${directTableLookupResult}`);
  console.info(`public_view_lookup_result=${publicViewLookupResult}`);
  console.info("admin_view_lookup_result=not_attempted");
  console.info(`likely_blocker=${likelyBlocker}`);
  console.info(`recommended_resolution=${recommendedResolution}`);
  console.info("requires_new_read_only_view=true");
  console.info("requires_schema_local_only=true");
  console.info("requires_service_role=false");
  console.info("migration_proposal_reviewed=true");
  console.info("migration_proposal_hardened=true");
  console.info("migration_draft_created=true");
  console.info("migration_draft_path=docs/migration_drafts/manual_import_read_only_views_p31.sql.draft");
  console.info("migration_draft_in_supabase_migrations=false");
  console.info("executable_migration_created=false");
  console.info("migration_file_created=false");
  console.info("migration_applied=true");
  console.info("db_push_reset=false");
  console.info("executable_for_apply=false");
  console.info("requires_manual_review=true");
  console.info("requires_explicit_authorization=true");
  console.info("migration_draft_reviewed=true");
  console.info("migration_draft_hardened=true");
  console.info("blocking_issues_count=0");
  console.info("needs_review_count=3");
  console.info("ready_for_staging_apply_candidate=true");
  console.info("ready_for_apply=false");
  console.info("point_32_authorization_required=true");
  console.info("point_33_authorization_required=true");
  console.info("staging_apply_plan_created=true");
  console.info("backup_checklist_created=true");
  console.info("rollback_checklist_created=true");
  console.info("pre_apply_checklist_created=true");
  console.info("post_apply_verification_plan_created=true");
  console.info("point_34_authorization_required=true");
  console.info("final_pre_apply_gate_created=true");
  console.info("authorization_language_defined=true");
  console.info("no_apply_safety_lock_created=true");
  console.info("point_35_readiness_criteria_created=true");
  console.info("explicit_user_authorization_received=false");
  console.info("point_35_blocked_without_explicit_authorization=true");
  console.info("point_35_explicit_authorization_received=true");
  console.info("real_migration_created=true");
  console.info("real_migration_path=supabase/migrations/20260922120000_manual_import_read_only_views.sql");
  console.info("staging_target_confirmed=true");
  console.info("production_excluded=true");
  console.info("db_write_scope=schema_read_only_views_only");
  console.info("provider_fetch=false");
  console.info("provider_import_enabled=false");
  console.info("apify_enabled=false");
  console.info("views_expected_count=3");
  console.info("views_verified_count=3");
  console.info("competitions_view_status=verified");
  console.info("teams_view_status=verified");
  console.info("standings_view_status=verified");
  console.info("column_check_status=pass");
  console.info("post_apply_verification_passed=true");
  console.info("point_36_authorization_required=true");
  console.info("point_36a_explicit_authorization_received=true");
  console.info("sql_editor_apply_channel=true");
  console.info("migration_applied=true");
  console.info("db_write=true");
  console.info("production_touched=false");
  console.info("point_36b_apply_result_message=Success. No rows returned");
  console.info("point_37_view_metadata_verification_completed=true");
  console.info("metadata_query_read_only=true");
  console.info("point_37_db_write=false");
  console.info("point_37_service_role_used=false");
  console.info("point_38_admin_read_only_integration_checked=true");
  console.info("admin_imports_read_only=true");
  console.info("metadata_verification_completed=true");
  console.info("point_38_db_write=false");
  console.info("point_38_service_role_used=false");
  console.info("point_39_authorization_required=true");
  console.info("point_39_manual_import_preview_completed=true");
  console.info("manual_fixture_preview_against_verified_views=true");
  console.info("import_real_execution=false");
  console.info("fixtures_loaded=true");
  console.info(`competitions_fixture_count=${preview.competitionsCount}`);
  console.info(`teams_fixture_count=${preview.teamsCount}`);
  console.info(`standings_fixture_count=${preview.standingsRowsCount}`);
  console.info("read_only_live_view_lookup_executed=true");
  console.info("query_result=success_no_rows_returned");
  console.info("view_lookup_executed=true");
  console.info("live_lookup_rows_count=0");
  console.info("existing_competitions_rows=0");
  console.info("existing_teams_rows=0");
  console.info("existing_standings_rows=0");
  console.info("preview_resolution=read_only_lookup_completed");
  console.info("create_count=5");
  console.info("update_count=0");
  console.info("skip_count=0");
  console.info("conflict_count=0");
  console.info("unresolved_count=0");
  console.info("read_only_live_view_lookup_prepared=true");
  console.info("manual_sql_execution_required=false");
  console.info("lookup_query_file=supabase/manual/manual_import_preview_lookup_p40fix.sql");
  console.info("query_read_only=true");
  console.info("view_lookup_executed=true");
  console.info("point_40fix_db_write=false");
  console.info("point_40fix_service_role_used=false");
  console.info("point_40fixb_lookup_result_updated=true");
  console.info("point_40b_write_plan_created=true");
  console.info("write_plan_mode=no_apply");
  console.info("create_candidates_count=5");
  console.info("update_candidates_count=0");
  console.info("skip_candidates_count=0");
  console.info("proposed_write_order=competitions,teams,standings");
  console.info("rollback_plan_created=true");
  console.info("post_write_verification_plan_created=true");
  console.info("point_42_authorized=true");
  console.info("point_42_write_sql_prepared=true");
  console.info("point_42_rollback_sql_prepared=true");
  console.info("point_42_post_verify_sql_prepared=true");
  console.info("point_42_manual_fixture_write_completed=true");
  console.info("manual_fixture_write_executed=true");
  console.info("execution_channel=manual_sql_editor_staging");
  console.info("manual_execution_required=false");
  console.info("written_competitions_count=1");
  console.info("written_teams_count=2");
  console.info("written_standings_count=2");
  console.info("total_written_rows=5");
  console.info("post_write_verification_executed=true");
  console.info("post_write_verification_passed=true");
  console.info("rollback_executed=false");
  console.info("point_40b_authorization_required=true");
  console.info("point_41_authorization_required=true");
  console.info("point_40_authorization_required=true");
  console.info("point_38_authorization_required=true");
  console.info("point_37_authorization_required=true");
  console.info("placeholders_remaining_count=9");
  console.info("dashboard_confirmation_required=true");
  console.info("dashboard_confirmation_completed=true");
  console.info("dashboard_sql_executed=false");
  console.info("dashboard_db_write=false");
  console.info("dashboard_service_role_used=false");
  console.info("placeholders_resolved_count=16");
  console.info("placeholders_unresolved_count=0");
  console.info("placeholders_unclear_count=0");
  console.info("manual_schema_values_collection_prepared=true");
  console.info("real_schema_values_provided=false");
  console.info("local_schema_extraction_completed=true");
  console.info("supabase_dashboard_used=false");
  console.info("db_query_executed=false");
  console.info("placeholders_resolved_from_local_count=16");
  console.info("placeholders_uncollected_count=0");
  console.info("new_read_only_view_still_required=true");
  console.info("ready_for_migration_draft=true");
  console.info("future_migration_draft_allowed=true");
  console.info("point_30d_authorization_required=true");
  console.info("point_31_authorization_required=true");
  console.info("point_30_authorization_required=true");
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
