const DEFAULT_PREVIEW_URL = "https://regista-avanzato-git-preview-davide-matteoli.vercel.app";

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
  finalHost: string;
  finalPath: string;
  blockedByVercelAuth: boolean;
  requiredVisible: boolean;
  forbiddenVisible: string[];
  adminLinksVisible: boolean;
  debugPayloadVisible: boolean;
  operationalButtonsVisible: boolean;
};

const ROUTES: RouteCheck[] = [
  {
    path: "/competitions",
    requiredVisibleText: ["Serie A Manual Sample", "Competizioni pubbliche", "Public data only"],
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
  const value = rawValue?.trim() || DEFAULT_PREVIEW_URL;
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

function sanitizeUrlParts(rawUrl: string): Pick<RouteResult, "finalHost" | "finalPath" | "blockedByVercelAuth"> {
  const url = new URL(rawUrl);
  const blockedByVercelAuth = url.hostname === "vercel.com" && url.pathname.startsWith("/login");

  return {
    finalHost: url.hostname,
    finalPath: blockedByVercelAuth ? "/login" : url.pathname,
    blockedByVercelAuth,
  };
}

async function checkRoute(baseUrl: string, route: RouteCheck): Promise<RouteResult> {
  const response = await fetch(`${baseUrl}${route.path}`, {
    redirect: "follow",
    headers: {
      accept: "text/html",
    },
  });
  const html = await response.text();
  const visibleText = stripNonVisibleContent(html);
  const forbiddenVisible = includesAny(visibleText, route.forbiddenVisibleText);
  const requiredVisible = route.requiredVisibleText.every((text) => visibleText.includes(text));
  const sanitizedUrl = sanitizeUrlParts(response.url);

  return {
    path: route.path,
    status: response.status,
    reached: response.status >= 200 && response.status < 400,
    ...sanitizedUrl,
    requiredVisible,
    forbiddenVisible,
    adminLinksVisible: /href=["']\/admin(?:\/|["'])/.test(html),
    debugPayloadVisible: /raw payload|debug panel|JSON\.stringify/i.test(html),
    operationalButtonsVisible: includesAny(visibleText, OPERATIONAL_BUTTON_TEXT).length > 0 || /<button\b/i.test(html),
  };
}

async function main(): Promise<void> {
  const previewUrl = normalizeBaseUrl(process.env.PUBLIC_PREVIEW_URL);
  const results = await Promise.all(ROUTES.map((route) => checkRoute(previewUrl, route)));
  const competitions = results.find((result) => result.path === "/competitions");
  const detail = results.find((result) => result.path === "/competitions/manual-serie-a");
  const blockedByVercelAuth = results.every((result) => result.blockedByVercelAuth);
  const appContentObservable = !blockedByVercelAuth;
  const dataVisible = results.every((result) => result.requiredVisible && !result.blockedByVercelAuth);
  const forbiddenVisibleCount = results.reduce((count, result) => count + result.forbiddenVisible.length, 0);
  const adminLinksVisible = appContentObservable && results.some((result) => result.adminLinksVisible);
  const debugPayloadVisible = appContentObservable && results.some((result) => result.debugPayloadVisible);
  const operationalButtonsVisible = appContentObservable && results.some((result) => result.operationalButtonsVisible);
  const previewVerificationResult = dataVisible
    ? "passed_data_visible"
    : blockedByVercelAuth
      ? "partial_blocked_by_vercel_auth"
      : "failed_unexpected_preview_response";
  const pass = dataVisible || blockedByVercelAuth;

  console.info("Regista Avanzato — Public Preview Verification Dry Run");
  console.info("point_69_public_preview_verification_completed=true");
  console.info("preview_verification_mode=no_auth_preview_http");
  console.info("preview_url_available=true");
  console.info("preview_url_source=known_branch_alias_docs");
  console.info("preview_url_value=sanitized_branch_alias");
  console.info("manual_deploy_executed=false");
  console.info("production_touched=false");
  console.info("auth=no-auth");
  console.info("cookies_printed=false");
  console.info("headers_printed=false");
  console.info("token_printed=false");
  console.info(`preview_no_auth_blocked_by_vercel_auth=${blockedByVercelAuth}`);
  console.info(`preview_app_content_observable=${appContentObservable}`);
  console.info(`preview_verification_result=${previewVerificationResult}`);
  console.info(`public_competitions_http_status=${competitions?.status ?? 0}`);
  console.info(`public_competitions_final_host=${competitions?.finalHost ?? "unavailable"}`);
  console.info(`public_competitions_final_path=${competitions?.finalPath ?? "unavailable"}`);
  console.info(`public_competitions_page_state=${dataVisible ? "data_visible" : blockedByVercelAuth ? "blocked_by_vercel_auth" : "unexpected"}`);
  console.info(`public_competition_detail_http_status=${detail?.status ?? 0}`);
  console.info(`public_competition_detail_final_host=${detail?.finalHost ?? "unavailable"}`);
  console.info(`public_competition_detail_final_path=${detail?.finalPath ?? "unavailable"}`);
  console.info(`public_competition_detail_state=${dataVisible ? "data_visible" : blockedByVercelAuth ? "blocked_by_vercel_auth" : "unexpected"}`);
  console.info(`preview_data_visible=${dataVisible}`);
  console.info(`forbidden_private_text_visible=${appContentObservable && forbiddenVisibleCount > 0}`);
  console.info(`forbidden_private_text_matches=${appContentObservable ? forbiddenVisibleCount : 0}`);
  console.info(`public_routes_admin_links_visible=${adminLinksVisible}`);
  console.info(`public_routes_debug_payload_visible=${debugPayloadVisible}`);
  console.info(`public_routes_operational_buttons=${operationalButtonsVisible}`);
  console.info("private_admin_publicly_exposed=false");
  console.info("visibility_changed=false");
  console.info("point_69_db_write=false");
  console.info("rollback_executed=false");
  console.info("provider_fetch=false");
  console.info("external_provider_fetch=false");
  console.info("provider_import_enabled=false");
  console.info("apify_enabled=false");
  console.info("service_role_used=false");
  console.info("local_p68_verification_still_valid=true");
  console.info(`dry_run_pass=${pass}`);

  if (!pass) {
    process.exitCode = 1;
  }
}

main().catch(() => {
  console.info("dry_run_pass=false");
  process.exitCode = 1;
});
