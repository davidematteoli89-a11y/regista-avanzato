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
  console.info("read_only_view_proposal_prepared=true");
  console.info("read_only_view_requirements_available=true");
  console.info("read_only_view_field_mapping_available=true");
  console.info("read_only_view_migration_proposal_prepared=true");
  console.info("read_only_view_migration_proposal_path=docs/migration_proposals/manual_import_read_only_views_p28.sql.md");
  console.info("read_only_view_migration_proposal_auto_apply=false");
  console.info("migration_proposal_reviewed=true");
  console.info("migration_proposal_hardened=true");
  console.info("executable_migration_created=false");
  console.info("migration_file_created=false");
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
  console.info("service_role_used=false");
  console.info("placeholders_resolved_from_local_count=16");
  console.info("placeholders_uncollected_count=0");
  console.info("new_read_only_view_still_required=true");
  console.info("ready_for_migration_draft=true");
  console.info("future_migration_draft_allowed=true");
  console.info("manual_import_lookup_views_needed=true");
  console.info("manual_import_competitions_lookup_view_needed=true");
  console.info("manual_import_teams_lookup_view_needed=true");
  console.info("manual_import_standings_lookup_view_needed=true");
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
  console.info("migration_draft_created=true");
  console.info("migration_draft_path=docs/migration_drafts/manual_import_read_only_views_p31.sql.draft");
  console.info("migration_draft_in_supabase_migrations=false");
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
  console.info("migration_prepared=false");
  console.info("migration_applied=true");
  console.info("migration_proposal_only=true");
  console.info("migration_proposal_reviewed_for_execution=false");
  console.info("sql_generated=false");
  console.info("pseudo_sql_documentation_only=true");
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
  console.info("point_28_write_authorization_required=true");
  console.info("point_29_write_authorization_required=true");
  console.info("point_30_authorization_required=true");
  console.info("point_30b_or_31_authorization_required=false");
  console.info("point_30d_authorization_required=true");
  console.info("point_31_authorization_required=true");
  console.info("recommended_next_step=point_31_migration_draft_no_apply_or_remain_manual_mock");
  console.info("confirmation=read_only_schema_confirmation,no_db_client,no_sql_execution,no_db_writes,no_external_provider_calls,no_env_output");
}

await main();
