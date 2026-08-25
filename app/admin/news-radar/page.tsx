import Link from "next/link";
import { AdminNewsRadarTable } from "@/components/admin/AdminNewsRadarTable";
import { AdminWarningBox } from "@/components/admin/AdminWarningBox";
import { getAdminNewsRadar } from "@/lib/newsRadar/getAdminNewsRadar";
export default async function AdminNewsRadarPage() { const items = await getAdminNewsRadar(); return <main className="admin-page"><header><h2>News Radar</h2><p>Queue mock completa con candidati, review, score, priorità e fonti.</p><nav className="section-nav"><Link href="/admin/news-radar/sources">Fonti mock</Link><Link href="/admin/news-radar/rules">Regole editoriali</Link></nav></header><AdminNewsRadarTable items={items} /><AdminWarningBox warning={{ id: "rumor", level: "critical", title: "Rumor mai automatici", message: "Rumor, social e controversie restano privati finché fonti e review non sono sufficienti." }} /></main>; }
