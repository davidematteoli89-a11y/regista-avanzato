import type { FootballDataProvider } from "./footballDataProvider";
import { ApiFootballProvider } from "./apiFootballProvider";
import { createProviderError } from "./errors";
import { fallbackMockProvider } from "./mockProvider";
import {
  getConfiguredStableProvider,
  type StableProviderName,
  type StableProviderRuntimeOptions,
} from "./stableProviderConfig";
import { TheStatsApiProvider } from "./theStatsApiProvider";
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

export type StableFootballProviderOptions = StableProviderRuntimeOptions & {
  preferredProvider?: StableProviderName | null;
};

function noProviderResult<T>(result: ProviderResult<T>): ProviderResult<T> {
  return {
    ...result,
    errors: [
      ...result.errors,
      createProviderError(
        "stable_provider",
        "NO_ACTIVE_STABLE_PROVIDER",
        "Nessun provider stabile è attivo e pronto: usato il mock senza chiamate esterne.",
      ),
    ],
  };
}

/** Wrapper comune per gli script FULL_OFFICIAL. Non contiene un client HTTP. */
export class StableFootballProvider implements FootballDataProvider {
  readonly id = "stable_provider" as const;
  readonly selectedProviderName: StableProviderName | null;
  private readonly selectedProvider: FootballDataProvider | null;

  constructor(options: StableFootballProviderOptions = {}) {
    const config = getConfiguredStableProvider(options.preferredProvider, options);
    this.selectedProviderName = config?.name ?? null;
    this.selectedProvider = config?.name === "the_stats_api"
      ? new TheStatsApiProvider(options)
      : config?.name === "api_football"
        ? new ApiFootballProvider(options)
        : null;
  }

  private async run<T>(selected: () => Promise<ProviderResult<T>>, fallback: () => Promise<ProviderResult<T>>): Promise<ProviderResult<T>> {
    return this.selectedProvider ? selected() : noProviderResult(await fallback());
  }

  getCompetitions(context: ProviderRequestContext = {}): Promise<ProviderResult<NormalizedCompetition[]>> {
    return this.run(() => this.selectedProvider!.getCompetitions(context), () => fallbackMockProvider.getCompetitions(context));
  }
  getTeams(context: ProviderRequestContext): Promise<ProviderResult<NormalizedTeam[]>> {
    return this.run(() => this.selectedProvider!.getTeams(context), () => fallbackMockProvider.getTeams(context));
  }
  getFixtures(context: ProviderRequestContext): Promise<ProviderResult<NormalizedMatch[]>> {
    return this.run(() => this.selectedProvider!.getFixtures(context), () => fallbackMockProvider.getFixtures(context));
  }
  getResults(context: ProviderRequestContext): Promise<ProviderResult<NormalizedMatch[]>> {
    return this.run(() => this.selectedProvider!.getResults(context), () => fallbackMockProvider.getResults(context));
  }
  getStandings(context: ProviderRequestContext): Promise<ProviderResult<NormalizedStanding[]>> {
    return this.run(() => this.selectedProvider!.getStandings(context), () => fallbackMockProvider.getStandings(context));
  }
  getMatchEvents(context: ProviderRequestContext): Promise<ProviderResult<NormalizedMatchEvent[]>> {
    return this.run(() => this.selectedProvider!.getMatchEvents(context), () => fallbackMockProvider.getMatchEvents(context));
  }
  getMatchStats(context: ProviderRequestContext): Promise<ProviderResult<TeamStatsResult>> {
    return this.run(() => this.selectedProvider!.getMatchStats(context), () => fallbackMockProvider.getMatchStats(context));
  }
  getPlayerStats(context: ProviderRequestContext): Promise<ProviderResult<PlayerStatsResult>> {
    return this.run(() => this.selectedProvider!.getPlayerStats(context), () => fallbackMockProvider.getPlayerStats(context));
  }
  getTeamStats(context: ProviderRequestContext): Promise<ProviderResult<TeamStatsResult>> {
    return this.run(() => this.selectedProvider!.getTeamStats(context), () => fallbackMockProvider.getTeamStats(context));
  }
}

export const stableFootballProvider = new StableFootballProvider();
