import type {
  ImportEntityType,
  ImportError,
  ImportMode,
  ImportOperationResult,
  ImportSummary,
  ImportWarning,
} from "./importTypes";

export type FutureImportLogWriter = {
  insertImportLog: (summary: ImportSummary) => Promise<{ id: string }>;
  insertProviderImportLog: (operation: ImportOperationResult<unknown>) => Promise<{ id: string }>;
};

export class ImportLogger {
  private readonly startedAt = new Date().toISOString();
  private readonly operations: ImportOperationResult<unknown>[] = [];
  private readonly seenKeys = new Set<string>();

  constructor(readonly mode: ImportMode) {}

  record<T>(operation: ImportOperationResult<T>): ImportOperationResult<T> {
    const isDataEntity = operation.entityType === "competition" || operation.entityType === "team";
    if (isDataEntity && operation.operation !== "skip" && this.seenKeys.has(`${operation.entityType}:${operation.deduplicationKey}`)) {
      const duplicate: ImportOperationResult<T> = {
        ...operation,
        operation: "skip",
        payload: null,
        warnings: [...operation.warnings, { code: "DUPLICATE_IN_BATCH", message: `Duplicato batch saltato: ${operation.deduplicationKey}`, entityType: operation.entityType, entityKey: operation.entityKey }],
      };
      this.operations.push(duplicate as ImportOperationResult<unknown>);
      return duplicate;
    }

    if (isDataEntity && operation.operation !== "skip") this.seenKeys.add(`${operation.entityType}:${operation.deduplicationKey}`);
    this.operations.push(operation as ImportOperationResult<unknown>);
    return operation;
  }

  recordProviderRequest(input: {
    entityKey: string;
    providerId: NonNullable<ImportOperationResult<unknown>["providerId"]>;
    fallbackUsed: boolean;
    warning?: ImportWarning;
    error?: ImportError;
  }): void {
    this.operations.push({
      entityType: "provider_request",
      entityKey: input.entityKey,
      operation: "skip",
      source: input.providerId,
      providerId: input.providerId,
      fallbackUsed: input.fallbackUsed,
      payload: null,
      deduplicationKey: `provider-request:${input.entityKey}:${input.providerId}`,
      warnings: input.warning ? [input.warning] : [],
      errors: input.error ? [input.error] : [],
    });
  }

  getOperations<T>(entityType: ImportEntityType): ImportOperationResult<T>[] {
    return this.operations.filter((item) => item.entityType === entityType) as ImportOperationResult<T>[];
  }

  summarize(): ImportSummary {
    const dataOperations = this.operations.filter((item) => item.entityType !== "provider_request");
    const warnings = this.operations.flatMap((item) => item.warnings);
    const errors = this.operations.flatMap((item) => item.errors);
    return {
      mode: this.mode,
      startedAt: this.startedAt,
      finishedAt: new Date().toISOString(),
      processed: dataOperations.length,
      created: dataOperations.filter((item) => item.operation === "create").length,
      updated: dataOperations.filter((item) => item.operation === "update").length,
      skipped: dataOperations.filter((item) => item.operation === "skip").length,
      competitionPayloads: dataOperations.filter((item) => item.entityType === "competition" && item.payload).length,
      teamPayloads: dataOperations.filter((item) => item.entityType === "team" && item.payload).length,
      providerRequestLogs: this.operations.filter((item) => item.entityType === "provider_request").length,
      fallbackCount: dataOperations.filter((item) => item.fallbackUsed).length,
      warnings,
      errors,
      wroteToSupabase: false,
      realProviderCalls: 0,
      apifyRuns: 0,
    };
  }

  formatSummary(label: string): string {
    const summary = this.summarize();
    return `[${label}] mode=${summary.mode} processed=${summary.processed} create=${summary.created} update=${summary.updated} skip=${summary.skipped} warnings=${summary.warnings.length} errors=${summary.errors.length} supabase_writes=0 real_provider_calls=0 apify_runs=0`;
  }
}

/** Il writer è solo un contratto futuro: questo step non espone alcun metodo di persistenza. */
export function createImportLogger(mode: ImportMode = "dry_run"): ImportLogger {
  return new ImportLogger(mode);
}
