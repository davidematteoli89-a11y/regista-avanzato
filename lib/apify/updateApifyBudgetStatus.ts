import { checkApifyMonthlyBudget } from "./checkApifyMonthlyBudget";
import type { ApifyBudgetUpdatePreview, WeeklyApifyImportPlan } from "./apifyImportTypes";

/** Anteprima del futuro aggiornamento: non effettua reservation né update Supabase. */
export function updateApifyBudgetStatus(plan: WeeklyApifyImportPlan): ApifyBudgetUpdatePreview {
  const plannedEstimatedCostEur = Math.max(0, plan.projectedSpendAfterEur - plan.estimatedSpendBeforeEur);
  const projected = checkApifyMonthlyBudget({
    estimatedSpendEur: plan.projectedSpendAfterEur,
    monthlyBudgetEur: plan.budgetAtStart.monthlyBudgetEur,
    warningBudgetEur: plan.budgetAtStart.warningBudgetEur,
    hardStopEur: plan.budgetAtStart.hardStopEur,
  });
  return {
    currentEstimatedSpendEur: plan.estimatedSpendBeforeEur,
    plannedEstimatedCostEur,
    projectedEstimatedSpendEur: plan.projectedSpendAfterEur,
    projectedRemainingEur: projected.remainingBudgetEur,
    projectedState: projected.state,
    persisted: false,
    reserved: false,
    requiresAtomicUpdateBeforeRealRun: true,
    warning: "Preview soltanto: la futura reservation dovrà essere atomica prima di ogni run reale.",
  };
}
