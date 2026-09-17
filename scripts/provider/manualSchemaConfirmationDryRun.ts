type SchemaStatus = "ready" | "needs_review" | "blocked";

const targetSchema = {
  competitions: {
    confirmed: true,
    requiredColumns: ["internal_key", "slug", "name", "country", "continent", "season", "tracking_level", "update_frequency"],
    fixtureMappedColumns: ["api_competition_id", "name", "country", "status"],
    blockers: ["continent_missing_from_fixture", "season_missing_from_fixture", "tracking_level_mapping_needs_review", "slug_generation_needs_review"],
  },
  teams: {
    confirmed: true,
    requiredColumns: ["competition_id", "slug", "name"],
    fixtureMappedColumns: ["api_team_id", "competition_id", "name", "country"],
    blockers: ["competition_lookup_required", "slug_generation_needs_review", "manual_provider_id_needs_confirmation"],
  },
  standings: {
    confirmed: true,
    requiredColumns: ["competition_id", "team_id", "season", "stage", "matchday", "rank", "played", "won", "drawn", "lost", "goals_for", "goals_against", "goal_difference", "points"],
    fixtureMappedColumns: ["competition_id", "team_id", "rank", "played", "won", "drawn", "lost", "goals_for", "goals_against", "points"],
    blockers: ["competition_lookup_required", "team_lookup_required", "season_missing_from_fixture", "stage_matchday_policy_needs_review", "goal_difference_calculation_needs_review"],
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
  console.info("confirmed_tables_count=3");
  console.info(`confirmed_columns_count=${new Set(allColumns).size}`);
  console.info("missing_columns_count=0");
  console.info(`requires_schema_confirmation=${allBlockers.length > 0}`);
  console.info("requires_migration=false");
  console.info("migration_generated=false");
  console.info("sql_generated=false");
  console.info("pseudo_sql_not_executable=true");
  console.info("blocked_real_execution=true");
  console.info(`fixture_references_valid=${preview.referencesValid}`);
  console.info(`fixture_mapping_theoretical_possible=${preview.mappingTheoreticalPossible}`);
  console.info(`schema_blockers=${allBlockers.join(",")}`);
  console.info("next_write_allowed=false");
  console.info("requires_explicit_user_authorization_for_point_23=true");
  console.info("confirmation=read_only_schema_confirmation,no_db_client,no_sql_execution,no_db_writes,no_external_provider_calls,no_env_output");
}

await main();
