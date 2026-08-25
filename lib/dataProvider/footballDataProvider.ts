import type {
  NormalizedCompetition,
  NormalizedMatch,
  NormalizedMatchEvent,
  NormalizedStanding,
  NormalizedTeam,
  PlayerStatsResult,
  ProviderId,
  ProviderRequestContext,
  ProviderResult,
  TeamStatsResult,
} from "./types";

/** Contratto per gli adapter di importazione, mai per l'uso diretto nelle pagine pubbliche. */
export interface FootballDataProvider {
  readonly id: ProviderId;

  getCompetitions(context?: ProviderRequestContext): Promise<ProviderResult<NormalizedCompetition[]>>;
  getTeams(context: ProviderRequestContext): Promise<ProviderResult<NormalizedTeam[]>>;
  getFixtures(context: ProviderRequestContext): Promise<ProviderResult<NormalizedMatch[]>>;
  getResults(context: ProviderRequestContext): Promise<ProviderResult<NormalizedMatch[]>>;
  getStandings(context: ProviderRequestContext): Promise<ProviderResult<NormalizedStanding[]>>;
  getMatchEvents(context: ProviderRequestContext): Promise<ProviderResult<NormalizedMatchEvent[]>>;
  getMatchStats(context: ProviderRequestContext): Promise<ProviderResult<TeamStatsResult>>;
  getPlayerStats(context: ProviderRequestContext): Promise<ProviderResult<PlayerStatsResult>>;
  getTeamStats(context: ProviderRequestContext): Promise<ProviderResult<TeamStatsResult>>;
}
