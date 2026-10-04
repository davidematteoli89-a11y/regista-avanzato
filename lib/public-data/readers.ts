import {
  PUBLIC_VISIBILITY,
  type PublicCompetition,
  type PublicCompetitionDetailResult,
  type PublicDataListResult,
  type PublicStanding,
  type PublicTeam,
} from "./contracts.ts";

function isSupabasePublicRuntimeConfigured() {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}

type PublicCompetitionRow = {
  id: string;
  slug: string | null;
  name: string;
  country: string | null;
  season: string | null;
  status: string | null;
  visibility: string | null;
  updated_at: string | null;
};

type PublicTeamRow = {
  id: string;
  competition_id: string | null;
  slug: string | null;
  name: string;
  short_name: string | null;
  country: string | null;
  status: string | null;
  visibility: string | null;
  updated_at: string | null;
};

type PublicStandingRow = {
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

function unavailableList<T>(warning: string): PublicDataListResult<T> {
  return { source: "unavailable", items: [], warning };
}

function emptyList<T>(): PublicDataListResult<T> {
  return { source: "empty", items: [], warning: null };
}

function publicOnlyVisibility(visibility: string | null): visibility is typeof PUBLIC_VISIBILITY {
  return visibility === PUBLIC_VISIBILITY;
}

async function createPublicSupabaseClient() {
  const { createSupabaseServerClient } = await import("../supabase/server.ts");
  return createSupabaseServerClient();
}

function mapCompetition(row: PublicCompetitionRow): PublicCompetition | null {
  if (!publicOnlyVisibility(row.visibility) || !row.slug) return null;

  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    country: row.country,
    season: row.season,
    status: row.status,
    visibility: row.visibility,
    updatedAt: row.updated_at,
  };
}

function mapTeam(row: PublicTeamRow): PublicTeam | null {
  if (!publicOnlyVisibility(row.visibility) || !row.competition_id || !row.slug) return null;

  return {
    id: row.id,
    competitionId: row.competition_id,
    slug: row.slug,
    name: row.name,
    shortName: row.short_name,
    country: row.country,
    status: row.status,
    visibility: row.visibility,
    updatedAt: row.updated_at,
  };
}

