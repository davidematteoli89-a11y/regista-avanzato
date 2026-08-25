import type { FootballDataProvider } from "./footballDataProvider";
import type {
  NormalizedCompetition,
  NormalizedMatch,
  NormalizedMatchEvent,
  NormalizedStanding,
  NormalizedTeam,
  PlayerStatsResult,
  ProviderRequestContext,
  ProviderResult,
  TeamStatsResult,
} from "./types";

export type ManualHighlightLink = {
  id: string;
  matchId: string;
  label: string;
  officialUrl: string;
  sourceName: string;
  verifiedAt: string | null;
};

export type ManualProviderData = {
  competitions?: NormalizedCompetition[];
  teams?: NormalizedTeam[];
  fixtures?: NormalizedMatch[];
  results?: NormalizedMatch[];
  standings?: NormalizedStanding[];
  matchEvents?: NormalizedMatchEvent[];
  matchStats?: TeamStatsResult;
  playerStats?: PlayerStatsResult;
  teamStats?: TeamStatsResult;
  highlightLinks?: ManualHighlightLink[];
};

function manualResult<T>(operation: string, data: T): ProviderResult<T> {
  const empty = Array.isArray(data)
    ? data.length === 0
    : Object.values(data as Record<string, unknown>).every((value) => Array.isArray(value) && value.length === 0);

  return {
    providerId: "manual_provider",
    status: empty ? "empty" : "success",
    data,
    errors: [],
    meta: { generatedAt: new Date().toISOString(), source: "manual", isFallback: false, operation },
  };
}

function byContext<T extends { id: string }>(items: T[], id?: string): T[] {
  return id ? items.filter((item) => item.id === id) : items;
}

/** Archivio in memoria per input editoriale già validato. Non effettua scraping o download. */
export class ManualFootballDataProvider implements FootballDataProvider {
  readonly id = "manual_provider" as const;

  constructor(private readonly data: ManualProviderData = {}) {}

  async getCompetitions() { return manualResult("getCompetitions", this.data.competitions ?? []); }
  async getTeams(context: ProviderRequestContext) { return manualResult("getTeams", byContext(this.data.teams ?? [], context.teamId)); }
  async getFixtures(context: ProviderRequestContext) { return manualResult("getFixtures", byContext(this.data.fixtures ?? [], context.matchId)); }
  async getResults(context: ProviderRequestContext) { return manualResult("getResults", byContext(this.data.results ?? [], context.matchId)); }
  async getStandings(context: ProviderRequestContext) {
    return manualResult("getStandings", (this.data.standings ?? []).filter((item) => !context.competitionId || item.competitionId === context.competitionId));
  }
  async getMatchEvents(context: ProviderRequestContext) {
    return manualResult("getMatchEvents", (this.data.matchEvents ?? []).filter((item) => !context.matchId || item.matchId === context.matchId));
  }
  async getMatchStats(context: ProviderRequestContext) {
    const source = this.data.matchStats ?? { matchStats: [], seasonStats: [] };
    return manualResult("getMatchStats", { ...source, matchStats: source.matchStats.filter((item) => !context.matchId || item.matchId === context.matchId) });
  }
  async getPlayerStats(context: ProviderRequestContext) {
    const source = this.data.playerStats ?? { players: [], matchStats: [], seasonStats: [] };
    return manualResult("getPlayerStats", {
      players: source.players.filter((item) => !context.playerId || item.id === context.playerId),
      matchStats: source.matchStats.filter((item) => !context.playerId || item.playerId === context.playerId),
      seasonStats: source.seasonStats.filter((item) => !context.playerId || item.playerId === context.playerId),
    });
  }
  async getTeamStats(context: ProviderRequestContext) {
    const source = this.data.teamStats ?? { matchStats: [], seasonStats: [] };
    return manualResult("getTeamStats", {
      matchStats: source.matchStats.filter((item) => !context.teamId || item.teamId === context.teamId),
      seasonStats: source.seasonStats.filter((item) => !context.teamId || item.teamId === context.teamId),
    });
  }

  async getHighlightLinks(matchId?: string): Promise<ProviderResult<ManualHighlightLink[]>> {
    return manualResult(
      "getHighlightLinks",
      (this.data.highlightLinks ?? []).filter((link) => !matchId || link.matchId === matchId),
    );
  }
}

export const manualProvider = new ManualFootballDataProvider();
