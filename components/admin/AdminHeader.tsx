import type { AdminAccessState } from "@/lib/admin/adminTypes";
import { AdminStatusBadge } from "./AdminStatusBadge";
export function AdminHeader({ access }: { access: AdminAccessState }) { return <header className="admin-header"><div><span className="eyebrow">Area tecnica privata</span><h1>Admin Dashboard</h1></div><div><AdminStatusBadge status="mock" /><span className="muted">{access.accessMode}</span></div></header>; }
