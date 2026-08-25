import type { AdminWarning } from "@/lib/admin/adminTypes";
export function AdminWarningBox({ warning }: { warning: AdminWarning }) { return <aside className={`admin-warning ${warning.level}`}><strong>{warning.title}</strong><p>{warning.message}</p></aside>; }
