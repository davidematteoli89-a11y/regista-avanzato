import { COMPETITIONS, type CompetitionConfig } from "@/config/competitions";
import { routeFootballDataProvider, type ProviderRouteDecision } from "@/lib/dataProvider/providerRouter";
import { createSafeImportPolicy, guardApify, guardProviderCall } from "@/lib/import/importGuards";
import { createImportLogger } from "@/lib/import/importLogger";
import { mapTeamImport } from "@/lib/import/teamImportMapper";
import type {
  ImportBatchResult,
  ImportMode,
  ImportWarning,
  ProviderUuidMap,
  TeamUpsertPayload,
} from "@/lib/import/importTypes";

export type TeamImportOptions = {
  mode?: ImportMode;
  season?: string;
  providerUuids?: ProviderUuidMap;
  competitionUuidByInternalKey?: Readonly<Record<string, string>>;
};

export type TeamImportRunResult = ImportBatchResult<TeamUpsertPayload> & {
  routes: ProviderRouteDecision[];
};

const TRACKING_ORDER: Record<CompetitionConfig["tracking_level"], number> = {
  full_official: 0,
  apify_light_plus_p1: 1,
  apify_light_plus_p2: 2,
  trigger: 3,
};

export async function importTeams(options: TeamImportOptions = {}): Promise<TeamImportRunResult> {
  const mode = options.mode ?? "dry_run";
  const season = options.season ?? "2026/27-mock";
  const logger = createImportLogger(mode);
  const policy = createSafeImportPolicy(mode);
  const routes: ProviderRouteDecision[] = [];
  const orderedCompetitions = [...COMPETITIONS].sort((a, b) => TRACKING_ORDER[a.tracking_level] - TRACKING_ORDER[b.tracking_level]);

  for (const competition of orderedCompetitions) {
    const route = routeFootballDataProvider(competition.id);
    routes.push(route);

    if (competition.tracking_level === "trigger") {
      logger.recordProviderRequest({
        entityKey: competition.id,
        providerId: route.resolvedProviderId,
        fallbackUsed: route.fallbackUsed,
        warning: { code: "TRIGGER_TEAMS_SKIPPED", message: "Tracking trigger: import squadre non previsto.", entityType: "provider_request", entityKey: competition.id },
      });
      continue;
    }

    const requestWarnings: ImportWarning[] = [];
    const providerGuard = guardProviderCall(competition.primary_provider, policy);
    if (providerGuard) requestWarnings.push({ code: providerGuard.code, message: providerGuard.message, entityType: "provider_request", entityKey: competition.id });
    if (competition.tracking_level === "apify_light_plus_p1" || competition.tracking_level === "apify_light_plus_p2") {
      const apifyGuard = guardApify(competition, policy);
      if (apifyGuard) requestWarnings.push({ code: apifyGuard.code, message: apifyGuard.message, entityType: "provider_request", entityKey: competition.id });
    }

    const providerResult = await route.provider.getTeams({ competitionId: competition.id, season, requestSource: "development_test", latestRoundOnly: true });
    requestWarnings.push(...providerResult.errors.map((error) => ({ code: error.code, message: error.message, entityType: "provider_request" as const, entityKey: competition.id })));
    if (providerResult.data.length === 0) requestWarnings.push({ code: "PARTIAL_COVERAGE_NO_TEAMS", message: "Nessuna squadra disponibile: competizione mantenuta senza inventare dati.", entityType: "provider_request", entityKey: competition.id });

    logger.recordProviderRequest({
      entityKey: competition.id,
      providerId: route.resolvedProviderId,
      fallbackUsed: route.fallbackUsed,
      warning: { code: "PROVIDER_REQUEST_PLACEHOLDER", message: `${route.reason} Request esterne registrate: 0; squadre locali ricevute: ${providerResult.data.length}.`, entityType: "provider_request", entityKey: competition.id },
    });
    requestWarnings.forEach((warning, index) => logger.recordProviderRequest({
      entityKey: `${competition.id}:warning-${index}`,
      providerId: route.resolvedProviderId,
      fallbackUsed: route.fallbackUsed,
      warning,
    }));

    for (const team of providerResult.data) {
      logger.record(mapTeamImport({
        team,
        competition,
        mode,
        sourceProviderId: route.resolvedProviderId,
        competitionUuid: options.competitionUuidByInternalKey?.[competition.id] ?? null,
        providerUuids: options.providerUuids,
      }));
    }
  }

  return {
    mode,
    operations: logger.getOperations<TeamUpsertPayload>("team"),
    summary: logger.summarize(),
    routes,
  };
}
