import type { ApifyLastMatchdayInput, WeeklyApifyImportScope } from "./apifyImportTypes";

export type LastMatchdayTargetResult = {
  ok: boolean;
  competitionId: string;
  scope: WeeklyApifyImportScope;
  actorTargetKey: string | null;
  urls: string[];
  warnings: string[];
  error: string | null;
};

/** Prepara identificatori controllati; non costruisce né visita URL SofaScore reali. */
export function getLastMatchdayUrls(input: ApifyLastMatchdayInput): LastMatchdayTargetResult {
  const { competition } = input;
  const scope = input.scope ?? "latest_round";
  if (scope !== "latest_round") {
    return { ok: false, competitionId: competition.id, scope: "latest_round", actorTargetKey: null, urls: [], warnings: [], error: "Sono consentiti solo ultima giornata / ultimo turno." };
  }
  if (competition.tracking_level !== "apify_light_plus_p1" && competition.tracking_level !== "apify_light_plus_p2") {
    return { ok: false, competitionId: competition.id, scope, actorTargetKey: null, urls: [], warnings: [], error: "Tracking level non consentito per Apify light." };
  }
  if (!competition.apify_enabled || (competition.apify_priority !== 1 && competition.apify_priority !== 2)) {
    return { ok: false, competitionId: competition.id, scope, actorTargetKey: null, urls: [], warnings: [], error: "Competizione non abilitata per Apify." };
  }
  const season = input.season.trim() || "season-to-resolve";
  return {
    ok: true,
    competitionId: competition.id,
    scope,
    actorTargetKey: `sofascore:${competition.id}:${season}:latest-round`,
    urls: [],
    warnings: ["Gli URL reali verranno risolti server-side solo nello step operativo futuro."],
    error: null,
  };
}
