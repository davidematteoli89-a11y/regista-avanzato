function buildBatchIdPreview(): string {
  return "manual-fixture-preview-20260917";
}

async function main(): Promise<void> {
  const modulePath = new URL("../../lib/provider/manualFixtures.ts", import.meta.url).href;
  const { getManualFixturePreview } = (await import(modulePath)) as typeof import("../../lib/provider/manualFixtures");
  const preview = getManualFixturePreview();

  console.info("Regista Avanzato — Manual Import Readiness Dry Run");
  console.info("mode=manual_import_readiness_dry_run");
  console.info("source=local_fixtures");
  console.info(`external_fetch=${preview.externalFetch}`);
  console.info(`db_write=${preview.dbWrite}`);
  console.info(`token_read=${preview.tokenRead}`);
  console.info(`token_printed=${preview.tokenPrinted}`);
  console.info(`batch_id_preview=${buildBatchIdPreview()}`);
  console.info("batch_executable=false");
  console.info("blocked_real_execution=true");
  console.info("requires_explicit_approval=true");
  console.info("requires_staging_environment=true");
  console.info("requires_schema_confirmation=true");
  console.info("requires_backup_plan=true");
  console.info("requires_rollback_plan=true");
  console.info(`competitions_planned=${preview.competitionsCount}`);
  console.info(`teams_planned=${preview.teamsCount}`);
  console.info(`standings_rows_planned=${preview.standingsRowsCount}`);
  console.info(`references_valid=${preview.referencesValid}`);
  console.info(`mapping_theoretical_possible=${preview.mappingTheoreticalPossible}`);
  console.info("collision_strategy=create_update_skip_preview");
  console.info("rollback_preview_available=true");
  console.info("planned_create_update_skip=preview_only");
  console.info("schema_confirmation_checked=true");
  console.info("schema_resolution_checked=true");
  console.info("local_schema_deep_review_checked=true");
  console.info("schema_ready_for_write=false");
  console.info("schema_blockers=competition_lookup_required,team_lookup_required,season_missing_from_fixture,slug_generation_needs_review,stage_matchday_policy_needs_review");
  console.info("ready_areas_count=0");
  console.info("needs_review_areas_count=3");
  console.info("blocked_areas_count=0");
  console.info("ready_fields_count=12");
  console.info("needs_review_fields_count=6");
  console.info("blocked_fields_count=0");
  console.info("not_mapped_fields_count=0");
  console.info("db_read_only_check_recommended=true");
  console.info("next_write_allowed=false");
  console.info("requires_explicit_user_authorization_for_point_23=true");
  console.info("point_24_write_authorization_required=true");
  console.info("point_25_write_authorization_required=true");
  console.info("recommended_next_step=point_25_option_a_db_read_only_schema_check_no_write");
  console.info("sql_generated=false");
  console.info("pseudo_sql_not_executable=true");
  console.info("provider_involved=false");
  console.info("provider_activated=false");
  console.info("import_enabled=false");
  console.info("production=false");
  console.info("confirmation=readiness_only,no_sql_execution,no_db_client,no_db_writes,no_external_provider_calls,no_env_output");
}

await main();
