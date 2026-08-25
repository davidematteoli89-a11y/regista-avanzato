import type { ImportOperationResult, ImportWarning, TeamImportInput, TeamUpsertPayload } from "./importTypes";

function slugify(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function mapTeamImport(input: TeamImportInput): ImportOperationResult<TeamUpsertPayload> {
  const warnings: ImportWarning[] = [];
  const name = input.team.name.trim();
  const slug = slugify(name);
  if (!name || !slug) {
    return {
      entityType: "team",
      entityKey: input.team.id,
      operation: "skip",
      source: input.sourceProviderId,
      providerId: input.sourceProviderId,
      fallbackUsed: input.sourceProviderId === "mock_provider",
      payload: null,
      deduplicationKey: `${input.competition.id}:invalid-team:${input.team.id}`,
      warnings,
      errors: [{ code: "INVALID_TEAM_IDENTITY", message: "Nome o slug squadra mancante.", entityType: "team", entityKey: input.team.id, retryable: false }],
    };
  }

  const sourceProviderUuid = input.providerUuids?.[input.sourceProviderId] ?? null;
  if (!input.competitionUuid) warnings.push({ code: "UNRESOLVED_COMPETITION_UUID", message: "competition_id Supabase non ancora risolto; collegamento rinviato al writer reale.", entityType: "team", entityKey: input.team.id });
  if (!sourceProviderUuid) warnings.push({ code: "UNRESOLVED_SOURCE_PROVIDER_UUID", message: `UUID Supabase non risolto per ${input.sourceProviderId}.`, entityType: "team", entityKey: input.team.id });
  if (!input.team.externalId) warnings.push({ code: "MISSING_EXTERNAL_TEAM_ID", message: "External provider ID assente; deduplica di fallback per competizione e slug.", entityType: "team", entityKey: input.team.id });

  const payload: TeamUpsertPayload = {
    competition_id: input.competitionUuid ?? null,
    source_provider_id: sourceProviderUuid,
    api_team_id: input.team.externalId,
    slug,
    name,
    short_name: input.team.shortName || null,
    country: input.team.country || null,
    status: "approved",
    visibility: "public_free",
    login_required: false,
    internal_notes: input.mode === "dry_run" ? "Payload dry-run: non persistito." : null,
  };

  return {
    entityType: "team",
    entityKey: input.team.id,
    operation: "create",
    source: input.sourceProviderId,
    providerId: input.sourceProviderId,
    fallbackUsed: input.sourceProviderId === "mock_provider",
    payload,
    deduplicationKey: input.team.externalId
      ? `${input.sourceProviderId}:${input.team.externalId}`
      : `${input.competition.id}:${slug}`,
    warnings,
    errors: [],
  };
}
