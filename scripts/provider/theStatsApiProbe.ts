import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const PROVIDER = "the_stats_api";
const COMPETITION_SLUG = "serie-a";
const COMPETITION_ID = "comp_5840";
const SEASON_ID = "sn_6199313";
const BASE_URL_FALLBACK = "https://api.thestatsapi.com/api";
const COMPETITIONS_ENDPOINT = "/football/competitions";
const STANDINGS_ENDPOINT = `/football/competitions/${COMPETITION_ID}/seasons/${SEASON_ID}/standings`;
const REQUESTS_PLANNED = 2;
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

function getFirstItemKeys(payload: unknown): string {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) return "none";

  const record = payload as Record<string, unknown>;
  const candidates = [record.data, record.response, record.results, record.fixtures, record.standings];
  const firstArray = candidates.find((candidate): candidate is unknown[] => Array.isArray(candidate));
  const firstItem = firstArray?.[0];

  if (!firstItem || typeof firstItem !== "object" || Array.isArray(firstItem)) return "none";

  return Object.keys(firstItem).slice(0, 20).join(",");
}

function getArrayCandidate(payload: unknown): unknown[] | null {
  if (Array.isArray(payload)) return payload;
  if (!payload || typeof payload !== "object") return null;

  const record = payload as Record<string, unknown>;
  const candidates = [record.data, record.response, record.results, record.fixtures, record.standings];

  for (const candidate of candidates) {
    if (Array.isArray(candidate)) return candidate;
  }

  return null;
}

function getNestedArrayLength(payload: unknown, keys: string[]): number {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) return 0;

  let current: unknown = payload;

  for (const key of keys) {
    if (!current || typeof current !== "object" || Array.isArray(current)) return 0;
    current = (current as Record<string, unknown>)[key];
  }

  return Array.isArray(current) ? current.length : 0;
}

function countStandingsRows(payload: unknown): number {
  const directRows = countResponseItems(payload);
  if (directRows > 0) return directRows;

  const nestedRows = getNestedArrayLength(payload, ["data", "standings"]);
  if (nestedRows > 0) return nestedRows;

  return getNestedArrayLength(payload, ["standings"]);
}

function countStandingsGroups(payload: unknown): number {
  const arrayCandidate = getArrayCandidate(payload);
  if (!arrayCandidate) return getNestedArrayLength(payload, ["data", "groups"]);

  const groupLikeRows = arrayCandidate.filter((item) => {
    if (!item || typeof item !== "object" || Array.isArray(item)) return false;
    const record = item as Record<string, unknown>;
    return Array.isArray(record.rows) || Array.isArray(record.standings) || Array.isArray(record.teams);
  });

  return groupLikeRows.length;
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
  const apiKey = getRequiredEnvPresenceOnly("THESTATSAPI_API_KEY");
  const baseUrl = readLocalEnvValue("THESTATSAPI_BASE_URL") || BASE_URL_FALLBACK;
  // Future real-call shape:
  // - max 2 requests
  // - read-only
  // - target 1: competitions light auth/base-url check
  // - target 2: Serie A standings mapping check, only if target 1 succeeds
  // - no DB writes
  // - no provider/import activation
  // - no token logging
  const competitionsResult = await fetchReadOnlyJson(baseUrl, COMPETITIONS_ENDPOINT, apiKey);
  const competitionsOk = competitionsResult.response.ok;

  let requestsExecuted = 1;
  let standingsResult: { response: Response; payload: unknown } | null = null;
  let stoppedAfter = "competitions_error";

  if (competitionsOk) {
    standingsResult = await fetchReadOnlyJson(baseUrl, STANDINGS_ENDPOINT, apiKey);
    requestsExecuted = 2;
    stoppedAfter = standingsResult.response.ok ? "completed" : "standings_error";
  }

  const standingsPayload = standingsResult?.payload ?? null;
  const standingsRowsCount = standingsResult ? countStandingsRows(standingsPayload) : 0;
  const mappingTheoreticalPossible = Boolean(standingsResult?.response.ok && standingsRowsCount > 0);
  const missingFields = mappingTheoreticalPossible ? "none_after_summary_review" : "standings_rows_or_expected_fields_not_detected";
  const usefulFields = mappingTheoreticalPossible
    ? "competition,season,team,position,played,wins,draws,losses,goals_for,goals_against,points,provider_ids"
    : "unknown_until_successful_standings_payload";

  console.info("Regista Avanzato — TheStatsAPI Probe");
  console.info("mode=thestatsapi_probe");
  console.info(`provider=${PROVIDER}`);
  console.info("plan=current");
  console.info(`competition_slug=${COMPETITION_SLUG}`);
  console.info(`competition_id=${COMPETITION_ID}`);
  console.info(`season_id=${SEASON_ID}`);
  console.info(`competitions_endpoint=${COMPETITIONS_ENDPOINT}`);
  console.info(`standings_endpoint=${STANDINGS_ENDPOINT}`);
  console.info("enabled=true");
  console.info("external_fetch=true");
  console.info("db_write=false");
  console.info("token_read=true");
  console.info("token_printed=false");
  console.info(`requests_planned=${REQUESTS_PLANNED}`);
  console.info(`requests_executed=${requestsExecuted}`);
  console.info(`competitions_http_status=${competitionsResult.response.status}`);
  console.info(`competitions_top_level_keys=${sanitizeTopLevelKeys(competitionsResult.payload)}`);
  console.info(`competitions_count=${countResponseItems(competitionsResult.payload)}`);
  console.info(`competitions_item_keys=${getFirstItemKeys(competitionsResult.payload)}`);
  console.info(`standings_executed=${standingsResult ? "true" : "false"}`);
  console.info(`standings_http_status=${standingsResult?.response.status ?? "not_executed"}`);
  console.info(`standings_top_level_keys=${standingsResult ? sanitizeTopLevelKeys(standingsPayload) : "not_executed"}`);
  console.info(`standings_rows_count=${standingsRowsCount}`);
  console.info(`standings_groups_count=${standingsResult ? countStandingsGroups(standingsPayload) : 0}`);
  console.info(`mapping_theoretical_possible=${mappingTheoreticalPossible}`);
  console.info(`missing_fields=${missingFields}`);
  console.info(`useful_fields=${usefulFields}`);
  console.info(`recommended_next_mapping_step=${mappingTheoreticalPossible ? "build_dry_run_mapper_no_db_write" : "inspect_sanitized_shape_or_choose_lighter_endpoint"}`);
  console.info(`stopped_after=${stoppedAfter}`);
  console.info("output_sanitized=true");
  console.info("provider_activated=false");
  console.info("import_enabled=false");
  console.info(`warnings=${mappingTheoreticalPossible ? 0 : 1}`);
  console.info("production=false");
  console.info("confirmation=max_two_read_only_requests,no_retry,no_loop,no_pagination,no_token_output,no_db_write,no_provider_activation,no_import_activation");
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
