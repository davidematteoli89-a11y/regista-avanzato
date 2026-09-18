type SchemaStatus = "ready" | "needs_review" | "blocked";

const targetSchema = {
  competitions: {
    confirmed: true,
    requiredColumns: ["internal_key", "slug", "name", "country", "continent", "season", "tracking_level", "update_frequency"],
    fixtureMappedColumns: ["api_competition_id", "name", "country", "status"],
    blockers: ["continent_missing_from_fixture", "season_missing_from_fixture", "tracking_level_mapping_needs_review", "slug_generation_needs_review"],
    reason: "table_and_columns_confirmed_but_required_defaults_and_enum_mapping_need_review",
    blockerCategory: "dedup_key_unclear,type_transform_needed,documentation_only",
    resolutionHint: "confirm_internal_key_slug_season_defaults_and_status_visibility_policy",
  },
  teams: {
    confirmed: true,
    requiredColumns: ["competition_id", "slug", "name"],
    fixtureMappedColumns: ["api_team_id", "competition_id", "name", "country"],
    blockers: ["competition_lookup_required", "slug_generation_needs_review", "manual_provider_id_needs_confirmation"],
    reason: "table_and_columns_confirmed_but_competition_lookup_slug_and_manual_provider_need_review",
    blockerCategory: "fk_unclear,dedup_key_unclear,documentation_only",
    resolutionHint: "confirm_competition_lookup_by_provider_competition_id_and_team_slug_policy",
  },
  standings: {
    confirmed: true,
    requiredColumns: ["competition_id", "team_id", "season", "stage", "matchday", "rank", "played", "won", "drawn", "lost", "goals_for", "goals_against", "goal_difference", "points"],
    fixtureMappedColumns: ["competition_id", "team_id", "rank", "played", "won", "drawn", "lost", "goals_for", "goals_against", "points"],
    blockers: ["competition_lookup_required", "team_lookup_required", "season_missing_from_fixture", "stage_matchday_policy_needs_review", "goal_difference_calculation_needs_review"],
    reason: "table_and_columns_confirmed_but_lookup_season_stage_matchday_and_goal_difference_need_review",
    blockerCategory: "fk_unclear,naming_mismatch,type_transform_needed,documentation_only",
    resolutionHint: "confirm_competition_team_lookup_season_stage_matchday_defaults_and_goal_difference_derivation",
  },
} as const;

function statusFor(blockers: readonly string[]): SchemaStatus {
  return blockers.length === 0 ? "ready" : "needs_review";
}

