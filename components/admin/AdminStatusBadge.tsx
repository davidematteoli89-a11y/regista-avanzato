import type { AdminStatus } from "@/lib/admin/adminTypes";
export function AdminStatusBadge({ status }: { status: AdminStatus }) { return <span className={`admin-status status-${status}`}>{status.replaceAll("_", " ")}</span>; }
