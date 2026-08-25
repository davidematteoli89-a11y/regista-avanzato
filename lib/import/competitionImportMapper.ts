import type {
  CompetitionImportInput,
  CompetitionUpsertPayload,
  ImportOperationResult,
  ImportWarning,
} from "./importTypes";

const WEEKDAY_TO_NUMBER = {
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6,
  sunday: 7,
} as const;

function providerUuid(input: CompetitionImportInput, providerId: keyof NonNullable<CompetitionImportInput["providerUuids"]> | null): string | null {
  return providerId ? input.providerUuids?.[providerId] ?? null : null;
}

export function mapCompetitionImport(input: CompetitionImportInput): ImportOperationResult<CompetitionUpsertPayload> {
  const warnings: ImportWarning[] = [];
  const season = input.season.trim();
  if (!season) {
    return {
      entityType: "competition",
      entityKey: input.competition.id,
      operation: "skip",
      source: "config",
      providerId: input.sourceProviderId,
      fallbackUsed: input.sourceProviderId === "mock_provider",
      payload: null,
      deduplicationKey: `${input.competition.id}:missing-season`,
      warnings,
      errors: [{ code: "MISSING_SEASON", message: "Stagione obbligatoria per la chiave univoca competition.", entityType: "competition", entityKey: input.competition.id, retryable: false }],
    };
  }

  const primaryProvider = providerUuid(input, input.competition.primary_provider);
  const secondaryProvider = providerUuid(input, input.competition.secondary_provider);
  const enrichmentProvider = providerUuid(input, input.competition.enrichment_provider);
  if (!primaryProvider) warnings.push({ code: "UNRESOLVED_PRIMARY_PROVIDER_UUID", message: `UUID Supabase non risolto per ${input.competition.primary_provider}; campo lasciato null.`, entityType: "competition", entityKey: input.competition.id });
  if (input.normalized === null) warnings.push({ code: "MINIMAL_COMPETITION_RECORD", message: "Payload creato dalla configurazione senza dati provider.", entityType: "competition", entityKey: input.competition.id });

  const payload: CompetitionUpsertPayload = {
    internal_key: input.competition.id,
    api_competition_id: input.sourceProviderId === "mock_provider" ? null : input.normalized?.externalId ?? null,
    slug: input.competition.id,
    name: input.competition.name,
    country: input.competition.country,
    continent: input.competition.continent,
    season,
    tracking_level: input.competition.tracking_level,
    primary_provider: primaryProvider,
    secondary_provider: secondaryProvider,
    enrichment_provider: enrichmentProvider,
    update_frequency: input.competition.update_frequency,
    weekly_import_day: input.competition.weekly_import_day ? WEEKDAY_TO_NUMBER[input.competition.weekly_import_day] : null,
    public_stats_enabled: input.competition.public_stats_enabled,
    login_required_for_full_stats: input.competition.login_required_for_full_stats,
    manual_highlights_enabled: input.competition.manual_highlights_enabled,
    video_radar_enabled: input.competition.video_radar_enabled,
    apify_enabled: input.competition.apify_enabled,
    apify_priority: input.competition.apify_priority,
    data_confidence: input.competition.data_confidence,
    coverage_notes: input.competition.notes,
    status: "draft",
    visibility: "private_admin",
    login_required: input.competition.login_required_for_full_stats,
  };

  return {
    entityType: "competition",
    entityKey: input.competition.id,
    operation: "create",
    source: input.normalized ? input.sourceProviderId : "config",
    providerId: input.sourceProviderId,
    fallbackUsed: input.sourceProviderId === "mock_provider",
    payload,
    deduplicationKey: `${payload.internal_key}:${payload.season}`,
    warnings,
    errors: [],
  };
}
