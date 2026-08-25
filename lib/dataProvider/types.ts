import type {
  ProviderId as ConfigProviderId,
  ProviderType as ConfigProviderType,
} from "@/config/providers";
import type { DataConfidence, TrackingLevel } from "@/config/competitions";

export type ProviderId = ConfigProviderId;
export type ProviderType = ConfigProviderType;
export type ProviderStatus = "success" | "empty" | "fallback" | "error";
export type MatchStatus = "scheduled" | "live" | "finished" | "postponed" | "cancelled";

export type ProviderRequestContext = {
  competitionId?: string;
  season?: string;
  matchId?: string;
  teamId?: string;
  playerId?: string;
  requestSource?: "scheduled_import" | "admin_manual" | "development_test";
  latestRoundOnly?: boolean;
  correlationId?: string;
};

export type ProviderError = {
  code: string;
  message: string;
  providerId: ProviderId;
  retryable: boolean;
  details?: Record<string, unknown>;
};

export type ProviderResult<T> = {
  providerId: ProviderId;
  status: ProviderStatus;
  data: T;
  errors: ProviderError[];
  meta: {
    generatedAt: string;
    source: "mock" | "manual" | "external";
    isFallback: boolean;
    operation: string;
  };
};

type NormalizedEntity = {
  id: string;
  providerId: ProviderId;
  externalId: string | null;
  dataConfidence: DataConfidence;
  updatedAt: string;
};

export type NormalizedCompetition = NormalizedEntity & {
  name: string;
  country: string;
  continent: string;
  season: string;
  trackingLevel: TrackingLevel;
};

export type NormalizedTeam = NormalizedEntity & {
  competitionId: string;
  name: string;
  shortName: string;
  country: string;
};

export type NormalizedPlayer = NormalizedEntity & {
  teamId: string | null;
  fullName: string;
  position: string | null;
  nationality: string | null;
  birthDate: string | null;
};

export type NormalizedMatch = NormalizedEntity & {
  competitionId: string;
  season: string;
  round: string | null;
  kickoffAt: string;
  status: MatchStatus;
  homeTeamId: string;
  awayTeamId: string;
  homeScore: number | null;
  awayScore: number | null;
  venue: string | null;
};

export type NormalizedMatchEvent = NormalizedEntity & {
  matchId: string;
  minute: number;
  stoppageTime: number | null;
  type: "goal" | "own_goal" | "penalty_goal" | "yellow_card" | "red_card" | "substitution" | "other";
  teamId: string;
  playerId: string | null;
  relatedPlayerId: string | null;
  description: string;
};

export type NormalizedStanding = NormalizedEntity & {
  competitionId: string;
  season: string;
  position: number;
  teamId: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
};

export type NormalizedTeamMatchStats = NormalizedEntity & {
  matchId: string;
  teamId: string;
  possessionPercentage: number | null;
  shots: number | null;
  shotsOnTarget: number | null;
  corners: number | null;
  fouls: number | null;
  expectedGoals: number | null;
};

export type NormalizedPlayerMatchStats = NormalizedEntity & {
  matchId: string;
  playerId: string;
  teamId: string;
  minutesPlayed: number;
  goals: number;
  assists: number;
  shots: number | null;
  shotsOnTarget: number | null;
  rating: number | null;
};

export type NormalizedTeamSeasonStats = NormalizedEntity & {
  competitionId: string;
  season: string;
  teamId: string;
  matchesPlayed: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  cleanSheets: number | null;
};

export type NormalizedPlayerSeasonStats = NormalizedEntity & {
  competitionId: string;
  season: string;
  playerId: string;
  teamId: string;
  appearances: number;
  starts: number;
  minutesPlayed: number;
  goals: number;
  assists: number;
  yellowCards: number;
  redCards: number;
  rating: number | null;
};

export type PlayerStatsResult = {
  players: NormalizedPlayer[];
  matchStats: NormalizedPlayerMatchStats[];
  seasonStats: NormalizedPlayerSeasonStats[];
};

export type TeamStatsResult = {
  matchStats: NormalizedTeamMatchStats[];
  seasonStats: NormalizedTeamSeasonStats[];
};
