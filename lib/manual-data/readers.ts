import "server-only";

import { getSupabaseRuntimeStatus } from "@/lib/auth/config";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type ManualDataSource = "supabase_staging" | "empty" | "unavailable";

export type ManualCompetitionReadOnly = {
  id: string;
  internalKey: string | null;
  apiCompetitionId: string | null;
  slug: string | null;
  name: string;
  country: string | null;
  season: string | null;
  status: string | null;
  visibility: string | null;
  updatedAt: string | null;
};

export type ManualTeamReadOnly = {
  id: string;
  competitionId: string | null;
  apiTeamId: string | null;
  slug: string | null;
  name: string;
  shortName: string | null;
  country: string | null;
  status: string | null;
  visibility: string | null;
  updatedAt: string | null;
};

export type ManualStandingReadOnly = {
  id: string;
  competitionId: string | null;
  teamId: string | null;
  teamName: string;
  teamApiId: string | null;
  season: string | null;
  stage: string | null;
  matchday: number | null;
  rank: number;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
  status: string | null;
  visibility: string | null;
  updatedAt: string | null;
};

export type ManualDataListResult<T> = {
  source: ManualDataSource;
  items: T[];
  warning: string | null;
};

export type ManualCompetitionDetailResult = {
  source: ManualDataSource;
  competition: ManualCompetitionReadOnly | null;
  teams: ManualTeamReadOnly[];
  standings: ManualStandingReadOnly[];
  warning: string | null;
};

type ManualCompetitionRow = {
  id: string;
  internal_key: string | null;
  api_competition_id: string | null;
  slug: string | null;
  name: string;
  country: string | null;
  season: string | null;
  status: string | null;
  visibility: string | null;
  updated_at: string | null;
};

type ManualTeamRow = {
  id: string;
  competition_id: string | null;
  api_team_id: string | null;
  slug: string | null;
  name: string;
  short_name: string | null;
  country: string | null;
  status: string | null;
  visibility: string | null;
  updated_at: string | null;
};

type ManualStandingRow = {
  id: string;
  competition_id: string | null;
  team_id: string | null;
  season: string | null;
  stage: string | null;
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
  status: string | null;
  visibility: string | null;
  updated_at: string | null;
};

function unavailableList<T>(warning: string): ManualDataListResult<T> {
  return { source: "unavailable", items: [], warning };
}

function mapCompetition(row: ManualCompetitionRow): ManualCompetitionReadOnly {
  return {
    id: row.id,
    internalKey: row.internal_key,
    apiCompetitionId: row.api_competition_id,
    slug: row.slug,
    name: row.name,
    country: row.country,
    season: row.season,
    status: row.status,
    visibility: row.visibility,
    updatedAt: row.updated_at,
  };
}

function mapTeam(row: ManualTeamRow): ManualTeamReadOnly {
  return {
    id: row.id,
    competitionId: row.competition_id,
    apiTeamId: row.api_team_id,
    slug: row.slug,
    name: row.name,
    shortName: row.short_name,
    country: row.country,
    status: row.status,
    visibility: row.visibility,
    updatedAt: row.updated_at,
  };
}

function mapStanding(row: ManualStandingRow, teamsById: Map<string, ManualTeamReadOnly>): ManualStandingReadOnly {
  const team = row.team_id ? teamsById.get(row.team_id) : null;

  return {
    id: row.id,
    competitionId: row.competition_id,
    teamId: row.team_id,
    teamName: team?.name ?? "Squadra",
    teamApiId: team?.apiTeamId ?? null,
    season: row.season,
    stage: row.stage,
    matchday: row.matchday,
    rank: row.rank,
    played: row.played,
    won: row.won,
    drawn: row.drawn,
    lost: row.lost,
    goalsFor: row.goals_for,
    goalsAgainst: row.goals_against,
    goalDifference: row.goal_difference,
    points: row.points,
    status: row.status,
    visibility: row.visibility,
    updatedAt: row.updated_at,
  };
}

