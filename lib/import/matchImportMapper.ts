import type { MatchImportInput, MatchImportOperationResult, MatchUpsertPayload } from "./matchImportTypes";

export function mapMatchImport(input: MatchImportInput): MatchImportOperationResult<MatchUpsertPayload> {
  const warnings = [] as MatchImportOperationResult<MatchUpsertPayload>["warnings"];
  const externalId = input.match.externalId;
  if (!externalId || !input.match.season || !input.match.kickoffAt) {
    return {
      entityType: "match", entityKey: input.match.id, operation: "skip", provider: input.sourceProviderId,
      externalId, fallbackUsed: input.sourceProviderId === "mock_provider", payload: null,
      deduplicationKey: `${input.sourceProviderId}:${externalId ?? input.match.id}`, highlightLink: input.highlightLink ?? null,
      rawPayloadIncluded: false, warnings,
      errors: [{ code: "INCOMPLETE_MATCH", message: "External match ID, stagione o data mancanti.", entityType: "match", entityKey: input.match.id, retryable: false }],
    };
  }

  const competitionUuid = input.competitionUuid ?? null;
  const homeTeamUuid = input.teamUuidByInternalId?.[input.match.homeTeamId] ?? null;
  const awayTeamUuid = input.teamUuidByInternalId?.[input.match.awayTeamId] ?? null;
  const sourceProviderUuid = input.providerUuids?.[input.sourceProviderId] ?? null;
  if (!competitionUuid) warnings.push({ code: "UNRESOLVED_MATCH_COMPETITION_UUID", message: "competition_id resterà null nel dry-run.", entityType: "match", entityKey: input.match.id });
  if (!homeTeamUuid || !awayTeamUuid) warnings.push({ code: "UNRESOLVED_MATCH_TEAM_UUID", message: "home_team_id/away_team_id non ancora risolti.", entityType: "match", entityKey: input.match.id });
  if (!sourceProviderUuid) warnings.push({ code: "UNRESOLVED_MATCH_PROVIDER_UUID", message: `UUID non risolto per ${input.sourceProviderId}.`, entityType: "match", entityKey: input.match.id });
  if (input.highlightLink) warnings.push({ code: "HIGHLIGHT_LINK_SEPARATE_TABLE", message: "Il link futuro appartiene a highlight_links e non viene inserito in matches.", entityType: "match", entityKey: input.match.id });
  if (input.rawPayload !== undefined) warnings.push({ code: "MATCH_RAW_PAYLOAD_NOT_STORED", message: "La tabella matches non ha raw_data: payload grezzo escluso.", entityType: "match", entityKey: input.match.id });

  return {
    entityType: "match",
    entityKey: input.match.id,
    operation: "create",
    provider: input.sourceProviderId,
    externalId,
    fallbackUsed: input.sourceProviderId === "mock_provider",
    deduplicationKey: `${input.sourceProviderId}:${externalId}`,
    highlightLink: input.highlightLink ?? null,
    rawPayloadIncluded: false,
    warnings,
    errors: [],
    payload: {
      competition_id: competitionUuid,
      source_provider_id: sourceProviderUuid,
      api_match_id: externalId,
      season: input.match.season,
      round: input.match.round,
      kickoff_at: input.match.kickoffAt,
      venue: input.match.venue,
      home_team_id: homeTeamUuid,
      away_team_id: awayTeamUuid,
      home_score: input.match.homeScore,
      away_score: input.match.awayScore,
      status: input.match.status,
      visibility: "public_free",
      login_required: input.competition.login_required_for_full_stats,
      internal_notes: input.mode === "dry_run" ? "Payload dry-run: FK non risolte, non persistito." : null,
      data_confidence: input.competition.data_confidence,
    },
  };
}
