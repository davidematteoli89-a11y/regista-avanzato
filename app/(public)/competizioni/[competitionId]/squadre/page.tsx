import Link from "next/link";
import { LoginRequiredBlock } from "@/components/public/LoginRequiredBlock";
import { TeamCard } from "@/components/public/TeamCard";
import { getCurrentUser } from "@/lib/auth/access";
import { getPublicStatsAccess } from "@/lib/publicData/accessRules";
import { getPublicCompetitionDetail } from "@/lib/publicData/getPublicCompetitionDetail";
import { getPublicTeams } from "@/lib/publicData/getPublicTeams";
type Params = { competitionId: string };
export default async function TeamsPage({ params }: { params: Params | Promise<Params> }) { const { competitionId } = await Promise.resolve(params); const [detail, data, user] = await Promise.all([getPublicCompetitionDetail(competitionId), getPublicTeams(competitionId), getCurrentUser()]); const access = getPublicStatsAccess(user); const visible = access.canViewFullStats ? data.items : data.items.slice(0, 3); return <main className="stack"><header><span className="eyebrow">Squadre</span><h1>{detail?.competition.name ?? "Competizione"}</h1><p>Anteprima pubblica delle squadre coperte.</p><Link href={`/competizioni/${competitionId}`}>Torna alla competizione</Link></header><div className="public-stats-grid">{visible.map((team) => <TeamCard key={team.id} team={team} />)}</div>{!access.canViewFullStats && <LoginRequiredBlock />}{data.items.length === 0 && <p className="notice">{data.meta.warning}</p>}</main>; }
