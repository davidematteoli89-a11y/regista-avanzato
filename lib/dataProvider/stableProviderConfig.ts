import { getProviderById } from "@/config/providers";
import type { ProviderRequestContext } from "./types";

export type StableProviderName = "the_stats_api" | "api_football";

export type StableProviderEndpoint =
  | "competitions"
  | "teams"
  | "fixtures"
  | "results"
  | "standings"
  | "match_events"
  | "match_stats"
  | "player_stats"
  | "team_stats";

export type StableProviderConfig = {
  name: StableProviderName;
  active: boolean;
  configuredInCatalog: boolean;
  credentialsConfigured: boolean;
  mappingsReady: boolean;
  networkEnabled: boolean;
  fallbackToMock: true;
  endpoints: Readonly<Record<StableProviderEndpoint, string>>;
};

export type StableProviderRequest = {
  provider: StableProviderName;
  endpoint: StableProviderEndpoint;
  context: ProviderRequestContext;
  pathParameters?: Readonly<Record<string, string>>;
  query?: Readonly<Record<string, string | number | boolean>>;
};

export type StableProviderError = {
  code: "PROVIDER_DISABLED" | "PROVIDER_NOT_CONFIGURED" | "MAPPING_NOT_READY" | "NETWORK_DISABLED" | "INVALID_PAYLOAD";
  message: string;
  provider: StableProviderName;
  endpoint: StableProviderEndpoint;
  retryable: false;
};

export type StableProviderResponse<T> = {
  ok: boolean;
  request: StableProviderRequest;
  data: T | null;
  error: StableProviderError | null;
};

export type StableProviderRuntimeOptions = {
  credentialsConfigured?: boolean;
  mappingsReady?: boolean;
  /** Rimane false in questo step. Un futuro client server-side dovrà abilitarlo esplicitamente. */
  networkEnabled?: boolean;
};

export const THE_STATS_API_ENDPOINTS: StableProviderConfig["endpoints"] = {
  competitions: "/competitions",
  teams: "/competitions/{competitionId}/teams",
  fixtures: "/competitions/{competitionId}/fixtures",
  results: "/competitions/{competitionId}/results",
  standings: "/competitions/{competitionId}/standings",
  match_events: "/matches/{matchId}/events",
  match_stats: "/matches/{matchId}/stats",
  player_stats: "/competitions/{competitionId}/players/stats",
  team_stats: "/competitions/{competitionId}/teams/stats",
};

export const API_FOOTBALL_ENDPOINTS: StableProviderConfig["endpoints"] = {
  competitions: "/leagues",
  teams: "/teams",
  fixtures: "/fixtures",
  results: "/fixtures",
  standings: "/standings",
  match_events: "/fixtures/events",
  match_stats: "/fixtures/statistics",
  player_stats: "/players",
  team_stats: "/teams/statistics",
};

export function getStableProviderConfig(
  name: StableProviderName,
  options: StableProviderRuntimeOptions = {},
): StableProviderConfig {
  const catalogProvider = getProviderById(name);
  const configuredInCatalog = Boolean(catalogProvider);
  const credentialsConfigured = options.credentialsConfigured ?? false;
  const mappingsReady = options.mappingsReady ?? false;
  const networkEnabled = options.networkEnabled ?? false;

  return {
    name,
    configuredInCatalog,
    credentialsConfigured,
    mappingsReady,
    networkEnabled,
    active: Boolean(
      catalogProvider?.active
      && credentialsConfigured
      && mappingsReady
      && networkEnabled,
    ),
    fallbackToMock: true,
    endpoints: name === "the_stats_api" ? THE_STATS_API_ENDPOINTS : API_FOOTBALL_ENDPOINTS,
  };
}

export function getConfiguredStableProvider(
  preferredName?: StableProviderName | null,
  options: StableProviderRuntimeOptions = {},
): StableProviderConfig | null {
  const order: StableProviderName[] = preferredName
    ? [preferredName, ...(preferredName === "the_stats_api" ? ["api_football" as const] : ["the_stats_api" as const])]
    : ["the_stats_api", "api_football"];

  for (const name of order) {
    const config = getStableProviderConfig(name, options);
    if (config.active) return config;
  }

  return null;
}
