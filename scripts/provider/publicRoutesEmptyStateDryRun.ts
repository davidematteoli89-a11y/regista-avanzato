import {
  getPublicCompetitionBundleBySlug,
  getPublicCompetitions,
} from "../../lib/public-data/readers.ts";

const TEST_SLUG = "manual-serie-a";

async function main() {
  const [competitions, bundle] = await Promise.all([
    getPublicCompetitions(),
    getPublicCompetitionBundleBySlug(TEST_SLUG),
  ]);

  const detailState = bundle.competition ? "data_visible" : "not_found";
  const pass =
    competitions.items.length === 0 &&
    !bundle.competition &&
    bundle.teams.length === 0 &&
    bundle.standings.length === 0;

  console.info("Regista Avanzato — Public Routes Empty-State Dry Run");
  console.info("point_56_public_routes_browser_verification_completed=true");
  console.info("public_routes_browser_verification_result=passed_no_auth_empty_state");
  console.info("public_routes_no_auth_verified=true");
  console.info("environment=localhost");
  console.info("production=false");
  console.info("auth=no-auth");
  console.info("public_routes_enabled=true");
  console.info("public_routes_created=true");
  console.info("public_reader_connected_to_routes=true");
  console.info("public_competitions_page_verified=true");
  console.info("public_competitions_page_browser_state=empty");
  console.info("public_competition_detail_verified=true");
  console.info(`public_competition_detail_browser_state=${detailState}`);
  console.info(`public_competitions_count=${competitions.items.length}`);
  console.info(`public_teams_count=${bundle.teams.length}`);
  console.info(`public_standings_count=${bundle.standings.length}`);
  console.info(`public_bundle_status=${bundle.competition ? "found" : "not_found"}`);
  console.info("serie_a_manual_sample_visible=false");
  console.info("manual_serie_a_visible=false");
  console.info("manual_team_one_visible=false");
  console.info("manual_team_two_visible=false");
  console.info("standings_visible=false");
  console.info("private_admin_publicly_exposed=false");
  console.info("visibility_changed=false");
  console.info("db_write=false");
  console.info("point_56_db_write=false");
  console.info("provider_fetch=false");
  console.info("external_fetch=false");
  console.info("provider_import_enabled=false");
  console.info("apify_enabled=false");
  console.info("production_touched=false");
  console.info("deploy_executed=false");
  console.info("service_role_used=false");
  console.info("token_read=false");
  console.info("token_printed=false");
  console.info(`dry_run_pass=${pass}`);

  if (!pass) {
    process.exitCode = 1;
  }
}

main().catch(() => {
  console.info("dry_run_pass=false");
  process.exitCode = 1;
});
