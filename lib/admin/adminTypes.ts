import type { ProviderId } from "@/config/providers";
import type { TrackingLevel } from "@/config/competitions";

export type AdminStatus = "mock" | "active" | "inactive" | "dry_run" | "pending_review" | "approved" | "rejected" | "not_connected";
export type AdminAccessState = { isAdminMock: true; accessMode: "mock_admin"; allowed: true; realProtectionEnabled: false; warning: string };
export type AdminRoute = { href: string; label: string; group: "overview" | "data" | "operations" | "editorial" | "system" };
export type AdminStat = { id: string; label: string; value: string | number; status: AdminStatus; note: string };
export type AdminWarning = { id: string; level: "info" | "warning" | "critical"; title: string; message: string };
export type AdminOverview = { projectStatus: "mock_safe"; completedSteps: number; stats: AdminStat[]; warnings: AdminWarning[]; connectedToSupabase: false; realActionsEnabled: false };
export type AdminCompetition = { id: string; name: string; trackingLevel: TrackingLevel; provider: ProviderId; publicStats: boolean; apifyPriority: 1 | 2 | null; status: AdminStatus; note: string };
export type AdminProvider = { id: ProviderId; name: string; type: string; status: AdminStatus; priority: number; monthlyBudgetEur: number | null; note: string; realCalls: 0; tokenExposed: false };
export type AdminBudgetUsage = { label: string; currentEur: number; warningEur: number; hardStopEur: number; maximumEur: number; remainingEur: number; p1Planned: number; p2Planned: number; realRuns: 0; status: AdminStatus; warnings: string[] };
export type AdminApiUsage = { provider: string; dailyBudget: null; monthlyBudget: null; realRequests: 0; mockLogEntries: number; status: AdminStatus; note: string };
export type AdminImportLog = { id: string; label: string; scope: string; mode: "dry_run" | "mock"; status: AdminStatus; recordsPrepared: number; realCalls: 0; writes: 0; previousDataPreserved: true; note: string };
export type AdminContentQueueItem = { id: string; area: "content_radar" | "news_radar" | "video_radar" | "highlight_links" | "story_library" | "historical_echo" | "substack" | "generated_content"; title: string; status: "draft" | "pending_review" | "approved" | "rejected"; visibility: "private_admin"; note: string };
export type AdminUser = { id: string; displayName: string; role: "free_user" | "admin_mock"; advancedSearchesUsed: number; searchLimit: 3; paymentStatus: "not_applicable"; status: AdminStatus };
export type AdminTableColumn = { key: string; label: string };
export type AdminTableRow = Record<string, string | number | boolean | null>;
