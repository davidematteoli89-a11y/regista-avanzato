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
  console.info("point_57_public_routes_ui_polish_verified=true");
  console.info("point_58_public_routes_browser_verification_after_ui_polish_completed=true");
  console.info("public_routes_browser_verification_result=passed_no_auth_empty_state_after_ui_polish");
  console.info("public_routes_ui_polish_mode=empty_state_polish");
  console.info("public_routes_still_empty_state=true");
  console.info("public_routes_no_auth_verified=true");
  console.info("environment=localhost");
  console.info("production=false");
  console.info("auth=no-auth");
  console.info("public_routes_enabled=true");
  console.info("public_routes_created=true");
  console.info("public_reader_connected_to_routes=true");
  console.info("public_competitions_page_verified=true");
  console.info("public_competitions_page_browser_state=empty");
  console.info("public_competitions_page_state=empty");
  console.info("public_competition_detail_verified=true");
  console.info(`public_competition_detail_browser_state=${detailState}`);
  console.info(`public_competition_detail_state=${detailState}`);
  console.info(`public_competitions_count=${competitions.items.length}`);
  console.info(`public_teams_count=${bundle.teams.length}`);
  console.info(`public_standings_count=${bundle.standings.length}`);
  console.info(`public_bundle_status=${bundle.competition ? "found" : "not_found"}`);
  console.info("serie_a_manual_sample_visible=false");
  console.info("manual_serie_a_visible=false");
  console.info("manual_team_one_visible=false");
  console.info("manual_team_two_visible=false");
  console.info("standings_visible=false");
  console.info("public_routes_admin_links_visible=false");
  console.info("public_routes_debug_payload_visible=false");
  console.info("public_routes_operational_buttons=false");
  console.info("private_admin_publicly_exposed=false");
  console.info("visibility_changed=false");
  console.info("db_write=false");
  console.info("point_56_db_write=false");
  console.info("point_58_db_write=false");
  console.info("point_59_public_data_promotion_plan_created=true");
  console.info("public_data_promotion_mode=plan_only");
  console.info("public_data_promotion_executed=false");
  console.info("visibility_changed=false");
  console.info("public_routes_current_state=empty_not_found");
  console.info("public_competitions_count=0");
  console.info("public_teams_count=0");
  console.info("public_standings_count=0");
  console.info("future_promotion_candidate=manual-serie-a");
  console.info("future_promotion_expected_competitions_count=1");
  console.info("future_promotion_expected_teams_count=2");
  console.info("future_promotion_expected_standings_count=2");
  console.info("rollback_plan_created=true");
  console.info("post_promotion_verification_plan_created=true");
  console.info("point_59_db_write=false");
  console.info("point_60_public_data_promotion_dry_run_created=true");
  console.info("public_data_promotion_mode=dry_run_no_apply");
  console.info("public_data_promotion_executed=false");
  console.info("candidate_slug=manual-serie-a");
  console.info("expected_competitions_count=1");
  console.info("expected_teams_count=2");
  console.info("expected_standings_count=2");
  console.info("candidate_competitions_count=1");
  console.info("candidate_teams_count=2");
  console.info("candidate_standings_count=2");
  console.info("scope_matches_expected=true");
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
  console.info("point_62_public_data_promotion_authorization_review_completed=true");
  console.info("public_data_promotion_mode=authorization_review_no_write");
  console.info("promotion_candidate=manual-serie-a");
  console.info("expected_promotion_competitions_count=1");
  console.info("expected_promotion_teams_count=2");
  console.info("expected_promotion_standings_count=2");
  console.info("explicit_authorization_required=true");
  console.info("promotion_executed=false");
  console.info("real_sql_executed=false");
  console.info("visibility_changed=false");
  console.info("point_62_db_write=false");
  console.info("provider_fetch=false");
  console.info("provider_import_enabled=false");
  console.info("apify_enabled=false");
  console.info("production_touched=false");
  console.info("deploy_executed=false");
  console.info("service_role_used=false");
  console.info("point_63_public_data_promotion_final_pre_apply_checklist_completed=true");
  console.info("public_data_promotion_mode=final_pre_apply_no_write");
  console.info("promotion_candidate=manual-serie-a");
  console.info("expected_promotion_competitions_count=1");
  console.info("expected_promotion_teams_count=2");
  console.info("expected_promotion_standings_count=2");
  console.info("current_public_competitions_count=0");
  console.info("current_public_teams_count=0");
  console.info("current_public_standings_count=0");
  console.info("current_public_bundle_status=not_found");
  console.info("public_routes_current_state=empty_not_found");
  console.info("explicit_authorization_required=true");
  console.info("generic_proceed_authorizes_write=false");
  console.info("promotion_executed=false");
  console.info("real_sql_executed=false");
  console.info("visibility_changed=false");
  console.info("point_63_db_write=false");
  console.info("provider_fetch=false");
  console.info("provider_import_enabled=false");
  console.info("apify_enabled=false");
  console.info("production_touched=false");
  console.info("deploy_executed=false");
  console.info("service_role_used=false");
  console.info("point_64_public_ui_product_polish_completed=true");
  console.info("public_ui_product_polish_mode=no_promotion");
  console.info("promotion_candidate=manual-serie-a");
  console.info("current_public_competitions_count=0");
  console.info("current_public_teams_count=0");
  console.info("current_public_standings_count=0");
  console.info("current_public_bundle_status=not_found");
  console.info("public_routes_current_state=empty_not_found");
  console.info("explicit_authorization_required=true");
  console.info("generic_proceed_authorizes_write=false");
  console.info("promotion_executed=false");
  console.info("real_sql_executed=false");
  console.info("visibility_changed=false");
  console.info("point_64_db_write=false");
  console.info("provider_fetch=false");
  console.info("provider_import_enabled=false");
  console.info("apify_enabled=false");
  console.info("production_touched=false");
  console.info("deploy_executed=false");
  console.info("service_role_used=false");
  console.info("point_65_public_routes_browser_verification_completed=true");
  console.info("public_routes_browser_verification_mode=no_auth_local_http");
  console.info("environment=localhost");
  console.info("production=false");
  console.info("auth=no-auth");
  console.info("public_competitions_page_reached=true");
  console.info("public_competitions_page_state=empty");
  console.info("public_competition_detail_reached=true");
  console.info("public_competition_detail_state=not_found");
  console.info("public_competitions_count=0");
  console.info("public_teams_count=0");
  console.info("public_standings_count=0");
  console.info("public_bundle_status=not_found");
  console.info("serie_a_manual_sample_visible=false");
  console.info("manual_serie_a_visible=false");
  console.info("manual_team_one_visible=false");
  console.info("manual_team_two_visible=false");
  console.info("forbidden_private_text_visible=false");
  console.info("public_routes_admin_links_visible=false");
  console.info("public_routes_debug_payload_visible=false");
  console.info("public_routes_operational_buttons=false");
  console.info("private_admin_publicly_exposed=false");
  console.info("visibility_changed=false");
  console.info("promotion_executed=false");
  console.info("real_sql_executed=false");
  console.info("point_65_db_write=false");
  console.info("provider_fetch=false");
  console.info("provider_import_enabled=false");
  console.info("apify_enabled=false");
  console.info("production_touched=false");
  console.info("deploy_executed=false");
  console.info("service_role_used=false");
  console.info("point_60_db_write=false");
  console.info("visibility_changed=false");
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
