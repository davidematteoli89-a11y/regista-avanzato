import type { ReactNode } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { getAdminAccess } from "@/lib/admin/adminAccess";
export default function AdminRootLayout({ children }: { children: ReactNode }) { return <AdminLayout access={getAdminAccess()}>{children}</AdminLayout>; }
