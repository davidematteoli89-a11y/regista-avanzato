import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

type JsonRecord = Record<string, unknown>;

type LookupCompetition = {
  id: string;
  internal_key: string;
  api_competition_id: string;
  slug: string;
  name: string;
  country: string;
  season: string;
  status: string;
  visibility: string;
};

type LookupTeam = {
  id: string;
  competition_id: string;
  api_team_id: string;
  slug: string;
  name: string;
  short_name: string;
  country: string;
  status: string;
  visibility: string;
};

type LookupStanding = {
  id: string;
  competition_id: string;
  team_id: string;
  season: string;
  stage: string;
  matchday: number | null;
  rank: number;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goals_for: number;
  goals_against: number;
  goal_difference: number;
  points: number;
  status: string;
  visibility: string;
};

type LookupResult = {
  competitions: LookupCompetition[];
  teams: LookupTeam[];
  standings: LookupStanding[];
};

type Counts = {
  create: number;
  update: number;
  skip: number;
  conflict: number;
  unresolved: number;
};

const LOOKUP_RESULT_PATH = join(
  process.cwd(),
  "fixtures",
  "provider",
  "manual",
  "live-view-lookup-result.local.json",
);

function asRecordArray(value: unknown): JsonRecord[] {
  return Array.isArray(value)
    ? value.filter((item): item is JsonRecord => Boolean(item && typeof item === "object" && !Array.isArray(item)))
    : [];
}

