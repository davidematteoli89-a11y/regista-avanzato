import { readFileSync } from "node:fs";
import { join } from "node:path";

type JsonRecord = Record<string, unknown>;

export type ManualFixtureCompetition = {
  provider_competition_id: string;
  name: string;
  country: string;
  category: string;
  status: string;
};

export type ManualFixtureTeam = {
  provider_team_id: string;
  provider_competition_id: string;
  name: string;
  country: string;
};

export type ManualFixtureStanding = {
  provider_competition_id: string;
  provider_team_id: string;
  rank: number;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  goals_for: number;
  goals_against: number;
  points: number;
};

export type ManualFixturePreview = {
  mode: "manual_fixture_preview";
  source: "local_fixtures";
  externalFetch: false;
  dbWrite: false;
  tokenRead: false;
  tokenPrinted: false;
  competitionsCount: number;
  teamsCount: number;
  standingsRowsCount: number;
  missingRequiredFields: string[];
  referenceErrors: string[];
  warnings: string[];
  errors: string[];
  referencesValid: boolean;
  mappingTheoreticalPossible: boolean;
  competitions: ManualFixtureCompetition[];
  teams: ManualFixtureTeam[];
  standings: ManualFixtureStanding[];
};

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

function asString(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function asNumber(value: unknown): number {
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
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

function mapCompetition(row: JsonRecord): ManualFixtureCompetition {
  return {
    provider_competition_id: asString(row.provider_competition_id),
    name: asString(row.name),
    country: asString(row.country),
    category: asString(row.category),
    status: asString(row.status),
  };
}

function mapTeam(row: JsonRecord): ManualFixtureTeam {
  return {
    provider_team_id: asString(row.provider_team_id),
    provider_competition_id: asString(row.provider_competition_id),
    name: asString(row.name),
    country: asString(row.country),
  };
}

function mapStanding(row: JsonRecord): ManualFixtureStanding {
  return {
    provider_competition_id: asString(row.provider_competition_id),
    provider_team_id: asString(row.provider_team_id),
    rank: asNumber(row.rank),
    played: asNumber(row.played),
    wins: asNumber(row.wins),
    draws: asNumber(row.draws),
    losses: asNumber(row.losses),
    goals_for: asNumber(row.goals_for),
    goals_against: asNumber(row.goals_against),
    points: asNumber(row.points),
  };
}

export function getManualFixturePreview(): ManualFixturePreview {
  const rawCompetitions = readJsonArray("competitions.sample.json");
  const rawTeams = readJsonArray("teams.sample.json");
  const rawStandings = readJsonArray("standings.sample.json");

  const missingRequiredFields = [
    ...collectMissingFields(rawCompetitions, REQUIRED_COMPETITION_FIELDS, "competitions"),
    ...collectMissingFields(rawTeams, REQUIRED_TEAM_FIELDS, "teams"),
    ...collectMissingFields(rawStandings, REQUIRED_STANDING_FIELDS, "standings"),
  ];

  const competitions = rawCompetitions.map(mapCompetition);
  const teams = rawTeams.map(mapTeam);
  const standings = rawStandings.map(mapStanding);

  const competitionIds = new Set(competitions.map((competition) => competition.provider_competition_id));
  const teamIds = new Set(teams.map((team) => team.provider_team_id));
  const referenceErrors = standings.flatMap((row, index) => {
    const errors: string[] = [];

    if (!competitionIds.has(row.provider_competition_id)) {
      errors.push(`standings[${index}].provider_competition_id`);
    }

    if (!teamIds.has(row.provider_team_id)) {
      errors.push(`standings[${index}].provider_team_id`);
    }

    return errors;
  });
  const warnings: string[] = [];
  const errors: string[] = [];
  const referencesValid = referenceErrors.length === 0;
  const mappingTheoreticalPossible =
    competitions.length > 0 &&
    teams.length > 0 &&
    standings.length > 0 &&
    referencesValid &&
    missingRequiredFields.length === 0 &&
    errors.length === 0;

  return {
    mode: "manual_fixture_preview",
    source: "local_fixtures",
    externalFetch: false,
    dbWrite: false,
    tokenRead: false,
    tokenPrinted: false,
    competitionsCount: competitions.length,
    teamsCount: teams.length,
    standingsRowsCount: standings.length,
    missingRequiredFields,
    referenceErrors,
    warnings,
    errors,
    referencesValid,
    mappingTheoreticalPossible,
    competitions,
    teams,
    standings,
  };
}
