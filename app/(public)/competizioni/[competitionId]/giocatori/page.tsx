import Link from "next/link";
import { LoginRequiredBlock } from "@/components/public/LoginRequiredBlock";
import { PlayerCard } from "@/components/public/PlayerCard";
import { getCurrentUser } from "@/lib/auth/access";
import { getPublicStatsAccess } from "@/lib/publicData/accessRules";
import { getPublicCompetitionDetail } from "@/lib/publicData/getPublicCompetitionDetail";
import { getPublicPlayers } from "@/lib/publicData/getPublicPlayers";
type Params = { competitionId: string };
export default async function PlayersPage({ params }: { params: Params | Promise<Params> }) { const { competitionId } = await Promise.resolve(params); const [detail, data, user] = await Promise.all([getPublicCompetitionDetail(competitionId), getPublicPlayers(competitionId), getCurrentUser()]); const access = getPublicStatsAccess(user); const visible = access.canViewFullStats ? data.items : data.items.slice(0, 3); return <main className="stack"><header><span className="eyebrow">Giocatori</span><h1>{detail?.competition.name ?? "Competizione"}</h1><p>Anteprima pubblica; profili e statistiche complete richiedono login free.</p><Link href={`/competizioni/${competitionId}`}>Torna alla competizione</Link></header><div className="public-stats-grid">{visible.map((player) => <PlayerCard key={player.id} player={player} />)}</div>{!access.canViewFullStats && <LoginRequiredBlock />}{data.items.length === 0 && <p className="notice">{data.meta.warning}</p>}</main>; }
