import type {
  StatsImportMode,
  StatsImportOperationResult,
  StatsImportScope,
  StatsImportSummary,
  StatsImportWarning,
} from "./statsImportTypes";

export type FutureStatsImportLogWriter = {
  insertImportLog: (summary: StatsImportSummary) => Promise<{ id: string }>;
  insertProviderImportLog: (providerKey: string, records: number) => Promise<{ id: string }>;
};

export class StatsImportLogger {
  private readonly operations: StatsImportOperationResult<unknown>[] = [];
  private readonly requestWarnings: StatsImportWarning[] = [];
  private readonly seen = new Set<string>();
  private providerRequestLogs = 0;
  private fallbackCount = 0;

  constructor(readonly mode: StatsImportMode) {}

  record<T>(operation: StatsImportOperationResult<T>): StatsImportOperationResult<T> {
    const key = `${operation.scope}:${operation.deduplicationKey}`;
    if (operation.operation !== "skip" && this.seen.has(key)) {
      const skipped = { ...operation, operation: "skip" as const, payload: null, warnings: [...operation.warnings, { code: "DUPLICATE_STATS_IN_BATCH", message: `Duplicato stats saltato: ${operation.deduplicationKey}`, scope: operation.scope, entityKey: operation.entityKey }] };
      this.operations.push(skipped as StatsImportOperationResult<unknown>);
      return skipped;
    }
    if (operation.operation !== "skip") this.seen.add(key);
    this.operations.push(operation as StatsImportOperationResult<unknown>);
    return operation;
  }

  recordProviderRequest(fallbackUsed: boolean, warnings: StatsImportWarning[] = []): void {
    this.providerRequestLogs += 1;
    if (fallbackUsed) this.fallbackCount += 1;
    this.requestWarnings.push(...warnings);
  }

  getOperations<T>(scope: StatsImportScope): StatsImportOperationResult<T>[] {
    return this.operations.filter((item) => item.scope === scope) as StatsImportOperationResult<T>[];
  }

  summarize(competitionsChecked: number, nonFullCompetitionsSkipped: number): StatsImportSummary {
    const count = (scope: StatsImportScope) => this.operations.filter((item) => item.scope === scope && item.payload).length;
    const teamMatchPayloads = count("team_match"); const teamSeasonPayloads = count("team_season");
    const playerMatchPayloads = count("player_match"); const playerSeasonPayloads = count("player_season");
    return {
      mode: this.mode,
      competitionsChecked,
      nonFullCompetitionsSkipped,
      teamMatchPayloads,
      teamSeasonPayloads,
      playerMatchPayloads,
      playerSeasonPayloads,
      teamStatsPrepared: teamMatchPayloads + teamSeasonPayloads,
      playerStatsPrepared: playerMatchPayloads + playerSeasonPayloads,
      created: this.operations.filter((item) => item.operation === "create").length,
      updated: this.operations.filter((item) => item.operation === "update").length,
      skipped: this.operations.filter((item) => item.operation === "skip").length,
      providerRequestLogs: this.providerRequestLogs,
      fallbackCount: this.fallbackCount,
      warnings: [...this.requestWarnings, ...this.operations.flatMap((item) => item.warnings)],
      errors: this.operations.flatMap((item) => item.errors),
      wroteToSupabase: false,
      realProviderCalls: 0,
      apifyRuns: 0,
      publishedContent: 0,
    };
  }

  formatSummary(label: string, competitionsChecked: number, nonFullSkipped: number): string {
    const summary = this.summarize(competitionsChecked, nonFullSkipped);
    return `[${label}] mode=${summary.mode} full_competitions=${summary.competitionsChecked} team_stats=${summary.teamStatsPrepared} player_stats=${summary.playerStatsPrepared} skipped_non_full=${summary.nonFullCompetitionsSkipped} warnings=${summary.warnings.length} errors=${summary.errors.length} supabase_writes=0 real_calls=0 apify_runs=0`;
  }
}

export function createStatsImportLogger(mode: StatsImportMode = "dry_run"): StatsImportLogger {
  return new StatsImportLogger(mode);
}
