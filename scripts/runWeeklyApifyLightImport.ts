import { createWeeklyApifyPlan, type CreateWeeklyApifyPlanOptions } from "@/lib/apify/createWeeklyApifyPlan";
import { updateApifyBudgetStatus } from "@/lib/apify/updateApifyBudgetStatus";
import type { WeeklyApifyImportPlan, WeeklyApifyImportResult } from "@/lib/apify/apifyImportTypes";
import { importApifyLastMatchday } from "./importApifyLastMatchday";

export type WeeklyApifyPlanOptions = CreateWeeklyApifyPlanOptions;
export const buildWeeklyApifyImportPlan = createWeeklyApifyPlan;

const countStatus = (plan: WeeklyApifyImportPlan, priority: 1 | 2, status: "planned_mock" | "skipped_budget" | "skipped_guard" | "hard_stop"): number => {
  const items = priority === 1 ? plan.priorityOne : plan.priorityTwo;
  return items.filter((item) => item.status === status).length;
};

export function formatWeeklyApifyImportPlan(plan: WeeklyApifyImportPlan): string {
  const budgetPreview = updateApifyBudgetStatus(plan);
  const p1Cost = plan.priorityOne.filter((item) => item.status === "planned_mock").reduce((sum, item) => sum + item.estimatedCost.totalEstimatedCostEur, 0);
  const p2Cost = plan.priorityTwo.filter((item) => item.status === "planned_mock").reduce((sum, item) => sum + item.estimatedCost.totalEstimatedCostEur, 0);
  const hardStop = plan.budgetAtStart.state === "hard_stop" || plan.budgetAfterPreview.state === "hard_stop";
  const competitionCosts = [...plan.priorityOne, ...plan.priorityTwo]
    .map((item) => `${item.competitionId}:${item.status}:${item.estimatedCost.totalEstimatedCostEur.toFixed(2)}EUR`)
    .join(",");

  return [
    `[weekly-apify-light-import] modalità=${plan.mode} scope=latest_round`,
    `budget_mensile=${plan.budgetAtStart.monthlyBudgetEur.toFixed(2)} EUR`,
    `spesa_mock_corrente=${plan.estimatedSpendBeforeEur.toFixed(2)} EUR`,
    `spesa_mock_proiettata=${budgetPreview.projectedEstimatedSpendEur.toFixed(2)} EUR`,
    `budget_residuo_stimato=${budgetPreview.projectedRemainingEur.toFixed(2)} EUR`,
    `P1 pianificate=${countStatus(plan, 1, "planned_mock")}/${plan.priorityOne.length} costo_mock=${p1Cost.toFixed(2)} EUR`,
    `P2 pianificate=${countStatus(plan, 2, "planned_mock")}/${plan.priorityTwo.length} costo_mock=${p2Cost.toFixed(2)} EUR`,
    `P1 saltate_budget=${countStatus(plan, 1, "skipped_budget") + countStatus(plan, 1, "hard_stop")}`,
    `P2 saltate_budget=${countStatus(plan, 2, "skipped_budget") + countStatus(plan, 2, "hard_stop")}`,
    `FULL_OFFICIAL escluse=${plan.skippedFullOfficial} TRIGGER escluse=${plan.skippedTrigger}`,
    `warning_budget=${plan.budgetAtStart.state === "priority_1_only" || plan.budgetAfterPreview.state === "priority_1_only"}`,
    `hard_stop=${hardStop}`,
    `warnings=${plan.warnings.length}`,
    `costi_mock_per_competizione=[${competitionCosts}]`,
    "run_reali=0 chiamate_esterne=0 scritture_supabase=0",
    "In caso di errore futuro, i dati precedenti resteranno intatti.",
  ].join(" | ");
}

/** Entry point safe: pianifica e simula soltanto; actor, token, fetch e writer non sono presenti. */
export async function runWeeklyApifyLightImport(options: WeeklyApifyPlanOptions = {}): Promise<WeeklyApifyImportResult> {
  const plan = createWeeklyApifyPlan({ ...options, mode: options.mode ?? "dry_run" });
  const result = await importApifyLastMatchday(plan);
  const summary = formatWeeklyApifyImportPlan(plan);
  console.info(summary);
  return { ...result, summary };
}
