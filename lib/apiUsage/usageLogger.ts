/** Input compatibile con la futura tabella `api_usage_logs`. */
export type ApiUsageLogInput = {
  providerId: string;
  endpoint: string;
  requestCount: number;
  date?: string;
  competitionId?: string | null;
  scriptName?: string | null;
  responseStatus?: number | null;
  estimatedCostEur?: number | null;
  notes?: string | null;
};

export type ApiUsageLogResult = {
  persisted: boolean;
  logId: string | null;
  occurredOn: string;
  message: string;
  persistenceError: string | null;
};

/**
 * Adapter minimo da implementare più avanti con un client Supabase server-side.
 * Questo modulo non importa né inizializza Supabase.
 */
export type ApiUsageLogWriter = {
  insertApiUsageLog: (
    input: Required<Pick<ApiUsageLogInput, "date">> & ApiUsageLogInput,
  ) => Promise<{ id?: string | null }>;
};

function todayUtc(): string {
  return new Date().toISOString().slice(0, 10);
}

function readableMessage(input: ApiUsageLogInput, occurredOn: string): string {
  return [
    "[api-usage]",
    `date=${occurredOn}`,
    `provider=${input.providerId}`,
    `endpoint=${input.endpoint}`,
    `requests=${input.requestCount}`,
    `script=${input.scriptName ?? "not-set"}`,
    `competition=${input.competitionId ?? "not-set"}`,
  ].join(" ");
}

/**
 * Registra una chiamata già avvenuta. Senza writer produce solo un log locale
 * leggibile e restituisce `persisted: false`; non effettua chiamate esterne.
 */
export async function logApiUsage(
  input: ApiUsageLogInput,
  writer?: ApiUsageLogWriter,
): Promise<ApiUsageLogResult> {
  const occurredOn = input.date ?? todayUtc();
  const message = readableMessage(input, occurredOn);

  if (!Number.isInteger(input.requestCount) || input.requestCount < 0) {
    const persistenceError = "requestCount deve essere un intero non negativo";
    console.warn(`${message} persistence=skipped reason=${persistenceError}`);
    return { persisted: false, logId: null, occurredOn, message, persistenceError };
  }

  if (!writer) {
    console.info(`${message} persistence=disabled`);
    return { persisted: false, logId: null, occurredOn, message, persistenceError: null };
  }

  try {
    const result = await writer.insertApiUsageLog({ ...input, date: occurredOn });
    console.info(`${message} persistence=ok`);
    return {
      persisted: true,
      logId: result.id ?? null,
      occurredOn,
      message,
      persistenceError: null,
    };
  } catch (error) {
    const persistenceError = error instanceof Error ? error.message : "Errore di persistenza sconosciuto";
    console.error(`${message} persistence=failed reason=${persistenceError}`);
    return { persisted: false, logId: null, occurredOn, message, persistenceError };
  }
}
