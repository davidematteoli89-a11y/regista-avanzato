function formatList(items: string[]): string {
  return items.length === 0 ? "none" : items.join(",");
}

async function main(): Promise<void> {
  const modulePath = new URL("../../lib/provider/manualFixtures.ts", import.meta.url).href;
  const { getManualFixturePreview } = (await import(modulePath)) as typeof import("../../lib/provider/manualFixtures");
  const preview = getManualFixturePreview();

  console.info("Regista Avanzato — Manual Fixtures Dry Run");
  console.info("mode=manual_fixture_dry_run");
  console.info(`source=${preview.source}`);
  console.info(`external_fetch=${preview.externalFetch}`);
  console.info(`db_write=${preview.dbWrite}`);
  console.info(`token_read=${preview.tokenRead}`);
  console.info(`token_printed=${preview.tokenPrinted}`);
  console.info(`competitions_count=${preview.competitionsCount}`);
  console.info(`teams_count=${preview.teamsCount}`);
  console.info(`standings_rows_count=${preview.standingsRowsCount}`);
  console.info(`missing_required_fields=${formatList(preview.missingRequiredFields)}`);
  console.info(`reference_errors=${formatList(preview.referenceErrors)}`);
  console.info(`warnings=${formatList(preview.warnings)}`);
  console.info(`errors=${formatList(preview.errors)}`);
  console.info(`references_valid=${preview.referencesValid}`);
  console.info(`mapping_theoretical_possible=${preview.mappingTheoreticalPossible}`);
  console.info("provider_activated=false");
  console.info("import_enabled=false");
  console.info("confirmation=no_external_provider_calls,no_apify_calls,no_sofascore_calls,no_scraping,no_db_writes,no_env_output");
}

await main();
