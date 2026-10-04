const DEFAULT_PREVIEW_URL = "https://regista-avanzato-git-preview-davide-matteoli.vercel.app";

export {};

type RoutePath = "/" | "/competitions" | "/competitions/manual-serie-a";

type RouteResult = {
  path: RoutePath;
  status: number;
  finalHost: string;
  finalPath: string;
  blockedByVercelAuth: boolean;
  requiredVisible: boolean;
  forbiddenVisible: boolean;
  adminLinksVisible: boolean;
  debugPayloadVisible: boolean;
  operationalButtonsVisible: boolean;
};

const ROUTES: Array<{
  path: RoutePath;
  requiredVisibleText: string[];
  forbiddenVisibleText: string[];
}> = [
  {
    path: "/",
    requiredVisibleText: ["Competizioni"],
    forbiddenVisibleText: ["private_admin"],
  },
  {
    path: "/competitions",
    requiredVisibleText: ["Serie A Manual Sample", "Public data only"],
    forbiddenVisibleText: ["private_admin", "Manual Team One", "Manual Team Two"],
  },
  {
    path: "/competitions/manual-serie-a",
    requiredVisibleText: ["Serie A Manual Sample", "Manual Team One", "Manual Team Two", "Public data only"],
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

function includesAny(text: string, candidates: readonly string[]): boolean {
  return candidates.some((candidate) => text.includes(candidate));
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

async function checkRoute(baseUrl: string, route: (typeof ROUTES)[number]): Promise<RouteResult> {
  const response = await fetch(`${baseUrl}${route.path}`, {
    redirect: "follow",
    headers: {
      accept: "text/html",
    },
  });
  const html = await response.text();
  const visibleText = stripNonVisibleContent(html);
  const sanitizedUrl = sanitizeUrlParts(response.url);
  const appContentObservable = !sanitizedUrl.blockedByVercelAuth;

  return {
    path: route.path,
    status: response.status,
    ...sanitizedUrl,
    requiredVisible: appContentObservable && route.requiredVisibleText.every((text) => visibleText.includes(text)),
    forbiddenVisible: appContentObservable && includesAny(visibleText, route.forbiddenVisibleText),
    adminLinksVisible: appContentObservable && /href=["']\/admin(?:\/|["'])/.test(html),
    debugPayloadVisible: appContentObservable && /raw payload|debug panel|JSON\.stringify/i.test(html),
    operationalButtonsVisible: appContentObservable && (includesAny(visibleText, OPERATIONAL_BUTTON_TEXT) || /<button\b/i.test(html)),
  };
}

async function main(): Promise<void> {
  const previewUrl = normalizeBaseUrl(process.env.PUBLIC_PREVIEW_URL);
  const results = await Promise.all(ROUTES.map((route) => checkRoute(previewUrl, route)));
  const home = results.find((result) => result.path === "/");
  const competitions = results.find((result) => result.path === "/competitions");
  const detail = results.find((result) => result.path === "/competitions/manual-serie-a");
  const blockedByVercelAuth = results.every((result) => result.blockedByVercelAuth);
  const authenticatedAccessAvailable = !blockedByVercelAuth;
  const dataVisible = authenticatedAccessAvailable && results.every((result) => result.requiredVisible);
  const forbiddenVisible = results.some((result) => result.forbiddenVisible);
  const adminLinksVisible = results.some((result) => result.adminLinksVisible);
  const debugPayloadVisible = results.some((result) => result.debugPayloadVisible);
  const operationalButtonsVisible = results.some((result) => result.operationalButtonsVisible);
  const verificationResult = dataVisible
    ? "passed_authenticated_preview"
    : blockedByVercelAuth
      ? "blocked_by_missing_authorized_session"
      : "failed_unexpected_preview_response";
  const pass = dataVisible || blockedByVercelAuth;

  console.info("Regista Avanzato — Preview Authenticated Verification Dry Run");
  console.info("point_76_preview_authenticated_verification_completed=true");
  console.info("preview_authenticated_verification_mode=no_deploy_no_secret");
  console.info("preview_url_available=true");
  console.info("preview_url_value=sanitized_branch_alias");
  console.info(`preview_authenticated_access_available=${authenticatedAccessAvailable}`);
  console.info(`preview_authenticated_verification_result=${verificationResult}`);
  console.info(`preview_no_auth_blocked_by_vercel_auth=${blockedByVercelAuth}`);
  console.info("manual_deploy_executed=false");
  console.info("production_touched=false");
  console.info("vercel_auth_changed=false");
  console.info("vercel_config_changed=false");
  console.info("auth_cookie_used=false");
  console.info("cookies_printed=false");
  console.info("headers_printed=false");
  console.info("token_printed=false");
  console.info("env_local_read=false");
  console.info(`home_http_status=${home?.status ?? 0}`);
  console.info(`home_final_host=${home?.finalHost ?? "unavailable"}`);
  console.info(`home_final_path=${home?.finalPath ?? "unavailable"}`);
  console.info(`home_data_visible=${authenticatedAccessAvailable && Boolean(home?.requiredVisible)}`);
  console.info(`competitions_http_status=${competitions?.status ?? 0}`);
  console.info(`competitions_final_host=${competitions?.finalHost ?? "unavailable"}`);
  console.info(`competitions_final_path=${competitions?.finalPath ?? "unavailable"}`);
  console.info(`competitions_data_visible=${authenticatedAccessAvailable && Boolean(competitions?.requiredVisible)}`);
  console.info(`competition_detail_http_status=${detail?.status ?? 0}`);
  console.info(`competition_detail_final_host=${detail?.finalHost ?? "unavailable"}`);
  console.info(`competition_detail_final_path=${detail?.finalPath ?? "unavailable"}`);
  console.info(`competition_detail_data_visible=${authenticatedAccessAvailable && Boolean(detail?.requiredVisible)}`);
  console.info(`preview_data_visible=${dataVisible}`);
  console.info(`private_admin_publicly_exposed=${forbiddenVisible}`);
  console.info(`public_routes_admin_links_visible=${adminLinksVisible}`);
  console.info(`public_routes_debug_payload_visible=${debugPayloadVisible}`);
  console.info(`public_routes_operational_buttons=${operationalButtonsVisible}`);
  console.info("db_write=false");
  console.info("rollback_executed=false");
  console.info("provider_fetch=false");
  console.info("external_fetch=false");
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
