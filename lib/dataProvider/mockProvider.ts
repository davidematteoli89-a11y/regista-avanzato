import type { FootballDataProvider } from "./footballDataProvider";
import type {
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
  PlayerStatsResult,
  ProviderRequestContext,
  ProviderResult,
  TeamStatsResult,
} from "./types";

const PROVIDER_ID = "mock_provider" as const;
const UPDATED_AT = "2026-08-24T08:00:00.000Z";

function result<T>(operation: string, data: T, isFallback: boolean): ProviderResult<T> {
  const isEmpty = Array.isArray(data) ? data.length === 0 : false;
  return {
    providerId: PROVIDER_ID,
    status: isFallback ? "fallback" : isEmpty ? "empty" : "success",
    data,
    errors: [],
    meta: {
      generatedAt: new Date().toISOString(),
      source: "mock",
      isFallback,
      operation,
    },
  };
}

function buildDataset(context: ProviderRequestContext = {}) {
  const competitionId = context.competitionId ?? "mock-serie-a";
  const season = context.season ?? "2026/27";
  const homeTeamId = `${competitionId}-registi-fc`;
  const awayTeamId = `${competitionId}-avanguardia-fc`;
  const finishedMatchId = `${competitionId}-match-001`;

  const competitions: NormalizedCompetition[] = [{
    id: competitionId,
    providerId: PROVIDER_ID,
    externalId: `mock-${competitionId}`,
    dataConfidence: "medium",
    updatedAt: UPDATED_AT,
    name: competitionId === "mock-serie-a" ? "Serie A Mock" : `Mock ${competitionId}`,
    country: "Italia",
    continent: "Europe",
    season,
    trackingLevel: "full_official",
  }];

  const teams: NormalizedTeam[] = [
    { id: homeTeamId, providerId: PROVIDER_ID, externalId: `${competitionId}-mock-team-1`, dataConfidence: "medium", updatedAt: UPDATED_AT, competitionId, name: "Registi FC", shortName: "REG", country: "Italia" },
    { id: awayTeamId, providerId: PROVIDER_ID, externalId: `${competitionId}-mock-team-2`, dataConfidence: "medium", updatedAt: UPDATED_AT, competitionId, name: "Avanguardia FC", shortName: "AVA", country: "Italia" },
  ];

  const players: NormalizedPlayer[] = [
    { id: `${homeTeamId}-p1`, providerId: PROVIDER_ID, externalId: "mock-player-1", dataConfidence: "medium", updatedAt: UPDATED_AT, teamId: homeTeamId, fullName: "Luca Regista", position: "Centrocampista", nationality: "Italia", birthDate: "2004-03-12" },
    { id: `${homeTeamId}-p2`, providerId: PROVIDER_ID, externalId: "mock-player-2", dataConfidence: "medium", updatedAt: UPDATED_AT, teamId: homeTeamId, fullName: "Marco Ala", position: "Attaccante", nationality: "Italia", birthDate: "2001-09-04" },
    { id: `${awayTeamId}-p1`, providerId: PROVIDER_ID, externalId: "mock-player-3", dataConfidence: "medium", updatedAt: UPDATED_AT, teamId: awayTeamId, fullName: "André Visione", position: "Centrocampista", nationality: "Francia", birthDate: "2002-06-18" },
    { id: `${awayTeamId}-p2`, providerId: PROVIDER_ID, externalId: "mock-player-4", dataConfidence: "medium", updatedAt: UPDATED_AT, teamId: awayTeamId, fullName: "Milo Punta", position: "Attaccante", nationality: "Croazia", birthDate: "2005-01-20" },
  ];

  const matches: NormalizedMatch[] = [
    { id: finishedMatchId, providerId: PROVIDER_ID, externalId: `${competitionId}-mock-match-1`, dataConfidence: "medium", updatedAt: UPDATED_AT, competitionId, season, round: "1", kickoffAt: "2026-08-23T18:45:00.000Z", status: "finished", homeTeamId, awayTeamId, homeScore: 3, awayScore: 2, venue: "Stadio dei Registi" },
    { id: `${competitionId}-match-002`, providerId: PROVIDER_ID, externalId: `${competitionId}-mock-match-2`, dataConfidence: "medium", updatedAt: UPDATED_AT, competitionId, season, round: "2", kickoffAt: "2026-08-30T18:45:00.000Z", status: "scheduled", homeTeamId: awayTeamId, awayTeamId: homeTeamId, homeScore: null, awayScore: null, venue: "Arena Avanguardia" },
  ];

  const events: NormalizedMatchEvent[] = [
    { id: `${finishedMatchId}-event-1`, providerId: PROVIDER_ID, externalId: `${finishedMatchId}-mock-event-1`, dataConfidence: "medium", updatedAt: UPDATED_AT, matchId: finishedMatchId, minute: 12, stoppageTime: null, type: "goal", teamId: homeTeamId, playerId: players[1].id, relatedPlayerId: players[0].id, description: "Gol su assist centrale" },
    { id: `${finishedMatchId}-event-2`, providerId: PROVIDER_ID, externalId: `${finishedMatchId}-mock-event-2`, dataConfidence: "medium", updatedAt: UPDATED_AT, matchId: finishedMatchId, minute: 77, stoppageTime: null, type: "goal", teamId: awayTeamId, playerId: players[3].id, relatedPlayerId: players[2].id, description: "Gol in contropiede" },
  ];

  const standings: NormalizedStanding[] = [
    { id: `${competitionId}-standing-1`, providerId: PROVIDER_ID, externalId: null, dataConfidence: "medium", updatedAt: UPDATED_AT, competitionId, season, position: 1, teamId: homeTeamId, played: 1, won: 1, drawn: 0, lost: 0, goalsFor: 3, goalsAgainst: 2, goalDifference: 1, points: 3 },
    { id: `${competitionId}-standing-2`, providerId: PROVIDER_ID, externalId: null, dataConfidence: "medium", updatedAt: UPDATED_AT, competitionId, season, position: 2, teamId: awayTeamId, played: 1, won: 0, drawn: 0, lost: 1, goalsFor: 2, goalsAgainst: 3, goalDifference: -1, points: 0 },
  ];

  const teamMatchStats: NormalizedTeamMatchStats[] = [
    { id: `${finishedMatchId}-stats-home`, providerId: PROVIDER_ID, externalId: null, dataConfidence: "medium", updatedAt: UPDATED_AT, matchId: finishedMatchId, teamId: homeTeamId, possessionPercentage: 54, shots: 14, shotsOnTarget: 7, corners: 6, fouls: 11, expectedGoals: 2.4 },
    { id: `${finishedMatchId}-stats-away`, providerId: PROVIDER_ID, externalId: null, dataConfidence: "medium", updatedAt: UPDATED_AT, matchId: finishedMatchId, teamId: awayTeamId, possessionPercentage: 46, shots: 10, shotsOnTarget: 5, corners: 4, fouls: 13, expectedGoals: 1.7 },
  ];

  const playerMatchStats: NormalizedPlayerMatchStats[] = players.map((player, index) => ({
    id: `${finishedMatchId}-${player.id}-stats`, providerId: PROVIDER_ID, externalId: null, dataConfidence: "medium", updatedAt: UPDATED_AT,
    matchId: finishedMatchId, playerId: player.id, teamId: player.teamId!, minutesPlayed: 90,
    goals: index === 1 ? 2 : index === 3 ? 1 : 0, assists: index === 0 || index === 2 ? 1 : 0,
    shots: index % 2 === 1 ? 4 : 1, shotsOnTarget: index % 2 === 1 ? 3 : 1, rating: 6.8 + index * 0.4,
  }));

  const teamSeasonStats: NormalizedTeamSeasonStats[] = standings.map((standing) => ({
    id: `${standing.teamId}-${season}-stats`, providerId: PROVIDER_ID, externalId: null, dataConfidence: "medium", updatedAt: UPDATED_AT,
    competitionId, season, teamId: standing.teamId, matchesPlayed: standing.played, wins: standing.won, draws: standing.drawn,
    losses: standing.lost, goalsFor: standing.goalsFor, goalsAgainst: standing.goalsAgainst, cleanSheets: 0,
  }));

  const playerSeasonStats: NormalizedPlayerSeasonStats[] = playerMatchStats.map((stats) => ({
    id: `${stats.playerId}-${season}-stats`, providerId: PROVIDER_ID, externalId: null, dataConfidence: "medium", updatedAt: UPDATED_AT,
    competitionId, season, playerId: stats.playerId, teamId: stats.teamId, appearances: 1, starts: 1,
    minutesPlayed: stats.minutesPlayed, goals: stats.goals, assists: stats.assists, yellowCards: 0, redCards: 0, rating: stats.rating,
  }));

  return { competitions, teams, players, matches, events, standings, teamMatchStats, playerMatchStats, teamSeasonStats, playerSeasonStats };
}

