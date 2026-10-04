import Link from "next/link";
import { AdminEditorialContentTable } from "@/components/admin/AdminEditorialContentTable";
import { AdminNewsRadarTable } from "@/components/admin/AdminNewsRadarTable";
import { AdminWarningBox } from "@/components/admin/AdminWarningBox";
import { getAdminNewsItems } from "@/lib/admin/getAdminEditorialContent";
import { getAdminNewsRadar } from "@/lib/newsRadar/getAdminNewsRadar";
export default async function AdminNewsRadarPage() { const [items, supabaseNews] = await Promise.all([getAdminNewsRadar(), getAdminNewsItems()]); return <main className="admin-page"><header><h2>News Radar</h2><p>News manuali da Supabase staging e queue mock completa con candidati, review, score, priorità e fonti.</p><nav className="section-nav"><Link href="/admin/news-radar/sources">Fonti mock</Link><Link href="/admin/news-radar/rules">Regole editoriali</Link></nav></header><AdminEditorialContentTable result={supabaseNews} /><section className="admin-section-card"><h2>Queue mock/dry-run</h2><p className="muted">Questa lista non chiama fonti esterne e non pubblica nulla.</p><AdminNewsRadarTable items={items} /></section><AdminWarningBox warning={{ id: "rumor", level: "critical", title: "Rumor mai automatici", message: "Rumor, social e controversie restano privati finché fonti e review non sono sufficienti." }} /></main>; }
