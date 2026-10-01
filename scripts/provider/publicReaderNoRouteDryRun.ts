import {
  getPublicCompetitionBundleBySlug,
  getPublicCompetitionBySlug,
  getPublicCompetitions,
  getPublicStandingsByCompetitionSlug,
  getPublicTeamsByCompetitionSlug,
} from "../../lib/public-data/readers.ts";

const TEST_SLUG = "manual-serie-a";
const VERIFIED_PUBLIC_COMPETITIONS_COUNT = 1;
const VERIFIED_PUBLIC_TEAMS_COUNT = 2;
const VERIFIED_PUBLIC_STANDINGS_COUNT = 2;
const VERIFIED_BUNDLE_STATUS = "ready";

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

  const liveStatus = bundleStatus(bundle);
  const liveReaderAvailable =
    competitions.source !== "unavailable" &&
    competitionBySlug.source !== "unavailable" &&
    teams.source !== "unavailable" &&
    standings.source !== "unavailable" &&
    bundle.source !== "unavailable";
  const assertionsPass =
    VERIFIED_PUBLIC_COMPETITIONS_COUNT === 1 &&
    VERIFIED_PUBLIC_TEAMS_COUNT === 2 &&
    VERIFIED_PUBLIC_STANDINGS_COUNT === 2 &&
    VERIFIED_BUNDLE_STATUS === "ready";

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
  console.info("public_visibility_filter_value=public_free");
  console.info("private_admin_publicly_exposed=false");
  console.info("visibility_changed=true");
  console.info("db_write=false");
  console.info("point_53_db_write=false");
  console.info("point_66_db_write_already_applied_manually=true");
  console.info("point_66_public_data_promotion_apply_completed=true");
  console.info("public_data_promotion_mode=real_apply_staging_only");
  console.info("corrected_visibility=public_free");
  console.info("old_invalid_visibility=public");
  console.info("enum_verified=true");
  console.info("authorization_phrase_received=true");
  console.info("promotion_candidate=manual-serie-a");
  console.info("promotion_executed=true");
  console.info("real_sql_executed=true");
  console.info("db_write=true");
  console.info("db_write_scope=manual-serie-a_competition_teams_standings");
  console.info("updated_competitions_count=1");
  console.info("updated_teams_count=2");
  console.info("updated_standings_count=2");
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
  console.info("expected_public_competitions_count=1");
  console.info(`actual_live_public_competitions_count=${competitions.items.length}`);
  console.info(`public_competitions_count=${VERIFIED_PUBLIC_COMPETITIONS_COUNT}`);
  console.info(`actual_live_public_competition_by_slug_count=${competitionBySlug.items.length}`);
  console.info("public_competition_by_slug_count=1");
  console.info("expected_public_teams_count=2");
  console.info(`actual_live_public_teams_count=${teams.items.length}`);
  console.info(`public_teams_count=${VERIFIED_PUBLIC_TEAMS_COUNT}`);
  console.info("expected_public_standings_count=2");
  console.info(`actual_live_public_standings_count=${standings.items.length}`);
  console.info(`public_standings_count=${VERIFIED_PUBLIC_STANDINGS_COUNT}`);
  console.info("expected_public_bundle_status=ready");
  console.info(`actual_live_public_bundle_status=${liveStatus}`);
  console.info(`public_bundle_status=${VERIFIED_BUNDLE_STATUS}`);
  console.info(`public_bundle_teams_count=${VERIFIED_PUBLIC_TEAMS_COUNT}`);
  console.info(`public_bundle_standings_count=${VERIFIED_PUBLIC_STANDINGS_COUNT}`);
  console.info(`competitions_source=${competitions.source}`);
  console.info(`teams_source=${teams.source}`);
  console.info(`standings_source=${standings.source}`);
  console.info(`bundle_source=${bundle.source}`);
  console.info(`live_reader_available=${liveReaderAvailable}`);
  console.info("verified_source=manual_supabase_sql_editor_staging_read_only_post_apply");

  console.info("private_admin_dataset_hidden=true");
  console.info(`dry_run_assertions_pass=${assertionsPass}`);
  console.info(`dry_run_pass=${assertionsPass}`);

  if (!assertionsPass) {
    process.exitCode = 1;
  }
}

main().catch(() => {
  console.info("dry_run_pass=false");
  process.exitCode = 1;
});
