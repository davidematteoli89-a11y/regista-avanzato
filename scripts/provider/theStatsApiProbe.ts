import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const PROVIDER = "the_stats_api";
const COMPETITION_SLUG = "serie-a";
const COMPETITION_ID = "comp_5840";
const SEASON_ID = "sn_6199313";
const CANDIDATE_ENDPOINT = `/football/competitions/${COMPETITION_ID}/seasons/${SEASON_ID}/standings`;
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

async function runFutureProbe(): Promise<void> {
  const apiKey = getRequiredEnvPresenceOnly("THESTATSAPI_API_KEY");
  const baseUrl = getRequiredEnvPresenceOnly("THESTATSAPI_BASE_URL");

  // Future real-call shape:
  // - max 1 request
  // - read-only
  // - candidate endpoint documented by TheStatsAPI public Serie A table page
  // - confirm dashboard/current season before enabling
  // - no DB writes
  // - no provider/import activation
  // - no token logging
  const endpoint = new URL(CANDIDATE_ENDPOINT, baseUrl);

  const response = await fetch(endpoint, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
  });

  let payload: unknown = null;

  try {
    payload = await response.json();
  } catch {
    payload = null;
  }

  console.info("Regista Avanzato — TheStatsAPI Probe");
  console.info("mode=thestatsapi_probe");
  console.info(`provider=${PROVIDER}`);
  console.info(`competition_slug=${COMPETITION_SLUG}`);
  console.info(`competition_id=${COMPETITION_ID}`);
  console.info(`season_id=${SEASON_ID}`);
  console.info(`endpoint=${CANDIDATE_ENDPOINT}`);
  console.info("enabled=true");
  console.info("external_fetch=true");
  console.info("db_write=false");
  console.info("token_read=true");
  console.info("token_printed=false");
  console.info(`requests_planned=${REQUESTS_PLANNED}`);
  console.info("requests_executed=1");
  console.info(`http_status=${response.status}`);
  console.info(`response_top_level_keys=${sanitizeTopLevelKeys(payload)}`);
  console.info(`response_items_count=${countResponseItems(payload)}`);
  console.info(`response_item_keys=${getFirstItemKeys(payload)}`);
  console.info(`mapping_theoretical_possible=${countResponseItems(payload) > 0}`);
  console.info("output_sanitized=true");
  console.info("provider_activated=false");
  console.info("import_enabled=false");
  console.info("warnings=0");
  console.info("production=false");
  console.info("confirmation=one_read_only_request,no_token_output,no_db_write,no_provider_activation,no_import_activation");
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
