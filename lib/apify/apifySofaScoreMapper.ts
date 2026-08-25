import type {
  NormalizedMatch,
  NormalizedMatchEvent,
  NormalizedPlayer,
  NormalizedPlayerMatchStats,
  NormalizedStanding,
  NormalizedTeam,
  NormalizedTeamMatchStats,
} from "@/lib/dataProvider/types";
import type { ApifySofaScoreMappingResult } from "./apifySofaScoreTypes";

type Raw = Record<string, unknown>;
const isRecord = (value: unknown): value is Raw => typeof value === "object" && value !== null && !Array.isArray(value);
const text = (raw: Raw, key: string): string | null => typeof raw[key] === "string" && raw[key] ? raw[key] as string : null;
const nullableText = (raw: Raw, key: string): string | null => typeof raw[key] === "string" ? raw[key] as string : null;
const number = (raw: Raw, key: string): number | null => typeof raw[key] === "number" && Number.isFinite(raw[key]) ? raw[key] as number : null;
const timestamp = () => new Date().toISOString();

export function mapApifyTeam(payload: unknown, competitionId: string): NormalizedTeam | null {
  if (!isRecord(payload)) return null;
  const id = text(payload, "internalId"); const externalId = text(payload, "externalId");
  const name = text(payload, "name"); const country = text(payload, "country");
  if (!id || !externalId || !name || !country) return null;
  return { id, providerId: "apify_sofascore", externalId, dataConfidence: "medium_low", updatedAt: timestamp(), competitionId, name, shortName: text(payload, "shortName") ?? name.slice(0, 3).toUpperCase(), country };
}

export function mapApifyPlayer(payload: unknown): NormalizedPlayer | null {
  if (!isRecord(payload)) return null;
  const id = text(payload, "internalId"); const externalId = text(payload, "externalId"); const fullName = text(payload, "fullName");
  if (!id || !externalId || !fullName) return null;
  return { id, providerId: "apify_sofascore", externalId, dataConfidence: "medium_low", updatedAt: timestamp(), teamId: nullableText(payload, "teamId"), fullName, position: nullableText(payload, "position"), nationality: nullableText(payload, "nationality"), birthDate: nullableText(payload, "birthDate") };
}

export function mapApifyMatch(payload: unknown, competitionId: string): NormalizedMatch | null {
  if (!isRecord(payload)) return null;
  const id = text(payload, "internalId"); const externalId = text(payload, "externalId"); const season = text(payload, "season");
  const kickoffAt = text(payload, "kickoffAt"); const homeTeamId = text(payload, "homeTeamId"); const awayTeamId = text(payload, "awayTeamId"); const status = text(payload, "status");
  const statuses = ["scheduled", "live", "finished", "postponed", "cancelled"] as const;
  if (!id || !externalId || !season || !kickoffAt || !homeTeamId || !awayTeamId || !status || !statuses.includes(status as typeof statuses[number])) return null;
  return { id, providerId: "apify_sofascore", externalId, dataConfidence: "medium_low", updatedAt: timestamp(), competitionId, season, round: nullableText(payload, "round"), kickoffAt, status: status as typeof statuses[number], homeTeamId, awayTeamId, homeScore: number(payload, "homeScore"), awayScore: number(payload, "awayScore"), venue: nullableText(payload, "venue") };
}

export function mapApifyStanding(payload: unknown, competitionId: string, season: string): NormalizedStanding | null {
  if (!isRecord(payload)) return null;
  const id = text(payload, "internalId"); const externalId = text(payload, "externalId"); const teamId = text(payload, "teamId");
  const keys = ["position", "played", "won", "drawn", "lost", "goalsFor", "goalsAgainst", "points"] as const;
  const values = Object.fromEntries(keys.map((key) => [key, number(payload, key)])) as Record<typeof keys[number], number | null>;
  if (!id || !externalId || !teamId || keys.some((key) => values[key] === null)) return null;
  return { id, providerId: "apify_sofascore", externalId, dataConfidence: "medium_low", updatedAt: timestamp(), competitionId, season, position: values.position!, teamId, played: values.played!, won: values.won!, drawn: values.drawn!, lost: values.lost!, goalsFor: values.goalsFor!, goalsAgainst: values.goalsAgainst!, goalDifference: values.goalsFor! - values.goalsAgainst!, points: values.points! };
}