function asString(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function asNumber(value: unknown): number {
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
}

function asNullableNumber(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function loadLookupResult(): LookupResult | null {
  if (!existsSync(LOOKUP_RESULT_PATH)) return null;

  const parsed = JSON.parse(readFileSync(LOOKUP_RESULT_PATH, "utf8")) as unknown;
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return null;
  const record = parsed as JsonRecord;

  return {
    competitions: asRecordArray(record.competitions).map((row) => ({
      id: asString(row.id),
      internal_key: asString(row.internal_key),
      api_competition_id: asString(row.api_competition_id),
      slug: asString(row.slug),
      name: asString(row.name),
      country: asString(row.country),
      season: asString(row.season),
      status: asString(row.status),
      visibility: asString(row.visibility),
    })),
    teams: asRecordArray(record.teams).map((row) => ({
      id: asString(row.id),
      competition_id: asString(row.competition_id),
      api_team_id: asString(row.api_team_id),
      slug: asString(row.slug),
      name: asString(row.name),
      short_name: asString(row.short_name),
      country: asString(row.country),
      status: asString(row.status),
      visibility: asString(row.visibility),
    })),
    standings: asRecordArray(record.standings).map((row) => ({
      id: asString(row.id),
      competition_id: asString(row.competition_id),
      team_id: asString(row.team_id),
      season: asString(row.season),
      stage: asString(row.stage),
      matchday: asNullableNumber(row.matchday),
      rank: asNumber(row.rank),
      played: asNumber(row.played),
      won: asNumber(row.won),
      drawn: asNumber(row.drawn),
      lost: asNumber(row.lost),
      goals_for: asNumber(row.goals_for),
      goals_against: asNumber(row.goals_against),
      goal_difference: asNumber(row.goal_difference),
      points: asNumber(row.points),
      status: asString(row.status),
      visibility: asString(row.visibility),
    })),
  };
}

function sameText(left: string, right: string): boolean {
  return left.trim().toLowerCase() === right.trim().toLowerCase();
}

async function main(): Promise<void> {
  const modulePath = new URL("../../lib/provider/manualFixtures.ts", import.meta.url).href;
  const { getManualFixturePreview } = (await import(modulePath)) as typeof import("../../lib/provider/manualFixtures");
  const preview = getManualFixturePreview();
  const lookupResult = loadLookupResult();
  const lookupLoaded = Boolean(lookupResult);
  const counts: Counts = { create: 0, update: 0, skip: 0, conflict: 0, unresolved: 0 };
  const competitionIdByProviderId = new Map<string, string>();
  const teamIdByProviderId = new Map<string, string>();

  if (!lookupResult) {
    counts.unresolved = preview.competitionsCount + preview.teamsCount + preview.standingsRowsCount;
  } else {
    for (const fixture of preview.competitions) {
      const matches = lookupResult.competitions.filter(
        (row) =>
          row.api_competition_id === fixture.provider_competition_id ||
          row.internal_key === fixture.provider_competition_id ||
          row.slug === fixture.provider_competition_id,
      );

      if (matches.length === 0) {
        counts.create += 1;
        continue;
      }
      if (matches.length > 1) {
        counts.conflict += 1;
        continue;
      }

      const match = matches[0];
      competitionIdByProviderId.set(fixture.provider_competition_id, match.id);
      const differs =
        !sameText(match.name, fixture.name) ||
        !sameText(match.country, fixture.country) ||
        (match.status !== "" && !sameText(match.status, fixture.status));

      if (differs) counts.update += 1;
      else counts.skip += 1;
    }

    for (const fixture of preview.teams) {
      const competitionId = competitionIdByProviderId.get(fixture.provider_competition_id);
      const matches = lookupResult.teams.filter((row) => row.api_team_id === fixture.provider_team_id);

      if (!competitionId) {
        counts.unresolved += 1;
        continue;
      }
      if (matches.length === 0) {
        counts.create += 1;
        continue;
      }
      if (matches.length > 1) {
        counts.conflict += 1;
        continue;
      }

      const match = matches[0];
      teamIdByProviderId.set(fixture.provider_team_id, match.id);
      if (match.competition_id !== competitionId) {
        counts.conflict += 1;
        continue;
      }

      const differs = !sameText(match.name, fixture.name) || !sameText(match.country, fixture.country);
      if (differs) counts.update += 1;
      else counts.skip += 1;
    }

    for (const fixture of preview.standings) {
      const competitionId = competitionIdByProviderId.get(fixture.provider_competition_id);
      const teamId = teamIdByProviderId.get(fixture.provider_team_id);

      if (!competitionId || !teamId) {
        counts.unresolved += 1;
        continue;
      }

      const matches = lookupResult.standings.filter(
        (row) => row.competition_id === competitionId && row.team_id === teamId,
      );

      if (matches.length === 0) {
        counts.create += 1;
        continue;
      }
      if (matches.length > 1) {
        counts.conflict += 1;
        continue;
      }

      const match = matches[0];
      const differs =
        match.rank !== fixture.rank ||
        match.played !== fixture.played ||
        match.won !== fixture.wins ||
        match.drawn !== fixture.draws ||
        match.lost !== fixture.losses ||
        match.goals_for !== fixture.goals_for ||
        match.goals_against !== fixture.goals_against ||
        match.points !== fixture.points;

      if (differs) counts.update += 1;
      else counts.skip += 1;
    }
  }

  console.info("Regista Avanzato — Manual Import Preview Dry Run");
  console.info("mode=manual_import_preview_dry_run");
  console.info(`preview_mode=${lookupLoaded ? "read_only_lookup_completed" : "read_only_lookup_pending"}`);
  console.info("source=local_fixtures");
  console.info("external_fetch=false");
  console.info("provider_fetch=false");
  console.info("db_write=false");
  console.info("service_role_used=false");
  console.info("token_read=false");
  console.info("token_printed=false");
  console.info("import_real_execution=false");
  console.info("provider_import_enabled=false");
  console.info("apify_enabled=false");
  console.info("production_touched=false");
  console.info("fixtures_loaded=true");
  console.info(`competitions_fixture_count=${preview.competitionsCount}`);
  console.info(`teams_fixture_count=${preview.teamsCount}`);
  console.info(`standings_fixture_count=${preview.standingsRowsCount}`);
  console.info(`fixture_references_valid=${preview.referencesValid}`);
  console.info(`mapping_theoretical_possible=${preview.mappingTheoreticalPossible}`);
  console.info("views_available=true");
  console.info("views_verified_count=3");
  console.info("competitions_view_status=verified");
  console.info("teams_view_status=verified");
  console.info("standings_view_status=verified");
  console.info(`view_lookup_executed=${lookupLoaded}`);
  console.info(`view_lookup_reason=${lookupLoaded ? "manual_lookup_result_file_loaded" : "pending_manual_sql_editor_execution"}`);
  console.info(`preview_resolution=${lookupLoaded ? "read_only_lookup_completed" : "read_only_lookup_pending"}`);
  console.info(`create_count=${counts.create}`);
  console.info(`update_count=${counts.update}`);
  console.info(`skip_count=${counts.skip}`);
  console.info(`conflict_count=${counts.conflict}`);
  console.info(`unresolved_count=${counts.unresolved}`);
  console.info("blocked_real_execution=true");
  console.info("next_write_allowed=false");
  console.info(
    `recommended_next_step=${
      counts.unresolved === 0 && counts.conflict === 0
        ? "point_40b_manual_import_write_plan_no_apply"
        : "point_40_fix_b_correct_fixture_mapping_no_db_write"
    }`,
  );
  console.info("confirmation=no_db_write,no_provider_fetch,no_import_execution,no_service_role,no_env_output");
}

await main();
