import { getProviderById, PROVIDERS } from "@/config/providers";
import type { ProviderId, ProviderType } from "./types";

export type RuntimeProviderConfig = {
  id: ProviderId;
  type: ProviderType;
  active: boolean;
  hasAdapter: boolean;
  safeToRoute: boolean;
};

const IMPLEMENTED_ADAPTERS: readonly ProviderId[] = [
  "mock_provider",
  "manual_provider",
  "stable_provider",
  "the_stats_api",
  "api_football",
  "apify_sofascore",
];

export function hasImplementedAdapter(providerId: ProviderId): boolean {
  return IMPLEMENTED_ADAPTERS.includes(providerId);
}

export function getRuntimeProviderConfig(providerId: ProviderId): RuntimeProviderConfig | undefined {
  const config = getProviderById(providerId);
  if (!config) return undefined;
  const hasAdapter = hasImplementedAdapter(providerId);

  return {
    id: config.id,
    type: config.type,
    active: config.active,
    hasAdapter,
    safeToRoute: config.active && hasAdapter,
  };
}

export function getRuntimeProviders(): RuntimeProviderConfig[] {
  return PROVIDERS.map((provider) => getRuntimeProviderConfig(provider.id)!);
}
