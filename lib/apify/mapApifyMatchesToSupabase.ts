import { getCompetitionById } from "@/config/competitions";
import { mapApifySofaScorePayload } from "./apifySofaScoreMapper";
import { mapMatchEventImport } from "@/lib/import/eventImportMapper";
import { mapMatchImport } from "@/lib/import/matchImportMapper";
import { detectMatchTriggers } from "@/lib/import/matchTriggerDetector";
import type { ApifyToSupabaseMappingResult } from "./apifyImportTypes";

export type MapApifyMatchesToSupabaseInput = {
  competitionId: string;
  season: string;
  payload: unknown;
  competitionUuid?: string | null;
  teamUuidByInternalId?: Readonly<Record<string, string>>;
  playerUuidByInternalId?: Readonly<Record<string, string>>;
  matchUuidByInternalId?: Readonly<Record<string, string>>;
  providerUuid?: string | null;
};

/** Converte solo in payload dry-run. Le FK irrisolte restano null e nessun writer viene invocato. */
export function mapApifyMatchesToSupabase(input: MapApifyMatchesToSupabaseInput): ApifyToSupabaseMappingResult {
  const competition = getCompetitionById(input.competitionId);
  if (!competition || (competition.tracking_level !== "apify_light_plus_p1" && competition.tracking_level !== "apify_light_plus_p2")) {
    return {
      competitionId: input.competitionId, scope: "latest_round", matchPayloads: [], eventPayloads: [], standingPayloads: [],
      teamMatchStatsPayloads: [], contentCandidatePayloads: [], skippedRecords: 0,
      errors: ["Competizione assente o non ammessa per il mapping Apify light."], warnings: [], writtenToSupabase: false,
    };
  }

  const normalized = mapApifySofaScorePayload(input.payload, competition.id, input.season);
  const providerUuids = input.providerUuid ? { apify_sofascore: input.providerUuid } : undefined;
  const matchOperations = normalized.matches.map((match) => mapMatchImport({
    match, competition, mode: "dry_run", sourceProviderId: "apify_sofascore",
    competitionUuid: input.competitionUuid, teamUuidByInternalId: input.teamUuidByInternalId, providerUuids,
  }));
  const eventOperations = normalized.events.map((event) => mapMatchEventImport({
    event, mode: "dry_run", sourceProviderId: "apify_sofascore",
    matchUuid: input.matchUuidByInternalId?.[event.matchId] ?? null,
    teamUuidByInternalId: input.teamUuidByInternalId, playerUuidByInternalId: input.playerUuidByInternalId, providerUuids,
  }));
  const eventsByMatch = new Map<string, typeof normalized.events>();
  for (const event of normalized.events) eventsByMatch.set(event.matchId, [...(eventsByMatch.get(event.matchId) ?? []), event]);
  const triggers = normalized.matches.flatMap((match) => detectMatchTriggers(match, eventsByMatch.get(match.id) ?? []));

  const warnings = [
    ...matchOperations.flatMap((operation) => operation.warnings.map((item) => item.message)),
    ...eventOperations.flatMap((operation) => operation.warnings.map((item) => item.message)),
  ];
  if (normalized.standings.length > 0) warnings.push("matchday delle classifiche resta 0 finché il payload reale non espone un turno verificabile.");

  return {
    competitionId: competition.id,
    scope: "latest_round",
    matchPayloads: matchOperations.flatMap((operation) => operation.payload ? [{ ...operation.payload }] : []),
    eventPayloads: eventOperations.flatMap((operation) => operation.payload ? [{ ...operation.payload }] : []),
    standingPayloads: normalized.standings.map((standing) => ({
      competition_id: input.competitionUuid ?? null,
      team_id: input.teamUuidByInternalId?.[standing.teamId] ?? null,
      source_provider_id: input.providerUuid ?? null,
      season: standing.season,
      stage: "regular",
      matchday: 0,
      rank: standing.position,
      played: standing.played,
      won: standing.won,
      drawn: standing.drawn,
      lost: standing.lost,
      goals_for: standing.goalsFor,
      goals_against: standing.goalsAgainst,
      goal_difference: standing.goalDifference,
      points: standing.points,
    })),
    teamMatchStatsPayloads: normalized.teamMatchStats.map((stats) => ({
      match_id: input.matchUuidByInternalId?.[stats.matchId] ?? null,
      team_id: input.teamUuidByInternalId?.[stats.teamId] ?? null,
      source_provider_id: input.providerUuid ?? null,
      possession_pct: stats.possessionPercentage,
      shots: stats.shots,
      shots_on_target: stats.shotsOnTarget,
      corners: stats.corners,
      fouls: stats.fouls,
      expected_goals: stats.expectedGoals,
      extra_stats: {},
      data_confidence: "medium_low",
    })),
    contentCandidatePayloads: triggers.map((trigger) => ({
      competition_id: input.competitionUuid ?? null,
      match_id: input.matchUuidByInternalId?.[trigger.matchId] ?? null,
      candidate_type: trigger.type,
      title: `Trigger ${trigger.type} da verificare`,
      rationale: trigger.reason,
      priority: trigger.severity === "high" ? 20 : 50,
      source_payload: { ...trigger.evidence, source: "apify_sofascore", latest_round_only: true },
      status: "review_needed",
      visibility: "private_admin",
    })),
    skippedRecords: matchOperations.filter((item) => !item.payload).length + eventOperations.filter((item) => !item.payload).length,
    errors: [
      ...normalized.errors,
      ...matchOperations.flatMap((operation) => operation.errors.map((item) => item.message)),
      ...eventOperations.flatMap((operation) => operation.errors.map((item) => item.message)),
    ],
    warnings,
    writtenToSupabase: false,
  };
}
