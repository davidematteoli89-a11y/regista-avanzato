import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const PROVIDER = "the_stats_api";
const COMPETITION_SLUG = "serie-a";
const COMPETITION_ID = "comp_5840";
const SEASON_ID = "sn_6199313";
const BASE_URL_FALLBACK = "https://api.thestatsapi.com/api";
const BASE_URL_V1_FALLBACK = "https://stats-api.com/api/v1";
const COMPETITIONS_ENDPOINT = "/football/competitions";
const COMPETITIONS_V1_ENDPOINT = "/football/competitions?limit=10";
const STANDINGS_ENDPOINT = `/football/competitions/${COMPETITION_ID}/seasons/${SEASON_ID}/standings`;
const PROBE_TARGET = process.env.THESTATSAPI_PROBE_TARGET || "competitions";
const REQUESTS_PLANNED = 1;
const LOCAL_ENV_ALLOWLIST = new Set(["THESTATSAPI_API_KEY", "THESTATSAPI_BASE_URL"]);

const THESTATSAPI_PROBE_ENABLED = process.env.THESTATSAPI_PROBE_ENABLED === "true";
const REAL_PROVIDER_PROBE_ENABLED = process.env.REAL_PROVIDER_PROBE_ENABLED === "true";

function printDisabledProbe(blockedReason = "THESTATSAPI_PROBE_DISABLED"): void {
  console.info("Regista Avanzato — TheStatsAPI Probe");
  console.info("mode=thestatsapi_probe");
  console.info(`provider=${PROVIDER}`);
  console.info(`competition_slug=${COMPETITION_SLUG}`);
  console.info("enabled=false");
  console.info(`blocked_reason=${blockedReason}`);
  console.info("external_fetch=false");
  console.info("db_write=false");
  console.info("token_read=false");
  console.info("token_printed=false");
  console.info(`requests_planned=${REQUESTS_PLANNED}`);
  console.info("requests_executed=0");
  console.info(`base_url_shape=${BASE_URL_FALLBACK}`);
  console.info(`competitions_path=${COMPETITIONS_ENDPOINT}`);
  console.info(`competitions_url_shape=${joinUrl(BASE_URL_FALLBACK, COMPETITIONS_ENDPOINT).toString()}`);
  console.info("competitions_v1_target=competitions_v1");
  console.info(`competitions_v1_base_url_shape=${BASE_URL_V1_FALLBACK}`);
  console.info(`competitions_v1_path=${COMPETITIONS_V1_ENDPOINT}`);
  console.info(`competitions_v1_url_shape=${joinUrl(BASE_URL_V1_FALLBACK, COMPETITIONS_V1_ENDPOINT).toString()}`);
  console.info(`standings_path=${STANDINGS_ENDPOINT}`);
  console.info(`standings_url_shape=${joinUrl(BASE_URL_FALLBACK, STANDINGS_ENDPOINT).toString()}`);
  console.info("possible_double_api=false");
  console.info("possible_double_slash=false");
  console.info("output_sanitized=true");
  console.info("provider_activated=false");
  console.info("import_enabled=false");
  console.info("production=false");
  console.info("confirmation=no_real_provider_call,no_external_fetch,no_token_read,no_db_write,no_provider_activation,no_import_activation");
}

function assertProbeEnabled(): void {
  if (!THESTATSAPI_PROBE_ENABLED) {
    printDisabledProbe("THESTATSAPI_PROBE_DISABLED");
    process.exit(0);
  }

  if (!REAL_PROVIDER_PROBE_ENABLED) {
    printDisabledProbe("REAL_PROVIDER_PROBE_DISABLED");
    process.exit(0);
  }
}

