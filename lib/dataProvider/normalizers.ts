import type {
  MatchStatus,
  NormalizedCompetition,
  NormalizedMatch,
  NormalizedMatchEvent,
  NormalizedPlayer,
  NormalizedPlayerMatchStats,
  NormalizedPlayerSeasonStats,
  NormalizedStanding,
  NormalizedTeam,
  NormalizedTeamMatchStats,
  NormalizedTeamSeasonStats,
  ProviderId,
} from "./types";

type RawRecord = Record<string, unknown>;
const text = (raw: RawRecord, key: string, fallback = ""): string => typeof raw[key] === "string" ? raw[key] as string : fallback;
const nullableText = (raw: RawRecord, key: string): string | null => typeof raw[key] === "string" ? raw[key] as string : null;
const number = (raw: RawRecord, key: string, fallback = 0): number => typeof raw[key] === "number" && Number.isFinite(raw[key]) ? raw[key] as number : fallback;
const nullableNumber = (raw: RawRecord, key: string): number | null => typeof raw[key] === "number" && Number.isFinite(raw[key]) ? raw[key] as number : null;

function base(raw: RawRecord, providerId: ProviderId) {
  return {
    id: text(raw, "id", `${providerId}-unknown`),
    providerId,
    externalId: nullableText(raw, "externalId"),
    dataConfidence: "medium_low" as const,
    updatedAt: text(raw, "updatedAt", new Date().toISOString()),
  };
}

export function normalizeCompetition(raw: RawRecord, providerId: ProviderId): NormalizedCompetition {
  return { ...base(raw, providerId), name: text(raw, "name", "Competizione senza nome"), country: text(raw, "country", "Unknown"), continent: text(raw, "continent", "Unknown"), season: text(raw, "season", "unknown"), trackingLevel: "trigger" };
}

export function normalizeTeam(raw: RawRecord, providerId: ProviderId): NormalizedTeam {
  return { ...base(raw, providerId), competitionId: text(raw, "competitionId"), name: text(raw, "name", "Squadra senza nome"), shortName: text(raw, "shortName", text(raw, "name", "N/D").slice(0, 3).toUpperCase()), country: text(raw, "country", "Unknown") };
}

export function normalizePlayer(raw: RawRecord, providerId: ProviderId): NormalizedPlayer {
  return { ...base(raw, providerId), teamId: nullableText(raw, "teamId"), fullName: text(raw, "fullName", "Giocatore senza nome"), position: nullableText(raw, "position"), nationality: nullableText(raw, "nationality"), birthDate: nullableText(raw, "birthDate") };
}

export function normalizeMatch(raw: RawRecord, providerId: ProviderId): NormalizedMatch {
  const allowed: MatchStatus[] = ["scheduled", "live", "finished", "postponed", "cancelled"];
  const candidate = text(raw, "status", "scheduled") as MatchStatus;
  return { ...base(raw, providerId), competitionId: text(raw, "competitionId"), season: text(raw, "season", "unknown"), round: nullableText(raw, "round"), kickoffAt: text(raw, "kickoffAt", new Date(0).toISOString()), status: allowed.includes(candidate) ? candidate : "scheduled", homeTeamId: text(raw, "homeTeamId"), awayTeamId: text(raw, "awayTeamId"), homeScore: nullableNumber(raw, "homeScore"), awayScore: nullableNumber(raw, "awayScore"), venue: nullableText(raw, "venue") };
}

export function normalizeMatchEvent(raw: RawRecord, providerId: ProviderId): NormalizedMatchEvent {
  return { ...base(raw, providerId), matchId: text(raw, "matchId"), minute: number(raw, "minute"), stoppageTime: nullableNumber(raw, "stoppageTime"), type: "other", teamId: text(raw, "teamId"), playerId: nullableText(raw, "playerId"), relatedPlayerId: nullableText(raw, "relatedPlayerId"), description: text(raw, "description") };
}

export function normalizeStanding(raw: RawRecord, providerId: ProviderId): NormalizedStanding {
  const goalsFor = number(raw, "goalsFor"); const goalsAgainst = number(raw, "goalsAgainst");
  return { ...base(raw, providerId), competitionId: text(raw, "competitionId"), season: text(raw, "season", "unknown"), position: number(raw, "position"), teamId: text(raw, "teamId"), played: number(raw, "played"), won: number(raw, "won"), drawn: number(raw, "drawn"), lost: number(raw, "lost"), goalsFor, goalsAgainst, goalDifference: number(raw, "goalDifference", goalsFor - goalsAgainst), points: number(raw, "points") };
}

export function normalizeTeamMatchStats(raw: RawRecord, providerId: ProviderId): NormalizedTeamMatchStats {
  return { ...base(raw, providerId), matchId: text(raw, "matchId"), teamId: text(raw, "teamId"), possessionPercentage: nullableNumber(raw, "possessionPercentage"), shots: nullableNumber(raw, "shots"), shotsOnTarget: nullableNumber(raw, "shotsOnTarget"), corners: nullableNumber(raw, "corners"), fouls: nullableNumber(raw, "fouls"), expectedGoals: nullableNumber(raw, "expectedGoals") };
}

export function normalizePlayerMatchStats(raw: RawRecord, providerId: ProviderId): NormalizedPlayerMatchStats {
  return { ...base(raw, providerId), matchId: text(raw, "matchId"), playerId: text(raw, "playerId"), teamId: text(raw, "teamId"), minutesPlayed: number(raw, "minutesPlayed"), goals: number(raw, "goals"), assists: number(raw, "assists"), shots: nullableNumber(raw, "shots"), shotsOnTarget: nullableNumber(raw, "shotsOnTarget"), rating: nullableNumber(raw, "rating") };
}

export function normalizeTeamSeasonStats(raw: RawRecord, providerId: ProviderId): NormalizedTeamSeasonStats {
  return { ...base(raw, providerId), competitionId: text(raw, "competitionId"), season: text(raw, "season", "unknown"), teamId: text(raw, "teamId"), matchesPlayed: number(raw, "matchesPlayed"), wins: number(raw, "wins"), draws: number(raw, "draws"), losses: number(raw, "losses"), goalsFor: number(raw, "goalsFor"), goalsAgainst: number(raw, "goalsAgainst"), cleanSheets: nullableNumber(raw, "cleanSheets") };
}

export function normalizePlayerSeasonStats(raw: RawRecord, providerId: ProviderId): NormalizedPlayerSeasonStats {
  return { ...base(raw, providerId), competitionId: text(raw, "competitionId"), season: text(raw, "season", "unknown"), playerId: text(raw, "playerId"), teamId: text(raw, "teamId"), appearances: number(raw, "appearances"), starts: number(raw, "starts"), minutesPlayed: number(raw, "minutesPlayed"), goals: number(raw, "goals"), assists: number(raw, "assists"), yellowCards: number(raw, "yellowCards"), redCards: number(raw, "redCards"), rating: nullableNumber(raw, "rating") };
}
