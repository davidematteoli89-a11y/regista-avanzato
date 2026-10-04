import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const PROVIDER = "api_football";
const COMPETITION_SLUG = "serie-a";
const ENDPOINT = "standings";
const PLAN = "free";
const REQUESTS_PLANNED = 1;
const LOCAL_ENV_ALLOWLIST = new Set(["API_FOOTBALL_API_KEY", "API_FOOTBALL_BASE_URL"]);

const API_FOOTBALL_PROBE_ENABLED = process.env.API_FOOTBALL_PROBE_ENABLED === "true";
const REAL_PROVIDER_PROBE_ENABLED = process.env.REAL_PROVIDER_PROBE_ENABLED === "true";

function printDisabledProbe(): void {
  console.info("Regista Avanzato — API-Football Probe");
  console.info("mode=api_football_probe");
  console.info("provider=api_football");
  console.info("competition_slug=serie-a");
  console.info("enabled=false");
  console.info("blocked_reason=API_FOOTBALL_PROBE_DISABLED");
  console.info("external_fetch=false");
  console.info("db_write=false");
  console.info("token_read=false");
  console.info("token_printed=false");
  console.info("requests_planned=1");
  console.info("requests_executed=0");
  console.info("output_sanitized=true");
  console.info("provider_activated=false");
  console.info("import_enabled=false");
  console.info("production=false");
  console.info("confirmation=no_real_provider_call,no_external_fetch,no_token_read,no_db_write,no_provider_activation,no_import_activation");
}

function assertProbeEnabled(): void {
  if (!API_FOOTBALL_PROBE_ENABLED || !REAL_PROVIDER_PROBE_ENABLED) {
    printDisabledProbe();
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
  const value = process.env[name];

  if (value) {
    return value;
  }

  const localValue = readLocalEnvValue(name);

  if (!localValue) {
    throw new Error(`${name}_MISSING`);
  }

  return localValue;
}

function sanitizeTopLevelKeys(payload: unknown): string {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return "none";
  }

  return Object.keys(payload).slice(0, 20).join(",");
}

function countTopLevelItems(payload: unknown): number {
  if (!payload || typeof payload !== "object") return 0;
  if (Array.isArray(payload)) return payload.length;

  const record = payload as Record<string, unknown>;
  const response = record.response;

  if (Array.isArray(response)) return response.length;
  return 0;
}

function countApiErrors(payload: unknown): number {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) return 0;

  const errors = (payload as Record<string, unknown>).errors;

  if (Array.isArray(errors)) return errors.length;
  if (errors && typeof errors === "object") return Object.keys(errors).length;
  return 0;
}

function getResponseTopLevelKeys(payload: unknown): string {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) return "none";

  const response = (payload as Record<string, unknown>).response;
  if (!Array.isArray(response) || response.length === 0) return "none";

  const first = response[0];
  if (!first || typeof first !== "object" || Array.isArray(first)) return "none";

  return Object.keys(first).slice(0, 20).join(",");
}

function countStandingsGroups(payload: unknown): number {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) return 0;

  const response = (payload as Record<string, unknown>).response;
  if (!Array.isArray(response)) return 0;

  return response.reduce((total, item) => {
    if (!item || typeof item !== "object" || Array.isArray(item)) return total;

    const league = (item as Record<string, unknown>).league;
    if (!league || typeof league !== "object" || Array.isArray(league)) return total;

    const standings = (league as Record<string, unknown>).standings;
    if (!Array.isArray(standings)) return total;

    return total + standings.length;
  }, 0);
}