function parseLocalEnvLine(line: string): { name: string; value: string } | null {
  const trimmed = line.trim();

  if (!trimmed || trimmed.startsWith("#")) return null;

  const separatorIndex = trimmed.indexOf("=");
  if (separatorIndex <= 0) return null;

  const name = trimmed.slice(0, separatorIndex).trim();
  if (!LOCAL_ENV_ALLOWLIST.has(name)) return null;

  const rawValue = trimmed.slice(separatorIndex + 1).trim();
  const value =
    (rawValue.startsWith("\"") && rawValue.endsWith("\"")) || (rawValue.startsWith("'") && rawValue.endsWith("'"))
      ? rawValue.slice(1, -1)
      : rawValue;

  return { name, value };
}

function readLocalEnvValue(name: string): string | undefined {
  if (!LOCAL_ENV_ALLOWLIST.has(name)) return undefined;

  const existingValue = process.env[name];
  if (existingValue) return existingValue;

  const localEnvPath = join(process.cwd(), ".env.local");
  if (!existsSync(localEnvPath)) return undefined;

  const localEnvContent = readFileSync(localEnvPath, "utf8");

  for (const line of localEnvContent.split(/\r?\n/)) {
    const parsedLine = parseLocalEnvLine(line);

    if (parsedLine?.name === name) {
      return parsedLine.value;
    }
  }

  return undefined;
}

function getRequiredEnvPresenceOnly(name: string): string {
  const value = readLocalEnvValue(name);

  if (!value) {
    throw new Error(`${name}_MISSING`);
  }

  return value;
}

function sanitizeTopLevelKeys(payload: unknown): string {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) return "none";

  return Object.keys(payload).slice(0, 20).join(",");
}

function countResponseItems(payload: unknown): number {
  if (!payload || typeof payload !== "object") return 0;
  if (Array.isArray(payload)) return payload.length;

  const record = payload as Record<string, unknown>;
  const candidates = [record.data, record.response, record.results, record.fixtures, record.standings];

  for (const candidate of candidates) {
    if (Array.isArray(candidate)) return candidate.length;
  }

  return 0;
}

function countApiErrors(payload: unknown): number {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) return 0;

  const record = payload as Record<string, unknown>;
  const candidates = [record.errors, record.error, record.messages];

  for (const candidate of candidates) {
    if (Array.isArray(candidate)) return candidate.length;
    if (candidate && typeof candidate === "object") return Object.keys(candidate).length;
    if (typeof candidate === "string" && candidate.trim()) return 1;
  }

  return 0;
}

function getFirstItemKeys(payload: unknown): string {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) return "none";

  const record = payload as Record<string, unknown>;
  const candidates = [record.data, record.response, record.results, record.fixtures, record.standings];
  const firstArray = candidates.find((candidate): candidate is unknown[] => Array.isArray(candidate));
  const firstItem = firstArray?.[0];

  if (!firstItem || typeof firstItem !== "object" || Array.isArray(firstItem)) return "none";

  return Object.keys(firstItem).slice(0, 20).join(",");
}

function joinUrl(baseUrl: string, endpoint: string): URL {
  const normalizedBaseUrl = baseUrl.replace(/\/+$/, "");
  const normalizedEndpoint = endpoint.replace(/^\/+/, "");

  return new URL(`${normalizedBaseUrl}/${normalizedEndpoint}`);
}

async function readSanitizedJson(response: Response): Promise<unknown> {
  try {
    return await response.json();
  } catch {
    return null;
  }
}

async function fetchReadOnlyJson(baseUrl: string, endpoint: string, apiKey: string): Promise<{ response: Response; payload: unknown }> {
  const url = joinUrl(baseUrl, endpoint);

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
  });

  const payload = await readSanitizedJson(response);

  return { response, payload };
}

