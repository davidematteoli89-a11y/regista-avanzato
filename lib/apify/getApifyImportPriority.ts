import type { ApifyBudgetStatus } from "./checkApifyMonthlyBudget";

export type ApifyImportPriority =
  | "run_priority_1"
  | "run_priority_2"
  | "skip_due_to_budget"
  | "hard_stop";

export type ApifyImportPriorityDecision = {
  decision: ApifyImportPriority;
  shouldRun: boolean;
  requestedPriority: 1 | 2;
  estimatedRunCostEur: number;
  projectedSpendEur: number;
  latestRoundOnly: true;
  reason: string;
};

export type ApifyImportPriorityInput = {
  budget: ApifyBudgetStatus;
  requestedPriority: 1 | 2;
  estimatedRunCostEur?: number;
};

/** Decide una singola run proposta; non esegue actor né scrive sul database. */
export function getApifyImportPriority(
  input: ApifyImportPriorityInput,
): ApifyImportPriorityDecision {
  const estimatedRunCostEur =
    Number.isFinite(input.estimatedRunCostEur) && (input.estimatedRunCostEur ?? 0) >= 0
      ? (input.estimatedRunCostEur ?? 0)
      : 0;
  const projectedSpendEur = input.budget.estimatedSpendEur + estimatedRunCostEur;
  const base = {
    requestedPriority: input.requestedPriority,
    estimatedRunCostEur,
    projectedSpendEur,
    latestRoundOnly: true as const,
  };

  if (input.budget.state === "hard_stop") {
    return {
      ...base,
      decision: "hard_stop",
      shouldRun: false,
      reason: "Spesa stimata già al livello di hard stop.",
    };
  }

  if (!input.budget.configurationValid) {
    return {
      ...base,
      decision: "skip_due_to_budget",
      shouldRun: false,
      reason: "Configurazione budget non valida: run bloccata in modalità safe.",
    };
  }

  if (projectedSpendEur > input.budget.hardStopEur) {
    return {
      ...base,
      decision: "skip_due_to_budget",
      shouldRun: false,
      reason: "Il costo stimato della run supererebbe l'hard stop mensile.",
    };
  }

  if (input.requestedPriority === 1 && input.budget.canRunPriorityOne) {
    return {
      ...base,
      decision: "run_priority_1",
      shouldRun: true,
      reason: "Run P1 essenziale consentita dal budget corrente.",
    };
  }

  if (input.requestedPriority === 2 && input.budget.canRunPriorityTwo) {
    return {
      ...base,
      decision: "run_priority_2",
      shouldRun: true,
      reason: "Run P2 consentita sotto warning e dopo la valutazione delle P1.",
    };
  }

  return {
    ...base,
    decision: "skip_due_to_budget",
    shouldRun: false,
    reason: "Priorità richiesta non consentita dalla fascia budget corrente.",
  };
}