export async function getManualCompetitionsReadOnly(): Promise<ManualDataListResult<ManualCompetitionReadOnly>> {
  if (!getSupabaseRuntimeStatus().configured) {
    return unavailableList("Supabase non configurato: reader manual competitions non disponibile in safe mode.");
  }

  try {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
      .from("manual_import_competitions_lookup")
      .select("id, internal_key, api_competition_id, slug, name, country, season, status, visibility, updated_at")
      .order("name", { ascending: true });

    if (error) {
      return unavailableList("Reader manual competitions non disponibile o bloccato da RLS.");
    }

    const items = ((data ?? []) as unknown as ManualCompetitionRow[]).map(mapCompetition);

    return {
      source: items.length > 0 ? "supabase_staging" : "empty",
      items,
      warning: null,
    };
  } catch {
    return unavailableList("Reader manual competitions non disponibile in questo ambiente.");
  }
}

export async function getManualCompetitionBySlugReadOnly(slug: string): Promise<ManualCompetitionDetailResult> {
  const competitionsResult = await getManualCompetitionsReadOnly();
  const competition =
    competitionsResult.items.find(
      (item) => item.slug === slug || item.internalKey === slug || item.apiCompetitionId === slug,
    ) ?? null;

  if (!competition) {
    return {
      source: competitionsResult.source,
      competition: null,
      teams: [],
      standings: [],
      warning: competitionsResult.warning,
    };
  }

  const [teamsResult, standingsResult] = await Promise.all([
    getManualTeamsByCompetitionReadOnly(competition.id),
    getManualStandingsByCompetitionReadOnly(competition.id),
  ]);

  return {
    source: competitionsResult.source,
    competition,
    teams: teamsResult.items,
    standings: standingsResult.items,
    warning: competitionsResult.warning ?? teamsResult.warning ?? standingsResult.warning,
  };
}

export async function getManualTeamsByCompetitionReadOnly(
  competitionId: string,
): Promise<ManualDataListResult<ManualTeamReadOnly>> {
  if (!getSupabaseRuntimeStatus().configured) {
    return unavailableList("Supabase non configurato: reader manual teams non disponibile in safe mode.");
  }

  try {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
      .from("manual_import_teams_lookup")
      .select("id, competition_id, api_team_id, slug, name, short_name, country, status, visibility, updated_at")
      .eq("competition_id", competitionId)
      .order("name", { ascending: true });

    if (error) {
      return unavailableList("Reader manual teams non disponibile o bloccato da RLS.");
    }

    const items = ((data ?? []) as unknown as ManualTeamRow[]).map(mapTeam);

    return {
      source: items.length > 0 ? "supabase_staging" : "empty",
      items,
      warning: null,
    };
  } catch {
    return unavailableList("Reader manual teams non disponibile in questo ambiente.");
  }
}

export async function getManualStandingsByCompetitionReadOnly(
  competitionId: string,
): Promise<ManualDataListResult<ManualStandingReadOnly>> {
  if (!getSupabaseRuntimeStatus().configured) {
    return unavailableList("Supabase non configurato: reader manual standings non disponibile in safe mode.");
  }

  try {
    const supabase = await createSupabaseServerClient();
    const [teamsResult, standingsResult] = await Promise.all([
      supabase
        .from("manual_import_teams_lookup")
        .select("id, competition_id, api_team_id, slug, name, short_name, country, status, visibility, updated_at")
        .eq("competition_id", competitionId),
      supabase
        .from("manual_import_standings_lookup")
        .select(
          [
            "id",
            "competition_id",
            "team_id",
            "season",
            "stage",
            "matchday",
            "rank",
            "played",
            "won",
            "drawn",
            "lost",
            "goals_for",
            "goals_against",
            "goal_difference",
            "points",
            "status",
            "visibility",
            "updated_at",
          ].join(", "),
        )
        .eq("competition_id", competitionId)
        .order("rank", { ascending: true }),
    ]);

    if (teamsResult.error || standingsResult.error) {
      return unavailableList("Reader manual standings non disponibile o bloccato da RLS.");
    }

    const teams = ((teamsResult.data ?? []) as unknown as ManualTeamRow[]).map(mapTeam);
    const teamsById = new Map(teams.map((team) => [team.id, team]));
    const items = ((standingsResult.data ?? []) as unknown as ManualStandingRow[]).map((row) =>
      mapStanding(row, teamsById),
    );

    return {
      source: items.length > 0 ? "supabase_staging" : "empty",
      items,
      warning: null,
    };
  } catch {
    return unavailableList("Reader manual standings non disponibile in questo ambiente.");
  }
}