async function runFutureProbe(): Promise<void> {
  if (PROBE_TARGET !== "competitions" && PROBE_TARGET !== "competitions_v1") {
    throw new Error("THESTATSAPI_PROBE_TARGET_UNSUPPORTED");
  }

  const apiKey = getRequiredEnvPresenceOnly("THESTATSAPI_API_KEY");
  const fallbackBaseUrl = PROBE_TARGET === "competitions_v1" ? BASE_URL_V1_FALLBACK : BASE_URL_FALLBACK;
  const competitionsEndpoint = PROBE_TARGET === "competitions_v1" ? COMPETITIONS_V1_ENDPOINT : COMPETITIONS_ENDPOINT;
  const baseUrl = readLocalEnvValue("THESTATSAPI_BASE_URL") || fallbackBaseUrl;
  // D.17-H real-call shape:
  // - max 1 request
  // - read-only
  // - target: competitions or competitions_v1 light auth/base-url check
  // - standings is intentionally not executed in this phase
  // - no DB writes
  // - no provider/import activation
  // - no token logging
  const competitionsResult = await fetchReadOnlyJson(baseUrl, competitionsEndpoint, apiKey);
  const requestsExecuted = 1;
  const competitionsItemsCount = countResponseItems(competitionsResult.payload);
  const mappingTheoreticalPossible = Boolean(competitionsResult.response.ok && competitionsItemsCount > 0);
  const warnings = competitionsResult.response.ok ? 0 : 1;

  console.info("Regista Avanzato — TheStatsAPI Probe");
  console.info("mode=thestatsapi_probe");
  console.info(`provider=${PROVIDER}`);
  console.info(`plan=${PROBE_TARGET === "competitions_v1" ? "d17l_competitions_v1_single_request" : "d17h_competitions_single_request"}`);
  console.info(`competition_slug=${COMPETITION_SLUG}`);
  console.info(`target=${PROBE_TARGET}`);
  console.info(`endpoint=${PROBE_TARGET === "competitions_v1" ? "football_competitions_v1" : "football_competitions"}`);
  console.info(`path=${competitionsEndpoint}`);
  console.info(`url_shape=${joinUrl(baseUrl, competitionsEndpoint).toString()}`);
  console.info("enabled=true");
  console.info("external_fetch=true");
  console.info("db_write=false");
  console.info("token_read=true");
  console.info("token_printed=false");
  console.info(`requests_planned=${REQUESTS_PLANNED}`);
  console.info(`requests_executed=${requestsExecuted}`);
  console.info(`http_status=${competitionsResult.response.status}`);
  console.info(`api_errors_count=${countApiErrors(competitionsResult.payload)}`);
  console.info(`response_top_level_keys=${sanitizeTopLevelKeys(competitionsResult.payload)}`);
  console.info(`items_count=${competitionsItemsCount}`);
  console.info(`sample_fields_only=${getFirstItemKeys(competitionsResult.payload)}`);
  console.info(`mapping_theoretical_possible=${mappingTheoreticalPossible}`);
  console.info("standings_executed=false");
  console.info(`recommended_next_mapping_step=${mappingTheoreticalPossible ? "d17i_single_standings_request_no_db_write" : "debug_endpoint_or_auth_without_retry"}`);
  console.info("output_sanitized=true");
  console.info("provider_activated=false");
  console.info("import_enabled=false");
  console.info(`warnings=${warnings}`);
  console.info("production=false");
  console.info("confirmation=max_one_read_only_request,no_retry,no_loop,no_pagination,no_token_output,no_db_write,no_provider_activation,no_import_activation");
}

async function main(): Promise<void> {
  assertProbeEnabled();

  try {
    await runFutureProbe();
  } catch (error) {
    const message = error instanceof Error ? error.message : "UNKNOWN_ERROR";

    console.info("Regista Avanzato — TheStatsAPI Probe");
    console.info("mode=thestatsapi_probe");
    console.info("enabled=true");
    console.info("external_fetch=unknown");
    console.info("db_write=false");
    console.info("token_printed=false");
    console.info(`requests_planned=${REQUESTS_PLANNED}`);
    console.info("requests_executed=0");
    console.info(`error=${message}`);
    console.info("output_sanitized=true");
    process.exit(1);
  }
}

void main();
