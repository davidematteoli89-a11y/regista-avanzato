import type { ReactNode } from "react";
import type { AdminAccessState } from "@/lib/admin/adminTypes";
import { AdminHeader } from "./AdminHeader";
import { AdminMockNotice } from "./AdminMockNotice";
import { AdminSidebar } from "./AdminSidebar";
export function AdminLayout({ access, children }: { access: AdminAccessState; children: ReactNode }) { return <div className="admin-shell"><AdminSidebar /><div className="admin-main"><AdminHeader access={access} /><AdminMockNotice /><aside className="admin-warning critical"><strong>Protezione non produttiva</strong><p>{access.warning}</p></aside>{children}</div></div>; }
