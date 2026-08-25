import type { MatchEventImportInput, MatchEventUpsertPayload, MatchImportOperationResult } from "./matchImportTypes";

function safeRawPayload(value: unknown, allowed: boolean): Record<string, unknown> {
  return allowed && typeof value === "object" && value !== null && !Array.isArray(value)
    ? value as Record<string, unknown>
    : {};
}

export function mapMatchEventImport(input: MatchEventImportInput): MatchImportOperationResult<MatchEventUpsertPayload> {
  const warnings = [] as MatchImportOperationResult<MatchEventUpsertPayload>["warnings"];
  const externalId = input.event.externalId;
  if (!externalId || !input.event.description || input.event.minute < 0) {
    return {
      entityType: "match_event", entityKey: input.event.id, operation: "skip", provider: input.sourceProviderId,
      externalId, fallbackUsed: input.sourceProviderId === "mock_provider", payload: null,
      deduplicationKey: `${input.sourceProviderId}:${externalId ?? input.event.id}`, highlightLink: null,
      rawPayloadIncluded: false, warnings,
      errors: [{ code: "INCOMPLETE_MATCH_EVENT", message: "External event ID, minuto o descrizione mancanti.", entityType: "match_event", entityKey: input.event.id, retryable: false }],
    };
  }

  const matchUuid = input.matchUuid ?? null;
  const teamUuid = input.teamUuidByInternalId?.[input.event.teamId] ?? null;
  const playerUuid = input.event.playerId ? input.playerUuidByInternalId?.[input.event.playerId] ?? null : null;
  const relatedPlayerUuid = input.event.relatedPlayerId ? input.playerUuidByInternalId?.[input.event.relatedPlayerId] ?? null : null;
  const sourceProviderUuid = input.providerUuids?.[input.sourceProviderId] ?? null;
  if (!matchUuid) warnings.push({ code: "UNRESOLVED_EVENT_MATCH_UUID", message: "match_id resterà null nel dry-run.", entityType: "match_event", entityKey: input.event.id });
  if (!teamUuid) warnings.push({ code: "UNRESOLVED_EVENT_TEAM_UUID", message: "team_id non ancora risolto.", entityType: "match_event", entityKey: input.event.id });
  if (input.event.playerId && !playerUuid) warnings.push({ code: "UNRESOLVED_EVENT_PLAYER_UUID", message: "player_id non ancora risolto.", entityType: "match_event", entityKey: input.event.id });
  if (!sourceProviderUuid) warnings.push({ code: "UNRESOLVED_EVENT_PROVIDER_UUID", message: `UUID non risolto per ${input.sourceProviderId}.`, entityType: "match_event", entityKey: input.event.id });
  const rawData = safeRawPayload(input.rawPayload, input.allowRawPayload === true);

  return {
    entityType: "match_event", entityKey: input.event.id, operation: "create", provider: input.sourceProviderId,
    externalId, fallbackUsed: input.sourceProviderId === "mock_provider", deduplicationKey: `${input.sourceProviderId}:${externalId}`,
    highlightLink: null, rawPayloadIncluded: Object.keys(rawData).length > 0, warnings, errors: [],
    payload: {
      match_id: matchUuid,
      team_id: teamUuid,
      player_id: playerUuid,
      assist_player_id: relatedPlayerUuid,
      source_provider_id: sourceProviderUuid,
      api_event_id: externalId,
      event_type: input.event.type,
      event_detail: input.event.description,
      minute: input.event.minute,
      stoppage_minute: input.event.stoppageTime,
      raw_data: rawData,
      status: "approved",
      visibility: "public_free",
      login_required: false,
    },
  };
}
