import Link from "next/link";
import { MatchList } from "@/components/public/MatchList";
import { PublicStatFilters } from "@/components/public/PublicStatFilters";
import { getPublicCompetitionDetail } from "@/lib/publicData/getPublicCompetitionDetail";
import { getPublicMatches } from "@/lib/publicData/getPublicMatches";
type Params = { competitionId: string };
export default async function MatchesPage({ params }: { params: Params | Promise<Params> }) { const { competitionId } = await Promise.resolve(params); const [detail, data] = await Promise.all([getPublicCompetitionDetail(competitionId), getPublicMatches(competitionId)]); return <main className="stack"><header><span className="eyebrow">Risultati e calendario base</span><h1>{detail?.competition.name ?? "Competizione"}</h1><Link href={`/competizioni/${competitionId}`}>Torna alla competizione</Link></header><PublicStatFilters competitionId={competitionId} /><MatchList matches={data.items} /><p className="notice">{data.meta.warning}</p></main>; }
