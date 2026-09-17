import { readFileSync } from "node:fs";
import { join } from "node:path";

type JsonRecord = Record<string, unknown>;

const FIXTURE_DIR = join(process.cwd(), "fixtures", "provider", "manual");

const REQUIRED_COMPETITION_FIELDS = ["provider_competition_id", "name", "country", "category", "status"] as const;
const REQUIRED_TEAM_FIELDS = ["provider_team_id", "provider_competition_id", "name", "country"] as const;
const REQUIRED_STANDING_FIELDS = [
  "provider_competition_id",
  "provider_team_id",
  "rank",
  "played",
  "wins",
  "draws",
  "losses",
  "goals_for",
  "goals_against",
  "points",
] as const;

function readJsonArray(fileName: string): JsonRecord[] {
  const filePath = join(FIXTURE_DIR, fileName);
  const parsed = JSON.parse(readFileSync(filePath, "utf8")) as unknown;

  if (!Array.isArray(parsed)) {
    throw new Error(`${fileName}: expected_json_array`);
  }

  return parsed.filter((item): item is JsonRecord => Boolean(item && typeof item === "object" && !Array.isArray(item)));
}

function collectMissingFields(rows: JsonRecord[], fields: readonly string[], label: string): string[] {
  const missing: string[] = [];

  rows.forEach((row, index) => {
    for (const field of fields) {
      if (!(field in row) || row[field] === null || row[field] === "") {
        missing.push(`${label}[${index}].${field}`);
      }
    }
  });

  return missing;
}

function main(): void {
  const competitions = readJsonArray("competitions.sample.json");
  const teams = readJsonArray("teams.sample.json");
  const standings = readJsonArray("standings.sample.json");

  const missingRequiredFields = [
    ...collectMissingFields(competitions, REQUIRED_COMPETITION_FIELDS, "competitions"),
    ...collectMissingFields(teams, REQUIRED_TEAM_FIELDS, "teams"),
    ...collectMissingFields(standings, REQUIRED_STANDING_FIELDS, "standings"),
  ];

  const competitionIds = new Set(competitions.map((competition) => String(competition.provider_competition_id ?? "")));
  const teamIds = new Set(teams.map((team) => String(team.provider_team_id ?? "")));
  const standingsReferencesKnownEntities = standings.every((row) => {
    const competitionId = String(row.provider_competition_id ?? "");
    const teamId = String(row.provider_team_id ?? "");

    return competitionIds.has(competitionId) && teamIds.has(teamId);
  });
  const mappingTheoreticalPossible =
    competitions.length > 0 &&
    teams.length > 0 &&
    standings.length > 0 &&
    standingsReferencesKnownEntities &&
    missingRequiredFields.length === 0;

  console.info("Regista Avanzato — Manual Fixtures Dry Run");
  console.info("mode=manual_fixture_dry_run");
  console.info("source=local_fixtures");
  console.info("external_fetch=false");
  console.info("db_write=false");
  console.info("token_read=false");
  console.info("token_printed=false");
  console.info(`competitions_count=${competitions.length}`);
  console.info(`teams_count=${teams.length}`);
  console.info(`standings_rows_count=${standings.length}`);
  console.info(`missing_required_fields=${missingRequiredFields.length === 0 ? "none" : missingRequiredFields.join(",")}`);
  console.info(`references_valid=${standingsReferencesKnownEntities}`);
  console.info(`mapping_theoretical_possible=${mappingTheoreticalPossible}`);
  console.info("provider_activated=false");
  console.info("import_enabled=false");
  console.info("confirmation=no_external_provider_calls,no_apify_calls,no_sofascore_calls,no_scraping,no_db_writes,no_env_output");
}

main();
