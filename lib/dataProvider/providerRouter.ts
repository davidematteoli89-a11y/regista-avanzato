import { getCompetitionById } from "@/config/competitions";
import type { FootballDataProvider } from "./footballDataProvider";
import { manualProvider } from "./manualProvider";
import { fallbackMockProvider, mockProvider } from "./mockProvider";
import { getRuntimeProviderConfig } from "./providerConfig";
import { stableFootballProvider } from "./stableFootballProvider";
import { theStatsApiProvider } from "./theStatsApiProvider";
import { apiFootballProvider } from "./apiFootballProvider";
import { apifySofaScoreProvider } from "./apifySofaScoreProvider";
import type { ProviderId } from "./types";

export type ProviderRoutePurpose = "football_data" | "manual_editorial";

export type ProviderRouteDecision = {
  competitionId: string;
  configuredProviderId: ProviderId | null;
  resolvedProviderId: ProviderId;
  fallbackUsed: boolean;
  reason: string;
  provider: FootballDataProvider;
};

const PROVIDER_ADAPTERS: Partial<Record<ProviderId, FootballDataProvider>> = {
  mock_provider: mockProvider,
  manual_provider: manualProvider,
  stable_provider: stableFootballProvider,
  the_stats_api: theStatsApiProvider,
  api_football: apiFootballProvider,
  apify_sofascore: apifySofaScoreProvider,
};

function fallback(competitionId: string, configuredProviderId: ProviderId | null, reason: string): ProviderRouteDecision {
  return {
    competitionId,
    configuredProviderId,
    resolvedProviderId: "mock_provider",
    fallbackUsed: true,
    reason,
    provider: fallbackMockProvider,
  };
}

/**
 * Risolve un adapter per gli script di importazione.
 * Non deve essere importato da componenti o pagine pubbliche.
 */
export function routeFootballDataProvider(
  competitionId: string,
  purpose: ProviderRoutePurpose = "football_data",
): ProviderRouteDecision {
  const competition = getCompetitionById(competitionId);
  if (!competition) return fallback(competitionId, null, "Competizione sconosciuta: fallback mock.");

  if (purpose === "manual_editorial") {
    const manualConfig = getRuntimeProviderConfig("manual_provider");
    if (manualConfig?.safeToRoute) {
      return {
        competitionId,
        configuredProviderId: "manual_provider",
        resolvedProviderId: "manual_provider",
        fallbackUsed: false,
        reason: "Flusso editoriale manuale esplicitamente richiesto.",
        provider: manualProvider,
      };
    }
    return fallback(competitionId, "manual_provider", "Provider manuale non disponibile.");
  }

  for (const providerId of competition.provider_priority) {
    // Il provider manuale integra fonti editoriali, non sostituisce statistiche sportive.
    if (providerId === "manual_provider") continue;

    const runtimeConfig = getRuntimeProviderConfig(providerId);
    if (!runtimeConfig?.active) continue;

    // Doppio interruttore: Apify deve essere attivo sia sul provider sia sulla competizione.
    if (providerId === "apify_sofascore" && !competition.apify_enabled) continue;

    const adapter = PROVIDER_ADAPTERS[providerId];
    if (!runtimeConfig.hasAdapter || !adapter) continue;

    if (providerId === "mock_provider" && competition.primary_provider !== "mock_provider") {
      return fallback(
        competitionId,
        competition.primary_provider,
        "Provider configurati non operativi: usato il mock senza effettuare chiamate esterne.",
      );
    }

    return {
      competitionId,
      configuredProviderId: competition.primary_provider,
      resolvedProviderId: providerId,
      fallbackUsed: providerId !== competition.primary_provider,
      reason: providerId === competition.primary_provider
        ? "Provider primario attivo con adapter disponibile."
        : "Usato il primo provider attivo e implementato nella priorità configurata.",
      provider: adapter,
    };
  }

  return fallback(
    competitionId,
    competition.primary_provider,
    "Nessun provider statistico reale è attivo e implementato: fallback mock sicuro.",
  );
}

export function getFootballDataProvider(competitionId: string): FootballDataProvider {
  return routeFootballDataProvider(competitionId).provider;
}
