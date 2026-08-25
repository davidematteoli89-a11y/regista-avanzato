import { COMPETITIONS } from "@/config/competitions";
import type { PublicCompetition, PublicHighlightLink, PublicMatch, PublicMatchTeamStats, PublicPlayer, PublicPlayerStats, PublicStanding, PublicTeam, PublicTeamStats } from "./publicDataTypes";

const updatedAt = "2026-08-24T00:00:00.000Z";
const meta = (confidence: "low" | "medium_low" = "low") => ({ source: "mock_public_snapshot" as const, isMock: true as const, confidence, coverage: "demo" as const, updatedAt });

export const MOCK_PUBLIC_COMPETITIONS: PublicCompetition[] = COMPETITIONS.map((competition) => ({ id: competition.id, name: competition.name, country: competition.country, continent: competition.continent, trackingLevel: competition.tracking_level, publicStatsEnabled: competition.public_stats_enabled, loginRequiredForFullStats: competition.login_required_for_full_stats, meta: meta(competition.tracking_level === "full_official" ? "low" : "medium_low") }));

export const MOCK_PUBLIC_TEAMS: PublicTeam[] = [
  { id: "mock-aurora-fc", competitionId: "serie-a", name: "Aurora FC", shortName: "AUR", country: "Italy", crestUrl: null, position: 1, meta: meta() },
  { id: "mock-borgo-united", competitionId: "serie-a", name: "Borgo United", shortName: "BOR", country: "Italy", crestUrl: null, position: 2, meta: meta() },
  { id: "mock-alpi-1908", competitionId: "swiss-super-league", name: "Alpi 1908", shortName: "ALP", country: "Switzerland", crestUrl: null, position: 1, meta: meta("medium_low") },
  { id: "mock-lago-fc", competitionId: "swiss-super-league", name: "Lago FC", shortName: "LAG", country: "Switzerland", crestUrl: null, position: 2, meta: meta("medium_low") },
];

export const MOCK_PUBLIC_PLAYERS: PublicPlayer[] = [
  { id: "mock-luca-ferri", teamId: "mock-aurora-fc", competitionId: "serie-a", name: "Luca Ferri", position: "Centrocampista", nationality: "Italia", age: 20, shirtNumber: 8, meta: meta() },
  { id: "mock-marco-riva", teamId: "mock-borgo-united", competitionId: "serie-a", name: "Marco Riva", position: "Attaccante", nationality: "Italia", age: 24, shirtNumber: 9, meta: meta() },
  { id: "mock-noah-keller", teamId: "mock-alpi-1908", competitionId: "swiss-super-league", name: "Noah Keller", position: "Ala", nationality: "Svizzera", age: 19, shirtNumber: 11, meta: meta("medium_low") },
];

export const MOCK_PUBLIC_MATCHES: PublicMatch[] = [
  { id: "mock-aurora-borgo", competitionId: "serie-a", competitionName: "Serie A", season: "2026", round: "Giornata 1", kickoffAt: "2026-08-18T19:45:00.000Z", status: "finished", homeTeamId: "mock-aurora-fc", homeTeamName: "Aurora FC", awayTeamId: "mock-borgo-united", awayTeamName: "Borgo United", homeScore: 4, awayScore: 4, venue: "Stadio Demo", meta: meta() },
  { id: "mock-borgo-aurora", competitionId: "serie-a", competitionName: "Serie A", season: "2026", round: "Giornata 2", kickoffAt: "2026-08-30T18:00:00.000Z", status: "scheduled", homeTeamId: "mock-borgo-united", homeTeamName: "Borgo United", awayTeamId: "mock-aurora-fc", awayTeamName: "Aurora FC", homeScore: null, awayScore: null, venue: null, meta: meta() },
  { id: "mock-alpi-lago", competitionId: "swiss-super-league", competitionName: "Swiss Super League", season: "2026", round: "Ultimo turno", kickoffAt: "2026-08-17T14:30:00.000Z", status: "finished", homeTeamId: "mock-alpi-1908", homeTeamName: "Alpi 1908", awayTeamId: "mock-lago-fc", awayTeamName: "Lago FC", homeScore: 3, awayScore: 2, venue: null, meta: meta("medium_low") },
];

