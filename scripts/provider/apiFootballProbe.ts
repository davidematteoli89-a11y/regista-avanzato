const PROVIDER = "api_football";
const COMPETITION_SLUG = "serie-a";
const ENDPOINT_CANDIDATE = "standings_or_fixtures";
const REQUESTS_PLANNED = 1;

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

function getRequiredEnvPresenceOnly(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`${name}_MISSING`);
  }

  return value;
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

async function runFutureProbe(): Promise<void> {
  const apiKey = getRequiredEnvPresenceOnly("API_FOOTBALL_API_KEY");
  const baseUrl = process.env.API_FOOTBALL_BASE_URL || "https://v3.football.api-sports.io";

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
  console.info(`competition_slug=${COMPETITION_SLUG}`);
  console.info("enabled=true");
  console.info("external_fetch=true");
  console.info("db_write=false");
  console.info("token_printed=false");
  console.info(`requests_planned=${REQUESTS_PLANNED}`);
  console.info("requests_executed=1");
  console.info(`http_status=${response.status}`);
  console.info(`payload_top_level_keys=${sanitizeTopLevelKeys(payload)}`);
  console.info(`payload_items_count=${countTopLevelItems(payload)}`);
  console.info("mapping_compatibility=to_review");
  console.info(`endpoint_candidate=${ENDPOINT_CANDIDATE}`);
  console.info("output_sanitized=true");
  console.info("provider_activated=false");
  console.info("import_enabled=false");
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
