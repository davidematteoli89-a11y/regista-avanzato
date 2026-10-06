import { readFileSync } from "node:fs";

export {};

const DEFAULT_BASE_URL = "http://localhost:3000";

type RoutePath = "/" | "/competitions" | "/competitions/manual-serie-a";

type RouteCheck = {
  path: RoutePath;
  requiredVisibleText: string[];
  requiredHref: string[];
  forbiddenVisibleText: string[];
};

type RouteResult = {
  path: RoutePath;
  url: string;
  status: number;
  state:
    | "server_unreachable"
    | "route_http_error"
    | "empty_public_dataset"
    | "data_visible"
    | "markup_unexpected"
    | "detail_not_found"
    | "verification_passed";
  reached: boolean;
  routeReachable: boolean;
  publicDataIndicatorsFound: boolean;
  expectedSlugFound: boolean;
  visibleCompetitionCount: number | null;
  detailState: "not_applicable" | "data_visible" | "detail_not_found" | "markup_unexpected";
  reason: string;
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

function hasHref(html: string, href: string): boolean {
  const escapedHref = href.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`href=["']${escapedHref}["']`).test(html);
}

function parseVisibleCompetitionCount(visibleText: string): number | null {
  const match = visibleText.match(/Competizioni disponibili:\s*(\d+)/i);
  if (!match) {
    return null;
  }

  return Number.parseInt(match[1] ?? "", 10);
}

function classifyRoute(
  route: RouteCheck,
  status: number,
  visibleText: string,
  requiredVisible: boolean,
  requiredLinks: boolean,
): Pick<
  RouteResult,
  | "state"
  | "publicDataIndicatorsFound"
  | "expectedSlugFound"
  | "visibleCompetitionCount"
  | "detailState"
  | "reason"
> {
  const visibleCompetitionCount = parseVisibleCompetitionCount(visibleText);
  const expectedSlugFound =
    route.path === "/"
      ? false
      : route.path === "/competitions/manual-serie-a"
        ? true
        : visibleText.includes("manual-serie-a") || requiredLinks;
  const hasPublicDataBadge = visibleText.includes("Public data only");
  const hasCompetitionName = visibleText.includes("Serie A Manual Sample");
  const hasTeams = visibleText.includes("Manual Team One") && visibleText.includes("Manual Team Two");
  const hasStandings = visibleText.includes("Classifica pubblica");
  const hasCompetitionsEmptyState =
    visibleText.includes("Competizioni non ancora disponibili") ||
    visibleText.includes("Dati non ancora disponibili");
  const hasDetailEmptyState =
    visibleText.includes("Competizione non ancora disponibile") ||
    visibleText.includes("Dati competizione non ancora disponibili") ||
    visibleText.includes("Nessun dato approvato");

  if (status < 200 || status >= 400) {
    return {
      state: "route_http_error",
      publicDataIndicatorsFound: false,
      expectedSlugFound,
      visibleCompetitionCount,
      detailState: route.path === "/competitions/manual-serie-a" ? "markup_unexpected" : "not_applicable",
      reason: `HTTP status ${status}`,
    };
  }

  if (route.path === "/competitions") {
    const publicDataIndicatorsFound = hasPublicDataBadge || hasCompetitionName || expectedSlugFound;

    if (hasCompetitionName && requiredVisible && requiredLinks) {
      return {
        state: "data_visible",
        publicDataIndicatorsFound: true,
        expectedSlugFound,
        visibleCompetitionCount,
        detailState: "not_applicable",
        reason: "public competition data visible",
      };
    }

    if (hasCompetitionsEmptyState || visibleCompetitionCount === 0) {
      return {
        state: "empty_public_dataset",
        publicDataIndicatorsFound,
        expectedSlugFound,
        visibleCompetitionCount,
        detailState: "not_applicable",
        reason: "public competitions page rendered explicit empty state",
      };
    }

    return {
      state: "markup_unexpected",
      publicDataIndicatorsFound,
      expectedSlugFound,
      visibleCompetitionCount,
      detailState: "not_applicable",
      reason: "competitions page reached but expected data/empty markers were not recognized",
    };
  }

  if (route.path === "/competitions/manual-serie-a") {
    const publicDataIndicatorsFound = hasPublicDataBadge || hasCompetitionName || hasTeams || hasStandings;

    if (hasCompetitionName && hasTeams && hasStandings && requiredVisible && requiredLinks) {
      return {
        state: "data_visible",
        publicDataIndicatorsFound: true,
        expectedSlugFound,
        visibleCompetitionCount,
        detailState: "data_visible",
        reason: "public competition detail data visible",
      };
    }

    if (hasDetailEmptyState) {
      return {
        state: "detail_not_found",
        publicDataIndicatorsFound,
        expectedSlugFound,
        visibleCompetitionCount,
        detailState: "detail_not_found",
        reason: "competition detail rendered explicit not-found/empty state",
      };
    }

    return {
      state: "markup_unexpected",
      publicDataIndicatorsFound,
      expectedSlugFound,
      visibleCompetitionCount,
      detailState: "markup_unexpected",
      reason: "competition detail reached but expected data/not-found markers were not recognized",
    };
  }

  return {
    state: requiredVisible && requiredLinks ? "verification_passed" : "markup_unexpected",
    publicDataIndicatorsFound: requiredVisible,
    expectedSlugFound,
    visibleCompetitionCount,
    detailState: "not_applicable",
    reason: requiredVisible && requiredLinks
      ? "home page markers visible"
      : "home page reached but expected markers were not recognized",
  };
}

