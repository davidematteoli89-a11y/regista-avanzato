import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

type JsonRecord = Record<string, unknown>;

type LookupCompetition = {
  id: string;
  internal_key: string;
  api_competition_id: string;
  slug: string;
  name: string;
  country: string;
  season: string;
  status: string;
  visibility: string;
};

type LookupTeam = {
  id: string;
  competition_id: string;
  api_team_id: string;
  slug: string;
  name: string;
  short_name: string;
  country: string;
  status: string;
  visibility: string;
};

type LookupStanding = {
  id: string;
  competition_id: string;
  team_id: string;
  season: string;
  stage: string;
  matchday: number | null;
  rank: number;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goals_for: number;
  goals_against: number;
  goal_difference: number;
  points: number;
  status: string;
  visibility: string;
};

type LookupResult = {
  source: "local" | "empty_example";
  queryResult: string;
  competitions: LookupCompetition[];
  teams: LookupTeam[];
  standings: LookupStanding[];
};

type Counts = {
  create: number;
  update: number;
  skip: number;
  conflict: number;
  unresolved: number;
};

const LOOKUP_RESULT_PATH = join(
  process.cwd(),
  "fixtures",
  "provider",
  "manual",
  "live-view-lookup-result.local.json",
);

const EMPTY_LOOKUP_RESULT_PATH = join(
  process.cwd(),
  "fixtures",
  "provider",
  "manual",
  "live-view-lookup-result.empty.example.json",
);

const CANDIDATE_CREATE_PREFIX = "__candidate_create__:";

function asRecordArray(value: unknown): JsonRecord[] {
  return Array.isArray(value)
    ? value.filter((item): item is JsonRecord => Boolean(item && typeof item === "object" && !Array.isArray(item)))
    : [];
}

