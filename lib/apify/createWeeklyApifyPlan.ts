import {
  COMPETITIONS,
  getApifyPriorityOneCompetitions,
  getApifyPriorityTwoCompetitions,
  type CompetitionConfig,
} from "@/config/competitions";
import { buildSofaScoreActorInput } from "./buildSofaScoreActorInput";
import {
  checkApifyMonthlyBudget,
  DEFAULT_APIFY_HARD_STOP_EUR,
  DEFAULT_APIFY_MONTHLY_BUDGET_EUR,
  DEFAULT_APIFY_WARNING_BUDGET_EUR,
} from "./checkApifyMonthlyBudget";
import { estimateApifyRunCost } from "./estimateApifyRunCost";
import { getApifyImportPriority } from "./getApifyImportPriority";
import { getLastMatchdayUrls } from "./getLastMatchdayUrls";
import { guardApifyImport } from "./apifyImportGuards";
import type {
  WeeklyApifyCompetitionPlan,
  WeeklyApifyImportMode,
  WeeklyApifyImportPlan,
} from "./apifyImportTypes";

export type CreateWeeklyApifyPlanOptions = {
  mode?: WeeklyApifyImportMode;
  season?: string;
  estimatedSpendEur?: number;
  monthlyBudgetEur?: number;
  warningBudgetEur?: number;
  hardStopEur?: number;
  estimatedCostPerPriorityOneEur?: number;
  estimatedCostPerPriorityTwoEur?: number;
};

const money = (value: number | undefined, fallback: number): number =>
  typeof value === "number" && Number.isFinite(value) && value >= 0 ? value : fallback;

/** Pianifica P1 prima di P2. Non legge env, non chiama Apify e non persiste dati. */
export function createWeeklyApifyPlan(options: CreateWeeklyApifyPlanOptions = {}): WeeklyApifyImportPlan {
  const mode = options.mode ?? "dry_run";
  const season = options.season ?? "season-to-resolve";
  const estimatedSpendBeforeEur = money(options.estimatedSpendEur, 0);
  const monthlyBudgetEur = money(options.monthlyBudgetEur, DEFAULT_APIFY_MONTHLY_BUDGET_EUR);
  const warningBudgetEur = money(options.warningBudgetEur, DEFAULT_APIFY_WARNING_BUDGET_EUR);
  const hardStopEur = money(options.hardStopEur, DEFAULT_APIFY_HARD_STOP_EUR);
  let projectedSpendEur = estimatedSpendBeforeEur;
  const warnings = [
    "Piano dry-run: nessun actor, fetch, token, dataset o writer Supabase viene utilizzato.",
    "I costi sono stime mock e dovranno essere sostituiti con metriche reali prima dell'attivazione.",
  ];

  const planCompetition = (competition: CompetitionConfig): WeeklyApifyCompetitionPlan => {
    const budget = checkApifyMonthlyBudget({ estimatedSpendEur: projectedSpendEur, monthlyBudgetEur, warningBudgetEur, hardStopEur });
    const priority = competition.apify_priority === 1 ? 1 : 2;
    const estimatedCost = estimateApifyRunCost({
      competition,
      baseCostPriorityOneEur: options.estimatedCostPerPriorityOneEur,
      baseCostPriorityTwoEur: options.estimatedCostPerPriorityTwoEur,
      mockCostPerItemEur: options.estimatedCostPerPriorityOneEur !== undefined || options.estimatedCostPerPriorityTwoEur !== undefined ? 0 : undefined,
      estimatedItems: options.estimatedCostPerPriorityOneEur !== undefined || options.estimatedCostPerPriorityTwoEur !== undefined ? 0 : undefined,
    });
    const budgetDecision = getApifyImportPriority({ budget, requestedPriority: priority, estimatedRunCostEur: estimatedCost.totalEstimatedCostEur });
    const guard = guardApifyImport({ competition, budget, scope: "latest_round", executionSource: "scheduled_import" });
    const actorInput = buildSofaScoreActorInput(competition);
    const target = getLastMatchdayUrls({ competition, season, mode, scope: "latest_round" });
    const plannable = budgetDecision.shouldRun && guard.canPlan && actorInput.ok && target.ok;
    if (plannable) projectedSpendEur = Number(budgetDecision.projectedSpendEur.toFixed(2));
    const status = budgetDecision.decision === "hard_stop"
      ? "hard_stop"
      : !budgetDecision.shouldRun
        ? "skipped_budget"
        : !guard.canPlan || !actorInput.ok || !target.ok
          ? "skipped_guard"
          : "planned_mock";

    return {
      competitionId: competition.id,
      competitionName: competition.name,
      trackingLevel: competition.tracking_level,
      priority,
      scope: "latest_round",
      status,
      estimatedCost,
      budgetDecision,
      guard,
      actorTargetKey: target.actorTargetKey,
      willStartRun: false,
      willWriteSupabase: false,
    };
  };

  const priorityOne = getApifyPriorityOneCompetitions().map(planCompetition);
  const priorityTwo = getApifyPriorityTwoCompetitions().map(planCompetition);
  const budgetAtStart = checkApifyMonthlyBudget({ estimatedSpendEur: estimatedSpendBeforeEur, monthlyBudgetEur, warningBudgetEur, hardStopEur });
  const budgetAfterPreview = checkApifyMonthlyBudget({ estimatedSpendEur: projectedSpendEur, monthlyBudgetEur, warningBudgetEur, hardStopEur });

  return {
    mode,
    scope: "latest_round",
    createdAt: new Date().toISOString(),
    budgetAtStart,
    budgetAfterPreview,
    estimatedSpendBeforeEur,
    projectedSpendAfterEur: projectedSpendEur,
    estimatedRemainingEur: Math.max(0, monthlyBudgetEur - projectedSpendEur),
    priorityOne,
    priorityTwo,
    skippedFullOfficial: COMPETITIONS.filter((item) => item.tracking_level === "full_official").length,
    skippedTrigger: COMPETITIONS.filter((item) => item.tracking_level === "trigger").length,
    realRunsEnabled: false,
    supabaseWritesEnabled: false,
    warnings,
  };
}
