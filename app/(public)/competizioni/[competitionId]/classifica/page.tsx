import Link from "next/link";
import { StandingsTable } from "@/components/public/StandingsTable";
import { getPublicCompetitionDetail } from "@/lib/publicData/getPublicCompetitionDetail";
import { getPublicStandings } from "@/lib/publicData/getPublicStandings";
type Params = { competitionId: string };
export default async function StandingsPage({ params }: { params: Params | Promise<Params> }) { const { competitionId } = await Promise.resolve(params); const [detail, data] = await Promise.all([getPublicCompetitionDetail(competitionId), getPublicStandings(competitionId)]); return <main className="stack"><header><span className="eyebrow">Classifica base pubblica</span><h1>{detail?.competition.name ?? "Competizione"}</h1><p>Classifica dimostrativa accessibile senza consumare ricerche.</p><Link href={`/competizioni/${competitionId}`}>Torna alla competizione</Link></header><StandingsTable standings={data.items} /><p className="notice">{data.meta.warning}</p></main>; }
