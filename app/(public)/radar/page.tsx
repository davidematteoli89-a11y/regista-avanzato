import { LoginFreeCTA } from "@/components/public/LoginFreeCTA";
import { RadarGrid } from "@/components/public/RadarGrid";
import { getPublicRadar } from "@/lib/publicWebsite/getPublicRadar";

export default async function Page() { const data = await getPublicRadar(); return <main className="stack"><header><span className="eyebrow">Radar pubblico</span><h1>I segnali che meritano attenzione</h1><p>Talenti, partite, storie e connessioni selezionati come spunti editoriali, non come certezze.</p></header><RadarGrid items={data.items} /><p className="notice">{data.disclaimer} Score, warning, log e costi tecnici non sono pubblici.</p><LoginFreeCTA /></main>; }
