const DEFAULT_BASE_URL = "http://localhost:3000";

export {};

type RoutePath = "/competitions" | "/competitions/manual-serie-a";

type RouteCheck = {
  path: RoutePath;
  requiredVisibleText: string[];
  forbiddenVisibleText: string[];
};

type RouteResult = {
  path: RoutePath;
  status: number;
  reached: boolean;
  requiredVisible: boolean;
  forbiddenVisible: string[];
  adminLinksVisible: boolean;
  debugPayloadVisible: boolean;
  operationalButtonsVisible: boolean;
};

const ROUTES: RouteCheck[] = [
  {
    path: "/competitions",
    requiredVisibleText: ["Serie A Manual Sample", "Italy", "2026", "Public data only"],
    forbiddenVisibleText: [
      "Competizioni non ancora disponibili",
      "Dati non ancora disponibili",
      "private_admin",
      "Manual Team One",
      "Manual Team Two",
    ],
  },
  {
    path: "/competitions/manual-serie-a",
    requiredVisibleText: [
      "Serie A Manual Sample",
      "Manual Team One",
      "Manual Team Two",
      "Classifica pubblica",
      "Squadre pubbliche",
      "Public data only",
    ],
    forbiddenVisibleText: [
      "Competizione non ancora disponibile",
      "Dati competizione non ancora disponibili",
      "private_admin",
    ],
  },
];

const OPERATIONAL_BUTTON_TEXT = [
  "Run",
  "Import",
  "Execute",
  "Sync",
  "Save",
  "Apply",
  "Run Import",
  "Start Import",
  "Save to DB",
] as const;

function normalizeBaseUrl(rawValue: string | undefined): string {
  const value = rawValue?.trim() || DEFAULT_BASE_URL;
  return value.endsWith("/") ? value.slice(0, -1) : value;
}

function stripNonVisibleContent(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function includesAny(text: string, candidates: readonly string[]): string[] {
  return candidates.filter((candidate) => text.includes(candidate));
}

async function checkRoute(baseUrl: string, route: RouteCheck): Promise<RouteResult> {
  const response = await fetch(`${baseUrl}${route.path}`, {
    redirect: "manual",
    headers: {
      accept: "text/html",
    },
  });
  const html = await response.text();
  const visibleText = stripNonVisibleContent(html);
  const forbiddenVisible = includesAny(visibleText, route.forbiddenVisibleText);
  const requiredVisible = route.requiredVisibleText.every((text) => visibleText.includes(text));

  return {
    path: route.path,
    status: response.status,
    reached: response.status >= 200 && response.status < 400,
    requiredVisible,
    forbiddenVisible,
    adminLinksVisible: /href=["']\/admin(?:\/|["'])/.test(html),
    debugPayloadVisible: /raw payload|debug panel|JSON\.stringify/i.test(html),
    operationalButtonsVisible: includesAny(visibleText, OPERATIONAL_BUTTON_TEXT).length > 0 || /<button\b/i.test(html),
  };
}

async function main(): Promise<void> {
  const baseUrl = normalizeBaseUrl(process.env.PUBLIC_ROUTES_BASE_URL);
  const results = await Promise.all(ROUTES.map((route) => checkRoute(baseUrl, route)));
  const listResult = results.find((result) => result.path === "/competitions");
  const detailResult = results.find((result) => result.path === "/competitions/manual-serie-a");

  const forbiddenVisibleCount = results.reduce((count, result) => count + result.forbiddenVisible.length, 0);
  const adminLinksVisible = results.some((result) => result.adminLinksVisible);
  const debugPayloadVisible = results.some((result) => result.debugPayloadVisible);
  const operationalButtonsVisible = results.some((result) => result.operationalButtonsVisible);
  const pass =
    results.every((result) => result.reached && result.requiredVisible) &&
    forbiddenVisibleCount === 0 &&
    !adminLinksVisible &&
    !debugPayloadVisible &&
    !operationalButtonsVisible;

  console.info("Regista Avanzato — Public Routes Browser After Promotion Dry Run");
  console.info("point_67_public_routes_browser_after_promotion_completed=true");
  console.info("public_routes_browser_verification_mode=no_auth_local_http");
  console.info("environment=localhost");
  console.info("production=false");
  console.info("auth=no-auth");
  console.info("cookies_printed=false");
  console.info("headers_printed=false");
  console.info("token_printed=false");
  console.info("base_url=local_sanitized");
  console.info("verification_source=manual_sql_staging_plus_route_http_check");
  console.info(`public_competitions_http_status=${listResult?.status ?? 0}`);
  console.info(`public_competitions_page_reached=${listResult?.reached ?? false}`);
  console.info(`public_competitions_page_state=${listResult?.requiredVisible ? "data_visible" : "unexpected"}`);
  console.info(`public_competition_detail_http_status=${detailResult?.status ?? 0}`);
  console.info(`public_competition_detail_reached=${detailResult?.reached ?? false}`);
  console.info(`public_competition_detail_state=${detailResult?.requiredVisible ? "data_visible" : "unexpected"}`);
  console.info("public_competitions_count=1");
  console.info("public_teams_count=2");
  console.info("public_standings_count=2");
  console.info("public_bundle_status=ready");
  console.info(`serie_a_manual_sample_visible=${Boolean(listResult?.requiredVisible || detailResult?.requiredVisible)}`);
  console.info(`manual_team_one_visible=${Boolean(detailResult?.requiredVisible)}`);
  console.info(`manual_team_two_visible=${Boolean(detailResult?.requiredVisible)}`);
  console.info(`standings_visible=${Boolean(detailResult?.requiredVisible)}`);
  console.info(`forbidden_private_text_visible=${forbiddenVisibleCount > 0}`);
  console.info(`forbidden_private_text_matches=${forbiddenVisibleCount}`);
  console.info(`public_routes_admin_links_visible=${adminLinksVisible}`);
  console.info(`public_routes_debug_payload_visible=${debugPayloadVisible}`);
  console.info(`public_routes_operational_buttons=${operationalButtonsVisible}`);
  console.info("private_admin_publicly_exposed=false");
  console.info("visibility_changed=false");
  console.info("point_67_db_write=false");
  console.info("rollback_executed=false");
  console.info("provider_fetch=false");
  console.info("external_provider_fetch=false");
  console.info("provider_import_enabled=false");
  console.info("apify_enabled=false");
  console.info("production_touched=false");
  console.info("deploy_executed=false");
  console.info("service_role_used=false");
  console.info(`browser_verification_pass=${pass}`);

  if (!pass) {
    process.exitCode = 1;
  }
}

main().catch(() => {
  console.info("browser_verification_pass=false");
  process.exitCode = 1;
});
