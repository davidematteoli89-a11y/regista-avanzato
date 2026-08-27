import "server-only";

import { createClient } from "@supabase/supabase-js";
import { getCompetitionById, type DataConfidence, type TrackingLevel } from "@/config/competitions";
import { MOCK_PUBLIC_COMPETITIONS, MOCK_PUBLIC_MATCHES, MOCK_PUBLIC_STANDINGS, MOCK_PUBLIC_TEAMS } from "./mockPublicData";
import type { PublicCompetition, PublicDataList, PublicDataMeta, PublicMatch, PublicStanding, PublicTeam } from "./publicDataTypes";

type PublicCompetitionRow = {
  id: string;
  internal_key: string | null;
  slug: string | null;
  name: string;
  country: string;
  continent: string;
  public_stats_enabled: boolean;
  login_required_for_full_stats: boolean;
  updated_at: string | null;
};

type PublicTeamRow = {
  id: string;
  competition_id: string | null;
  slug: string | null;
  name: string;
  short_name: string | null;
  country: string | null;
  logo_url: string | null;
  updated_at: string | null;
};

type PublicMatchRow = {
  id: string;
  competition_id: string;
  season: string;
  round: string | null;
  kickoff_at: string;
  venue: string | null;
  home_team_id: string;
  away_team_id: string;
  home_score: number | null;
  away_score: number | null;
  status: "scheduled" | "finished" | "postponed" | string;
  updated_at: string | null;
};

type PublicStandingRow = {
  competition_id: string;
  team_id: string;
  rank: number;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goals_for: number;
  goals_against: number;
  goal_difference: number;
  points: number;
  form: string | null;
  updated_at: string | null;
};

function isSupabasePublicConfigured() {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}

function createPublicClient() {
  if (!isSupabasePublicConfigured()) return null;

  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
      detectSessionInUrl: false,
    },
  });
}

function publicMeta(updatedAt: string | null, confidence: DataConfidence = "medium_low"): PublicDataMeta {
  return {
    source: "supabase_public_view",
    isMock: false,
    confidence,
    coverage: "partial",
    updatedAt: updatedAt ?? new Date(0).toISOString(),
  };
}

function mockList<T>(items: T[], warning: string): PublicDataList<T> {
  return { items, meta: { source: "mock_public_snapshot", total: items.length, warning } };
}

function emptySupabaseList<T>(warning: string): PublicDataList<T> {
  return { items: [], meta: { source: "supabase_public_view", total: 0, warning } };
}

function supabaseList<T>(items: T[], warning: string | null): PublicDataList<T> {
  return { items, meta: { source: "supabase_public_view", total: items.length, warning } };
}

function publicCompetitionId(row: Pick<PublicCompetitionRow, "slug" | "internal_key" | "id">) {
  return row.slug ?? row.internal_key ?? row.id;
}

function configForCompetition(row: PublicCompetitionRow) {
  return getCompetitionById(row.internal_key ?? row.slug ?? row.id);
}

function mapCompetition(row: PublicCompetitionRow): PublicCompetition {
  const config = configForCompetition(row);
  return {
    id: publicCompetitionId(row),
    name: row.name,
    country: row.country,
    continent: row.continent,
    trackingLevel: config?.tracking_level ?? ("trigger" satisfies TrackingLevel),
    publicStatsEnabled: row.public_stats_enabled,
    loginRequiredForFullStats: row.login_required_for_full_stats,
    meta: publicMeta(row.updated_at, config?.data_confidence ?? "medium_low"),
  };
}

function mapTeam(row: PublicTeamRow, competitionSlugById: Map<string, string>): PublicTeam {
  return {
    id: row.slug ?? row.id,
    competitionId: row.competition_id ? (competitionSlugById.get(row.competition_id) ?? row.competition_id) : "",
    name: row.name,
    shortName: row.short_name ?? row.name,
    country: row.country ?? "",
    crestUrl: null,
    position: null,
    meta: publicMeta(row.updated_at),
  };
}

function mapMatch(row: PublicMatchRow, competitionByDbId: Map<string, PublicCompetition>, teamByDbId: Map<string, PublicTeam>): PublicMatch {
  const competition = competitionByDbId.get(row.competition_id);
  const home = teamByDbId.get(row.home_team_id);
  const away = teamByDbId.get(row.away_team_id);

  return {
    id: row.id,
    competitionId: competition?.id ?? row.competition_id,
    competitionName: competition?.name ?? "Competizione",
    season: row.season,
    round: row.round,
    kickoffAt: row.kickoff_at,
    status: row.status === "finished" || row.status === "postponed" ? row.status : "scheduled",
    homeTeamId: home?.id ?? row.home_team_id,
    homeTeamName: home?.name ?? "Squadra casa",
    awayTeamId: away?.id ?? row.away_team_id,
    awayTeamName: away?.name ?? "Squadra trasferta",
    homeScore: row.home_score,
    awayScore: row.away_score,
    venue: row.venue,
    meta: publicMeta(row.updated_at),
  };
}

