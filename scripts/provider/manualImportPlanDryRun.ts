async function main(): Promise<void> {
  const modulePath = new URL("../../lib/provider/manualFixtures.ts", import.meta.url).href;
  const { getManualFixturePreview } = (await import(modulePath)) as typeof import("../../lib/provider/manualFixtures");
  const preview = getManualFixturePreview();

  console.info("Regista Avanzato — Manual Import Plan Dry Run");
  console.info("mode=manual_import_plan_dry_run");
  console.info("source=local_fixtures");
  console.info(`external_fetch=${preview.externalFetch}`);
  console.info(`db_write=${preview.dbWrite}`);
  console.info(`token_read=${preview.tokenRead}`);
  console.info(`token_printed=${preview.tokenPrinted}`);
  console.info(`competitions_to_plan=${preview.competitionsCount}`);
  console.info(`teams_to_plan=${preview.teamsCount}`);
  console.info(`standings_rows_to_plan=${preview.standingsRowsCount}`);
  console.info(`references_valid=${preview.referencesValid}`);
  console.info(`mapping_theoretical_possible=${preview.mappingTheoreticalPossible}`);
  console.info(`competitions_upsert_preview_count=${preview.competitionsCount}`);
  console.info(`teams_upsert_preview_count=${preview.teamsCount}`);
  console.info(`standings_upsert_preview_count=${preview.standingsRowsCount}`);
  console.info("planned_operations=competitions_upsert_preview,teams_upsert_preview,standings_upsert_preview");
  console.info("target_tables_candidate=competitions,teams,standings,provider_import_logs,import_logs");
  console.info("sql_generated=false");
  console.info("pseudo_sql_not_executable=true");
  console.info("blocked_real_execution=true");
  console.info("requires_explicit_approval=true");
  console.info("requires_staging_environment=true");
  console.info("requires_backup_plan=true");
  console.info("requires_rollback_plan=true");
  console.info("provider_involved=false");
  console.info("provider_activated=false");
  console.info("import_enabled=false");
  console.info("production=false");
  console.info("confirmation=plan_only,no_sql_execution,no_external_provider_calls,no_db_writes,no_env_output");
}

await main();
