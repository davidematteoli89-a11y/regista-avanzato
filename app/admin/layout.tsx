import type { ReactNode } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { requireAdmin } from "@/lib/admin/requireAdmin";

export const dynamic = "force-dynamic";

export default async function AdminRootLayout({ children }: { children: ReactNode }) {
  const access = await requireAdmin();
  return <AdminLayout access={access}>{children}</AdminLayout>;
}