function mapStanding(row: PublicStandingRow, competitionByDbId: Map<string, PublicCompetition>, teamByDbId: Map<string, PublicTeam>): PublicStanding {
  const competition = competitionByDbId.get(row.competition_id);
  const team = teamByDbId.get(row.team_id);
  return {
    competitionId: competition?.id ?? row.competition_id,
    teamId: team?.id ?? row.team_id,
    teamName: team?.name ?? "Squadra",
    rank: row.rank,
    played: row.played,
    won: row.won,
    drawn: row.drawn,
    lost: row.lost,
    goalsFor: row.goals_for,
    goalsAgainst: row.goals_against,
    goalDifference: row.goal_difference,
    points: row.points,
    form: row.form,
  };
}

async function queryCompetitionRows(supabase: NonNullable<ReturnType<typeof createPublicClient>>) {
  const { data, error } = await supabase
    .from("public_competitions")
    .select("id, internal_key, slug, name, country, continent, public_stats_enabled, login_required_for_full_stats, updated_at")
    .order("name", { ascending: true });

  return { data: (data ?? []) as PublicCompetitionRow[], error };
}

async function queryTeamRows(supabase: NonNullable<ReturnType<typeof createPublicClient>>) {
  const { data, error } = await supabase
    .from("public_teams")
    .select("id, competition_id, slug, name, short_name, country, logo_url, updated_at")
    .order("name", { ascending: true });

  return { data: (data ?? []) as PublicTeamRow[], error };
}

export async function readPublicCompetitions(): Promise<PublicDataList<PublicCompetition>> {
  const supabase = createPublicClient();
  if (!supabase) return mockList(MOCK_PUBLIC_COMPETITIONS.filter((item) => item.publicStatsEnabled), "Supabase non configurato: fallback demo.");

  const { data, error } = await queryCompetitionRows(supabase);

  if (error) return mockList(MOCK_PUBLIC_COMPETITIONS.filter((item) => item.publicStatsEnabled), "Public view Supabase non disponibile: fallback demo.");
  if (!data.length) return emptySupabaseList("Dati in preparazione: nessuna competizione pubblicata nello staging.");

  const items = data.map(mapCompetition).filter((item) => item.publicStatsEnabled);
  return supabaseList(items, "Dati letti da public_competitions. Navigare nello Stats Hub non consuma ricerche avanzate.");
}

export async function readPublicCompetitionById(competitionId: string): Promise<PublicCompetition | null> {
  const list = await readPublicCompetitions();
  return list.items.find((item) => item.id === competitionId) ?? null;
}

export async function readPublicTeams(competitionId?: string): Promise<PublicDataList<PublicTeam>> {
  const supabase = createPublicClient();
  if (!supabase) {
    const items = competitionId ? MOCK_PUBLIC_TEAMS.filter((item) => item.competitionId === competitionId) : [...MOCK_PUBLIC_TEAMS];
    return mockList(items, "Supabase non configurato: fallback squadre demo.");
  }

  const { data: competitionRows, error: competitionError } = await queryCompetitionRows(supabase);
  if (competitionError) {
    const items = competitionId ? MOCK_PUBLIC_TEAMS.filter((item) => item.competitionId === competitionId) : [...MOCK_PUBLIC_TEAMS];
    return mockList(items, "Public view competizioni non disponibile: fallback squadre demo.");
  }

  const competitions = competitionRows.map(mapCompetition);
  if (!competitions.length) {
    return emptySupabaseList("Dati in preparazione: nessuna squadra pubblicata nello staging.");
  }

  const competitionSlugById = new Map(competitionRows.map((row) => [row.id, publicCompetitionId(row)]));
  const { data, error } = await queryTeamRows(supabase);

  if (error) {
    const items = competitionId ? MOCK_PUBLIC_TEAMS.filter((item) => item.competitionId === competitionId) : [...MOCK_PUBLIC_TEAMS];
    return mockList(items, "Public view squadre non disponibile: fallback demo.");
  }

  const items = data.length ? data.map((row) => mapTeam(row, competitionSlugById)) : [];
  const filtered = competitionId ? items.filter((item) => item.competitionId === competitionId) : items;

  if (!filtered.length) return emptySupabaseList("Dati in preparazione: nessuna squadra pubblicata nello staging.");
  return supabaseList(filtered, "Dati letti da public_teams.");
}

