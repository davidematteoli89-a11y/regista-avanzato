import type { FootballDataProvider } from "./footballDataProvider";
import { createProviderError } from "./errors";
import { fallbackMockProvider } from "./mockProvider";
import {
  getStableProviderConfig,
  type StableProviderConfig,
  type StableProviderEndpoint,
  type StableProviderRequest,
  type StableProviderRuntimeOptions,
} from "./stableProviderConfig";
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

const ID = "api_football" as const;

function withControlledError<T>(result: ProviderResult<T>, endpoint: StableProviderEndpoint, config: StableProviderConfig): ProviderResult<T> {
  const reason = !config.configuredInCatalog
    ? "Provider non presente nel catalogo."
    : !config.active
      ? "API-Football è disattivato o non configurato: usato il mock."
      : "Adapter API-Football predisposto ma trasporto HTTP non implementato: usato il mock.";
  return {
    ...result,
    errors: [...result.errors, createProviderError(ID, "STABLE_PROVIDER_UNAVAILABLE", reason, { details: { endpoint } })],
  };
}

export class ApiFootballProvider implements FootballDataProvider {
  readonly id = ID;
  readonly config: StableProviderConfig;

  constructor(options: StableProviderRuntimeOptions = {}) {
    this.config = getStableProviderConfig(ID, options);
  }

  prepareRequest(endpoint: StableProviderEndpoint, context: ProviderRequestContext = {}): StableProviderRequest {
    return { provider: ID, endpoint, context };
  }

  private async fallback<T>(endpoint: StableProviderEndpoint, operation: () => Promise<ProviderResult<T>>): Promise<ProviderResult<T>> {
    this.prepareRequest(endpoint);
    return withControlledError(await operation(), endpoint, this.config);
  }

  getCompetitions(context: ProviderRequestContext = {}): Promise<ProviderResult<NormalizedCompetition[]>> { return this.fallback("competitions", () => fallbackMockProvider.getCompetitions(context)); }
  getTeams(context: ProviderRequestContext): Promise<ProviderResult<NormalizedTeam[]>> { return this.fallback("teams", () => fallbackMockProvider.getTeams(context)); }
  getFixtures(context: ProviderRequestContext): Promise<ProviderResult<NormalizedMatch[]>> { return this.fallback("fixtures", () => fallbackMockProvider.getFixtures(context)); }
  getResults(context: ProviderRequestContext): Promise<ProviderResult<NormalizedMatch[]>> { return this.fallback("results", () => fallbackMockProvider.getResults(context)); }
  getStandings(context: ProviderRequestContext): Promise<ProviderResult<NormalizedStanding[]>> { return this.fallback("standings", () => fallbackMockProvider.getStandings(context)); }
  getMatchEvents(context: ProviderRequestContext): Promise<ProviderResult<NormalizedMatchEvent[]>> { return this.fallback("match_events", () => fallbackMockProvider.getMatchEvents(context)); }
  getMatchStats(context: ProviderRequestContext): Promise<ProviderResult<TeamStatsResult>> { return this.fallback("match_stats", () => fallbackMockProvider.getMatchStats(context)); }
  getPlayerStats(context: ProviderRequestContext): Promise<ProviderResult<PlayerStatsResult>> { return this.fallback("player_stats", () => fallbackMockProvider.getPlayerStats(context)); }
  getTeamStats(context: ProviderRequestContext): Promise<ProviderResult<TeamStatsResult>> { return this.fallback("team_stats", () => fallbackMockProvider.getTeamStats(context)); }
}

export const apiFootballProvider = new ApiFootballProvider();