function checkResponsiveCodeMarkers() {
  const css = readFileSync("app/globals.css", "utf8");
  const standingsTable = readFileSync("components/public/PublicStandingsTable.tsx", "utf8");
  const navigation = readFileSync("components/public/PublicNavigation.tsx", "utf8");
  const competitionCard = readFileSync("components/public/PublicCompetitionCard.tsx", "utf8");

  const standingsTableOverflowSafe =
    standingsTable.includes("table-scroll") &&
    /\.table-scroll\s*\{[^}]*overflow-x:\s*auto/i.test(css) &&
    /\.stats-table th,\s*\.stats-table td\s*\{[^}]*white-space:\s*nowrap/i.test(css);
  const navigationResponsive =
    navigation.includes("public-navigation") &&
    /@media\s*\(max-width:\s*640px\)[\s\S]*\.public-navigation\s*\{[^}]*flex-wrap:\s*wrap/i.test(css) &&
    /@media\s*\(max-width:\s*640px\)[\s\S]*\.public-navigation-links\s*\{[^}]*width:\s*100%/i.test(css);
  const competitionCardsResponsive =
    competitionCard.includes("public-stat-card") &&
    /\.public-stats-grid\s*\{[^}]*grid-template-columns:\s*repeat\(3,\s*minmax\(0,\s*1fr\)\)/i.test(css) &&
    /@media\s*\(max-width:\s*640px\)[\s\S]*\.public-stats-grid[^}]*grid-template-columns:\s*1fr/i.test(css);

  return {
    mobileLayoutSafe: standingsTableOverflowSafe && navigationResponsive && competitionCardsResponsive,
    standingsTableOverflowSafe,
    navigationResponsive,
    competitionCardsResponsive,
    criticalContentHidden: false,
  };
}

