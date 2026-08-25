import type {
  PlayerMatchStatsImportInput,
  PlayerMatchStatsUpsertPayload,
  PlayerSeasonStatsImportInput,
  PlayerSeasonStatsUpsertPayload,
  StatsImportOperationResult,
} from "./statsImportTypes";

function optionalExtra(values: Record<string, string | number | boolean | null | undefined>): Record<string, string | number | boolean> {
  return Object.fromEntries(Object.entries(values).filter((entry): entry is [string, string | number | boolean] => entry[1] !== null && entry[1] !== undefined));
}

export function mapPlayerMatchStats(input: PlayerMatchStatsImportInput): StatsImportOperationResult<PlayerMatchStatsUpsertPayload> {
  const key = `${input.sourceProviderId}:${input.stats.matchId}:${input.stats.playerId}`;
  if (input.competition.tracking_level !== "full_official") return { scope: "player_match", entityKey: input.stats.id, operation: "skip", source: input.sourceProviderId, fallbackUsed: input.sourceProviderId === "mock_provider", payload: null, deduplicationKey: key, warnings: [], errors: [{ code: "PLAYER_MATCH_NON_FULL_BLOCKED", message: "Player match stats profonde consentite solo per FULL_OFFICIAL.", scope: "player_match", entityKey: input.stats.id, retryable: false }] };
  if ([input.stats.minutesPlayed, input.stats.goals, input.stats.assists].some((value) => !Number.isFinite(value) || value < 0)) return { scope: "player_match", entityKey: input.stats.id, operation: "skip", source: input.sourceProviderId, fallbackUsed: input.sourceProviderId === "mock_provider", payload: null, deduplicationKey: key, warnings: [], errors: [{ code: "INVALID_PLAYER_MATCH_STATS", message: "Minuti, gol o assist non validi.", scope: "player_match", entityKey: input.stats.id, retryable: false }] };

  const matchId = input.matchUuidByInternalId?.[input.stats.matchId] ?? null;
  const playerId = input.playerUuidByInternalId?.[input.stats.playerId] ?? null;
  const teamId = input.teamUuidByInternalId?.[input.stats.teamId] ?? null;
  const providerId = input.providerUuids?.[input.sourceProviderId] ?? null;
  const warnings = [] as StatsImportOperationResult<PlayerMatchStatsUpsertPayload>["warnings"];
  if (!matchId || !playerId || !providerId) warnings.push({ code: "UNRESOLVED_PLAYER_MATCH_STATS_UUID", message: "FK match/player/provider irrisolte: payload solo dry-run.", scope: "player_match", entityKey: input.stats.id });
  if (input.optional?.xg == null || input.optional?.xa == null) warnings.push({ code: "PLAYER_MATCH_XG_XA_PARTIAL", message: "xG/xA mancanti mantenuti null e non inventati.", scope: "player_match", entityKey: input.stats.id });

  return {
    scope: "player_match", entityKey: input.stats.id, operation: "create", source: input.sourceProviderId,
    fallbackUsed: input.sourceProviderId === "mock_provider", deduplicationKey: key, warnings, errors: [],
    payload: {
      match_id: matchId, player_id: playerId, team_id: teamId, source_provider_id: providerId, starter: null,
      minutes_played: input.stats.minutesPlayed, goals: input.stats.goals, assists: input.stats.assists,
      shots: input.stats.shots, shots_on_target: input.stats.shotsOnTarget, passes_completed: null, passes_attempted: null,
      tackles: input.optional?.tackles ?? null, interceptions: input.optional?.interceptions ?? null,
      saves: input.optional?.saves ?? null, rating: input.stats.rating,
      extra_stats: optionalExtra({ key_passes: input.optional?.keyPasses, dribbles_completed: input.optional?.dribblesCompleted, duels_won: input.optional?.duelsWon, yellow_cards: input.optional?.yellowCards, red_cards: input.optional?.redCards, xg: input.optional?.xg, xa: input.optional?.xa }),
      data_confidence: input.competition.data_confidence,
    },
  };
}

export function mapPlayerSeasonStats(input: PlayerSeasonStatsImportInput): StatsImportOperationResult<PlayerSeasonStatsUpsertPayload> {
  const key = `${input.sourceProviderId}:${input.stats.competitionId}:${input.stats.season}:${input.stats.playerId}:${input.stats.teamId}`;
  if (input.competition.tracking_level !== "full_official") return { scope: "player_season", entityKey: input.stats.id, operation: "skip", source: input.sourceProviderId, fallbackUsed: input.sourceProviderId === "mock_provider", payload: null, deduplicationKey: key, warnings: [], errors: [{ code: "PLAYER_SEASON_NON_FULL_BLOCKED", message: "Player season stats profonde consentite solo per FULL_OFFICIAL.", scope: "player_season", entityKey: input.stats.id, retryable: false }] };
  const required = [input.stats.appearances, input.stats.starts, input.stats.minutesPlayed, input.stats.goals, input.stats.assists, input.stats.yellowCards, input.stats.redCards];
  if (required.some((value) => !Number.isFinite(value) || value < 0)) return { scope: "player_season", entityKey: input.stats.id, operation: "skip", source: input.sourceProviderId, fallbackUsed: input.sourceProviderId === "mock_provider", payload: null, deduplicationKey: key, warnings: [], errors: [{ code: "INVALID_PLAYER_SEASON_STATS", message: "Valori player season obbligatori non validi.", scope: "player_season", entityKey: input.stats.id, retryable: false }] };

  const competitionId = input.competitionUuid ?? null;
  const playerId = input.playerUuidByInternalId?.[input.stats.playerId] ?? null;
  const teamId = input.teamUuidByInternalId?.[input.stats.teamId] ?? null;
  const providerId = input.providerUuids?.[input.sourceProviderId] ?? null;
  const warnings = [] as StatsImportOperationResult<PlayerSeasonStatsUpsertPayload>["warnings"];
  if (!competitionId || !playerId || !providerId) warnings.push({ code: "UNRESOLVED_PLAYER_SEASON_STATS_UUID", message: "FK competition/player/provider irrisolte: payload solo dry-run.", scope: "player_season", entityKey: input.stats.id });
  if (input.optional?.xg == null || input.optional?.xa == null) warnings.push({ code: "PLAYER_SEASON_XG_XA_PARTIAL", message: "xG/xA stagionali non inventati.", scope: "player_season", entityKey: input.stats.id });

  return {
    scope: "player_season", entityKey: input.stats.id, operation: "create", source: input.sourceProviderId,
    fallbackUsed: input.sourceProviderId === "mock_provider", deduplicationKey: key, warnings, errors: [],
    payload: {
      competition_id: competitionId, player_id: playerId, team_id: teamId, source_provider_id: providerId,
      season: input.stats.season, appearances: input.stats.appearances, starts: input.stats.starts,
      minutes_played: input.stats.minutesPlayed, goals: input.stats.goals, assists: input.stats.assists,
      clean_sheets: null, average_rating: input.stats.rating,
      extra_stats: optionalExtra({ yellow_cards: input.stats.yellowCards, red_cards: input.stats.redCards, shots: input.optional?.shots, shots_on_target: input.optional?.shotsOnTarget, key_passes: input.optional?.keyPasses, dribbles_completed: input.optional?.dribblesCompleted, duels_won: input.optional?.duelsWon, tackles: input.optional?.tackles, interceptions: input.optional?.interceptions, saves: input.optional?.saves, xg: input.optional?.xg, xa: input.optional?.xa }),
      data_confidence: input.competition.data_confidence,
    },
  };
}
