import type { DailyRadarPriority } from "@/lib/dailyRadar/dailyRadarTypes";
export function AdminDailyRadarPriorityBadge({ priority }: { priority: DailyRadarPriority }) { return <span className={`admin-status daily-priority-${priority}`}>{priority}</span>; }
