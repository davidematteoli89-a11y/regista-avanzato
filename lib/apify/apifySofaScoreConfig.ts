import { getProviderById } from "@/config/providers";
import {
  DEFAULT_APIFY_HARD_STOP_EUR,
  DEFAULT_APIFY_MONTHLY_BUDGET_EUR,
  DEFAULT_APIFY_WARNING_BUDGET_EUR,
} from "./checkApifyMonthlyBudget";
import type { ApifySofaScoreConfig } from "./apifySofaScoreTypes";

export type ApifySofaScoreRuntimeOptions = {
  actorId?: string | null;
  tokenConfigured?: boolean;
  mockMode?: boolean;
};

/** Non legge env o token: il futuro bootstrap server-side dovrà iniettare solo lo stato necessario. */
export function getApifySofaScoreConfig(options: ApifySofaScoreRuntimeOptions = {}): ApifySofaScoreConfig {
  const catalogProvider = getProviderById("apify_sofascore");
  const mockMode = options.mockMode ?? true;

  return {
    active: Boolean(catalogProvider?.active),
    mockMode,
    actorId: catalogProvider?.active ? options.actorId ?? null : null,
    tokenConfigured: mockMode ? false : options.tokenConfigured ?? false,
    monthlyBudgetEur: catalogProvider?.monthly_budget_eur ?? DEFAULT_APIFY_MONTHLY_BUDGET_EUR,
    warningBudgetEur: catalogProvider?.warning_budget_eur ?? DEFAULT_APIFY_WARNING_BUDGET_EUR,
    hardStopEur: catalogProvider?.hard_stop_budget_eur ?? DEFAULT_APIFY_HARD_STOP_EUR,
    latestRoundOnly: true,
    liveScrapingEnabled: false,
    videoDownloadEnabled: false,
  };
}

export const apifySofaScoreConfig = getApifySofaScoreConfig();