function countStandingsRows(payload: unknown): number {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) return 0;

  const response = (payload as Record<string, unknown>).response;
  if (!Array.isArray(response)) return 0;

  return response.reduce((total, item) => {
    if (!item || typeof item !== "object" || Array.isArray(item)) return total;

    const league = (item as Record<string, unknown>).league;
    if (!league || typeof league !== "object" || Array.isArray(league)) return total;

    const standings = (league as Record<string, unknown>).standings;
    if (!Array.isArray(standings)) return total;

    const rows = standings.reduce((rowTotal, group) => {
      if (!Array.isArray(group)) return rowTotal;
      return rowTotal + group.length;
    }, 0);

    return total + rows;
  }, 0);
}

function getSampleFieldsOnly(payload: unknown): string {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) return "none";

  const response = (payload as Record<string, unknown>).response;
  if (!Array.isArray(response)) return "none";

  const firstCompetition = response[0];
  if (!firstCompetition || typeof firstCompetition !== "object" || Array.isArray(firstCompetition)) return "none";

  const league = (firstCompetition as Record<string, unknown>).league;
  if (!league || typeof league !== "object" || Array.isArray(league)) return "none";

  const standings = (league as Record<string, unknown>).standings;
  if (!Array.isArray(standings)) return "none";

  const firstGroup = standings.find((group) => Array.isArray(group)) as unknown[] | undefined;
  const firstRow = firstGroup?.[0];

  if (!firstRow || typeof firstRow !== "object" || Array.isArray(firstRow)) return "none";

  return Object.keys(firstRow).slice(0, 20).join(",");
}

async function runFutureProbe(): Promise<void> {
  const apiKey = getRequiredEnvPresenceOnly("API_FOOTBALL_API_KEY");
  const baseUrl = readLocalEnvValue("API_FOOTBALL_BASE_URL") || "https://v3.football.api-sports.io";

  // Future real-call shape:
  // - max 1 request
  // - read-only
  // - candidate endpoint: standings or fixtures for Serie A
  // - no DB writes
  // - no provider/import activation
  // - no token logging
  const endpoint = new URL("/standings", baseUrl);
  endpoint.searchParams.set("league", "135");
  endpoint.searchParams.set("season", "2026");

  const response = await fetch(endpoint, {
    method: "GET",
    headers: {
      "x-apisports-key": apiKey,
    },
  });

  let payload: unknown = null;

  try {
    payload = await response.json();
  } catch {
    payload = null;
  }

  console.info("Regista Avanzato — API-Football Probe");
  console.info("mode=api_football_probe");
  console.info(`provider=${PROVIDER}`);
  console.info(`plan=${PLAN}`);
  console.info(`endpoint=${ENDPOINT}`);
  console.info("competition=serie-a");
  console.info(`competition_slug=${COMPETITION_SLUG}`);
  console.info("enabled=true");
  console.info("external_fetch=true");
  console.info("db_write=false");
  console.info("token_read=true");
  console.info("token_printed=false");
  console.info(`requests_planned=${REQUESTS_PLANNED}`);
  console.info("requests_executed=1");
  console.info(`http_status=${response.status}`);
  console.info(`api_errors_count=${countApiErrors(payload)}`);
  console.info(`response_top_level_keys=${sanitizeTopLevelKeys(payload)}`);
  console.info(`response_items_count=${countTopLevelItems(payload)}`);
  console.info(`response_entry_keys=${getResponseTopLevelKeys(payload)}`);
  console.info(`standings_groups_count=${countStandingsGroups(payload)}`);
  console.info(`standings_rows_count=${countStandingsRows(payload)}`);
  console.info(`sample_fields_only=${getSampleFieldsOnly(payload)}`);
  console.info(`mapping_theoretical_possible=${countStandingsRows(payload) > 0}`);
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

    console.info("Regista Avanzato — API-Football Probe");
    console.info("mode=api_football_probe");
    console.info("enabled=true");
    console.info("external_fetch=unknown");
    console.info("db_write=false");
    console.info("token_printed=false");
    console.info("requests_planned=1");
    console.info("requests_executed=0");
    console.info(`error=${message}`);
    console.info("output_sanitized=true");
    process.exit(1);
  }
}

void main();
