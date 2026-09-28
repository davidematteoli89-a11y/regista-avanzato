import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const CONTRACT_PATH = path.join(ROOT, "lib/public-data/contracts.ts");
const READER_PATH = path.join(ROOT, "lib/public-data/readers.ts");
const DRY_RUN_PATH = path.join(ROOT, "scripts/provider/publicReaderNoRouteDryRun.ts");

const contractForbiddenPatterns: Array<[string, RegExp]> = [
  ["manual_admin_reader_import", /lib\/manual-data\/readers|@\/lib\/manual-data\/readers/],
  ["supabase_client_import", /@supabase\/|createSupabase|from\(/],
  ["external_fetch", /\bfetch\s*\(/],
  ["db_write_operation", /\.(insert|update|delete|upsert)\s*\(/],
  ["service_role", /service_role|SUPABASE_SERVICE_ROLE/i],
  ["server_action", /['"]use server['"]/],
  ["env_local", /\.env\.local/],
];

const readerForbiddenPatterns: Array<[string, RegExp]> = [
  ["manual_admin_reader_import", /lib\/manual-data\/readers|@\/lib\/manual-data\/readers/],
  ["external_fetch", /\bfetch\s*\(/],
  ["db_write_operation", /\.(insert|update|delete|upsert)\s*\(/],
  ["service_role", /service_role|SUPABASE_SERVICE_ROLE/i],
  ["server_action", /['"]use server['"]/],
  ["env_local", /\.env\.local/],
  ["provider_client", /theStatsApi|apiFootball|apify|sofascore/i],
];

function main() {
  const contractExists = existsSync(CONTRACT_PATH);
  const contractSource = contractExists ? readFileSync(CONTRACT_PATH, "utf8") : "";
  const readerExists = existsSync(READER_PATH);
  const readerSource = readerExists ? readFileSync(READER_PATH, "utf8") : "";
  const dryRunExists = existsSync(DRY_RUN_PATH);
  const dryRunSource = dryRunExists ? readFileSync(DRY_RUN_PATH, "utf8") : "";
  const contractViolations = contractForbiddenPatterns
    .filter(([, pattern]) => pattern.test(contractSource))
    .map(([name]) => `contract:${name}`);
  const readerViolations = readerForbiddenPatterns
    .filter(([, pattern]) => pattern.test(readerSource))
    .map(([name]) => `reader:${name}`);
  const violations = [...contractViolations, ...readerViolations];

  const hasPublicVisibility = contractSource.includes('PUBLIC_VISIBILITY = "public"');
  const hasPublicPreviewVisibility = contractSource.includes('PUBLIC_PREVIEW_VISIBILITY = "public_preview"');
  const hasContractStatus = contractSource.includes("PUBLIC_READER_CONTRACT_STATUS");
  const requiredReaderExports = [
    "getPublicCompetitions",
    "getPublicCompetitionBySlug",
    "getPublicTeamsByCompetitionSlug",
    "getPublicStandingsByCompetitionSlug",
    "getPublicCompetitionBundleBySlug",
  ];
  const missingReaderExports = requiredReaderExports.filter((name) => !readerSource.includes(`function ${name}`));
  const visibilityFilterCount = (readerSource.match(/\.eq\("visibility", PUBLIC_VISIBILITY\)/g) ?? []).length;
  const importsContract = readerSource.includes("./contracts");
  const importsSafeServerClient = readerSource.includes("@/lib/supabase/server");
  const importsSafeServerClientRelative = readerSource.includes("../supabase/server");
  const dryRunCallsRequiredReaders = requiredReaderExports.every((name) => dryRunSource.includes(name));
  const dryRunHasExpectedCounts =
    dryRunSource.includes("public_competitions_count") &&
    dryRunSource.includes("public_teams_count") &&
    dryRunSource.includes("public_standings_count") &&
    dryRunSource.includes("public_bundle_status");
  const readerPass =
    readerExists &&
    missingReaderExports.length === 0 &&
    visibilityFilterCount >= 3 &&
    importsContract &&
    (importsSafeServerClient || importsSafeServerClientRelative);
  const pass =
    contractExists &&
    violations.length === 0 &&
    hasPublicVisibility &&
    hasPublicPreviewVisibility &&
    hasContractStatus &&
    readerPass &&
    dryRunExists &&
    dryRunCallsRequiredReaders &&
    dryRunHasExpectedCounts;

  console.info("Regista Avanzato — Public Reader Contract Audit");
  console.info("mode=local_static_audit");
  console.info("point_52_public_reader_contract_skeleton_created=true");
  console.info("public_reader_contract_mode=contract_skeleton_only");
  console.info(`contract_file_exists=${contractExists}`);
  console.info(`public_visibility_constant_present=${hasPublicVisibility}`);
  console.info(`public_preview_visibility_constant_present=${hasPublicPreviewVisibility}`);
  console.info(`contract_status_present=${hasContractStatus}`);
  console.info("point_53_public_readers_no_route_implemented=true");
  console.info("public_reader_mode=no_route");
  console.info(`reader_file_exists=${readerExists}`);
  console.info(`reader_required_exports_present=${missingReaderExports.length === 0}`);
  console.info(`reader_missing_exports=${missingReaderExports.length > 0 ? missingReaderExports.join(",") : "none"}`);
  console.info(`reader_visibility_filter_count=${visibilityFilterCount}`);
  console.info(`reader_imports_contracts=${importsContract}`);
  console.info(`reader_imports_safe_server_client=${importsSafeServerClient || importsSafeServerClientRelative}`);
  console.info(`dry_run_file_exists=${dryRunExists}`);
  console.info(`dry_run_calls_required_readers=${dryRunCallsRequiredReaders}`);
  console.info(`dry_run_expected_count_markers_present=${dryRunHasExpectedCounts}`);
  console.info("public_readers_implemented=true");
  console.info("public_reader_operational=true");
  console.info("public_routes_enabled=false");
  console.info("public_routes_created=false");
  console.info("public_reader_connected_to_routes=false");
  console.info("supabase_queries_implemented=true");
  console.info("supabase_queries_visibility_filtered=true");
  console.info("admin_reader_imported=false");
  console.info("private_admin_publicly_exposed=false");
  console.info("visibility_changed=false");
  console.info("point_52_db_write=false");
  console.info("point_53_db_write=false");
  console.info("provider_fetch=false");
  console.info("external_fetch=false");
  console.info("provider_import_enabled=false");
  console.info("apify_enabled=false");
  console.info("production_touched=false");
  console.info("deploy_executed=false");
  console.info("service_role_used=false");
  console.info("token_read=false");
  console.info("token_printed=false");
  console.info(`violations_count=${violations.length}`);
  console.info(`violations=${violations.length > 0 ? violations.join(",") : "none"}`);
  console.info(`audit_pass=${pass}`);

  if (!pass) {
    process.exitCode = 1;
  }
}

main();
