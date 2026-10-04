import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

type ProviderState = {
  id: string;
  active: boolean;
};

const PROVIDER_CANDIDATE = "api_football";
const PROVIDER_ALTERNATIVE = "the_stats_api";
const COMPETITION_SLUG = "serie-a";
const REAL_PROVIDER_PROBE_ENABLED = false;

function readProjectFile(path: string): string {
  return readFileSync(join(process.cwd(), path), "utf8");
}

function parseProviders(source: string): ProviderState[] {
  const rows: ProviderState[] = [];
  const providerPattern = /id:\s*"([^"]+)",\s*name:\s*"[^"]+",\s*type:\s*"[^"]+",\s*active:\s*(true|false)/g;

  for (const match of source.matchAll(providerPattern)) {
    rows.push({ id: match[1], active: match[2] === "true" });
  }

  return rows;
}

function isProviderActive(providers: ProviderState[], providerId: string): boolean {
  return providers.find((provider) => provider.id === providerId)?.active ?? false;
}

function main(): void {
  const providers = parseProviders(readProjectFile("config/providers.ts"));
  const warnings: string[] = [];

  if (REAL_PROVIDER_PROBE_ENABLED) warnings.push("real_provider_probe_enabled");
  if (isProviderActive(providers, PROVIDER_CANDIDATE)) warnings.push("provider_candidate_active");
  if (isProviderActive(providers, PROVIDER_ALTERNATIVE)) warnings.push("provider_alternative_active");
  if (isProviderActive(providers, "stable_provider")) warnings.push("stable_provider_active");
  if (isProviderActive(providers, "apify_sofascore")) warnings.push("apify_active");

  console.info("Regista Avanzato — Disabled Stable Provider Probe");
  console.info("mode=disabled_probe");
  console.info(`competition_slug=${COMPETITION_SLUG}`);
  console.info(`provider_candidate=${PROVIDER_CANDIDATE}`);
  console.info(`provider_alternative=${PROVIDER_ALTERNATIVE}`);
  console.info("real_provider_probe_enabled=false");
  console.info("external_fetch=false");
  console.info("db_write=false");
  console.info("token_read=false");
  console.info("env_values_read=0");
  console.info("tokens_printed=0");
  console.info("provider_activated=false");
  console.info("import_enabled=false");
  console.info("endpoint_candidate=standings_or_fixtures");
  console.info("request_would_be_single=true");
  console.info("output_sanitized=true");
  console.info("blocked_reason=REAL_PROVIDER_PROBE_DISABLED");
  console.info(`warnings=${warnings.length}`);
  for (const warning of warnings) console.info(`warning=${warning}`);
  console.info("confirmation=no_real_provider_call,no_external_fetch,no_token_read,no_db_write,no_provider_activation,no_import_activation");
}

if (!existsSync(join(process.cwd(), "config/providers.ts"))) {
  throw new Error("Run this script from the project root.");
}

main();