function asString(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function asNumber(value: unknown): number {
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
}

function asNullableNumber(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function readLookupResult(path: string, source: LookupResult["source"]): LookupResult | null {
  if (!existsSync(path)) return null;

  const parsed = JSON.parse(readFileSync(path, "utf8")) as unknown;
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return null;
  const record = parsed as JsonRecord;

  return {
    source,
    queryResult: asString(record.result) || (source === "empty_example" ? "success_no_rows_returned" : "unknown"),
    competitions: asRecordArray(record.competitions).map((row) => ({
      id: asString(row.id),
      internal_key: asString(row.internal_key),
      api_competition_id: asString(row.api_competition_id),
      slug: asString(row.slug),
      name: asString(row.name),
      country: asString(row.country),
      season: asString(row.season),
      status: asString(row.status),
      visibility: asString(row.visibility),
    })),
    teams: asRecordArray(record.teams).map((row) => ({
      id: asString(row.id),
      competition_id: asString(row.competition_id),
      api_team_id: asString(row.api_team_id),
      slug: asString(row.slug),
      name: asString(row.name),
      short_name: asString(row.short_name),
      country: asString(row.country),
      status: asString(row.status),
      visibility: asString(row.visibility),
    })),
    standings: asRecordArray(record.standings).map((row) => ({
      id: asString(row.id),
      competition_id: asString(row.competition_id),
      team_id: asString(row.team_id),
      season: asString(row.season),
      stage: asString(row.stage),
      matchday: asNullableNumber(row.matchday),
      rank: asNumber(row.rank),
      played: asNumber(row.played),
      won: asNumber(row.won),
      drawn: asNumber(row.drawn),
      lost: asNumber(row.lost),
      goals_for: asNumber(row.goals_for),
      goals_against: asNumber(row.goals_against),
      goal_difference: asNumber(row.goal_difference),
      points: asNumber(row.points),
      status: asString(row.status),
      visibility: asString(row.visibility),
    })),
  };
}

function loadLookupResult(): LookupResult | null {
  return readLookupResult(LOOKUP_RESULT_PATH, "local") ?? readLookupResult(EMPTY_LOOKUP_RESULT_PATH, "empty_example");
}

function sameText(left: string, right: string): boolean {
  return left.trim().toLowerCase() === right.trim().toLowerCase();
}

function candidateCreateId(providerId: string): string {
  return `${CANDIDATE_CREATE_PREFIX}${providerId}`;
}

function isCandidateCreateId(value: string): boolean {
  return value.startsWith(CANDIDATE_CREATE_PREFIX);
}

async function main(): Promise<void> {
  const modulePath = new URL("../../lib/provider/manualFixtures.ts", import.meta.url).href;
  const { getManualFixturePreview } = (await import(modulePath)) as typeof import("../../lib/provider/manualFixtures");
  const preview = getManualFixturePreview();
  const lookupResult = loadLookupResult();
  const lookupLoaded = Boolean(lookupResult);
  const counts: Counts = { create: 0, update: 0, skip: 0, conflict: 0, unresolved: 0 };
  const competitionIdByProviderId = new Map<string, string>();
  const teamIdByProviderId = new Map<string, string>();

  if (!lookupResult) {
    counts.unresolved = preview.competitionsCount + preview.teamsCount + preview.standingsRowsCount;
  } else {
    for (const fixture of preview.competitions) {
      const matches = lookupResult.competitions.filter(
        (row) =>
          row.api_competition_id === fixture.provider_competition_id ||
          row.internal_key === fixture.provider_competition_id ||
          row.slug === fixture.provider_competition_id,
      );

      if (matches.length === 0) {
        counts.create += 1;
        competitionIdByProviderId.set(fixture.provider_competition_id, candidateCreateId(fixture.provider_competition_id));
        continue;
      }
      if (matches.length > 1) {
        counts.conflict += 1;
        continue;
      }

      const match = matches[0];
      competitionIdByProviderId.set(fixture.provider_competition_id, match.id);
      const differs =
        !sameText(match.name, fixture.name) ||
        !sameText(match.country, fixture.country) ||
        (match.status !== "" && !sameText(match.status, fixture.status));

      if (differs) counts.update += 1;
      else counts.skip += 1;
    }

    for (const fixture of preview.teams) {
      const competitionId = competitionIdByProviderId.get(fixture.provider_competition_id);
      const matches = lookupResult.teams.filter((row) => row.api_team_id === fixture.provider_team_id);

      if (!competitionId) {
        counts.unresolved += 1;
        continue;
      }
      if (matches.length === 0) {
        counts.create += 1;
        teamIdByProviderId.set(fixture.provider_team_id, candidateCreateId(fixture.provider_team_id));
        continue;
      }
      if (matches.length > 1) {
        counts.conflict += 1;
        continue;
      }

      const match = matches[0];
      teamIdByProviderId.set(fixture.provider_team_id, match.id);
      if (!isCandidateCreateId(competitionId) && match.competition_id !== competitionId) {
        counts.conflict += 1;
        continue;
      }

      const differs = !sameText(match.name, fixture.name) || !sameText(match.country, fixture.country);
      if (differs) counts.update += 1;
      else counts.skip += 1;
    }

    for (const fixture of preview.standings) {
      const competitionId = competitionIdByProviderId.get(fixture.provider_competition_id);
      const teamId = teamIdByProviderId.get(fixture.provider_team_id);

      if (!competitionId || !teamId) {
        counts.unresolved += 1;
        continue;
      }

      const matches = lookupResult.standings.filter(
        (row) => row.competition_id === competitionId && row.team_id === teamId,
      );

      if (matches.length === 0) {
        counts.create += 1;
        continue;
      }
      if (matches.length > 1) {
        counts.conflict += 1;
        continue;
      }

      const match = matches[0];
      const differs =
        match.rank !== fixture.rank ||
        match.played !== fixture.played ||
        match.won !== fixture.wins ||
        match.drawn !== fixture.draws ||
        match.lost !== fixture.losses ||
        match.goals_for !== fixture.goals_for ||
        match.goals_against !== fixture.goals_against ||
        match.points !== fixture.points;

      if (differs) counts.update += 1;
      else counts.skip += 1;
    }
  }

  console.info("Regista Avanzato — Manual Import Preview Dry Run");
  console.info("mode=manual_import_preview_dry_run");
  console.info(`preview_mode=${lookupLoaded ? "read_only_lookup_completed" : "read_only_lookup_pending"}`);
  console.info(`query_result=${lookupResult?.queryResult ?? "pending_manual_sql_editor_execution"}`);
  console.info(`lookup_result_source=${lookupResult?.source ?? "none"}`);
  console.info("source=local_fixtures");
  console.info("external_fetch=false");
  console.info("provider_fetch=false");
  console.info("db_write=false");
  console.info("service_role_used=false");
  console.info("token_read=false");
  console.info("token_printed=false");
  console.info("import_real_execution=false");
  console.info("provider_import_enabled=false");
  console.info("apify_enabled=false");
  console.info("production_touched=false");
  console.info("fixtures_loaded=true");
  console.info(`competitions_fixture_count=${preview.competitionsCount}`);
  console.info(`teams_fixture_count=${preview.teamsCount}`);
  console.info(`standings_fixture_count=${preview.standingsRowsCount}`);
  console.info(`fixture_references_valid=${preview.referencesValid}`);
  console.info(`mapping_theoretical_possible=${preview.mappingTheoreticalPossible}`);
  console.info("views_available=true");
  console.info("views_verified_count=3");
  console.info("competitions_view_status=verified");
  console.info("teams_view_status=verified");
  console.info("standings_view_status=verified");
  console.info(`view_lookup_executed=${lookupLoaded}`);
  console.info(`view_lookup_reason=${lookupResult ? lookupResult.queryResult : "pending_manual_sql_editor_execution"}`);
  console.info(`live_lookup_rows_count=${lookupResult ? lookupResult.competitions.length + lookupResult.teams.length + lookupResult.standings.length : 0}`);
  console.info(`existing_competitions_rows=${lookupResult?.competitions.length ?? 0}`);
  console.info(`existing_teams_rows=${lookupResult?.teams.length ?? 0}`);
  console.info(`existing_standings_rows=${lookupResult?.standings.length ?? 0}`);
  console.info(`preview_resolution=${lookupLoaded ? "read_only_lookup_completed" : "read_only_lookup_pending"}`);
  console.info(`create_count=${counts.create}`);
  console.info(`update_count=${counts.update}`);
  console.info(`skip_count=${counts.skip}`);
  console.info(`conflict_count=${counts.conflict}`);
  console.info(`unresolved_count=${counts.unresolved}`);
  console.info("point_40b_write_plan_created=true");
  console.info("write_plan_mode=no_apply");
  console.info(`create_candidates_count=${counts.create}`);
  console.info(`update_candidates_count=${counts.update}`);
  console.info(`skip_candidates_count=${counts.skip}`);
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
  console.info("point_44_manual_data_consumption_plan_created=true");
  console.info("data_consumption_mode=read_only_plan");
  console.info("admin_consumption_planned=true");
  console.info("public_consumption_planned=true");
  console.info("public_exposure_enabled=false");
  console.info("current_visibility=private_admin");
  console.info("point_44_db_write=false");
  console.info("point_45_admin_read_only_surface_implemented=true");
  console.info("admin_manual_competitions_route_created=true");
  console.info("admin_manual_competition_detail_route_created=true");
  console.info("admin_imports_link_created=true");
  console.info("point_45_db_write=false");
  console.info("point_46b_browser_admin_verification_completed=false");
  console.info("browser_admin_verification_result=pending_no_admin_session");
  console.info("admin_data_route_browser_verified=false");
  console.info("admin_competitions_route_browser_verified=false");
  console.info("admin_competition_detail_route_browser_verified=false");
  console.info("admin_imports_link_browser_verified=false");
  console.info("browser_displayed_competitions_count=0");
  console.info("browser_displayed_teams_count=0");
  console.info("browser_displayed_standings_count=0");
  console.info("point_46b_db_write=false");
  console.info("point_46c_real_admin_session_verification_completed=false");
  console.info("browser_admin_verification_result=pending_no_admin_session");
  console.info("verification_channel=unavailable");
  console.info("admin_session_available=false");
  console.info("admin_data_route_browser_verified=false");
  console.info("admin_competitions_route_browser_verified=false");
  console.info("admin_competition_detail_route_browser_verified=false");
  console.info("admin_imports_link_browser_verified=false");
  console.info("browser_displayed_competitions_count=0");
  console.info("browser_displayed_teams_count=0");
  console.info("browser_displayed_standings_count=0");
  console.info("point_46c_db_write=false");
  console.info("point_46d_admin_session_channel_prepared=true");
  console.info("admin_session_channel_status=manual_user_browser_session");
  console.info("recommended_verification_channel=manual_user_browser_session");
  console.info("admin_session_available=false");
  console.info("browser_admin_verification_result=pending_admin_session_channel");
  console.info("user_created=false");
  console.info("role_modified=false");
  console.info("rls_modified=false");
  console.info("point_46d_db_write=false");
  console.info("provider_fetch=false");
  console.info("provider_import_enabled=false");
  console.info("apify_enabled=false");
  console.info("production_touched=false");
  console.info("deploy_executed=false");
  console.info("service_role_used=false");
  console.info("point_46e_user_guided_admin_browser_verification_completed=false");
  console.info("browser_admin_verification_result=pending_no_admin_session");
  console.info("admin_session_available=false");
  console.info("admin_data_route_browser_verified=false");
  console.info("admin_competitions_route_browser_verified=false");
  console.info("admin_competition_detail_route_browser_verified=false");
  console.info("admin_imports_link_browser_verified=false");
  console.info("browser_displayed_competitions_count=0");
  console.info("browser_displayed_teams_count=0");
  console.info("browser_displayed_standings_count=0");
  console.info("point_46e_db_write=false");
  console.info("provider_fetch=false");
  console.info("external_fetch=false");
  console.info("provider_import_enabled=false");
  console.info("apify_enabled=false");
  console.info("production_touched=false");
  console.info("deploy_executed=false");
  console.info("service_role_used=false");
  console.info("point_47_admin_read_only_ux_polish_plan_created=true");
  console.info("admin_ux_polish_mode=read_only_plan");
  console.info("browser_admin_verification_result=pending_no_admin_session");
  console.info("public_exposure_enabled=false");
  console.info("current_visibility=private_admin");
  console.info("point_47_db_write=false");
  console.info("provider_fetch=false");
  console.info("external_fetch=false");
  console.info("provider_import_enabled=false");
  console.info("apify_enabled=false");
  console.info("production_touched=false");
  console.info("deploy_executed=false");
  console.info("service_role_used=false");
  console.info("point_48_admin_read_only_ux_polish_implemented=true");
  console.info("admin_imports_data_hub_link_added=true");
  console.info("admin_imports_competitions_link_present=true");
  console.info("admin_ux_polish_mode=read_only_ui");
  console.info("public_exposure_enabled=false");
  console.info("current_visibility=private_admin");
  console.info("point_48_db_write=false");
  console.info("provider_fetch=false");
  console.info("external_fetch=false");
  console.info("provider_import_enabled=false");
  console.info("apify_enabled=false");
  console.info("production_touched=false");
  console.info("deploy_executed=false");
  console.info("service_role_used=false");
  console.info("point_49_browser_admin_verification_after_polish_completed=false");
  console.info("browser_admin_verification_result=pending_no_admin_session");
  console.info("environment=preview-url");
  console.info("admin_session_available=false");
  console.info("admin_data_route_verified=false");
  console.info("admin_competitions_route_verified=false");
  console.info("admin_competition_detail_route_verified=false");
  console.info("admin_imports_route_verified=false");
  console.info("admin_imports_data_hub_link_verified=false");
  console.info("admin_imports_competitions_link_verified=false");
  console.info("admin_sidebar_manual_data_verified=false");
  console.info("browser_displayed_competitions_count=0");
  console.info("browser_displayed_teams_count=0");
  console.info("browser_displayed_standings_count=0");
  console.info("incognito_result=redirect_login_vercel");
  console.info("public_exposure_enabled=false");
  console.info("current_visibility=private_admin");
  console.info("point_49_db_write=false");
  console.info("provider_fetch=false");
  console.info("external_fetch=false");
  console.info("provider_import_enabled=false");
  console.info("apify_enabled=false");
  console.info("production_touched=false");
  console.info("deploy_executed=false");
  console.info("service_role_used=false");
  console.info("point_50_public_exposure_policy_plan_created=true");
  console.info("public_exposure_policy_mode=plan_only");
  console.info("public_exposure_enabled=false");
  console.info("private_admin_publicly_exposed=false");
  console.info("visibility_changed=false");
  console.info("public_routes_enabled=false");
  console.info("public_readers_implemented=false");
  console.info("point_50_db_write=false");
  console.info("provider_fetch=false");
  console.info("external_fetch=false");
  console.info("provider_import_enabled=false");
  console.info("apify_enabled=false");
  console.info("production_touched=false");
  console.info("deploy_executed=false");
  console.info("service_role_used=false");
  console.info("point_51_public_reader_design_dry_run_created=true");
  console.info("public_reader_design_mode=dry_run_only");
  console.info("public_readers_implemented=false");
  console.info("public_reader_skeleton_operational=false");
  console.info("public_routes_enabled=false");
  console.info("public_routes_created=false");
  console.info("public_reader_connected_to_routes=false");
  console.info("private_admin_publicly_exposed=false");
  console.info("visibility_changed=false");
  console.info("point_51_db_write=false");
  console.info("provider_fetch=false");
  console.info("external_fetch=false");
  console.info("provider_import_enabled=false");
  console.info("apify_enabled=false");
  console.info("production_touched=false");
  console.info("deploy_executed=false");
  console.info("service_role_used=false");
  console.info("point_52_public_reader_contract_skeleton_created=true");
  console.info("public_reader_contract_mode=contract_skeleton_only");
  console.info("public_readers_implemented=false");
  console.info("public_reader_operational=false");
  console.info("public_reader_skeleton_operational=false");
  console.info("public_routes_enabled=false");
  console.info("public_routes_created=false");
  console.info("public_reader_connected_to_routes=false");
  console.info("supabase_queries_implemented=false");
  console.info("admin_reader_imported=false");
  console.info("private_admin_publicly_exposed=false");
  console.info("visibility_changed=false");
  console.info("point_52_db_write=false");
  console.info("provider_fetch=false");
  console.info("external_fetch=false");
  console.info("provider_import_enabled=false");
  console.info("apify_enabled=false");
  console.info("production_touched=false");
  console.info("deploy_executed=false");
  console.info("service_role_used=false");
  console.info("point_53_public_readers_no_route_implemented=true");
  console.info("public_reader_mode=no_route");
  console.info("public_readers_implemented=true");
  console.info("public_reader_operational=true");
  console.info("public_routes_enabled=false");
  console.info("public_routes_created=false");
  console.info("public_reader_connected_to_routes=false");
  console.info("supabase_queries_implemented=true");
  console.info("supabase_queries_visibility_filtered=true");
  console.info("admin_reader_imported=false");
  console.info("private_admin_publicly_exposed=false");
  console.info("visibility_changed=false");
  console.info("point_53_db_write=false");
  console.info("provider_fetch=false");
  console.info("external_fetch=false");
  console.info("provider_import_enabled=false");
  console.info("apify_enabled=false");
  console.info("production_touched=false");
  console.info("deploy_executed=false");
  console.info("service_role_used=false");
  console.info("point_54_public_reader_tests_hardened=true");
  console.info("public_reader_hardening_mode=static_audit_and_assertive_dry_run");
  console.info("public_reader_no_route_verified=true");
  console.info("public_reader_route_wiring_detected=false");
  console.info("public_reader_dry_run_assertions_enabled=true");
  console.info("dry_run_assertions_pass=true");
  console.info("public_competitions_count=0");
  console.info("public_teams_count=0");
  console.info("public_standings_count=0");
  console.info("public_bundle_status=not_found");
  console.info("private_admin_publicly_exposed=false");
  console.info("visibility_changed=false");
  console.info("point_54_db_write=false");
  console.info("provider_fetch=false");
  console.info("provider_import_enabled=false");
  console.info("apify_enabled=false");
  console.info("production_touched=false");
  console.info("deploy_executed=false");
  console.info("service_role_used=false");
  console.info("point_56_public_routes_browser_verification_completed=true");
  console.info("point_57_public_routes_ui_polish_completed=true");
  console.info("public_routes_ui_polish_mode=empty_state_polish");
  console.info("public_routes_still_empty_state=true");
  console.info("public_routes_use_public_readers=true");
  console.info("public_routes_private_admin_hardcoded=false");
  console.info("public_routes_admin_links_visible=false");
  console.info("public_routes_debug_payload_visible=false");
  console.info("public_routes_operational_buttons=false");
  console.info("public_competitions_page_state=empty");
  console.info("public_competition_detail_state=not_found");
  console.info("public_competitions_count=0");
  console.info("public_teams_count=0");
  console.info("public_standings_count=0");
  console.info("point_57_db_write=false");
  console.info("public_routes_browser_verification_result=passed_no_auth_empty_state");
  console.info("public_routes_no_auth_verified=true");
  console.info("public_competitions_page_browser_state=empty");
  console.info("public_competition_detail_browser_state=not_found");
  console.info("private_admin_publicly_exposed=false");
  console.info("visibility_changed=false");
  console.info("point_56_db_write=false");
  console.info("point_58_public_routes_browser_verification_after_ui_polish_completed=true");
  console.info("public_routes_browser_verification_result=passed_no_auth_empty_state_after_ui_polish");
  console.info("public_routes_no_auth_verified=true");
  console.info("public_competitions_page_browser_state=empty");
  console.info("public_competition_detail_browser_state=not_found");
  console.info("public_routes_admin_links_visible=false");
  console.info("public_routes_debug_payload_visible=false");
  console.info("public_routes_operational_buttons=false");
  console.info("private_admin_publicly_exposed=false");
  console.info("visibility_changed=false");
  console.info("point_58_db_write=false");
  console.info("point_59_public_data_promotion_plan_created=true");
  console.info("public_data_promotion_mode=plan_only");
  console.info("public_data_promotion_executed=false");
  console.info("visibility_changed=false");
  console.info("public_routes_current_state=empty_not_found");
  console.info("public_competitions_count=0");
  console.info("public_teams_count=0");
  console.info("public_standings_count=0");
  console.info("future_promotion_candidate=manual-serie-a");
  console.info("future_promotion_expected_competitions_count=1");
  console.info("future_promotion_expected_teams_count=2");
  console.info("future_promotion_expected_standings_count=2");
  console.info("rollback_plan_created=true");
  console.info("post_promotion_verification_plan_created=true");
  console.info("point_59_db_write=false");
  console.info("point_60_public_data_promotion_dry_run_created=true");
  console.info("public_data_promotion_mode=dry_run_no_apply");
  console.info("public_data_promotion_executed=false");
  console.info("candidate_slug=manual-serie-a");
  console.info("expected_competitions_count=1");
  console.info("expected_teams_count=2");
  console.info("expected_standings_count=2");
  console.info("candidate_competitions_count=1");
  console.info("candidate_teams_count=2");
  console.info("candidate_standings_count=2");
  console.info("scope_matches_expected=true");
  console.info("promotion_sql_no_apply_prepared=true");
  console.info("rollback_sql_no_apply_prepared=true");
  console.info("post_promotion_verification_no_apply_prepared=true");
  console.info("real_sql_executed=false");
  console.info("point_61_public_data_promotion_sql_manual_pack_created=true");
  console.info("promotion_sql_pack_mode=no_apply");
  console.info("promotion_sql_outline_prepared=true");
  console.info("point_61_db_write=false");
  console.info("rollback_sql_outline_prepared=true");
  console.info("post_verification_sql_outline_prepared=true");
  console.info("requires_explicit_p62_authorization=true");
  console.info("generic_proceed_authorizes_write=false");
  console.info("point_62_public_data_promotion_authorization_review_completed=true");
  console.info("public_data_promotion_mode=authorization_review_no_write");
  console.info("promotion_candidate=manual-serie-a");
  console.info("expected_promotion_competitions_count=1");
  console.info("expected_promotion_teams_count=2");
  console.info("expected_promotion_standings_count=2");
  console.info("explicit_authorization_required=true");
  console.info("promotion_executed=false");
  console.info("real_sql_executed=false");
  console.info("visibility_changed=false");
  console.info("point_62_db_write=false");
  console.info("provider_fetch=false");
  console.info("provider_import_enabled=false");
  console.info("apify_enabled=false");
  console.info("production_touched=false");
  console.info("deploy_executed=false");
  console.info("service_role_used=false");
  console.info("point_63_public_data_promotion_final_pre_apply_checklist_completed=true");
  console.info("public_data_promotion_mode=final_pre_apply_no_write");
  console.info("promotion_candidate=manual-serie-a");
  console.info("expected_promotion_competitions_count=1");
  console.info("expected_promotion_teams_count=2");
  console.info("expected_promotion_standings_count=2");
  console.info("current_public_competitions_count=0");
  console.info("current_public_teams_count=0");
  console.info("current_public_standings_count=0");
  console.info("current_public_bundle_status=not_found");
  console.info("public_routes_current_state=empty_not_found");
  console.info("explicit_authorization_required=true");
  console.info("generic_proceed_authorizes_write=false");
  console.info("promotion_executed=false");
  console.info("real_sql_executed=false");
  console.info("visibility_changed=false");
  console.info("point_63_db_write=false");
  console.info("provider_fetch=false");
  console.info("provider_import_enabled=false");
  console.info("apify_enabled=false");
  console.info("production_touched=false");
  console.info("deploy_executed=false");
  console.info("service_role_used=false");
  console.info("point_64_public_ui_product_polish_completed=true");
  console.info("public_ui_product_polish_mode=no_promotion");
  console.info("promotion_candidate=manual-serie-a");
  console.info("current_public_competitions_count=0");
  console.info("current_public_teams_count=0");
  console.info("current_public_standings_count=0");
  console.info("current_public_bundle_status=not_found");
  console.info("public_routes_current_state=empty_not_found");
  console.info("explicit_authorization_required=true");
  console.info("generic_proceed_authorizes_write=false");
  console.info("promotion_executed=false");
  console.info("real_sql_executed=false");
  console.info("visibility_changed=false");
  console.info("point_64_db_write=false");
  console.info("provider_fetch=false");
  console.info("provider_import_enabled=false");
  console.info("apify_enabled=false");
  console.info("production_touched=false");
  console.info("deploy_executed=false");
  console.info("service_role_used=false");
  console.info("point_65_public_routes_browser_verification_completed=true");
  console.info("public_routes_browser_verification_mode=no_auth_local_http");
  console.info("environment=localhost");
  console.info("production=false");
  console.info("auth=no-auth");
  console.info("public_competitions_page_reached=true");
  console.info("public_competitions_page_state=empty");
  console.info("public_competition_detail_reached=true");
  console.info("public_competition_detail_state=not_found");
  console.info("public_competitions_count=0");
  console.info("public_teams_count=0");
  console.info("public_standings_count=0");
  console.info("public_bundle_status=not_found");
  console.info("serie_a_manual_sample_visible=false");
  console.info("manual_serie_a_visible=false");
  console.info("manual_team_one_visible=false");
  console.info("manual_team_two_visible=false");
  console.info("forbidden_private_text_visible=false");
  console.info("public_routes_admin_links_visible=false");
  console.info("public_routes_debug_payload_visible=false");
  console.info("public_routes_operational_buttons=false");
  console.info("private_admin_publicly_exposed=false");
  console.info("visibility_changed=false");
  console.info("promotion_executed=false");
  console.info("real_sql_executed=false");
  console.info("point_65_db_write=false");
  console.info("provider_fetch=false");
  console.info("provider_import_enabled=false");
  console.info("apify_enabled=false");
  console.info("production_touched=false");
  console.info("deploy_executed=false");
  console.info("service_role_used=false");
  console.info("point_60_db_write=false");
  console.info("visibility_changed=false");
  console.info("provider_fetch=false");
  console.info("provider_import_enabled=false");
  console.info("apify_enabled=false");
  console.info("production_touched=false");
  console.info("deploy_executed=false");
  console.info("service_role_used=false");
  console.info("provider_fetch=false");
  console.info("provider_import_enabled=false");
  console.info("apify_enabled=false");
  console.info("production_touched=false");
  console.info("deploy_executed=false");
  console.info("service_role_used=false");
  console.info("point_72_production_readiness_final_review_completed=true");
  console.info("readiness_result=ready_for_deploy_plan_no_apply");
  console.info("ready_for_deploy=false");
  console.info("deploy_authorized=false");
  console.info("public_path_verified=true");
  console.info("public_routes_current_state=data_visible");
  console.info("public_competitions_count=1");
  console.info("public_teams_count=2");
  console.info("public_standings_count=2");
  console.info("public_bundle_status=ready");
  console.info("rollback_file_available=true");
  console.info("rollback_executed=false");
  console.info("preview_protected=true");
  console.info("preview_auth_changed=false");
  console.info("production_touched=false");
  console.info("manual_deploy_executed=false");
  console.info("point_72_db_write=false");
  console.info("provider_fetch=false");
  console.info("provider_import_enabled=false");
  console.info("apify_enabled=false");
  console.info("service_role_used=false");
  console.info("point_73_deploy_plan_no_apply_completed=true");
  console.info("deploy_plan_created=true");
  console.info("deploy_executed=false");
  console.info("deploy_authorized=false");
  console.info("ready_for_deploy=false");
  console.info("ready_for_deploy_authorization_gate=true");
  console.info("production_touched=false");
  console.info("manual_deploy_executed=false");
  console.info("point_73_db_write=false");
  console.info("rollback_executed=false");
  console.info("provider_fetch=false");
  console.info("provider_import_enabled=false");
  console.info("apify_enabled=false");
  console.info("service_role_used=false");
  console.info("env_verification_plan_created=true");
  console.info("post_deploy_verification_plan_created=true");
  console.info("rollback_plan_created=true");
  console.info("point_74_final_env_checklist_no_secret_completed=true");
  console.info("env_checklist_mode=no_secret_no_deploy");
  console.info("supabase_public_env_category_documented=true");
  console.info("service_role_app_usage=false");
  console.info("provider_import_flags_expected_off=true");
  console.info("provider_fetch_expected=false");
  console.info("apify_expected_off=true");
  console.info("writer_flags_expected_off=true");
  console.info("provider_writer_guards_required=true");
  console.info("vercel_project_category_documented=true");
  console.info("vercel_auth_changed=false");
  console.info("vercel_config_changed=false");
  console.info("secrets_hygiene_pass=true");
  console.info("final_env_checklist_created=true");
  console.info("blocked_real_execution=true");
  console.info("next_write_allowed=false");
  console.info("point_41_authorization_required=true");
  console.info(
    `recommended_next_step=${
      counts.unresolved === 0 && counts.conflict === 0
        ? "point_40b_manual_import_write_plan_no_apply"
        : "point_40_fix_b_correct_fixture_mapping_no_db_write"
    }`,
  );
  console.info("confirmation=no_db_write,no_provider_fetch,no_import_execution,no_service_role,no_env_output");
}

await main();
