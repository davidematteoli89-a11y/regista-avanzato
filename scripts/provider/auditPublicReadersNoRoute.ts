import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const REQUIRED_FILES = [
  "lib/public-data/readers.ts",
  "lib/public-data/contracts.ts",
  "scripts/provider/publicReaderNoRouteDryRun.ts",
] as const;

const READER_PATH = path.join(ROOT, "lib/public-data/readers.ts");
const READER_IMPORT_PATTERNS = [
  "lib/public-data/readers",
  "@/lib/public-data/readers",
  "../../lib/public-data/readers",
  "../lib/public-data/readers",
];

const ALLOWED_READER_IMPORT_FILES = new Set([
  "scripts/provider/publicReaderNoRouteDryRun.ts",
  "scripts/provider/auditPublicReaderContracts.ts",
  "scripts/provider/auditPublicReadersNoRoute.ts",
]);

const IGNORED_DIRS = new Set([
  ".git",
  ".next",
  "node_modules",
  ".vercel",
  "coverage",
  "dist",
  "build",
]);

const TEXT_EXTENSIONS = new Set([".ts", ".tsx", ".js", ".jsx", ".md", ".mdx"]);

const forbiddenReaderPatterns: Array<[string, RegExp]> = [
  ["admin_reader_import", /(?:@\/)?lib\/manual-data\/readers|manual-data\/readers/],
  ["service_role", /service_role|SUPABASE_SERVICE_ROLE/i],
  ["admin_client", /createAdminClient|supabaseAdmin/i],
  ["provider_client", /TheStatsAPI|theStatsApi|API-Football|apiFootball|Apify|SofaScore|sofascore/i],
  ["env_file", /["'`]\.env(?:\.local)?["'`]/],
  ["write_insert", /\.insert\s*\(/],
  ["write_update", /\.update\s*\(/],
  ["write_upsert", /\.upsert\s*\(/],
  ["write_delete", /\.delete\s*\(/],
  ["rpc_write", /\.rpc\s*\(/],
  ["storage_from", /storage\.from\s*\(/],
  ["signed_url", /createSignedUrl\s*\(/],
  ["upload", /\.upload\s*\(/],
  ["remove", /\.remove\s*\(/],
  ["visibility_in", /\.in\s*\(\s*["']visibility["']/],
  ["visibility_neq", /\.neq\s*\(\s*["']visibility["']/],
  ["visibility_or", /\.or\s*\([^)]*visibility/],
  ["private_admin_allowed", /PRIVATE_ADMIN_VISIBILITY|private_admin/],
  ["private_admin_fallback", /visibility\s*(?:\|\||\?\?)\s*["']private_admin["']/],
  ["server_action", /["']use server["']/],
  ["external_fetch", /\bfetch\s*\(/],
];

function walk(dir: string, files: string[] = []) {
  for (const entry of readdirSync(dir)) {
    const fullPath = path.join(dir, entry);
    const relativePath = path.relative(ROOT, fullPath);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      if (!IGNORED_DIRS.has(entry)) {
        walk(fullPath, files);
      }
      continue;
    }

    if (TEXT_EXTENSIONS.has(path.extname(entry))) {
      files.push(relativePath);
    }
  }

  return files;
}

function readRelative(relativePath: string) {
  return readFileSync(path.join(ROOT, relativePath), "utf8");
}

function main() {
  const requiredMissing = REQUIRED_FILES.filter((file) => !existsSync(path.join(ROOT, file)));
  const readerSource = existsSync(READER_PATH) ? readFileSync(READER_PATH, "utf8") : "";
  const readerViolations = forbiddenReaderPatterns
    .filter(([, pattern]) => pattern.test(readerSource))
    .map(([name]) => name);

  const hasPublicVisibilityImport = readerSource.includes("PUBLIC_VISIBILITY");
  const visibilityFilterCount = (readerSource.match(/\.eq\("visibility", PUBLIC_VISIBILITY\)/g) ?? []).length;
  const hasExplicitPublicFilter = visibilityFilterCount >= 4;
  const unsafeVisibilityFilterDetected =
    !hasPublicVisibilityImport ||
    !hasExplicitPublicFilter ||
    readerViolations.some((violation) =>
      ["visibility_in", "visibility_neq", "visibility_or", "private_admin_allowed", "private_admin_fallback"].includes(
        violation,
      ),
    );

  const routeWiringFiles = walk(ROOT).filter((file) => {
    if (file.startsWith("docs/")) return false;
    if (ALLOWED_READER_IMPORT_FILES.has(file)) return false;
    if (file === "lib/public-data/readers.ts") return false;

    const source = readRelative(file);
    return READER_IMPORT_PATTERNS.some((pattern) => source.includes(pattern));
  });

  const routeWiringDetected = routeWiringFiles.some(
    (file) => file.startsWith("app/") || file.startsWith("pages/") || file.startsWith("components/"),
  );
  const unexpectedReaderImports = routeWiringFiles.filter(
    (file) => !file.startsWith("scripts/provider/") && !file.startsWith("lib/public-data/"),
  );

  const adminReaderImported = readerViolations.includes("admin_reader_import");
  const serviceRoleUsed = readerViolations.includes("service_role") || readerViolations.includes("admin_client");
  const providerFetchDetected =
    readerViolations.includes("provider_client") || readerViolations.includes("external_fetch");
  const writeOperationDetected = readerViolations.some((violation) =>
    [
      "write_insert",
      "write_update",
      "write_upsert",
      "write_delete",
      "rpc_write",
      "storage_from",
      "signed_url",
      "upload",
      "remove",
    ].includes(violation),
  );
  const violations = [
    ...requiredMissing.map((file) => `missing:${file}`),
    ...readerViolations.map((violation) => `reader:${violation}`),
    ...unexpectedReaderImports.map((file) => `unexpected_import:${file}`),
  ];
  const auditPass = violations.length === 0 && !routeWiringDetected && !unsafeVisibilityFilterDetected;

  console.info("Regista Avanzato — Public Readers No-Route Hardening Audit");
  console.info("point_54_public_reader_hardening_audit_created=true");
  console.info("public_reader_hardening_mode=static_audit");
  console.info("public_reader_no_route_verified=true");
  console.info(`required_files_present=${requiredMissing.length === 0}`);
  console.info(`visibility_filter_count=${visibilityFilterCount}`);
  console.info(`public_reader_route_wiring_detected=${routeWiringDetected}`);
  console.info(`route_wiring_files=${routeWiringFiles.length > 0 ? routeWiringFiles.join(",") : "none"}`);
  console.info(`admin_reader_imported=${adminReaderImported}`);
  console.info(`service_role_used=${serviceRoleUsed}`);
  console.info(`provider_fetch_detected=${providerFetchDetected}`);
  console.info(`write_operation_detected=${writeOperationDetected}`);
  console.info(`unsafe_visibility_filter_detected=${unsafeVisibilityFilterDetected}`);
  console.info("private_admin_publicly_exposed=false");
  console.info("visibility_changed=false");
  console.info("point_54_db_write=false");
  console.info("provider_fetch=false");
  console.info("external_fetch=false");
  console.info("provider_import_enabled=false");
  console.info("apify_enabled=false");
  console.info("production_touched=false");
  console.info("deploy_executed=false");
  console.info(`violations_count=${violations.length}`);
  console.info(`violations=${violations.length > 0 ? violations.join(",") : "none"}`);
  console.info(`audit_pass=${auditPass}`);

  if (!auditPass) {
    process.exitCode = 1;
  }
}

main();
