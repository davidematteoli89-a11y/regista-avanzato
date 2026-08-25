import type { NewsRadarPriority } from "@/lib/newsRadar/newsRadarTypes";

export function AdminNewsPriorityBadge({ priority }: { priority: NewsRadarPriority }) {
  return <span className={`admin-status news-priority-${priority}`}>{priority}</span>;
}
