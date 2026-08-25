export type DailyBudgetState =
  | "allowed"
  | "daily_limit_reached"
  | "monthly_limit_reached"
  | "safe_mock";

export type DailyBudgetStatus = {
  state: DailyBudgetState;
  canStart: boolean;
  mode: "stable_provider" | "safe_mock";
  budgetConfigured: boolean;
  dailyRequestsUsed: number;
  dailyBudgetRequests: number | null;
  dailyRequestsRemaining: number | null;
  monthlyRequestsUsed: number;
  monthlyBudgetRequests: number | null;
  monthlyRequestsRemaining: number | null;
  reason: string;
  checkedAt: string;
};

export type DailyBudgetCheckInput = {
  dailyRequestsUsed: number;
  monthlyRequestsUsed: number;
  dailyBudgetRequests?: number | string | null;
  monthlyBudgetRequests?: number | string | null;
};

function parsePositiveBudget(value: number | string | null | undefined): number | null {
  if (value === null || value === undefined || value === "") return null;
  const parsed = typeof value === "number" ? value : Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? Math.floor(parsed) : null;
}

function safeUsage(value: number): number {
  return Number.isFinite(value) && value >= 0 ? Math.floor(value) : 0;
}

/**
 * Controllo puro: non legge il database e non chiama provider.
 * Passare i budget letti dalla configurazione server-side o usare l'helper env.
 */
export function checkDailyBudget(input: DailyBudgetCheckInput): DailyBudgetStatus {
  const dailyBudgetRequests = parsePositiveBudget(input.dailyBudgetRequests);
  const monthlyBudgetRequests = parsePositiveBudget(input.monthlyBudgetRequests);
  const dailyRequestsUsed = safeUsage(input.dailyRequestsUsed);
  const monthlyRequestsUsed = safeUsage(input.monthlyRequestsUsed);
  const checkedAt = new Date().toISOString();

  if (dailyBudgetRequests === null || monthlyBudgetRequests === null) {
    return {
      state: "safe_mock",
      canStart: false,
      mode: "safe_mock",
      budgetConfigured: false,
      dailyRequestsUsed,
      dailyBudgetRequests,
      dailyRequestsRemaining: null,
      monthlyRequestsUsed,
      monthlyBudgetRequests,
      monthlyRequestsRemaining: null,
      reason: "Budget provider stabile non configurato: usare mock e non avviare chiamate reali.",
      checkedAt,
    };
  }

  const dailyRequestsRemaining = Math.max(0, dailyBudgetRequests - dailyRequestsUsed);
  const monthlyRequestsRemaining = Math.max(0, monthlyBudgetRequests - monthlyRequestsUsed);

  if (monthlyRequestsUsed >= monthlyBudgetRequests) {
    return {
      state: "monthly_limit_reached",
      canStart: false,
      mode: "stable_provider",
      budgetConfigured: true,
      dailyRequestsUsed,
      dailyBudgetRequests,
      dailyRequestsRemaining,
      monthlyRequestsUsed,
      monthlyBudgetRequests,
      monthlyRequestsRemaining,
      reason: "Budget mensile del provider stabile esaurito.",
      checkedAt,
    };
  }

  if (dailyRequestsUsed >= dailyBudgetRequests) {
    return {
      state: "daily_limit_reached",
      canStart: false,
      mode: "stable_provider",
      budgetConfigured: true,
      dailyRequestsUsed,
      dailyBudgetRequests,
      dailyRequestsRemaining,
      monthlyRequestsUsed,
      monthlyBudgetRequests,
      monthlyRequestsRemaining,
      reason: "Budget giornaliero del provider stabile esaurito.",
      checkedAt,
    };
  }

  return {
    state: "allowed",
    canStart: true,
    mode: "stable_provider",
    budgetConfigured: true,
    dailyRequestsUsed,
    dailyBudgetRequests,
    dailyRequestsRemaining,
    monthlyRequestsUsed,
    monthlyBudgetRequests,
    monthlyRequestsRemaining,
    reason: "Budget disponibile per uno script FULL_OFFICIAL programmato.",
    checkedAt,
  };
}

/** Legge solo variabili server-side; valori assenti attivano la modalità safe/mock. */
export function checkDailyBudgetFromEnv(
  usage: Pick<DailyBudgetCheckInput, "dailyRequestsUsed" | "monthlyRequestsUsed">,
): DailyBudgetStatus {
  return checkDailyBudget({
    ...usage,
    dailyBudgetRequests: process.env.STABLE_PROVIDER_DAILY_BUDGET_REQUESTS,
    monthlyBudgetRequests: process.env.STABLE_PROVIDER_MONTHLY_BUDGET_REQUESTS,
  });
}
