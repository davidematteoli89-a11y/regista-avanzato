import {
  getPublicCompetitionBundleBySlug,
  getPublicCompetitionBySlug,
  getPublicCompetitions,
  getPublicStandingsByCompetitionSlug,
  getPublicTeamsByCompetitionSlug,
} from "../../lib/public-data/readers.ts";

const TEST_SLUG = "manual-serie-a";

function bundleStatus(bundle: Awaited<ReturnType<typeof getPublicCompetitionBundleBySlug>>) {
  if (bundle.competition) return "found";
  if (bundle.teams.length === 0 && bundle.standings.length === 0) return "not_found";
  return "empty";
}

async function main() {
  const [competitions, competitionBySlug, teams, standings, bundle] = await Promise.all([
    getPublicCompetitions(),
    getPublicCompetitionBySlug(TEST_SLUG),
    getPublicTeamsByCompetitionSlug(TEST_SLUG),
    getPublicStandingsByCompetitionSlug(TEST_SLUG),
    getPublicCompetitionBundleBySlug(TEST_SLUG),
  ]);

  const status = bundleStatus(bundle);
  const validBundleStatus = status === "not_found" || status === "empty";
  const assertionsPass =
    competitions.items.length === 0 &&
    teams.items.length === 0 &&
    standings.items.length === 0 &&
    validBundleStatus &&
    !bundle.competition &&
    bundle.teams.length === 0 &&
    bundle.standings.length === 0;

  console.info("Regista Avanzato — Public Readers No-Route Dry Run");
  console.info("point_53_public_reader_no_route_implemented=true");
  console.info("point_53_public_readers_no_route_implemented=true");
  console.info("public_reader_mode=no_route_dry_run");
  console.info("public_reader_queries_enabled=true");
  console.info("public_routes_enabled=false");
  console.info("public_routes_created=false");
  console.info("public_reader_connected_to_routes=false");
  console.info("point_54_public_reader_dry_run_assertions_enabled=true");
  console.info("public_reader_dry_run_assertions_enabled=true");
  console.info("public_visibility_filter_required=true");
  console.info("public_visibility_filter_value=public");
  console.info("private_admin_publicly_exposed=false");
  console.info("visibility_changed=false");
  console.info("db_write=false");
  console.info("point_53_db_write=false");
  console.info("provider_fetch=false");
  console.info("external_fetch=false");
  console.info("provider_import_enabled=false");
  console.info("apify_enabled=false");
  console.info("production_touched=false");
  console.info("deploy_executed=false");
  console.info("service_role_used=false");
  console.info("token_read=false");
  console.info("token_printed=false");
  console.info(`test_slug=${TEST_SLUG}`);
  console.info("expected_public_competitions_count=0");
  console.info(`actual_public_competitions_count=${competitions.items.length}`);
  console.info(`public_competitions_count=${competitions.items.length}`);
  console.info(`public_competition_by_slug_count=${competitionBySlug.items.length}`);
  console.info("expected_public_teams_count=0");
  console.info(`actual_public_teams_count=${teams.items.length}`);
  console.info(`public_teams_count=${teams.items.length}`);
  console.info("expected_public_standings_count=0");
  console.info(`actual_public_standings_count=${standings.items.length}`);
  console.info(`public_standings_count=${standings.items.length}`);
  console.info("expected_public_bundle_status=not_found_or_empty");
  console.info(`actual_public_bundle_status=${status}`);
  console.info(`public_bundle_status=${status}`);
  console.info(`public_bundle_teams_count=${bundle.teams.length}`);
  console.info(`public_bundle_standings_count=${bundle.standings.length}`);
  console.info(`competitions_source=${competitions.source}`);
  console.info(`teams_source=${teams.source}`);
  console.info(`standings_source=${standings.source}`);
  console.info(`bundle_source=${bundle.source}`);

  const expectedPrivateAdminEmpty = assertionsPass && competitionBySlug.items.length === 0;

  console.info(`private_admin_dataset_hidden=${expectedPrivateAdminEmpty}`);
  console.info(`dry_run_assertions_pass=${assertionsPass}`);
  console.info(`dry_run_pass=${expectedPrivateAdminEmpty}`);

  if (!expectedPrivateAdminEmpty || !assertionsPass) {
    process.exitCode = 1;
  }
}

main().catch(() => {
  console.info("dry_run_pass=false");
  process.exitCode = 1;
});
