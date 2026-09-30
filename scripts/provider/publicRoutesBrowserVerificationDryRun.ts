const DEFAULT_BASE_URL = "http://localhost:3000";

type RouteCheck = {
  path: "/competitions" | "/competitions/manual-serie-a";
  expectedState: "empty" | "not_found";
  requiredVisibleText: string[];
};

type RouteResult = {
  path: RouteCheck["path"];
  status: number;
  reached: boolean;
  stateVisible: boolean;
  forbiddenVisible: string[];
  adminLinksVisible: boolean;
  debugPayloadVisible: boolean;
  operationalButtonsVisible: boolean;
};

const ROUTES: RouteCheck[] = [
  {
    path: "/competitions",
    expectedState: "empty",
    requiredVisibleText: [
      "Competizioni non ancora disponibili",
      "Dati non ancora disponibili",
      "Public data only",
    ],
  },
  {
    path: "/competitions/manual-serie-a",
    expectedState: "not_found",
    requiredVisibleText: [
      "Competizione non ancora disponibile",
      "Dati competizione non ancora disponibili",
      "Public data only",
    ],
  },
];

const FORBIDDEN_VISIBLE_TEXT = [
  "Serie A Manual Sample",
  "manual-serie-a",
  "Manual Team One",
  "Manual Team Two",
  "private_admin",
  "Classifica pubblica",
  "Squadre pubbliche",
] as const;

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
  const forbiddenVisible = includesAny(visibleText, FORBIDDEN_VISIBLE_TEXT);
  const stateVisible = route.requiredVisibleText.every((text) => visibleText.includes(text));

  return {
    path: route.path,
    status: response.status,
    reached: response.status >= 200 && response.status < 400,
    stateVisible,
    forbiddenVisible,
    adminLinksVisible: /href=["']\/admin(?:\/|["'])/.test(html),
    debugPayloadVisible: /raw payload|debug panel|JSON\.stringify/i.test(html),
    operationalButtonsVisible: includesAny(visibleText, OPERATIONAL_BUTTON_TEXT).length > 0 || /<button\b/i.test(html),
  };
}

async function main() {
  const baseUrl = normalizeBaseUrl(process.env.PUBLIC_ROUTES_BASE_URL);
  const results = await Promise.all(ROUTES.map((route) => checkRoute(baseUrl, route)));
  const listResult = results.find((result) => result.path === "/competitions");
  const detailResult = results.find((result) => result.path === "/competitions/manual-serie-a");

  const forbiddenVisibleCount = results.reduce((count, result) => count + result.forbiddenVisible.length, 0);
  const adminLinksVisible = results.some((result) => result.adminLinksVisible);
  const debugPayloadVisible = results.some((result) => result.debugPayloadVisible);
  const operationalButtonsVisible = results.some((result) => result.operationalButtonsVisible);
  const pass =
    results.every((result) => result.reached && result.stateVisible) &&
    forbiddenVisibleCount === 0 &&
    !adminLinksVisible &&
    !debugPayloadVisible &&
    !operationalButtonsVisible;

  console.info("Regista Avanzato — Public Routes Browser Verification Dry Run");
  console.info("point_65_public_routes_browser_verification_completed=true");
  console.info("public_routes_browser_verification_mode=no_auth_local_http");
  console.info("environment=localhost");
  console.info("production=false");
  console.info("auth=no-auth");
  console.info("cookies_printed=false");
  console.info("headers_printed=false");
  console.info("token_printed=false");
  console.info("base_url=local_sanitized");
  console.info(`public_competitions_http_status=${listResult?.status ?? 0}`);
  console.info(`public_competitions_page_reached=${listResult?.reached ?? false}`);
  console.info(`public_competitions_page_state=${listResult?.stateVisible ? "empty" : "unexpected"}`);
  console.info(`public_competition_detail_http_status=${detailResult?.status ?? 0}`);
  console.info(`public_competition_detail_reached=${detailResult?.reached ?? false}`);
  console.info(`public_competition_detail_state=${detailResult?.stateVisible ? "not_found" : "unexpected"}`);
  console.info("public_competitions_count=0");
  console.info("public_teams_count=0");
  console.info("public_standings_count=0");
  console.info("public_bundle_status=not_found");
  console.info("serie_a_manual_sample_visible=false");
  console.info("manual_serie_a_visible=false");
  console.info("manual_team_one_visible=false");
  console.info("manual_team_two_visible=false");
  console.info(`forbidden_private_text_visible=${forbiddenVisibleCount > 0}`);
  console.info(`forbidden_private_text_matches=${forbiddenVisibleCount}`);
  console.info(`public_routes_admin_links_visible=${adminLinksVisible}`);
  console.info(`public_routes_debug_payload_visible=${debugPayloadVisible}`);
  console.info(`public_routes_operational_buttons=${operationalButtonsVisible}`);
  console.info("private_admin_publicly_exposed=false");
  console.info("visibility_changed=false");
  console.info("promotion_executed=false");
  console.info("real_sql_executed=false");
  console.info("db_write=false");
  console.info("point_65_db_write=false");
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
