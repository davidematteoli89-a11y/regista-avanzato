import type { WeeklyDigestDestination } from "@/lib/weeklyDigest/weeklyDigestTypes";
export function AdminWeeklyDigestDestinationBadge({ destination }: { destination: WeeklyDigestDestination }) { return <span className="admin-status weekly-destination-badge">{destination.replace(/_/g, " ")}</span>; }
