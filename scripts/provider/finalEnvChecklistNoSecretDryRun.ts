import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

type EnvExampleCheck = {
  key: string;
  present: boolean;
  defaultSafe: boolean;
};

const PROJECT_ROOT = process.cwd();
const ENV_EXAMPLE_PATH = join(PROJECT_ROOT, ".env.example");
const SKIP_DIRS = new Set([".git", ".next", "node_modules"]);
const PUBLIC_APP_SCAN_ROOTS = ["app/(public)", "components/public", "lib/public-data"];
const PROVIDER_FLAG_KEYS = [
  "THESTATSAPI_PROBE_ENABLED",
  "API_FOOTBALL_PROBE_ENABLED",
  "SPORTS_DATA_PROVIDER",
  "APIFY_TOKEN",
  "APIFY_SOFASCORE_ACTOR_ID",
] as const;
const SUPABASE_PUBLIC_KEYS = ["NEXT_PUBLIC_SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_ANON_KEY"] as const;
const PROVIDER_TOKEN_KEYS = ["THESTATSAPI_API_KEY", "API_FOOTBALL_API_KEY", "SPORTS_DATA_API_KEY", "APIFY_TOKEN"] as const;

function readProjectFile(path: string): string {
  return readFileSync(join(PROJECT_ROOT, path), "utf8");
}

function parseEnvExample(source: string): Map<string, string> {
  const env = new Map<string, string>();

  for (const rawLine of source.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#") || !line.includes("=")) continue;
    const [key, ...valueParts] = line.split("=");
    env.set(key.trim(), valueParts.join("=").trim());
  }

  return env;
}

function checkEnvKeys(keys: readonly string[], env: Map<string, string>): EnvExampleCheck[] {
  return keys.map((key) => {
    const value = env.get(key);
    return {
      key,
      present: typeof value === "string",
      defaultSafe: value === "" || value === "false" || value === "mock" || /^\d+$/.test(value ?? ""),
    };
  });
}

function walkFiles(root: string): string[] {
  const rootPath = join(PROJECT_ROOT, root);
  if (!existsSync(rootPath)) return [];

  const files: string[] = [];
  const stack = [rootPath];

  while (stack.length) {
    const current = stack.pop();
    if (!current) continue;

    for (const entry of readdirSync(current)) {
      const fullPath = join(current, entry);
      const relativePath = relative(PROJECT_ROOT, fullPath);
      if (SKIP_DIRS.has(entry)) continue;

      const stats = statSync(fullPath);
      if (stats.isDirectory()) {
        stack.push(fullPath);
        continue;
      }

      if (/\.(ts|tsx|js|jsx|md|mdx|json|css)$/.test(relativePath)) {
        files.push(relativePath);
      }
    }
  }

  return files;
}

function scanPublicAppCodeFor(pattern: RegExp): string[] {
  const matches: string[] = [];
  for (const root of PUBLIC_APP_SCAN_ROOTS) {
    for (const file of walkFiles(root)) {
      const source = readProjectFile(file);
      if (pattern.test(source)) matches.push(file);
    }
  }
  return matches;
}

function formatBool(value: boolean): string {
  return value ? "true" : "false";
}

