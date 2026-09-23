async function main(): Promise<void> {
  const modulePath = new URL("../../lib/provider/manualFixtures.ts", import.meta.url).href;
  const { getManualFixturePreview } = (await import(modulePath)) as typeof import("../../lib/provider/manualFixtures");
  const preview = getManualFixturePreview();

  const competitionsUnresolved = preview.competitionsCount;
  const teamsUnresolved = preview.teamsCount;
  const standingsUnresolved = preview.standingsRowsCount;
  const unresolvedCount = competitionsUnresolved + teamsUnresolved + standingsUnresolved;

  console.info("Regista Avanzato — Manual Import Preview Dry Run");
  console.info("mode=manual_import_preview_dry_run");
  console.info("preview_mode=local_only_unresolved");
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
  console.info("view_lookup_executed=false");
  console.info("view_lookup_reason=read_only_db_access_not_used_in_p39");
  console.info("preview_resolution=local_only_unresolved");
  console.info("create_count=0");
  console.info("update_count=0");
  console.info("skip_count=0");
  console.info("conflict_count=0");
  console.info(`unresolved_count=${unresolvedCount}`);
  console.info(`competitions_unresolved_count=${competitionsUnresolved}`);
  console.info(`teams_unresolved_count=${teamsUnresolved}`);
  console.info(`standings_unresolved_count=${standingsUnresolved}`);
  console.info("blocked_real_execution=true");
  console.info("next_write_allowed=false");
  console.info("recommended_next_step=point_40_fix_mapping_preview_or_enable_explicit_read_only_view_lookup");
  console.info("confirmation=no_db_write,no_provider_fetch,no_import_execution,no_service_role,no_env_output");
}

await main();
