import type {
  StatsImportOperationResult,
  TeamMatchStatsImportInput,
  TeamMatchStatsUpsertPayload,
  TeamSeasonStatsImportInput,
  TeamSeasonStatsUpsertPayload,
} from "./statsImportTypes";

function optionalExtra(values: Record<string, string | number | boolean | null | undefined>): Record<string, string | number | boolean> {
  return Object.fromEntries(Object.entries(values).filter((entry): entry is [string, string | number | boolean] => entry[1] !== null && entry[1] !== undefined));
}

const invalid = (value: number | null): boolean => value !== null && (!Number.isFinite(value) || value < 0);

export function mapTeamMatchStats(input: TeamMatchStatsImportInput): StatsImportOperationResult<TeamMatchStatsUpsertPayload> {
  const key = `${input.sourceProviderId}:${input.stats.matchId}:${input.stats.teamId}`;
  if (input.competition.tracking_level !== "full_official") return { scope: "team_match", entityKey: input.stats.id, operation: "skip", source: input.sourceProviderId, fallbackUsed: input.sourceProviderId === "mock_provider", payload: null, deduplicationKey: key, warnings: [], errors: [{ code: "TEAM_MATCH_NON_FULL_BLOCKED", message: "Team match stats profonde consentite solo per FULL_OFFICIAL.", scope: "team_match", entityKey: input.stats.id, retryable: false }] };
  const numeric = [input.stats.possessionPercentage, input.stats.shots, input.stats.shotsOnTarget, input.stats.corners, input.stats.fouls, input.stats.expectedGoals];
  if (numeric.some(invalid)) return { scope: "team_match", entityKey: input.stats.id, operation: "skip", source: input.sourceProviderId, fallbackUsed: input.sourceProviderId === "mock_provider", payload: null, deduplicationKey: key, warnings: [], errors: [{ code: "INVALID_TEAM_MATCH_STATS", message: "Valore statistico negativo o non finito.", scope: "team_match", entityKey: input.stats.id, retryable: false }] };

  const matchId = input.matchUuidByInternalId?.[input.stats.matchId] ?? null;
  const teamId = input.teamUuidByInternalId?.[input.stats.teamId] ?? null;
  const providerId = input.providerUuids?.[input.sourceProviderId] ?? null;
  const warnings = [] as StatsImportOperationResult<TeamMatchStatsUpsertPayload>["warnings"];
  if (!matchId || !teamId || !providerId) warnings.push({ code: "UNRESOLVED_TEAM_MATCH_STATS_UUID", message: "FK match/team/provider irrisolte: payload solo dry-run.", scope: "team_match", entityKey: input.stats.id });
  if (input.stats.expectedGoals === null) warnings.push({ code: "TEAM_MATCH_XG_UNAVAILABLE", message: "xG non disponibile: mantenuto null.", scope: "team_match", entityKey: input.stats.id });

  return {
    scope: "team_match", entityKey: input.stats.id, operation: "create", source: input.sourceProviderId,
    fallbackUsed: input.sourceProviderId === "mock_provider", deduplicationKey: key, warnings, errors: [],
    payload: {
      match_id: matchId, team_id: teamId, source_provider_id: providerId,
      possession_pct: input.stats.possessionPercentage, shots: input.stats.shots, shots_on_target: input.stats.shotsOnTarget,
      corners: input.stats.corners, fouls: input.stats.fouls, yellow_cards: input.optional?.yellowCards ?? null,
      red_cards: input.optional?.redCards ?? null, expected_goals: input.stats.expectedGoals,
      extra_stats: optionalExtra({ xg_against: input.optional?.xgAgainst }), data_confidence: input.competition.data_confidence,
    },
  };
}

export function mapTeamSeasonStats(input: TeamSeasonStatsImportInput): StatsImportOperationResult<TeamSeasonStatsUpsertPayload> {
  const key = `${input.sourceProviderId}:${input.stats.competitionId}:${input.stats.season}:${input.stats.teamId}`;
  if (input.competition.tracking_level !== "full_official") return { scope: "team_season", entityKey: input.stats.id, operation: "skip", source: input.sourceProviderId, fallbackUsed: input.sourceProviderId === "mock_provider", payload: null, deduplicationKey: key, warnings: [], errors: [{ code: "TEAM_SEASON_NON_FULL_BLOCKED", message: "Team season stats profonde consentite solo per FULL_OFFICIAL.", scope: "team_season", entityKey: input.stats.id, retryable: false }] };
  const required = [input.stats.matchesPlayed, input.stats.wins, input.stats.draws, input.stats.losses, input.stats.goalsFor, input.stats.goalsAgainst];
  if (required.some((value) => !Number.isFinite(value) || value < 0)) return { scope: "team_season", entityKey: input.stats.id, operation: "skip", source: input.sourceProviderId, fallbackUsed: input.sourceProviderId === "mock_provider", payload: null, deduplicationKey: key, warnings: [], errors: [{ code: "INVALID_TEAM_SEASON_STATS", message: "Valori season stats obbligatori non validi.", scope: "team_season", entityKey: input.stats.id, retryable: false }] };

  const competitionId = input.competitionUuid ?? null;
  const teamId = input.teamUuidByInternalId?.[input.stats.teamId] ?? null;
  const providerId = input.providerUuids?.[input.sourceProviderId] ?? null;
  const warnings = [] as StatsImportOperationResult<TeamSeasonStatsUpsertPayload>["warnings"];
  if (!competitionId || !teamId || !providerId) warnings.push({ code: "UNRESOLVED_TEAM_SEASON_STATS_UUID", message: "FK competition/team/provider irrisolte: payload solo dry-run.", scope: "team_season", entityKey: input.stats.id });
  if (input.optional?.xgFor == null || input.optional?.xgAgainst == null) warnings.push({ code: "TEAM_SEASON_XG_PARTIAL", message: "xG/xGA non inventati: valori mancanti mantenuti null.", scope: "team_season", entityKey: input.stats.id });

  return {
    scope: "team_season", entityKey: input.stats.id, operation: "create", source: input.sourceProviderId,
    fallbackUsed: input.sourceProviderId === "mock_provider", deduplicationKey: key, warnings, errors: [],
    payload: {
      competition_id: competitionId, team_id: teamId, source_provider_id: providerId, season: input.stats.season,
      matches_played: input.stats.matchesPlayed, wins: input.stats.wins, draws: input.stats.draws, losses: input.stats.losses,
      goals_for: input.stats.goalsFor, goals_against: input.stats.goalsAgainst, clean_sheets: input.stats.cleanSheets,
      expected_goals_for: input.optional?.xgFor ?? null, expected_goals_against: input.optional?.xgAgainst ?? null,
      extra_stats: optionalExtra({ shots: input.optional?.shots, shots_on_target: input.optional?.shotsOnTarget, possession_avg: input.optional?.possessionAvg, form_last_5: input.optional?.formLast5 }),
      data_confidence: input.competition.data_confidence,
    },
  };
}
