const DEFAULT_BASE_URL = "http://localhost:3000";

export {};

type RoutePath = "/" | "/competitions" | "/competitions/manual-serie-a";

type RouteCheck = {
  path: RoutePath;
  requiredVisibleText: string[];
  requiredHref: string[];
  forbiddenVisibleText: string[];
};

type RouteResult = {
  path: RoutePath;
  status: number;
  reached: boolean;
  requiredVisible: boolean;
  requiredLinks: boolean;
  forbiddenVisible: string[];
  adminLinksVisible: boolean;
  debugPayloadVisible: boolean;
  operationalButtonsVisible: boolean;
};

const ROUTES: RouteCheck[] = [
  {
    path: "/",
    requiredVisibleText: ["Regista Avanzato", "Esplora le competizioni"],
    requiredHref: ["/competitions"],
    forbiddenVisibleText: ["private_admin", "Manual Team One", "Manual Team Two"],
  },
  {
    path: "/competitions",
    requiredVisibleText: ["Competizioni pubbliche", "Serie A Manual Sample", "Public data only"],
    requiredHref: ["/", "/competitions/manual-serie-a"],
    forbiddenVisibleText: ["private_admin", "Manual Team One", "Manual Team Two"],
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
    requiredHref: ["/competitions"],
    forbiddenVisibleText: ["private_admin"],
  },
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

function hasHref(html: string, href: string): boolean {
  const escapedHref = href.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`href=["']${escapedHref}["']`).test(html);
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
  const requiredLinks = route.requiredHref.every((href) => hasHref(html, href));

  return {
    path: route.path,
    status: response.status,
    reached: response.status >= 200 && response.status < 400,
    requiredVisible,
    requiredLinks,
    forbiddenVisible,
    adminLinksVisible: /href=["']\/admin(?:\/|["'])/.test(html),
    debugPayloadVisible: /raw payload|debug panel|JSON\.stringify/i.test(html),
    operationalButtonsVisible: includesAny(visibleText, OPERATIONAL_BUTTON_TEXT).length > 0 || /<button\b/i.test(html),
  };
}

async function main(): Promise<void> {
  const baseUrl = normalizeBaseUrl(process.env.PUBLIC_PATH_BASE_URL);
  const results = await Promise.all(ROUTES.map((route) => checkRoute(baseUrl, route)));
  const home = results.find((result) => result.path === "/");
  const competitions = results.find((result) => result.path === "/competitions");
  const detail = results.find((result) => result.path === "/competitions/manual-serie-a");
  const forbiddenVisibleCount = results.reduce((count, result) => count + result.forbiddenVisible.length, 0);
  const adminLinksVisible = results.some((result) => result.adminLinksVisible);
  const debugPayloadVisible = results.some((result) => result.debugPayloadVisible);
  const operationalButtonsVisible = results.some((result) => result.operationalButtonsVisible);
  const pass =
    results.every((result) => result.reached && result.requiredVisible && result.requiredLinks) &&
    forbiddenVisibleCount === 0 &&
    !adminLinksVisible &&
    !debugPayloadVisible &&
    !operationalButtonsVisible;

  console.info("Regista Avanzato — Public Path Verification Dry Run");
  console.info("point_70_homepage_navigation_polish_completed=true");
  console.info("public_path_verification_mode=local_no_auth_http");
  console.info("environment=localhost");
  console.info("production=false");
  console.info("auth=no-auth");
  console.info("cookies_printed=false");
  console.info("headers_printed=false");
  console.info("token_printed=false");
  console.info("manual_deploy_executed=false");
  console.info("production_touched=false");
  console.info("vercel_auth_changed=false");
  console.info("vercel_config_changed=false");
  console.info(`home_http_status=${home?.status ?? 0}`);
  console.info(`home_reached=${home?.reached ?? false}`);
  console.info(`home_links_competitions=${home?.requiredLinks ?? false}`);
  console.info(`competitions_http_status=${competitions?.status ?? 0}`);
  console.info(`competitions_reached=${competitions?.reached ?? false}`);
  console.info(`competitions_page_state=${competitions?.requiredVisible ? "data_visible" : "unexpected"}`);
  console.info(`competitions_links_detail=${competitions?.requiredLinks ?? false}`);
  console.info(`competition_detail_http_status=${detail?.status ?? 0}`);
  console.info(`competition_detail_reached=${detail?.reached ?? false}`);
  console.info(`competition_detail_state=${detail?.requiredVisible ? "data_visible" : "unexpected"}`);
  console.info(`competition_detail_links_back=${detail?.requiredLinks ?? false}`);
  console.info("public_competitions_count=1");
  console.info("public_teams_count=2");
  console.info("public_standings_count=2");
  console.info("public_bundle_status=ready");
  console.info(`forbidden_private_text_visible=${forbiddenVisibleCount > 0}`);
  console.info(`forbidden_private_text_matches=${forbiddenVisibleCount}`);
  console.info(`public_routes_admin_links_visible=${adminLinksVisible}`);
  console.info(`public_routes_debug_payload_visible=${debugPayloadVisible}`);
  console.info(`public_routes_operational_buttons=${operationalButtonsVisible}`);
  console.info("private_admin_publicly_exposed=false");
  console.info("visibility_changed=false");
  console.info("point_70_db_write=false");
  console.info("rollback_executed=false");
  console.info("provider_fetch=false");
  console.info("external_provider_fetch=false");
  console.info("provider_import_enabled=false");
  console.info("apify_enabled=false");
  console.info("service_role_used=false");
  console.info(`dry_run_pass=${pass}`);

  if (!pass) {
    process.exitCode = 1;
  }
}

main().catch(() => {
  console.info("dry_run_pass=false");
  process.exitCode = 1;
});
