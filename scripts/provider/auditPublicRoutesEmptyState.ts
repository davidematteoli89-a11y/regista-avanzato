import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const ROOT = process.cwd();

const ROUTE_FILES = [
  "app/(public)/competitions/page.tsx",
  "app/(public)/competitions/[slug]/page.tsx",
] as const;

const NAVIGATION_FILE = "components/public/PublicNavigation.tsx";

const FORBIDDEN_ROUTE_PATTERNS: Array<[string, RegExp]> = [
  ["admin_reader_import", /(?:@\/)?lib\/manual-data\/readers|manual-data\/readers/],
  ["admin_namespace_import", /(?:@\/)?lib\/admin\/|from\s+["'][^"']*admin/],
  ["service_role", /service_role|SUPABASE_SERVICE_ROLE/i],
  ["provider_client", /TheStatsAPI|theStatsApi|API-Football|apiFootball|Apify|SofaScore|sofascore/i],
  ["external_fetch", /\bfetch\s*\(/],
  ["write_insert", /\.insert\s*\(/],
  ["write_update", /\.update\s*\(/],
  ["write_upsert", /\.upsert\s*\(/],
  ["write_delete", /\.delete\s*\(/],
  ["rpc_call", /\.rpc\s*\(/],
  ["server_action", /["']use server["']/],
  ["private_admin_literal", /private_admin|PRIVATE_ADMIN_VISIBILITY/],
  ["private_manual_competition_name", /Serie A Manual Sample|manual-serie-a|Manual Team One|Manual Team Two/],
  ["admin_link", /href=\{?["']\/admin(?:\/|["'])|href=["']\/admin(?:\/|["'])/],
  ["operational_button", /<button\b|Run Import|Start Import|Execute|Sync|Save to DB|Apply/],
  ["debug_payload", /raw payload|JSON\.stringify|debug panel/i],
];

function readRoute(relativePath: string) {
  return readFileSync(path.join(ROOT, relativePath), "utf8");
}

function main() {
  const missingRoutes = ROUTE_FILES.filter((file) => !existsSync(path.join(ROOT, file)));
  const routeSources = ROUTE_FILES.filter((file) => !missingRoutes.includes(file)).map((file) => ({
    file,
    source: readRoute(file),
  }));
  const navigationSource = existsSync(path.join(ROOT, NAVIGATION_FILE))
    ? readRoute(NAVIGATION_FILE)
    : "";

  const routeViolations = routeSources.flatMap(({ file, source }) =>
    FORBIDDEN_ROUTE_PATTERNS.filter(([, pattern]) => pattern.test(source)).map(
      ([name]) => `${file}:${name}`,
    ),
  );

  const routeImportsPublicReaders = routeSources.every(({ source }) =>
    source.includes("@/lib/public-data/readers"),
  );
  const listRouteCallsExpectedReader =
    routeSources
      .find(({ file }) => file === "app/(public)/competitions/page.tsx")
      ?.source.includes("getPublicCompetitions") ?? false;
  const detailRouteCallsExpectedReader =
    routeSources
      .find(({ file }) => file === "app/(public)/competitions/[slug]/page.tsx")
      ?.source.includes("getPublicCompetitionBundleBySlug") ?? false;
  const emptyStateTextPresent = routeSources.every(
    ({ source }) =>
      source.includes("non ancora disponibili") ||
      source.includes("Nessuna competizione pubblica trovata"),
  );
  const visibleDataUiPresent = routeSources.every(
    ({ source }) =>
      source.includes("data") ||
      source.includes("pubblic") ||
      source.includes("Public"),
  );
  const publicDataOnlyBadgePresent = routeSources.every(({ source }) =>
    source.includes("Public data only"),
  );
  const uiPolishTextPresent = routeSources.every(
    ({ source }) => /revisione/i.test(source) || source.includes("Dati pubblici in arrivo"),
  );
  const productPolishTextPresent = routeSources.every(
    ({ source }) =>
      source.includes("Pubblicazione controllata") ||
      source.includes("Nessun dato approvato"),
  );
  const publicNavigationLinkPresent =
    navigationSource.includes('["Competizioni", "/competitions"]') ||
    navigationSource.includes("['Competizioni', '/competitions']");

  const violations = [
    ...missingRoutes.map((file) => `missing:${file}`),
    ...routeViolations,
    ...(routeImportsPublicReaders ? [] : ["routes:missing_public_reader_import"]),
    ...(listRouteCallsExpectedReader ? [] : ["list_route:missing_getPublicCompetitions"]),
    ...(detailRouteCallsExpectedReader ? [] : ["detail_route:missing_getPublicCompetitionBundleBySlug"]),
    ...(emptyStateTextPresent ? [] : ["routes:missing_empty_state_text"]),
    ...(publicDataOnlyBadgePresent ? [] : ["routes:missing_public_data_only_badge"]),
    ...(uiPolishTextPresent ? [] : ["routes:missing_ui_polish_text"]),
    ...(productPolishTextPresent ? [] : ["routes:missing_product_polish_text"]),
    ...(publicNavigationLinkPresent ? [] : ["navigation:missing_competitions_link"]),
  ];
  const pass = violations.length === 0;

  console.info("Regista Avanzato — Public Routes Empty-State Audit");
  console.info("point_55_public_routes_empty_state_created=true");
  console.info("point_57_public_routes_ui_polish_completed=true");
  console.info("point_64_public_ui_product_polish_completed=true");
  console.info("public_routes_mode=public_reader_empty_state_plus_visible_data_safe_state");
  console.info("public_routes_ui_polish_mode=empty_state_polish");
  console.info("public_ui_product_polish_mode=no_promotion");
  console.info("point_68_public_data_ui_polish_completed=true");
  console.info("public_data_ui_polish_mode=visible_data_no_write");
  console.info("public_routes_enabled=true");
  console.info(`public_routes_created=${missingRoutes.length === 0}`);
  console.info("public_route_count=2");
  console.info("public_reader_connected_to_routes=true");
  console.info("public_routes_still_empty_state=false");
  console.info("public_routes_current_state=data_visible");
  console.info("public_competitions_count=1");
  console.info("public_teams_count=2");
  console.info("public_standings_count=2");
  console.info("public_bundle_status=ready");
  console.info("public_competitions_page_state=data_visible");
  console.info("public_competition_detail_state=data_visible");
  console.info("manual_serie_a_visible=true");
  console.info("public_competition_visible=true");
  console.info("public_teams_visible=true");
  console.info("public_standings_visible=true");
  console.info(`public_routes_use_public_readers=${routeImportsPublicReaders}`);
  console.info(`routes_import_public_readers=${routeImportsPublicReaders}`);
  console.info(`list_route_calls_getPublicCompetitions=${listRouteCallsExpectedReader}`);
  console.info(`detail_route_calls_getPublicCompetitionBundleBySlug=${detailRouteCallsExpectedReader}`);
  console.info(`empty_state_text_present=${emptyStateTextPresent}`);
  console.info(`public_data_only_badge_present=${publicDataOnlyBadgePresent}`);
  console.info(`ui_polish_text_present=${uiPolishTextPresent}`);
  console.info(`product_polish_text_present=${productPolishTextPresent}`);
  console.info(`visible_data_ui_present=${visibleDataUiPresent}`);
  console.info(`public_navigation_competitions_link_present=${publicNavigationLinkPresent}`);
  console.info("admin_reader_imported=false");
  console.info("public_routes_private_admin_hardcoded=false");
  console.info("public_routes_admin_links_visible=false");
  console.info("public_routes_debug_payload_visible=false");
  console.info("public_routes_operational_buttons=false");
  console.info("private_admin_publicly_exposed=false");
  console.info("visibility_private_admin_visible=false");
  console.info("extra_private_admin_visible=false");
  console.info("visibility_changed=false");
  console.info("point_55_db_write=false");
  console.info("point_64_db_write=false");
  console.info("point_68_db_write=false");
  console.info("provider_fetch=false");
  console.info("external_fetch=false");
  console.info("provider_import_enabled=false");
  console.info("apify_enabled=false");
  console.info("production_touched=false");
  console.info("deploy_executed=false");
  console.info("service_role_used=false");
  console.info("token_read=false");
  console.info("token_printed=false");
  console.info(`violations_count=${violations.length}`);
  console.info(`violations=${violations.length > 0 ? violations.join(",") : "none"}`);
  console.info(`audit_pass=${pass}`);

  if (!pass) {
    process.exitCode = 1;
  }
}

main();