export function mapApifyEvent(payload: unknown): NormalizedMatchEvent | null {
  if (!isRecord(payload)) return null;
  const id = text(payload, "internalId"); const externalId = text(payload, "externalId"); const matchId = text(payload, "matchId"); const teamId = text(payload, "teamId"); const eventType = text(payload, "type"); const minute = number(payload, "minute"); const description = text(payload, "description");
  const types = ["goal", "own_goal", "penalty_goal", "yellow_card", "red_card", "substitution", "other"] as const;
  if (!id || !externalId || !matchId || !teamId || minute === null || !description || !eventType || !types.includes(eventType as typeof types[number])) return null;
  return { id, providerId: "apify_sofascore", externalId, dataConfidence: "medium_low", updatedAt: timestamp(), matchId, minute, stoppageTime: number(payload, "stoppageTime"), type: eventType as typeof types[number], teamId, playerId: nullableText(payload, "playerId"), relatedPlayerId: nullableText(payload, "relatedPlayerId"), description };
}

export function mapApifyTeamMatchStats(payload: unknown): NormalizedTeamMatchStats | null {
  if (!isRecord(payload) || payload.kind !== "team_match") return null;
  const id = text(payload, "internalId"); const externalId = text(payload, "externalId"); const matchId = text(payload, "matchId"); const teamId = text(payload, "teamId");
  if (!id || !externalId || !matchId || !teamId) return null;
  return { id, providerId: "apify_sofascore", externalId, dataConfidence: "medium_low", updatedAt: timestamp(), matchId, teamId, possessionPercentage: number(payload, "possessionPercentage"), shots: number(payload, "shots"), shotsOnTarget: number(payload, "shotsOnTarget"), corners: number(payload, "corners"), fouls: number(payload, "fouls"), expectedGoals: number(payload, "expectedGoals") };
}

export function mapApifyPlayerMatchStats(payload: unknown): NormalizedPlayerMatchStats | null {
  if (!isRecord(payload) || payload.kind !== "player_match") return null;
  const id = text(payload, "internalId"); const externalId = text(payload, "externalId"); const matchId = text(payload, "matchId"); const teamId = text(payload, "teamId"); const playerId = text(payload, "playerId");
  const minutesPlayed = number(payload, "minutesPlayed"); const goals = number(payload, "goals"); const assists = number(payload, "assists");
  if (!id || !externalId || !matchId || !teamId || !playerId || minutesPlayed === null || goals === null || assists === null) return null;
  return { id, providerId: "apify_sofascore", externalId, dataConfidence: "medium_low", updatedAt: timestamp(), matchId, teamId, playerId, minutesPlayed, goals, assists, shots: number(payload, "shots"), shotsOnTarget: number(payload, "shotsOnTarget"), rating: number(payload, "rating") };
}

function mapList<T>(payload: unknown, label: string, mapper: (item: unknown) => T | null, errors: string[]): T[] {
  if (payload === undefined) return [];
  if (!Array.isArray(payload)) { errors.push(`${label}: atteso array.`); return []; }
  return payload.flatMap((item, index) => {
    const mapped = mapper(item);
    if (!mapped) errors.push(`${label}[${index}]: payload incompleto o non valido.`);
    return mapped ? [mapped] : [];
  });
}

/** Player e match stats assenti sono validi: non tutti i campionati li espongono. */
export function mapApifySofaScorePayload(payload: unknown, competitionId: string, season: string): ApifySofaScoreMappingResult {
  const errors: string[] = [];
  if (!isRecord(payload)) return { teams: [], players: [], matches: [], standings: [], events: [], teamMatchStats: [], playerMatchStats: [], errors: ["Payload root non valido."] };
  const stats = payload.stats === undefined
    ? []
    : Array.isArray(payload.stats)
      ? payload.stats
      : (errors.push("stats: atteso array."), []);
  return {
    teams: mapList(payload.teams, "teams", (item) => mapApifyTeam(item, competitionId), errors),
    players: mapList(payload.players, "players", mapApifyPlayer, errors),
    matches: mapList(payload.matches, "matches", (item) => mapApifyMatch(item, competitionId), errors),
    standings: mapList(payload.standings, "standings", (item) => mapApifyStanding(item, competitionId, season), errors),
    events: mapList(payload.events, "events", mapApifyEvent, errors),
    teamMatchStats: mapList(stats.filter((item) => isRecord(item) && item.kind === "team_match"), "stats/team", mapApifyTeamMatchStats, errors),
    playerMatchStats: mapList(stats.filter((item) => isRecord(item) && item.kind === "player_match"), "stats/player", mapApifyPlayerMatchStats, errors),
    errors,
  };
}
