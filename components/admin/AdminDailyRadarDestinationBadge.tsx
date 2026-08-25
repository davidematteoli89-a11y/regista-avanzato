import type { DailyRadarDestination } from "@/lib/dailyRadar/dailyRadarTypes";
export function AdminDailyRadarDestinationBadge({ destination }: { destination: DailyRadarDestination }) { return <span className="admin-status daily-destination-badge">{destination.replace(/_/g, " ")}</span>; }
