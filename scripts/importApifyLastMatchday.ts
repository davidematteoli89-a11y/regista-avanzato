import { getCompetitionById } from "@/config/competitions";
import { getLastMatchdayUrls } from "@/lib/apify/getLastMatchdayUrls";
import type {
  ApifyLastMatchdayInput,
  ApifyLastMatchdayResult,
  WeeklyApifyImportPlan,
  WeeklyApifyImportResult,
} from "@/lib/apify/apifyImportTypes";

export function prepareApifyLastMatchday(input: ApifyLastMatchdayInput): ApifyLastMatchdayResult {
  const target = getLastMatchdayUrls(input);
  return {
    competitionId: input.competition.id,
    scope: "latest_round",
    status: target.ok ? "prepared_mock" : "skipped",
    actorTargetKey: target.actorTargetKey,
    sourceUrls: [],
    fetchedItems: 0,
    mappedRecords: 0,
    writtenRecords: 0,
    externalCalls: 0,
    previousDataPreserved: true,
    warnings: [...target.warnings, ...(target.error ? [target.error] : [])],
  };
}

/** Simula il batch latest-round pianificato; non legge dataset e non scrive Supabase. */
export async function importApifyLastMatchday(plan: WeeklyApifyImportPlan): Promise<WeeklyApifyImportResult> {
  const planned = [...plan.priorityOne, ...plan.priorityTwo].filter((item) => item.status === "planned_mock");
  const lastMatchdayResults = planned.flatMap((item) => {
    const competition = getCompetitionById(item.competitionId);
    return competition ? [prepareApifyLastMatchday({ competition, season: "season-to-resolve", mode: plan.mode, scope: "latest_round" })] : [];
  });
  const warnings = [...plan.warnings, ...lastMatchdayResults.flatMap((item) => item.warnings)];
  return {
    mode: plan.mode,
    plan,
    lastMatchdayResults,
    startedRuns: 0,
    externalCalls: 0,
    mappedRecords: 0,
    writtenRecords: 0,
    writtenToSupabase: false,
    previousDataPreserved: true,
    warnings,
    summary: "Import latest_round preparato in modalità mock. Run reali=0; chiamate esterne=0; scritture Supabase=0.",
  };
}
