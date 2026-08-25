import { DataConfidenceBadge } from "@/components/public/DataConfidenceBadge";
import { PlayerProfileStats } from "@/components/public/PlayerProfileStats";
import { SubstackCTA } from "@/components/public/SubstackCTA";
import { getCurrentUser } from "@/lib/auth/access";
import { getPublicStatsAccess } from "@/lib/publicData/accessRules";
import { getPublicPlayerProfile } from "@/lib/publicData/getPublicPlayerProfile";
type Params = { playerId: string };
export default async function PlayerPage({ params }: { params: Params | Promise<Params> }) { const { playerId } = await Promise.resolve(params); const user = await getCurrentUser(); const access = getPublicStatsAccess(user); const profile = await getPublicPlayerProfile(playerId, access.canViewFullStats); if (!profile) return <main><h1>Giocatore non trovato</h1><p>Profilo non disponibile nel dataset dimostrativo.</p></main>; return <main className="stack"><header><DataConfidenceBadge meta={profile.player.meta} /><h1>{profile.player.name}</h1><p>{profile.player.position} · {profile.player.nationality}{profile.team ? ` · ${profile.team.name}` : ""}</p></header><PlayerProfileStats profile={profile} /><SubstackCTA label="Leggi su Substack" /></main>; }
