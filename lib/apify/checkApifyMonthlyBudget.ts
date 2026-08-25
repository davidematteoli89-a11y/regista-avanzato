export const DEFAULT_APIFY_MONTHLY_BUDGET_EUR = 30;
export const DEFAULT_APIFY_WARNING_BUDGET_EUR = 24;
export const DEFAULT_APIFY_HARD_STOP_EUR = 30;

export type ApifyBudgetState =
  | "available_for_p1_and_p2"
  | "priority_1_only"
  | "hard_stop"
  | "invalid_configuration";

export type ApifyBudgetStatus = {
  state: ApifyBudgetState;
  configurationValid: boolean;
  estimatedSpendEur: number;
  monthlyBudgetEur: number;
  warningBudgetEur: number;
  hardStopEur: number;
  remainingBudgetEur: number;
  canRunPriorityOne: boolean;
  canRunPriorityTwo: boolean;
  reason: string;
  checkedAt: string;
};

export type ApifyBudgetCheckInput = {
  estimatedSpendEur: number;
  monthlyBudgetEur?: number;
  warningBudgetEur?: number;
  hardStopEur?: number;
};

function safeMoney(value: number, fallback: number): number {
  return Number.isFinite(value) && value >= 0 ? value : fallback;
}

/** Controllo puro: non legge Supabase e non contatta Apify. */
export function checkApifyMonthlyBudget(input: ApifyBudgetCheckInput): ApifyBudgetStatus {
  const estimatedSpendEur = safeMoney(input.estimatedSpendEur, 0);
  const monthlyBudgetEur = safeMoney(input.monthlyBudgetEur ?? DEFAULT_APIFY_MONTHLY_BUDGET_EUR, -1);
  const warningBudgetEur = safeMoney(input.warningBudgetEur ?? DEFAULT_APIFY_WARNING_BUDGET_EUR, -1);
  const hardStopEur = safeMoney(input.hardStopEur ?? DEFAULT_APIFY_HARD_STOP_EUR, -1);
  const checkedAt = new Date().toISOString();
  const configurationValid =
    monthlyBudgetEur >= 0 &&
    warningBudgetEur >= 0 &&
    hardStopEur >= 0 &&
    warningBudgetEur <= hardStopEur &&
    hardStopEur <= monthlyBudgetEur;

  if (!configurationValid) {
    return {
      state: "invalid_configuration",
      configurationValid: false,
      estimatedSpendEur,
      monthlyBudgetEur,
      warningBudgetEur,
      hardStopEur,
      remainingBudgetEur: 0,
      canRunPriorityOne: false,
      canRunPriorityTwo: false,
      reason: "Soglie Apify non valide: blocco safe di tutte le run.",
      checkedAt,
    };
  }

  const remainingBudgetEur = Math.max(0, monthlyBudgetEur - estimatedSpendEur);

  if (estimatedSpendEur >= hardStopEur) {
    return {
      state: "hard_stop",
      configurationValid: true,
      estimatedSpendEur,
      monthlyBudgetEur,
      warningBudgetEur,
      hardStopEur,
      remainingBudgetEur,
      canRunPriorityOne: false,
      canRunPriorityTwo: false,
      reason: "Hard stop Apify raggiunto: nessuna nuova run consentita.",
      checkedAt,
    };
  }

  if (estimatedSpendEur >= warningBudgetEur) {
    return {
      state: "priority_1_only",
      configurationValid: true,
      estimatedSpendEur,
      monthlyBudgetEur,
      warningBudgetEur,
      hardStopEur,
      remainingBudgetEur,
      canRunPriorityOne: true,
      canRunPriorityTwo: false,
      reason: "Soglia warning raggiunta: consentite solo P1 essenziali che restano sotto hard stop.",
      checkedAt,
    };
  }

  return {
    state: "available_for_p1_and_p2",
    configurationValid: true,
    estimatedSpendEur,
    monthlyBudgetEur,
    warningBudgetEur,
    hardStopEur,
    remainingBudgetEur,
    canRunPriorityOne: true,
    canRunPriorityTwo: true,
    reason: "Budget sotto warning: eseguire P1 e valutare P2 solo dopo il costo delle P1.",
    checkedAt,
  };
}

function envMoney(value: string | undefined, fallback: number): number {
  if (value === undefined || value === "") return fallback;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : -1;
}

/** Usa default conservativi se le env sono assenti; env invalide bloccano le run. */
export function checkApifyMonthlyBudgetFromEnv(estimatedSpendEur: number): ApifyBudgetStatus {
  return checkApifyMonthlyBudget({
    estimatedSpendEur,
    monthlyBudgetEur: envMoney(process.env.APIFY_MONTHLY_BUDGET_EUR, DEFAULT_APIFY_MONTHLY_BUDGET_EUR),
    warningBudgetEur: envMoney(process.env.APIFY_WARNING_BUDGET_EUR, DEFAULT_APIFY_WARNING_BUDGET_EUR),
    hardStopEur: envMoney(process.env.APIFY_HARD_STOP_EUR, DEFAULT_APIFY_HARD_STOP_EUR),
  });
}