export class MockFootballDataProvider implements FootballDataProvider {
  readonly id = PROVIDER_ID;
  constructor(private readonly isFallback = false) {}

  async getCompetitions(context: ProviderRequestContext = {}) { return result("getCompetitions", buildDataset(context).competitions, this.isFallback); }
  async getTeams(context: ProviderRequestContext) { return result("getTeams", buildDataset(context).teams.filter((team) => !context.teamId || team.id === context.teamId), this.isFallback); }
  async getFixtures(context: ProviderRequestContext) { return result("getFixtures", buildDataset(context).matches.filter((match) => match.status === "scheduled"), this.isFallback); }
  async getResults(context: ProviderRequestContext) { return result("getResults", buildDataset(context).matches.filter((match) => match.status === "finished"), this.isFallback); }
  async getStandings(context: ProviderRequestContext) { return result("getStandings", buildDataset(context).standings, this.isFallback); }
  async getMatchEvents(context: ProviderRequestContext) { return result("getMatchEvents", buildDataset(context).events.filter((event) => !context.matchId || event.matchId === context.matchId), this.isFallback); }
  async getMatchStats(context: ProviderRequestContext): Promise<ProviderResult<TeamStatsResult>> {
    const dataset = buildDataset(context);
    return result("getMatchStats", { matchStats: dataset.teamMatchStats.filter((item) => !context.matchId || item.matchId === context.matchId), seasonStats: [] }, this.isFallback);
  }
  async getPlayerStats(context: ProviderRequestContext): Promise<ProviderResult<PlayerStatsResult>> {
    const dataset = buildDataset(context);
    return result("getPlayerStats", {
      players: dataset.players.filter((item) => !context.playerId || item.id === context.playerId),
      matchStats: dataset.playerMatchStats.filter((item) => (!context.playerId || item.playerId === context.playerId) && (!context.matchId || item.matchId === context.matchId)),
      seasonStats: dataset.playerSeasonStats.filter((item) => !context.playerId || item.playerId === context.playerId),
    }, this.isFallback);
  }
  async getTeamStats(context: ProviderRequestContext): Promise<ProviderResult<TeamStatsResult>> {
    const dataset = buildDataset(context);
    return result("getTeamStats", {
      matchStats: dataset.teamMatchStats.filter((item) => !context.teamId || item.teamId === context.teamId),
      seasonStats: dataset.teamSeasonStats.filter((item) => !context.teamId || item.teamId === context.teamId),
    }, this.isFallback);
  }
}

export const mockProvider = new MockFootballDataProvider();
export const fallbackMockProvider = new MockFootballDataProvider(true);
