import { CrazyMatchGrid } from "@/components/public/CrazyMatchGrid";
import { PublicCTA } from "@/components/public/PublicCTA";
import { getPublicCrazyMatches } from "@/lib/publicWebsite/getPublicCrazyMatches";

export default async function Page() { const data = await getPublicCrazyMatches(); return <main className="stack"><header><span className="eyebrow">Partite pazze</span><h1>Quando il risultato rompe il copione</h1><p>5–4, 4–4 e gare fuori scala entrano nel magazine soltanto dopo una revisione editoriale.</p></header><CrazyMatchGrid matches={data.items} /><p className="notice">{data.message}</p><PublicCTA type="story_library" title="Dal risultato alla memoria" description="Historical Echo collega i match moderni a storie già revisionate, senza trasformare somiglianze in certezze." href="/il-calcio-si-ripete" label="Esplora Historical Echo" /></main>; }