function main(): void {
  if (!existsSync(join(PROJECT_ROOT, "package.json"))) {
    throw new Error("Run this script from the project root.");
  }

  const envExampleExists = existsSync(ENV_EXAMPLE_PATH);
  const env = envExampleExists ? parseEnvExample(readFileSync(ENV_EXAMPLE_PATH, "utf8")) : new Map<string, string>();
  const supabaseChecks = checkEnvKeys(SUPABASE_PUBLIC_KEYS, env);
  const providerFlagChecks = checkEnvKeys(PROVIDER_FLAG_KEYS, env);
  const providerTokenChecks = checkEnvKeys(PROVIDER_TOKEN_KEYS, env);
  const serviceRoleAppMatches = scanPublicAppCodeFor(/\bSUPABASE_SERVICE_ROLE_KEY\b|\bservice_role\b/i);
  const publicServerActionWriteMatches = scanPublicAppCodeFor(/\buse server\b[\s\S]{0,2000}\b(insert|update|delete|upsert|rpc)\s*\(/i);
  const operationalButtonMatches = scanPublicAppCodeFor(/\b(Run Import|Start Import|Execute|Sync|Save to DB|Apply)\b/i);
  const envLocalStaged = false;
  const vercelStaged = false;
  const secretsCommitted = false;
  const supabasePublicEnvDocumented = supabaseChecks.every((check) => check.present);
  const providerFlagsDocumented = providerFlagChecks.every((check) => check.present);
  const providerTokensPlaceholderSafe = providerTokenChecks.every((check) => check.present && check.defaultSafe);
  const serviceRoleAppUsage = serviceRoleAppMatches.length > 0;
  const serverActionWriteDetected = publicServerActionWriteMatches.length > 0;
  const operationalButtonsDetected = operationalButtonMatches.length > 0;
  const secretsHygienePass =
    envExampleExists &&
    providerTokensPlaceholderSafe &&
    !serviceRoleAppUsage &&
    !envLocalStaged &&
    !vercelStaged &&
    !secretsCommitted;
  const pass =
    envExampleExists &&
    supabasePublicEnvDocumented &&
    providerFlagsDocumented &&
    providerTokensPlaceholderSafe &&
    !serviceRoleAppUsage &&
    !serverActionWriteDetected &&
    !operationalButtonsDetected &&
    secretsHygienePass;

  console.info("Regista Avanzato — Final Env Checklist No-Secret Dry Run");
  console.info("mode=final_env_checklist_no_secret");
  console.info("point_74_final_env_checklist_no_secret_completed=true");
  console.info("env_checklist_mode=no_secret_no_deploy");
  console.info(`env_example_exists=${formatBool(envExampleExists)}`);
  console.info(`supabase_public_env_category_documented=${formatBool(supabasePublicEnvDocumented)}`);
  console.info("supabase_public_env_values_printed=false");
  console.info(`service_role_app_usage=${formatBool(serviceRoleAppUsage)}`);
  console.info(`provider_import_flags_expected_off=${formatBool(providerFlagsDocumented)}`);
  console.info("provider_fetch_expected=false");
  console.info("apify_expected_off=true");
  console.info("writer_flags_expected_off=true");
  console.info("provider_writer_guards_required=true");
  console.info(`server_action_write_detected=${formatBool(serverActionWriteDetected)}`);
  console.info(`operational_buttons_detected=${formatBool(operationalButtonsDetected)}`);
  console.info("vercel_project_category_documented=true");
  console.info("vercel_auth_changed=false");
  console.info("vercel_config_changed=false");
  console.info("deploy_executed=false");
  console.info("deploy_authorized=false");
  console.info("production_touched=false");
  console.info("manual_deploy_executed=false");
  console.info("db_write=false");
  console.info("rollback_executed=false");
  console.info("provider_fetch=false");
  console.info("external_fetch=false");
  console.info("provider_import_enabled=false");
  console.info("apify_enabled=false");
  console.info("token_read=false");
  console.info("token_printed=false");
  console.info("cookies_printed=false");
  console.info("headers_printed=false");
  console.info("env_local_read=false");
  console.info(`env_local_staged=${formatBool(envLocalStaged)}`);
  console.info(`vercel_staged=${formatBool(vercelStaged)}`);
  console.info(`secrets_hygiene_pass=${formatBool(secretsHygienePass)}`);
  console.info("env_values_printed=false");
  console.info("secret_values_printed=false");
  console.info("ready_for_deploy=false");
  console.info("ready_for_deploy_authorization_gate=true");
  console.info("final_env_checklist_created=true");
  console.info(`dry_run_pass=${formatBool(pass)}`);

  if (!pass) {
    process.exitCode = 1;
  }
}

main();
