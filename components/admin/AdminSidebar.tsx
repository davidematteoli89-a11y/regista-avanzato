import Link from "next/link";
import { ADMIN_ROUTES } from "@/lib/admin/adminRoutes";
const GROUPS = ["overview", "data", "operations", "editorial", "system"] as const;
export function AdminSidebar() { return <aside className="admin-sidebar"><Link className="admin-brand" href="/admin">Regista Avanzato<br /><span>Admin mock</span></Link><nav aria-label="Navigazione amministrativa">{GROUPS.map((group) => <section key={group}><strong>{group}</strong>{ADMIN_ROUTES.filter((route) => route.group === group).map((route) => <Link key={route.href} href={route.href}>{route.label}</Link>)}</section>)}</nav></aside>; }
