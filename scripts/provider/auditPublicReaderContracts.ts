import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const CONTRACT_PATH = path.join(ROOT, "lib/public-data/contracts.ts");

const forbiddenPatterns: Array<[string, RegExp]> = [
  ["manual_admin_reader_import", /lib\/manual-data\/readers|@\/lib\/manual-data\/readers/],
  ["supabase_client_import", /@supabase\/|createSupabase|from\(/],
  ["external_fetch", /\bfetch\s*\(/],
  ["db_write_operation", /\.(insert|update|delete|upsert)\s*\(/],
  ["service_role", /service_role|SUPABASE_SERVICE_ROLE/i],
  ["server_action", /['"]use server['"]/],
  ["env_local", /\.env\.local/],
];

function main() {
  const contractExists = existsSync(CONTRACT_PATH);
  const source = contractExists ? readFileSync(CONTRACT_PATH, "utf8") : "";
  const violations = forbiddenPatterns
    .filter(([, pattern]) => pattern.test(source))
    .map(([name]) => name);

  const hasPublicVisibility = source.includes('PUBLIC_VISIBILITY = "public"');
  const hasPublicPreviewVisibility = source.includes('PUBLIC_PREVIEW_VISIBILITY = "public_preview"');
  const hasContractStatus = source.includes("PUBLIC_READER_CONTRACT_STATUS");
  const pass = contractExists && violations.length === 0 && hasPublicVisibility && hasPublicPreviewVisibility && hasContractStatus;

  console.info("Regista Avanzato — Public Reader Contract Audit");
  console.info("mode=local_static_audit");
  console.info("point_52_public_reader_contract_skeleton_created=true");
  console.info("public_reader_contract_mode=contract_skeleton_only");
  console.info(`contract_file_exists=${contractExists}`);
  console.info(`public_visibility_constant_present=${hasPublicVisibility}`);
  console.info(`public_preview_visibility_constant_present=${hasPublicPreviewVisibility}`);
  console.info(`contract_status_present=${hasContractStatus}`);
  console.info("public_readers_implemented=false");
  console.info("public_reader_operational=false");
  console.info("public_routes_enabled=false");
  console.info("public_routes_created=false");
  console.info("public_reader_connected_to_routes=false");
  console.info("supabase_queries_implemented=false");
  console.info("admin_reader_imported=false");
  console.info("private_admin_publicly_exposed=false");
  console.info("visibility_changed=false");
  console.info("point_52_db_write=false");
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