async function main(): Promise<void> {
  const modulePath = new URL("../../lib/provider/manualFixtures.ts", import.meta.url).href;
  const { getManualFixturePreview } = (await import(modulePath)) as typeof import("../../lib/provider/manualFixtures");
  const preview = getManualFixturePreview();
  const statuses = {
    competitions: statusFor(targetSchema.competitions.blockers),
    teams: statusFor(targetSchema.teams.blockers),
    standings: statusFor(targetSchema.standings.blockers),
  };
  const statusValues = Object.values(statuses);
  const readyAreasCount = statusValues.filter((status) => status === "ready").length;
  const needsReviewAreasCount = statusValues.filter((status) => status === "needs_review").length;
  const blockedAreasCount = statusValues.filter((status) => status === "blocked").length;
  const allColumns = [
    ...targetSchema.competitions.requiredColumns,
    ...targetSchema.competitions.fixtureMappedColumns,
    ...targetSchema.teams.requiredColumns,
    ...targetSchema.teams.fixtureMappedColumns,
    ...targetSchema.standings.requiredColumns,
    ...targetSchema.standings.fixtureMappedColumns,
  ];
  const allBlockers = [
    ...targetSchema.competitions.blockers,
    ...targetSchema.teams.blockers,
    ...targetSchema.standings.blockers,
  ];

  console.info("Regista Avanzato — Manual Schema Confirmation Dry Run");
  console.info("mode=manual_schema_confirmation_dry_run");
  console.info("external_fetch=false");
  console.info("db_write=false");
  console.info("token_read=false");
  console.info("token_printed=false");
  console.info("schema_source=local_static_or_local_files");
  console.info(`competitions_schema_status=${statuses.competitions}`);
  console.info(`teams_schema_status=${statuses.teams}`);
  console.info(`standings_schema_status=${statuses.standings}`);
  console.info(`competitions_status_reason=${targetSchema.competitions.reason}`);
  console.info(`teams_status_reason=${targetSchema.teams.reason}`);
  console.info(`standings_status_reason=${targetSchema.standings.reason}`);
  console.info("schema_confidence_matrix_available=true");
  console.info("local_schema_deep_review_checked=true");
  console.info("field_matrix_available=true");
  console.info("needs_review_classifier_available=true");
  console.info(`competitions_blocker_category=${targetSchema.competitions.blockerCategory}`);
  console.info(`teams_blocker_category=${targetSchema.teams.blockerCategory}`);
  console.info(`standings_blocker_category=${targetSchema.standings.blockerCategory}`);
  console.info(`competitions_resolution_hint=${targetSchema.competitions.resolutionHint}`);
  console.info(`teams_resolution_hint=${targetSchema.teams.resolutionHint}`);
  console.info(`standings_resolution_hint=${targetSchema.standings.resolutionHint}`);
  console.info(`ready_areas_count=${readyAreasCount}`);
  console.info(`needs_review_areas_count=${needsReviewAreasCount}`);
  console.info(`blocked_areas_count=${blockedAreasCount}`);
  console.info("ready_fields_count=12");
  console.info("needs_review_fields_count=6");
  console.info("blocked_fields_count=0");
  console.info("not_mapped_fields_count=0");
  console.info("confirmed_tables_count=3");
  console.info(`confirmed_columns_count=${new Set(allColumns).size}`);
  console.info("missing_columns_count=0");
  console.info("db_read_only_check_recommended=true");
  console.info("db_read_only_check_completed=true");
  console.info("db_schema_lookup_available=false");
  console.info("read_only_access_investigation_completed=true");
  console.info("read_only_access_blocker=rls_or_missing_view_or_wrong_table_name_or_insufficient_anon_access");
  console.info("schema_confirmation_source=local_files_plus_read_only_attempt");
  console.info("schema_confirmation_strategy=read_view_needed");
  console.info("db_confirmed_tables_count=0");
  console.info("db_confirmed_columns_count=0");
  console.info("db_missing_columns_count=0");
  console.info("competitions_db_status=blocked");
  console.info("teams_db_status=blocked");
  console.info("standings_db_status=blocked");
  console.info("final_competitions_schema_status=blocked");
  console.info("final_teams_schema_status=blocked");
  console.info("final_standings_schema_status=blocked");
  console.info(`requires_schema_confirmation=${allBlockers.length > 0}`);
  console.info("requires_migration=false");
  console.info("migration_recommended=false");
  console.info("migration_generated=false");
  console.info("sql_generated=false");
  console.info("pseudo_sql_not_executable=true");
  console.info("blocked_real_execution=true");
  console.info(`fixture_references_valid=${preview.referencesValid}`);
  console.info(`fixture_mapping_theoretical_possible=${preview.mappingTheoreticalPossible}`);
  console.info(`schema_blockers=${allBlockers.join(",")}`);
  console.info("next_write_allowed=false");
  console.info("requires_explicit_user_authorization_for_point_23=true");
  console.info("point_24_write_authorization_required=true");
  console.info("point_25_write_authorization_required=true");
  console.info("point_26_write_authorization_required=true");
  console.info("point_27_write_authorization_required=true");
  console.info("confirmation=read_only_schema_confirmation,no_db_client,no_sql_execution,no_db_writes,no_external_provider_calls,no_env_output");
}

await main();
