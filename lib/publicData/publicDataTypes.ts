import type { DataConfidence, TrackingLevel } from "@/config/competitions";

export type PublicDataMeta = { source: "mock_public_snapshot"; isMock: true; confidence: DataConfidence; coverage: "complete" | "partial" | "demo"; updatedAt: string };
export type PublicCompetition = { id: string; name: string; country: string; continent: string; trackingLevel: TrackingLevel; publicStatsEnabled: boolean; loginRequiredForFullStats: boolean; meta: PublicDataMeta };
export type PublicTeam = { id: string; competitionId: string; name: string; shortName: string; country: string; crestUrl: null; position: number | null; meta: PublicDataMeta };
export type PublicPlayer = { id: string; teamId: string; competitionId: string; name: string; position: string; nationality: string; age: number | null; shirtNumber: number | null; meta: PublicDataMeta };
export type PublicStanding = { competitionId: string; teamId: string; teamName: string; rank: number; played: number; won: number; drawn: number; lost: number; goalsFor: number; goalsAgainst: number; goalDifference: number; points: number; form: string | null };
export type PublicMatch = { id: string; competitionId: string; competitionName: string; season: string; round: string | null; kickoffAt: string; status: "scheduled" | "finished" | "postponed"; homeTeamId: string; homeTeamName: string; awayTeamId: string; awayTeamName: string; homeScore: number | null; awayScore: number | null; venue: string | null; meta: PublicDataMeta };
export type PublicPlayerStats = { appearances: number; minutes: number; goals: number; assists: number; shots: number | null; shotsOnTarget: number | null; keyPasses: number | null; tackles: number | null; interceptions: number | null; saves: number | null; xg: number | null; xa: number | null; rating: number | null };
export type PublicTeamStats = { matches: number; wins: number; draws: number; losses: number; goalsFor: number; goalsAgainst: number; shots: number | null; shotsOnTarget: number | null; possessionAvg: number | null; cleanSheets: number | null; xgFor: number | null; xgAgainst: number | null; formLast5: string | null };
export type PublicMatchTeamStats = { teamId: string; teamName: string; possession: number | null; shots: number | null; shotsOnTarget: number | null; corners: number | null; fouls: number | null; xg: number | null };
export type PublicHighlightLink = { id: string; matchId: string; label: string; officialSource: string; url: string | null; verified: boolean };
export type PublicCompetitionDetail = { competition: PublicCompetition; standings: PublicStanding[]; recentMatches: PublicMatch[]; teams: PublicTeam[]; players: PublicPlayer[] };
export type PublicTeamProfile = { team: PublicTeam; recentMatches: PublicMatch[]; baseStats: Pick<PublicTeamStats, "matches" | "wins" | "draws" | "losses" | "goalsFor" | "goalsAgainst">; fullStats: PublicTeamStats | null };
export type PublicPlayerProfile = { player: PublicPlayer; team: PublicTeam | null; baseStats: Pick<PublicPlayerStats, "appearances" | "minutes" | "goals" | "assists">; fullStats: PublicPlayerStats | null };
export type PublicMatchDetail = { match: PublicMatch; baseSummary: string; teamStats: PublicMatchTeamStats[] | null; highlights: PublicHighlightLink[] | null };
export type PublicDataList<T> = { items: T[]; meta: { source: "mock_public_snapshot"; total: number; warning: string | null } };
