import type {
  NormalizedCompetition,
  NormalizedMatch,
  NormalizedPlayer,
  NormalizedTeam,
  ProviderId,
} from "./types";
import type { StableProviderName } from "./stableProviderConfig";

export type ExternalCompetitionMapping = { provider: StableProviderName; externalId: string; internalCompetitionId: string };
export type ExternalTeamMapping = { provider: StableProviderName; externalId: string; internalTeamId: string; internalCompetitionId: string };
export type ExternalPlayerMapping = { provider: StableProviderName; externalId: string; internalPlayerId: string; internalTeamId: string | null };
export type ExternalMatchMapping = { provider: StableProviderName; externalId: string; internalMatchId: string; internalCompetitionId: string };

type UnknownRecord = Record<string, unknown>;
const isRecord = (value: unknown): value is UnknownRecord => typeof value === "object" && value !== null && !Array.isArray(value);
const stringValue = (record: UnknownRecord, key: string): string | null => typeof record[key] === "string" && record[key] ? record[key] as string : null;
const nullableString = (record: UnknownRecord, key: string): string | null => typeof record[key] === "string" ? record[key] as string : null;
const nullableNumber = (record: UnknownRecord, key: string): number | null => typeof record[key] === "number" && Number.isFinite(record[key]) ? record[key] as number : null;
const providerId = (provider: StableProviderName): ProviderId => provider;
const updatedAt = (record: UnknownRecord): string => stringValue(record, "updatedAt") ?? new Date().toISOString();

export function mapExternalCollection<T>(payload: unknown, mapper: (item: unknown) => T | null): T[] {
  if (!Array.isArray(payload)) return [];
  return payload.map(mapper).filter((item): item is T => item !== null);
}

/** Accetta un payload intermedio canonico, non il formato definitivo di uno specifico vendor. */
export function mapExternalCompetition(payload: unknown, mapping: ExternalCompetitionMapping): NormalizedCompetition | null {
  if (!isRecord(payload)) return null;
  const name = stringValue(payload, "name");
  const country = stringValue(payload, "country");
  const continent = stringValue(payload, "continent");
  const season = stringValue(payload, "season");
  if (!name || !country || !continent || !season) return null;
  return { id: mapping.internalCompetitionId, providerId: providerId(mapping.provider), externalId: mapping.externalId, dataConfidence: "medium", updatedAt: updatedAt(payload), name, country, continent, season, trackingLevel: "full_official" };
}

export function mapExternalTeam(payload: unknown, mapping: ExternalTeamMapping): NormalizedTeam | null {
  if (!isRecord(payload)) return null;
  const name = stringValue(payload, "name");
  if (!name) return null;
  return { id: mapping.internalTeamId, providerId: providerId(mapping.provider), externalId: mapping.externalId, dataConfidence: "medium", updatedAt: updatedAt(payload), competitionId: mapping.internalCompetitionId, name, shortName: stringValue(payload, "shortName") ?? name.slice(0, 3).toUpperCase(), country: stringValue(payload, "country") ?? "Unknown" };
}

export function mapExternalPlayer(payload: unknown, mapping: ExternalPlayerMapping): NormalizedPlayer | null {
  if (!isRecord(payload)) return null;
  const fullName = stringValue(payload, "fullName");
  if (!fullName) return null;
  return { id: mapping.internalPlayerId, providerId: providerId(mapping.provider), externalId: mapping.externalId, dataConfidence: "medium", updatedAt: updatedAt(payload), teamId: mapping.internalTeamId, fullName, position: nullableString(payload, "position"), nationality: nullableString(payload, "nationality"), birthDate: nullableString(payload, "birthDate") };
}

export function mapExternalMatch(payload: unknown, mapping: ExternalMatchMapping): NormalizedMatch | null {
  if (!isRecord(payload)) return null;
  const season = stringValue(payload, "season");
  const kickoffAt = stringValue(payload, "kickoffAt");
  const homeTeamId = stringValue(payload, "homeTeamId");
  const awayTeamId = stringValue(payload, "awayTeamId");
  const status = stringValue(payload, "status");
  const allowedStatuses = ["scheduled", "live", "finished", "postponed", "cancelled"] as const;
  if (!season || !kickoffAt || !homeTeamId || !awayTeamId || !status || !allowedStatuses.includes(status as typeof allowedStatuses[number])) return null;
  return { id: mapping.internalMatchId, providerId: providerId(mapping.provider), externalId: mapping.externalId, dataConfidence: "medium", updatedAt: updatedAt(payload), competitionId: mapping.internalCompetitionId, season, round: nullableString(payload, "round"), kickoffAt, status: status as typeof allowedStatuses[number], homeTeamId, awayTeamId, homeScore: nullableNumber(payload, "homeScore"), awayScore: nullableNumber(payload, "awayScore"), venue: nullableString(payload, "venue") };
}