export async function readPublicMatches(competitionId?: string): Promise<PublicDataList<PublicMatch>> {
  const supabase = createPublicClient();
  if (!supabase) {
    const items = competitionId ? MOCK_PUBLIC_MATCHES.filter((item) => item.competitionId === competitionId) : [...MOCK_PUBLIC_MATCHES];
    return mockList(items, "Supabase non configurato: fallback partite demo.");
  }

  const [competitionRowsResult, teamRowsResult] = await Promise.all([queryCompetitionRows(supabase), queryTeamRows(supabase)]);
  if (competitionRowsResult.error || teamRowsResult.error) {
    const items = competitionId ? MOCK_PUBLIC_MATCHES.filter((item) => item.competitionId === competitionId) : [...MOCK_PUBLIC_MATCHES];
    return mockList(items, "Public views relazionali non disponibili: fallback partite demo.");
  }

  const competitions = competitionRowsResult.data.map(mapCompetition);
  if (!competitions.length) {
    return emptySupabaseList("Dati in preparazione: nessuna partita pubblicata nello staging.");
  }

  const competitionSlugById = new Map(competitionRowsResult.data.map((row) => [row.id, publicCompetitionId(row)]));
  const competitionByDbId = new Map(competitionRowsResult.data.map((row) => [row.id, mapCompetition(row)]));
  const teamByDbId = new Map(teamRowsResult.data.map((row) => [row.id, mapTeam(row, competitionSlugById)]));

  const { data, error } = await supabase
    .from("public_matches")
    .select("id, competition_id, season, round, kickoff_at, venue, home_team_id, away_team_id, home_score, away_score, status, updated_at")
    .order("kickoff_at", { ascending: false });

  if (error) {
    const items = competitionId ? MOCK_PUBLIC_MATCHES.filter((item) => item.competitionId === competitionId) : [...MOCK_PUBLIC_MATCHES];
    return mockList(items, "Public view partite non disponibile: fallback demo.");
  }

  const items = data?.length ? (data as PublicMatchRow[]).map((row) => mapMatch(row, competitionByDbId, teamByDbId)) : [];
  const filtered = competitionId ? items.filter((item) => item.competitionId === competitionId) : items;

  if (!filtered.length) return emptySupabaseList("Dati in preparazione: nessuna partita pubblicata nello staging.");
  return supabaseList(filtered, "Dati letti da public_matches.");
}

export async function readPublicStandings(competitionId: string): Promise<PublicDataList<PublicStanding>> {
  const supabase = createPublicClient();
  if (!supabase) return mockList(MOCK_PUBLIC_STANDINGS.filter((item) => item.competitionId === competitionId), "Supabase non configurato: fallback classifica demo.");

  const { data: competitionRows, error: competitionError } = await queryCompetitionRows(supabase);
  const { data: teamRows, error: teamError } = await queryTeamRows(supabase);
  if (competitionError || teamError) return mockList(MOCK_PUBLIC_STANDINGS.filter((item) => item.competitionId === competitionId), "Public views relazionali non disponibili: fallback classifica demo.");

  const competitionByDbId = new Map(competitionRows.map((row) => [row.id, mapCompetition(row)]));
  const competitionDbId = competitionRows.find((row) => publicCompetitionId(row) === competitionId)?.id ?? competitionId;
  const competitionSlugById = new Map(competitionRows.map((row) => [row.id, publicCompetitionId(row)]));
  const teamByDbId = new Map(teamRows.map((row) => [row.id, mapTeam(row, competitionSlugById)]));
  const { data, error } = await supabase
    .from("public_standings")
    .select("competition_id, team_id, rank, played, won, drawn, lost, goals_for, goals_against, goal_difference, points, form, updated_at")
    .eq("competition_id", competitionDbId)
    .order("rank", { ascending: true });

  if (error) return mockList(MOCK_PUBLIC_STANDINGS.filter((item) => item.competitionId === competitionId), "Public view classifica non disponibile: fallback demo.");
  const items = data?.length ? (data as PublicStandingRow[]).map((row) => mapStanding(row, competitionByDbId, teamByDbId)) : [];

  if (!items.length) return emptySupabaseList("Dati in preparazione: nessuna classifica pubblicata nello staging.");
  return supabaseList(items, "Dati letti da public_standings.");
}
