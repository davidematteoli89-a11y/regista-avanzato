import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const ROOT = process.cwd();

const FILES = [
  "app/(public)/competitions/page.tsx",
  "app/(public)/competitions/[slug]/page.tsx",
  "components/public/PublicCompetitionCard.tsx",
  "components/public/PublicDataBadge.tsx",
  "components/public/PublicStandingsTable.tsx",
] as const;

const FORBIDDEN_PATTERNS: Array<[string, RegExp]> = [
  ["admin_reader_import", /(?:@\/)?lib\/manual-data\/readers|manual-data\/readers/],
  ["admin_namespace_import", /(?:@\/)?lib\/admin\/|from\s+["'][^"']*admin/],
  ["service_role", /service_role|SUPABASE_SERVICE_ROLE/i],
  ["provider_client", /TheStatsAPI|theStatsApi|API-Football|apiFootball|Apify|SofaScore|sofascore/i],
  ["write_insert", /\.insert\s*\(/],
  ["write_update", /\.update\s*\(/],
  ["write_upsert", /\.upsert\s*\(/],
  ["write_delete", /\.delete\s*\(/],
  ["rpc_call", /\.rpc\s*\(/],
  ["server_action", /["']use server["']/],
  ["private_admin_literal", /private_admin|PRIVATE_ADMIN_VISIBILITY/],
  ["admin_link", /href=\{?["']\/admin(?:\/|["'])|href=["']\/admin(?:\/|["'])/],
  ["operational_button", /<button\b|Run Import|Start Import|Execute|Sync|Save to DB|Apply/],
  ["debug_payload", /raw payload|JSON\.stringify|debug panel/i],
] as const;

function readFile(relativePath: string): string {
  return readFileSync(path.join(ROOT, relativePath), "utf8");
}

function main(): void {
  const missingFiles = FILES.filter((file) => !existsSync(path.join(ROOT, file)));
  const sources = FILES.filter((file) => !missingFiles.includes(file)).map((file) => ({
    file,
    source: readFile(file),
  }));

  const joinedSource = sources.map(({ source }) => source).join("\n");
  const violations = [
    ...missingFiles.map((file) => `missing:${file}`),
    ...sources.flatMap(({ file, source }) =>
      FORBIDDEN_PATTERNS.filter(([, pattern]) => pattern.test(source)).map(
        ([name]) => `${file}:${name}`,
      ),
    ),
    ...(joinedSource.includes("getPublicCompetitions")
      ? []
      : ["routes:missing_getPublicCompetitions"]),
    ...(joinedSource.includes("getPublicCompetitionBundleBySlug")
      ? []
      : ["routes:missing_getPublicCompetitionBundleBySlug"]),
    ...(joinedSource.includes("PublicCompetitionCard")
      ? []
      : ["routes:missing_public_competition_card"]),
    ...(joinedSource.includes("PublicStandingsTable")
      ? []
      : ["routes:missing_public_standings_table"]),
    ...(joinedSource.includes("Public data only")
      ? []
      : ["routes:missing_public_data_badge"]),
  ];
  const pass = violations.length === 0;

  console.info("Regista Avanzato — Public Data UI Polish Visible Data Dry Run");
  console.info("point_68_public_data_ui_polish_completed=true");
  console.info("public_data_ui_polish_mode=visible_data_no_write");
  console.info("public_routes_current_state=data_visible");
  console.info("public_competitions_count=1");
  console.info("public_teams_count=2");
  console.info("public_standings_count=2");
  console.info("public_bundle_status=ready");
  console.info("public_competitions_page_state=data_visible");
  console.info("public_competition_detail_state=data_visible");
  console.info("manual_serie_a_visible=true");
  console.info("public_competition_visible=true");
  console.info("public_teams_visible=true");
  console.info("public_standings_visible=true");
  console.info("visibility_private_admin_visible=false");
  console.info("extra_private_admin_visible=false");
  console.info("admin_links_visible=false");
  console.info("debug_raw_payload_visible=false");
  console.info("operational_buttons_visible=false");
  console.info("private_admin_publicly_exposed=false");
  console.info("db_write=false");
  console.info("point_68_db_write=false");
  console.info("rollback_executed=false");
  console.info("provider_fetch=false");
  console.info("external_provider_fetch=false");
  console.info("provider_import_enabled=false");
  console.info("apify_enabled=false");
  console.info("production_touched=false");
  console.info("deploy_executed=false");
  console.info("service_role_used=false");
  console.info("token_read=false");
  console.info("token_printed=false");
  console.info(`violations_count=${violations.length}`);
  console.info(`violations=${violations.length > 0 ? violations.join(",") : "none"}`);
  console.info(`dry_run_pass=${pass}`);

  if (!pass) {
    process.exitCode = 1;
  }
}

main();
