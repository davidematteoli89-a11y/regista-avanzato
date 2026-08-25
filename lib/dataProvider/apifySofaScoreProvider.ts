import { getCompetitionById } from "@/config/competitions";
import { getApifySofaScoreConfig, type ApifySofaScoreRuntimeOptions } from "@/lib/apify/apifySofaScoreConfig";
import type { ApifySofaScoreConfig } from "@/lib/apify/apifySofaScoreTypes";
import { createProviderError } from "./errors";
import type { FootballDataProvider } from "./footballDataProvider";
import { fallbackMockProvider } from "./mockProvider";
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

const ID = "apify_sofascore" as const;

function eligibilityError(context: ProviderRequestContext): string | null {
  if (!context.competitionId) return "Competition ID obbligatorio per limitare Apify a un campionato minore autorizzato.";
  const competition = getCompetitionById(context.competitionId);
  if (!competition) return "Competizione sconosciuta: Apify non consentito.";
  if (competition.tracking_level === "full_official") return "Apify non può essere usato per competizioni FULL_OFFICIAL.";
  if (competition.tracking_level === "trigger") return "Competizioni trigger escluse da Apify in questo step.";
  if (!competition.apify_enabled || (competition.apify_priority !== 1 && competition.apify_priority !== 2)) return "Competizione non abilitata correttamente per Apify.";
  return null;
}

function blockedResult<T>(operation: string, data: T, message: string): ProviderResult<T> {
  return {
    providerId: ID,
    status: "error",
    data,
    errors: [createProviderError(ID, "APIFY_COMPETITION_NOT_ALLOWED", message)],
    meta: { generatedAt: new Date().toISOString(), source: "external", isFallback: false, operation },
  };
}

function fallbackResult<T>(result: ProviderResult<T>, config: ApifySofaScoreConfig): ProviderResult<T> {
  const message = !config.active
    ? "Apify/SofaScore disattivato: usato il mock senza avviare run."
    : "Adapter Apify/SofaScore ancora placeholder: usato il mock senza rete.";
  return { ...result, errors: [...result.errors, createProviderError(ID, "APIFY_PROVIDER_UNAVAILABLE", message)] };
}

export class ApifySofaScoreProvider implements FootballDataProvider {
  readonly id = ID;
  readonly config: ApifySofaScoreConfig;

  constructor(options: ApifySofaScoreRuntimeOptions = {}) {
    this.config = getApifySofaScoreConfig(options);
  }

  private async run<T>(
    operation: string,
    context: ProviderRequestContext,
    empty: T,
    mockOperation: () => Promise<ProviderResult<T>>,
  ): Promise<ProviderResult<T>> {
    const error = eligibilityError(context);
    if (error) return blockedResult(operation, empty, error);
    return fallbackResult(await mockOperation(), this.config);
  }

  getCompetitions(context: ProviderRequestContext = {}): Promise<ProviderResult<NormalizedCompetition[]>> {
    return this.run("getCompetitions", context, [], () => fallbackMockProvider.getCompetitions(context));
  }
  getTeams(context: ProviderRequestContext): Promise<ProviderResult<NormalizedTeam[]>> {
    return this.run("getTeams", context, [], () => fallbackMockProvider.getTeams(context));
  }
  getFixtures(context: ProviderRequestContext): Promise<ProviderResult<NormalizedMatch[]>> {
    return this.run("getFixtures", context, [], () => fallbackMockProvider.getFixtures(context));
  }
  getResults(context: ProviderRequestContext): Promise<ProviderResult<NormalizedMatch[]>> {
    return this.run("getResults", context, [], () => fallbackMockProvider.getResults(context));
  }
  getStandings(context: ProviderRequestContext): Promise<ProviderResult<NormalizedStanding[]>> {
    return this.run("getStandings", context, [], () => fallbackMockProvider.getStandings(context));
  }
  getMatchEvents(context: ProviderRequestContext): Promise<ProviderResult<NormalizedMatchEvent[]>> {
    return this.run("getMatchEvents", context, [], () => fallbackMockProvider.getMatchEvents(context));
  }
  getMatchStats(context: ProviderRequestContext): Promise<ProviderResult<TeamStatsResult>> {
    return this.run("getMatchStats", context, { matchStats: [], seasonStats: [] }, () => fallbackMockProvider.getMatchStats(context));
  }
  getPlayerStats(context: ProviderRequestContext): Promise<ProviderResult<PlayerStatsResult>> {
    return this.run("getPlayerStats", context, { players: [], matchStats: [], seasonStats: [] }, () => fallbackMockProvider.getPlayerStats(context));
  }
  getTeamStats(context: ProviderRequestContext): Promise<ProviderResult<TeamStatsResult>> {
    return this.run("getTeamStats", context, { matchStats: [], seasonStats: [] }, () => fallbackMockProvider.getTeamStats(context));
  }
}

export const apifySofaScoreProvider = new ApifySofaScoreProvider();
