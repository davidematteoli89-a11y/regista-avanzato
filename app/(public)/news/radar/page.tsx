import Link from "next/link";
import { NewsEditorialNotice } from "@/components/public/NewsEditorialNotice";
import { NewsRadarPreview } from "@/components/public/NewsRadarPreview";
import { getPublicNews } from "@/lib/newsRadar/getPublicNews";

export default async function PublicNewsRadarPage() { const data = await getPublicNews(); return <main className="stack"><header><span className="eyebrow">News Radar</span><h1>Temi da seguire, non verità automatiche</h1><p>Una vista pubblica dei soli segnali approvati, senza score, priorità, costi o log tecnici.</p><Link href="/news">Tutte le news</Link></header><NewsRadarPreview items={data.items} /><NewsEditorialNotice /><p className="notice">Rumor, social, candidati e contenuti pending restano privati nell’admin.</p></main>; }
