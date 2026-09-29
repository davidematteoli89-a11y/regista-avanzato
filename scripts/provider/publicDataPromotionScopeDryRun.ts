type ManualFixturesModule = typeof import("../../lib/provider/manualFixtures");

const CANDIDATE_SLUG = "manual-serie-a";
const EXPECTED_COMPETITIONS_COUNT = 1;
const EXPECTED_TEAMS_COUNT = 2;
const EXPECTED_STANDINGS_COUNT = 2;

function formatBoolean(value: boolean): string {
  return value ? "true" : "false";
}

async function main(): Promise<void> {
  const modulePath = new URL("../../lib/provider/manualFixtures.ts", import.meta.url).href;
  const { getManualFixturePreview } = (await import(modulePath)) as ManualFixturesModule;
  const preview = getManualFixturePreview();

  const candidateCompetitions = preview.competitions.filter(
    (competition) => competition.provider_competition_id === CANDIDATE_SLUG,
  );
  const candidateTeams = preview.teams.filter(
    (team) => team.provider_competition_id === CANDIDATE_SLUG,
  );
  const candidateTeamIds = new Set(candidateTeams.map((team) => team.provider_team_id));
  const candidateStandings = preview.standings.filter(
    (standing) =>
      standing.provider_competition_id === CANDIDATE_SLUG &&
      candidateTeamIds.has(standing.provider_team_id),
  );

  const scopeMatchesExpected =
    candidateCompetitions.length === EXPECTED_COMPETITIONS_COUNT &&
    candidateTeams.length === EXPECTED_TEAMS_COUNT &&
    candidateStandings.length === EXPECTED_STANDINGS_COUNT &&
    preview.referencesValid &&
    preview.mappingTheoreticalPossible;

  console.info("Regista Avanzato — Public Data Promotion Scope Dry Run");
  console.info("mode=public_data_promotion_scope_dry_run");
  console.info("point_60_public_data_promotion_dry_run_created=true");
  console.info("public_data_promotion_mode=dry_run_no_apply");
  console.info("public_data_promotion_executed=false");
  console.info("candidate_slug=manual-serie-a");
  console.info("source=local_fixtures");
  console.info("external_fetch=false");
  console.info("provider_fetch=false");
  console.info("db_write=false");
  console.info("insert_update_delete_upsert=false");
  console.info("visibility_changed=false");
  console.info("service_role_used=false");
  console.info("token_read=false");
  console.info("token_printed=false");
  console.info("provider_import_enabled=false");
  console.info("apify_enabled=false");
  console.info("production_touched=false");
  console.info("deploy_executed=false");
  console.info(`expected_competitions_count=${EXPECTED_COMPETITIONS_COUNT}`);
  console.info(`expected_teams_count=${EXPECTED_TEAMS_COUNT}`);
  console.info(`expected_standings_count=${EXPECTED_STANDINGS_COUNT}`);
  console.info(`candidate_competitions_count=${candidateCompetitions.length}`);
  console.info(`candidate_teams_count=${candidateTeams.length}`);
  console.info(`candidate_standings_count=${candidateStandings.length}`);
  console.info(`scope_matches_expected=${formatBoolean(scopeMatchesExpected)}`);
  console.info(`references_valid=${formatBoolean(preview.referencesValid)}`);
  console.info(`mapping_theoretical_possible=${formatBoolean(preview.mappingTheoreticalPossible)}`);
  console.info("promotion_order=competition,teams,standings");
  console.info("rollback_order=standings,teams,competition");
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
  console.info("manual_sql_editor_used=false");
  console.info("db_push_reset=false");
  console.info("migration_applied=false");
  console.info("requires_explicit_p61_authorization=true");
  console.info("generic_proceed_authorizes_write=false");
  console.info(
    `dry_run_pass=${formatBoolean(
      scopeMatchesExpected &&
        !preview.externalFetch &&
        !preview.dbWrite &&
        !preview.tokenRead &&
        !preview.tokenPrinted,
    )}`,
  );
  console.info(
    "confirmation=no_db_write,no_visibility_change,no_provider_fetch,no_import_activation,no_service_role,no_deploy,no_production",
  );

  if (!scopeMatchesExpected) {
    process.exitCode = 1;
  }
}

main().catch(() => {
  console.info("dry_run_pass=false");
  process.exitCode = 1;
});
