import type { CompetitionConfig } from "@/config/competitions";
import type { ApifySofaScoreActorInput } from "./apifySofaScoreTypes";

export type BuildSofaScoreActorInputResult =
  | { ok: true; input: ApifySofaScoreActorInput; error: null }
  | { ok: false; input: null; error: string };

export function buildSofaScoreActorInput(competition: CompetitionConfig): BuildSofaScoreActorInputResult {
  if (competition.tracking_level === "full_official") {
    return { ok: false, input: null, error: "Le competizioni FULL_OFFICIAL non possono usare Apify/SofaScore." };
  }
  if (competition.tracking_level === "trigger") {
    return { ok: false, input: null, error: "Le competizioni trigger sono escluse; un eventuale override richiederà uno step futuro." };
  }
  if (!competition.apify_enabled || (competition.apify_priority !== 1 && competition.apify_priority !== 2)) {
    return { ok: false, input: null, error: "Competizione non abilitata per Apify o priorità non valida." };
  }

  return {
    ok: true,
    error: null,
    input: {
      competitionId: competition.id,
      competitionName: competition.name,
      trackingLevel: competition.tracking_level,
      priority: competition.apify_priority,
      scope: "latest_round",
      includeFixtures: competition.import_fixtures,
      includeResults: competition.import_results,
      includeStandings: competition.import_standings,
      includePlayerStats: competition.import_player_stats,
      includeTeamStats: competition.import_team_stats,
      includeMatchStats: competition.import_match_stats,
      includeFullHistory: false,
      liveScraping: false,
      downloadVideos: false,
    },
  };
}