function mapStanding(row: PublicStandingRow, teamsById: Map<string, PublicTeam>): PublicStanding | null {
  if (!publicOnlyVisibility(row.visibility) || !row.competition_id || !row.team_id) return null;

  const team = teamsById.get(row.team_id);
  if (!team) return null;

  return {
    id: row.id,
    competitionId: row.competition_id,
    teamId: row.team_id,
    teamName: team.name,
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

export async function getPublicCompetitions(): Promise<PublicDataListResult<PublicCompetition>> {
  if (!isSupabasePublicRuntimeConfigured()) {
    return unavailableList("Public competitions reader non disponibile in safe mode.");
  }

  try {
    const supabase = await createPublicSupabaseClient();
    const { data, error } = await supabase
      .from("manual_import_competitions_lookup")
      .select("id, slug, name, country, season, status, visibility, updated_at")
      .eq("visibility", PUBLIC_VISIBILITY)
      .order("name", { ascending: true });

    if (error) {
      return unavailableList("Public competitions reader non disponibile o bloccato da RLS.");
    }

    const items = ((data ?? []) as unknown as PublicCompetitionRow[])
      .map(mapCompetition)
      .filter((item): item is PublicCompetition => item !== null);

    return items.length > 0 ? { source: "public_supabase", items, warning: null } : emptyList();
  } catch {
    return unavailableList("Public competitions reader non disponibile in questo ambiente.");
  }
}

export async function getPublicCompetitionBySlug(
  slug: string,
): Promise<PublicDataListResult<PublicCompetition>> {
  if (!isSupabasePublicRuntimeConfigured()) {
    return unavailableList("Public competition reader non disponibile in safe mode.");
  }

  try {
    const supabase = await createPublicSupabaseClient();
    const { data, error } = await supabase
      .from("manual_import_competitions_lookup")
      .select("id, slug, name, country, season, status, visibility, updated_at")
      .eq("visibility", PUBLIC_VISIBILITY)
      .eq("slug", slug)
      .limit(1);

    if (error) {
      return unavailableList("Public competition reader non disponibile o bloccato da RLS.");
    }

    const items = ((data ?? []) as unknown as PublicCompetitionRow[])
      .map(mapCompetition)
      .filter((item): item is PublicCompetition => item !== null);

    return items.length > 0 ? { source: "public_supabase", items, warning: null } : emptyList();
  } catch {
    return unavailableList("Public competition reader non disponibile in questo ambiente.");
  }
}

export async function getPublicTeamsByCompetitionSlug(
  slug: string,
): Promise<PublicDataListResult<PublicTeam>> {
  const competitionResult = await getPublicCompetitionBySlug(slug);
  const competition = competitionResult.items[0] ?? null;

  if (!competition) {
    return {
      source: competitionResult.source,
      items: [],
      warning: competitionResult.warning,
    };
  }

  if (!isSupabasePublicRuntimeConfigured()) {
    return unavailableList("Public teams reader non disponibile in safe mode.");
  }

  try {
    const supabase = await createPublicSupabaseClient();
    const { data, error } = await supabase
      .from("manual_import_teams_lookup")
      .select("id, competition_id, slug, name, short_name, country, status, visibility, updated_at")
      .eq("competition_id", competition.id)
      .eq("visibility", PUBLIC_VISIBILITY)
      .order("name", { ascending: true });

    if (error) {
      return unavailableList("Public teams reader non disponibile o bloccato da RLS.");
    }

    const items = ((data ?? []) as unknown as PublicTeamRow[])
      .map(mapTeam)
      .filter((item): item is PublicTeam => item !== null);

    return items.length > 0 ? { source: "public_supabase", items, warning: null } : emptyList();
  } catch {
    return unavailableList("Public teams reader non disponibile in questo ambiente.");
  }
}

export async function getPublicStandingsByCompetitionSlug(
  slug: string,
): Promise<PublicDataListResult<PublicStanding>> {
  const [competitionResult, teamsResult] = await Promise.all([
    getPublicCompetitionBySlug(slug),
    getPublicTeamsByCompetitionSlug(slug),
  ]);
  const competition = competitionResult.items[0] ?? null;

  if (!competition) {
    return {
      source: competitionResult.source,
      items: [],
      warning: competitionResult.warning,
    };
  }

  if (teamsResult.items.length === 0) {
    return {
      source: teamsResult.source,
      items: [],
      warning: teamsResult.warning,
    };
  }

  if (!isSupabasePublicRuntimeConfigured()) {
    return unavailableList("Public standings reader non disponibile in safe mode.");
  }

  try {
    const supabase = await createPublicSupabaseClient();
    const { data, error } = await supabase
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
      .eq("competition_id", competition.id)
      .eq("visibility", PUBLIC_VISIBILITY)
      .order("rank", { ascending: true });

    if (error) {
      return unavailableList("Public standings reader non disponibile o bloccato da RLS.");
    }

    const teamsById = new Map(teamsResult.items.map((team) => [team.id, team]));
    const items = ((data ?? []) as unknown as PublicStandingRow[])
      .map((row) => mapStanding(row, teamsById))
      .filter((item): item is PublicStanding => item !== null);

    return items.length > 0 ? { source: "public_supabase", items, warning: null } : emptyList();
  } catch {
    return unavailableList("Public standings reader non disponibile in questo ambiente.");
  }
}

export async function getPublicCompetitionBundleBySlug(
  slug: string,
): Promise<PublicCompetitionDetailResult> {
  const [competitionResult, teamsResult, standingsResult] = await Promise.all([
    getPublicCompetitionBySlug(slug),
    getPublicTeamsByCompetitionSlug(slug),
    getPublicStandingsByCompetitionSlug(slug),
  ]);

  const competition = competitionResult.items[0] ?? null;

  return {
    source: competition ? "public_supabase" : competitionResult.source,
    competition,
    teams: competition ? teamsResult.items : [],
    standings: competition ? standingsResult.items : [],
    warning: competitionResult.warning ?? teamsResult.warning ?? standingsResult.warning,
  };
}
