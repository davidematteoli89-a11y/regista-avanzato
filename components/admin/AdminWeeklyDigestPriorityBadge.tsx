import type { WeeklyDigestPriority } from "@/lib/weeklyDigest/weeklyDigestTypes";
export function AdminWeeklyDigestPriorityBadge({ priority }: { priority: WeeklyDigestPriority }) { return <span className={`admin-status daily-priority-${priority}`}>{priority}</span>; }