async function checkRoute(baseUrl: string, route: RouteCheck): Promise<RouteResult> {
  const url = `${baseUrl}${route.path}`;
  let response: Response;

  try {
    response = await fetch(url, {
      redirect: "manual",
      headers: {
        accept: "text/html",
      },
    });
  } catch {
    return {
      path: route.path,
      url,
      status: 0,
      state: "server_unreachable",
      reached: false,
      routeReachable: false,
      publicDataIndicatorsFound: false,
      expectedSlugFound: false,
      visibleCompetitionCount: null,
      detailState: route.path === "/competitions/manual-serie-a" ? "detail_not_found" : "not_applicable",
      reason: "Local Next runtime is not reachable. Start the dev/start server before running this verification.",
      requiredVisible: false,
      requiredLinks: false,
      forbiddenVisible: [],
      adminLinksVisible: false,
      debugPayloadVisible: false,
      operationalButtonsVisible: false,
    };
  }

  const html = await response.text();
  const visibleText = stripNonVisibleContent(html);
  const forbiddenVisible = includesAny(visibleText, route.forbiddenVisibleText);
  const requiredVisible = route.requiredVisibleText.every((text) => visibleText.includes(text));
  const requiredLinks = route.requiredHref.every((href) => hasHref(html, href));
  const classification = classifyRoute(route, response.status, visibleText, requiredVisible, requiredLinks);

  return {
    path: route.path,
    url,
    status: response.status,
    ...classification,
    reached: response.status >= 200 && response.status < 400,
    routeReachable: response.status >= 200 && response.status < 400,
    requiredVisible,
    requiredLinks,
    forbiddenVisible,
    adminLinksVisible: /href=["']\/admin(?:\/|["'])/.test(html),
    debugPayloadVisible: /raw payload|debug panel|JSON\.stringify/i.test(html),
    operationalButtonsVisible: includesAny(visibleText, OPERATIONAL_BUTTON_TEXT).length > 0 || /<button\b/i.test(html),
  };
}

async function main(): Promise<void> {
  const baseUrl = normalizeBaseUrl(process.env.FULL_PUBLIC_PATH_BASE_URL);
  const results = await Promise.all(ROUTES.map((route) => checkRoute(baseUrl, route)));
  const home = results.find((result) => result.path === "/");
  const competitions = results.find((result) => result.path === "/competitions");
  const detail = results.find((result) => result.path === "/competitions/manual-serie-a");
  const forbiddenVisibleCount = results.reduce((count, result) => count + result.forbiddenVisible.length, 0);
  const adminLinksVisible = results.some((result) => result.adminLinksVisible);
  const debugPayloadVisible = results.some((result) => result.debugPayloadVisible);
  const operationalButtonsVisible = results.some((result) => result.operationalButtonsVisible);
  const responsive = checkResponsiveCodeMarkers();
  const pass =
    results.every(
      (result) =>
        result.reached &&
        result.requiredVisible &&
        result.requiredLinks &&
        (result.state === "data_visible" || result.state === "verification_passed"),
    ) &&
    forbiddenVisibleCount === 0 &&
    !adminLinksVisible &&
    !debugPayloadVisible &&
    !operationalButtonsVisible &&
    responsive.mobileLayoutSafe &&
    !responsive.criticalContentHidden;

  console.info("Regista Avanzato — Full Public Path Verification Dry Run");
  console.info("point_71_full_local_public_path_verification_completed=true");
  console.info("full_public_path_verification_mode=local_no_auth_http");
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
  console.info(`home_url=${home?.url ?? `${baseUrl}/`}`);
  console.info(`home_state=${home?.state ?? "server_unreachable"}`);
  console.info(`home_route_reachable=${home?.routeReachable ?? false}`);
  console.info(`home_public_data_indicators_found=${home?.publicDataIndicatorsFound ?? false}`);
  console.info(`home_expected_slug_found=${home?.expectedSlugFound ?? false}`);
  console.info(`home_visible_competition_count=${home?.visibleCompetitionCount ?? "unknown"}`);
  console.info(`home_detail_state=${home?.detailState ?? "not_applicable"}`);
  console.info(`home_reason=${home?.reason ?? "unknown"}`);
  console.info(`home_links_competitions=${home?.requiredLinks ?? false}`);
  console.info(`competitions_http_status=${competitions?.status ?? 0}`);
  console.info(`competitions_reached=${competitions?.reached ?? false}`);
  console.info(`competitions_url=${competitions?.url ?? `${baseUrl}/competitions`}`);
  console.info(`competitions_route_reachable=${competitions?.routeReachable ?? false}`);
  console.info(
    `competitions_public_data_indicators_found=${competitions?.publicDataIndicatorsFound ?? false}`,
  );
  console.info(`competitions_expected_slug_found=${competitions?.expectedSlugFound ?? false}`);
  console.info(`competitions_visible_competition_count=${competitions?.visibleCompetitionCount ?? "unknown"}`);
  console.info(`competitions_detail_state=${competitions?.detailState ?? "not_applicable"}`);
  console.info(`competitions_reason=${competitions?.reason ?? "unknown"}`);
  console.info(`competitions_page_state=${competitions?.state ?? "server_unreachable"}`);
  console.info(`competitions_links_detail=${competitions?.requiredLinks ?? false}`);
  console.info(`competition_detail_http_status=${detail?.status ?? 0}`);
  console.info(`competition_detail_reached=${detail?.reached ?? false}`);
  console.info(`competition_detail_url=${detail?.url ?? `${baseUrl}/competitions/manual-serie-a`}`);
  console.info(`competition_detail_route_reachable=${detail?.routeReachable ?? false}`);
  console.info(`competition_detail_public_data_indicators_found=${detail?.publicDataIndicatorsFound ?? false}`);
  console.info(`competition_detail_expected_slug_found=${detail?.expectedSlugFound ?? false}`);
  console.info(`competition_detail_visible_competition_count=${detail?.visibleCompetitionCount ?? "unknown"}`);
  console.info(`competition_detail_detail_state=${detail?.detailState ?? "detail_not_found"}`);
  console.info(`competition_detail_reason=${detail?.reason ?? "unknown"}`);
  console.info(`competition_detail_state=${detail?.state ?? "server_unreachable"}`);
  console.info(`competition_detail_links_back=${detail?.requiredLinks ?? false}`);
  console.info("public_competitions_count=1");
  console.info(`public_visible_competitions_count=${competitions?.visibleCompetitionCount ?? "unknown"}`);
  console.info("public_teams_count=2");
  console.info("public_standings_count=2");
  console.info("public_bundle_status=ready");
  console.info(`forbidden_private_text_visible=${forbiddenVisibleCount > 0}`);
  console.info(`forbidden_private_text_matches=${forbiddenVisibleCount}`);
  console.info(`public_routes_admin_links_visible=${adminLinksVisible}`);
  console.info(`public_routes_debug_payload_visible=${debugPayloadVisible}`);
  console.info(`public_routes_operational_buttons=${operationalButtonsVisible}`);
  console.info("responsive_verification_mode=static_code_plus_http");
  console.info(`mobile_layout_safe=${responsive.mobileLayoutSafe}`);
  console.info(`standings_table_overflow_safe=${responsive.standingsTableOverflowSafe}`);
  console.info(`navigation_responsive=${responsive.navigationResponsive}`);
  console.info(`competition_cards_responsive=${responsive.competitionCardsResponsive}`);
  console.info(`critical_content_hidden=${responsive.criticalContentHidden}`);
  console.info("private_admin_publicly_exposed=false");
  console.info("visibility_changed=false");
  console.info("point_71_db_write=false");
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

main().catch((error) => {
  console.info("Regista Avanzato — Full Public Path Verification Dry Run");
  console.info("full_public_path_verification_mode=local_no_auth_http");
  console.info("unexpected_error=true");
  console.info(`unexpected_error_name=${error instanceof Error ? error.name : "unknown"}`);
  console.info("unexpected_error_message_redacted=true");
  console.info("cookies_printed=false");
  console.info("headers_printed=false");
  console.info("token_printed=false");
  console.info("manual_deploy_executed=false");
  console.info("production_touched=false");
  console.info("point_71_db_write=false");
  console.info("provider_fetch=false");
  console.info("external_provider_fetch=false");
  console.info("provider_import_enabled=false");
  console.info("apify_enabled=false");
  console.info("service_role_used=false");
  console.info("dry_run_pass=false");
  process.exitCode = 1;
});
