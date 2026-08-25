import type { CompetitionConfig } from "@/config/competitions";
import type { ApifyEstimatedCost } from "./apifyImportTypes";

export type EstimateApifyRunCostInput = {
  competition: CompetitionConfig;
  estimatedItems?: number;
  baseCostPriorityOneEur?: number;
  baseCostPriorityTwoEur?: number;
  mockCostPerItemEur?: number;
};

const safeNonNegative = (value: number | undefined, fallback: number): number =>
  typeof value === "number" && Number.isFinite(value) && value >= 0 ? value : fallback;

/** Stima puramente mock: non interroga prezzi, actor, dataset o API Apify. */
export function estimateApifyRunCost(input: EstimateApifyRunCostInput): ApifyEstimatedCost {
  const priority = input.competition.apify_priority === 1 ? 1 : 2;
  const estimatedItems = Math.floor(safeNonNegative(input.estimatedItems, priority === 1 ? 12 : 8));
  const baseCostEur = priority === 1
    ? safeNonNegative(input.baseCostPriorityOneEur, 0.23)
    : safeNonNegative(input.baseCostPriorityTwoEur, 0.14);
  const variableCostEur = estimatedItems * safeNonNegative(input.mockCostPerItemEur, 0.01);
  return {
    competitionId: input.competition.id,
    priority,
    estimatedItems,
    baseCostEur,
    variableCostEur,
    totalEstimatedCostEur: Number((baseCostEur + variableCostEur).toFixed(2)),
    confidence: "mock_only",
    disclaimer: "Stima tecnica mock, non basata su prezzi o utilizzo Apify reali.",
  };
}
