import Link from "next/link";
import { NewsEditorialNotice } from "@/components/public/NewsEditorialNotice";
import { NewsGrid } from "@/components/public/NewsGrid";
import { NewsletterCTA } from "@/components/public/NewsletterCTA";
import { getPublicNews } from "@/lib/newsRadar/getPublicNews";

export const dynamic = "force-dynamic";

export default async function Page() { const data = await getPublicNews(); return <main className="stack"><header><span className="eyebrow">News</span><h1>Segnali verificati, linguaggio prudente</h1><p>Notizie e spunti calcistici entrano nel magazine soltanto dopo classificazione delle fonti e revisione editoriale.</p><Link href="/news/radar">Apri il News Radar pubblico</Link></header><NewsEditorialNotice /><NewsGrid items={data.items} /><NewsletterCTA /><p className="notice">{data.message} La lettura non consuma ricerche avanzate.</p></main>; }
