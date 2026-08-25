import type { CompetitionConfig, TrackingLevel } from "@/config/competitions";
import type { ApifyBudgetStatus } from "./checkApifyMonthlyBudget";
import type { ApifyImportPriorityDecision } from "./getApifyImportPriority";

export type WeeklyApifyImportMode = "dry_run" | "mock" | "real_disabled";
export type WeeklyApifyImportScope = "latest_round";
export type WeeklyApifyPlanStatus = "planned_mock" | "skipped_budget" | "skipped_guard" | "hard_stop";

export type ApifyEstimatedCost = {
  competitionId: string;
  priority: 1 | 2;
  estimatedItems: number;
  baseCostEur: number;
  variableCostEur: number;
  totalEstimatedCostEur: number;
  confidence: "mock_only";
  disclaimer: string;
};

export type ApifyImportGuardResult = {
  canPlan: boolean;
  canStartRun: boolean;
  canWriteSupabase: false;
  preservesPreviousData: true;
  errors: string[];
  warnings: string[];
};

export type ApifyLastMatchdayInput = {
  competition: CompetitionConfig;
  season: string;
  mode?: WeeklyApifyImportMode;
  scope?: WeeklyApifyImportScope;
};

export type ApifyLastMatchdayResult = {
  competitionId: string;
  scope: WeeklyApifyImportScope;
  status: "prepared_mock" | "skipped";
  actorTargetKey: string | null;
  sourceUrls: string[];
  fetchedItems: 0;
  mappedRecords: 0;
  writtenRecords: 0;
  externalCalls: 0;
  previousDataPreserved: true;
  warnings: string[];
};

export type WeeklyApifyCompetitionPlan = {
  competitionId: string;
  competitionName: string;
  trackingLevel: TrackingLevel;
  priority: 1 | 2;
  scope: WeeklyApifyImportScope;
  status: WeeklyApifyPlanStatus;
  estimatedCost: ApifyEstimatedCost;
  budgetDecision: ApifyImportPriorityDecision;
  guard: ApifyImportGuardResult;
  actorTargetKey: string | null;
  willStartRun: false;
  willWriteSupabase: false;
};

export type WeeklyApifyImportPlan = {
  mode: WeeklyApifyImportMode;
  scope: WeeklyApifyImportScope;
  createdAt: string;
  budgetAtStart: ApifyBudgetStatus;
  budgetAfterPreview: ApifyBudgetStatus;
  estimatedSpendBeforeEur: number;
  projectedSpendAfterEur: number;
  estimatedRemainingEur: number;
  priorityOne: WeeklyApifyCompetitionPlan[];
  priorityTwo: WeeklyApifyCompetitionPlan[];
  skippedFullOfficial: number;
  skippedTrigger: number;
  realRunsEnabled: false;
  supabaseWritesEnabled: false;
  warnings: string[];
};

export type WeeklyApifyImportResult = {
  mode: WeeklyApifyImportMode;
  plan: WeeklyApifyImportPlan;
  lastMatchdayResults: ApifyLastMatchdayResult[];
  startedRuns: 0;
  externalCalls: 0;
  mappedRecords: 0;
  writtenRecords: 0;
  writtenToSupabase: false;
  previousDataPreserved: true;
  warnings: string[];
  summary: string;
};

export type ApifyStandingUpsertPreview = {
  competition_id: string | null;
  team_id: string | null;
  source_provider_id: string | null;
  season: string;
  stage: string;
  matchday: number;
  rank: number;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goals_for: number;
  goals_against: number;
  goal_difference: number;
  points: number;
};

export type ApifyTeamMatchStatsUpsertPreview = {
  match_id: string | null;
  team_id: string | null;
  source_provider_id: string | null;
  possession_pct: number | null;
  shots: number | null;
  shots_on_target: number | null;
  corners: number | null;
  fouls: number | null;
  expected_goals: number | null;
  extra_stats: Record<string, unknown>;
  data_confidence: "medium_low";
};

export type ApifyContentCandidateUpsertPreview = {
  competition_id: string | null;
  match_id: string | null;
  candidate_type: string;
  title: string;
  rationale: string;
  priority: number;
  source_payload: Record<string, unknown>;
  status: "review_needed";
  visibility: "private_admin";
};

export type ApifyToSupabaseMappingResult = {
  competitionId: string;
  scope: WeeklyApifyImportScope;
  matchPayloads: Record<string, unknown>[];
  eventPayloads: Record<string, unknown>[];
  standingPayloads: ApifyStandingUpsertPreview[];
  teamMatchStatsPayloads: ApifyTeamMatchStatsUpsertPreview[];
  contentCandidatePayloads: ApifyContentCandidateUpsertPreview[];
  skippedRecords: number;
  errors: string[];
  warnings: string[];
  writtenToSupabase: false;
};

export type ApifyBudgetUpdatePreview = {
  currentEstimatedSpendEur: number;
  plannedEstimatedCostEur: number;
  projectedEstimatedSpendEur: number;
  projectedRemainingEur: number;
  projectedState: ApifyBudgetStatus["state"];
  persisted: false;
  reserved: false;
  requiresAtomicUpdateBeforeRealRun: true;
  warning: string;
};