export const MOCK_PUBLIC_STANDINGS: PublicStanding[] = [
  { competitionId: "serie-a", teamId: "mock-aurora-fc", teamName: "Aurora FC", rank: 1, played: 1, won: 0, drawn: 1, lost: 0, goalsFor: 4, goalsAgainst: 4, goalDifference: 0, points: 1, form: "P" },
  { competitionId: "serie-a", teamId: "mock-borgo-united", teamName: "Borgo United", rank: 2, played: 1, won: 0, drawn: 1, lost: 0, goalsFor: 4, goalsAgainst: 4, goalDifference: 0, points: 1, form: "P" },
  { competitionId: "swiss-super-league", teamId: "mock-alpi-1908", teamName: "Alpi 1908", rank: 1, played: 1, won: 1, drawn: 0, lost: 0, goalsFor: 3, goalsAgainst: 2, goalDifference: 1, points: 3, form: "V" },
  { competitionId: "swiss-super-league", teamId: "mock-lago-fc", teamName: "Lago FC", rank: 2, played: 1, won: 0, drawn: 0, lost: 1, goalsFor: 2, goalsAgainst: 3, goalDifference: -1, points: 0, form: "S" },
];

export const MOCK_PLAYER_STATS: Record<string, PublicPlayerStats> = {
  "mock-luca-ferri": { appearances: 1, minutes: 90, goals: 1, assists: 2, shots: 3, shotsOnTarget: 2, keyPasses: 4, tackles: 2, interceptions: 1, saves: null, xg: 0.34, xa: 0.61, rating: 8.2 },
  "mock-marco-riva": { appearances: 1, minutes: 90, goals: 3, assists: 0, shots: 6, shotsOnTarget: 4, keyPasses: 1, tackles: 0, interceptions: 0, saves: null, xg: 2.1, xa: null, rating: 9.1 },
  "mock-noah-keller": { appearances: 1, minutes: 78, goals: 1, assists: 1, shots: 2, shotsOnTarget: 1, keyPasses: null, tackles: null, interceptions: null, saves: null, xg: null, xa: null, rating: 7.6 },
};

export const MOCK_TEAM_STATS: Record<string, PublicTeamStats> = {
  "mock-aurora-fc": { matches: 1, wins: 0, draws: 1, losses: 0, goalsFor: 4, goalsAgainst: 4, shots: 14, shotsOnTarget: 7, possessionAvg: 54, cleanSheets: 0, xgFor: 2.8, xgAgainst: 2.4, formLast5: "P" },
  "mock-borgo-united": { matches: 1, wins: 0, draws: 1, losses: 0, goalsFor: 4, goalsAgainst: 4, shots: 12, shotsOnTarget: 6, possessionAvg: 46, cleanSheets: 0, xgFor: 2.4, xgAgainst: 2.8, formLast5: "P" },
  "mock-alpi-1908": { matches: 1, wins: 1, draws: 0, losses: 0, goalsFor: 3, goalsAgainst: 2, shots: 10, shotsOnTarget: 5, possessionAvg: null, cleanSheets: 0, xgFor: null, xgAgainst: null, formLast5: "V" },
  "mock-lago-fc": { matches: 1, wins: 0, draws: 0, losses: 1, goalsFor: 2, goalsAgainst: 3, shots: null, shotsOnTarget: null, possessionAvg: null, cleanSheets: null, xgFor: null, xgAgainst: null, formLast5: "S" },
};

export const MOCK_MATCH_STATS: Record<string, PublicMatchTeamStats[]> = {
  "mock-aurora-borgo": [
    { teamId: "mock-aurora-fc", teamName: "Aurora FC", possession: 54, shots: 14, shotsOnTarget: 7, corners: 6, fouls: 11, xg: 2.8 },
    { teamId: "mock-borgo-united", teamName: "Borgo United", possession: 46, shots: 12, shotsOnTarget: 6, corners: 4, fouls: 13, xg: 2.4 },
  ],
};

export const MOCK_HIGHLIGHT_LINKS: PublicHighlightLink[] = [
  { id: "mock-highlight-aurora-borgo", matchId: "mock-aurora-borgo", label: "Highlights ufficiali", officialSource: "Fonte ufficiale da configurare", url: null, verified: false },
];
