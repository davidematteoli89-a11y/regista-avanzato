export type ApifyRunStatus =
  | "pending"
  | "running"
  | "succeeded"
  | "partial"
  | "failed"
  | "cancelled"
  | "skipped_budget";

/** Input compatibile con la futura tabella `apify_usage_logs`. */
export type ApifyRunLogInput = {
  providerId: string;
  actorId: string;
  runId: string;
  competitionId?: string | null;
  estimatedCostEur: number;
  computeUnits?: number | null;
  status: ApifyRunStatus;
  startedAt?: string | null;
  finishedAt?: string | null;
  itemsImported?: number;
  errors?: readonly string[];
  notes?: string | null;
};

export type ApifyRunLogResult = {
  persisted: boolean;
  logId: string | null;
  preservePreviousData: true;
  message: string;
  persistenceError: string | null;
};

export type ApifyRunLogWriter = {
  insertApifyRunLog: (input: ApifyRunLogInput) => Promise<{ id?: string | null }>;
};

function readableMessage(input: ApifyRunLogInput): string {
  return [
    "[apify-run]",
    `run=${input.runId}`,
    `actor=${input.actorId}`,
    `competition=${input.competitionId ?? "not-set"}`,
    `status=${input.status}`,
    `estimated_cost_eur=${input.estimatedCostEur.toFixed(4)}`,
    `items=${input.itemsImported ?? 0}`,
  ].join(" ");
}

/**
 * Registra l'esito senza modificare dati importati. In caso di fallimento il
 * chiamante deve mantenere l'ultimo snapshot valido già presente in Supabase.
 */
export async function logApifyRun(
  input: ApifyRunLogInput,
  writer?: ApifyRunLogWriter,
): Promise<ApifyRunLogResult> {
  const message = readableMessage(input);

  if (!writer) {
    console.info(`${message} persistence=disabled preserve_previous_data=true`);
    return {
      persisted: false,
      logId: null,
      preservePreviousData: true,
      message,
      persistenceError: null,
    };
  }

  try {
    const result = await writer.insertApifyRunLog(input);
    console.info(`${message} persistence=ok preserve_previous_data=true`);
    return {
      persisted: true,
      logId: result.id ?? null,
      preservePreviousData: true,
      message,
      persistenceError: null,
    };
  } catch (error) {
    const persistenceError = error instanceof Error ? error.message : "Errore di persistenza sconosciuto";
    console.error(`${message} persistence=failed preserve_previous_data=true reason=${persistenceError}`);
    return {
      persisted: false,
      logId: null,
      preservePreviousData: true,
      message,
      persistenceError,
    };
  }
}
