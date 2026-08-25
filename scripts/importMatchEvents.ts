import { getCompetitionById } from "@/config/competitions";
import { routeFootballDataProvider, type ProviderRouteDecision } from "@/lib/dataProvider/providerRouter";
import type { NormalizedMatchEvent } from "@/lib/dataProvider/types";
import { mapMatchEventImport } from "@/lib/import/eventImportMapper";
import type {
  MatchEventUpsertPayload,
  MatchImportBatchResult,
  MatchImportError,
  MatchImportOperationResult,
  MatchImportWarning,
} from "@/lib/import/matchImportTypes";
import { detectMatchTriggers } from "@/lib/import/matchTriggerDetector";
import type { ImportMode, ProviderUuidMap } from "@/lib/import/importTypes";
import { importFixtures, type FixturesImportOptions, type FixturesImportResult } from "./importFixtures";

export type MatchEventsImportOptions = FixturesImportOptions & {
  mode?: ImportMode;
  matchUuidByInternalId?: Readonly<Record<string, string>>;
  teamUuidByInternalId?: Readonly<Record<string, string>>;
  playerUuidByInternalId?: Readonly<Record<string, string>>;
  providerUuids?: ProviderUuidMap;
  allowRawPayload?: boolean;
};

export type MatchEventsImportResult = MatchImportBatchResult<MatchEventUpsertPayload> & {
  routes: ProviderRouteDecision[];
  normalizedEvents: NormalizedMatchEvent[];
};

export async function importMatchEvents(
  options: MatchEventsImportOptions = {},
  fixtureImport?: FixturesImportResult,
): Promise<MatchEventsImportResult> {
  const mode = options.mode ?? "dry_run";
  const season = options.season ?? "2026/27-mock";
  const fixtures = fixtureImport ?? await importFixtures({ ...options, mode, season });
  const finishedMatches = fixtures.normalizedMatches.filter((match) => match.status === "finished");
  const operations: MatchImportOperationResult<MatchEventUpsertPayload>[] = [];
  const normalizedEvents: NormalizedMatchEvent[] = [];
  const warnings: MatchImportWarning[] = [];
  const errors: MatchImportError[] = [];
  const routes: ProviderRouteDecision[] = [];
  const batchKeys = new Set<string>();
  const eventsByMatch = new Map<string, NormalizedMatchEvent[]>();

  for (const match of finishedMatches) {
    const competition = getCompetitionById(match.competitionId);
    if (!competition) {
      errors.push({ code: "EVENT_COMPETITION_UNKNOWN", message: `Competizione ${match.competitionId} non trovata.`, entityType: "provider_request", entityKey: match.id, retryable: false });
      continue;
    }
    const route = routeFootballDataProvider(competition.id);
    routes.push(route);
    try {
      const response = await route.provider.getMatchEvents({ competitionId: competition.id, season, matchId: match.id, requestSource: "development_test", latestRoundOnly: true });
      warnings.push(...response.errors.map((error) => ({ code: error.code, message: error.message, entityType: "provider_request" as const, entityKey: match.id })));
      if (response.data.length === 0) warnings.push({ code: "PARTIAL_COVERAGE_NO_EVENTS", message: "Eventi non disponibili: la partita resta importabile senza eventi inventati.", entityType: "provider_request", entityKey: match.id });
      normalizedEvents.push(...response.data);
      eventsByMatch.set(match.id, response.data);

      for (const event of response.data) {
        let operation = mapMatchEventImport({
          event,
          mode,
          sourceProviderId: route.resolvedProviderId,
          matchUuid: options.matchUuidByInternalId?.[match.id] ?? null,
          teamUuidByInternalId: options.teamUuidByInternalId,
          playerUuidByInternalId: options.playerUuidByInternalId,
          providerUuids: options.providerUuids,
          allowRawPayload: options.allowRawPayload === true && mode === "real_disabled",
        });
        if (operation.operation !== "skip" && batchKeys.has(operation.deduplicationKey)) {
          operation = { ...operation, operation: "skip", payload: null, warnings: [...operation.warnings, { code: "DUPLICATE_EVENT_IN_BATCH", message: `Evento duplicato saltato: ${operation.deduplicationKey}`, entityType: "match_event", entityKey: event.id }] };
        } else if (operation.operation !== "skip") batchKeys.add(operation.deduplicationKey);
        operations.push(operation);
      }
    } catch (error) {
      errors.push({ code: "MATCH_EVENTS_PROVIDER_FAILURE", message: error instanceof Error ? error.message : "Errore provider sconosciuto", entityType: "provider_request", entityKey: match.id, retryable: true });
      warnings.push({ code: "PRESERVE_PREVIOUS_EVENTS", message: "Eventi precedenti preservati; nessuna cancellazione prevista.", entityType: "provider_request", entityKey: match.id });
    }
  }

  const triggers = finishedMatches.flatMap((match) => detectMatchTriggers(match, eventsByMatch.get(match.id) ?? []));
  const operationWarnings = operations.flatMap((item) => item.warnings);
  const operationErrors = operations.flatMap((item) => item.errors);
  return {
    mode,
    operations,
    routes,
    normalizedEvents,
    summary: {
      mode,
      competitionsChecked: new Set(finishedMatches.map((match) => match.competitionId)).size,
      matchesProcessed: finishedMatches.length,
      matchPayloads: fixtures.summary.matchPayloads,
      eventsProcessed: operations.length,
      eventPayloads: operations.filter((item) => item.payload).length,
      created: operations.filter((item) => item.operation === "create").length,
      updated: operations.filter((item) => item.operation === "update").length,
      skipped: operations.filter((item) => item.operation === "skip").length,
      providerRequestLogs: routes.length,
      fallbackCount: routes.filter((route) => route.fallbackUsed).length,
      triggers,
      warnings: [...warnings, ...operationWarnings],
      errors: [...errors, ...operationErrors],
      preservePreviousData: true,
      wroteToSupabase: false,
      realProviderCalls: 0,
      apifyRuns: 0,
    },
  };
}
