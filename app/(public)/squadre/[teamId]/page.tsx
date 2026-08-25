import { DataConfidenceBadge } from "@/components/public/DataConfidenceBadge";
import { MatchList } from "@/components/public/MatchList";
import { TeamProfileStats } from "@/components/public/TeamProfileStats";
import { SubstackCTA } from "@/components/public/SubstackCTA";
import { getCurrentUser } from "@/lib/auth/access";
import { getPublicStatsAccess } from "@/lib/publicData/accessRules";
import { getPublicTeamProfile } from "@/lib/publicData/getPublicTeamProfile";
type Params = { teamId: string };
export default async function TeamPage({ params }: { params: Params | Promise<Params> }) { const { teamId } = await Promise.resolve(params); const user = await getCurrentUser(); const access = getPublicStatsAccess(user); const profile = await getPublicTeamProfile(teamId, access.canViewFullStats); if (!profile) return <main><h1>Squadra non trovata</h1><p>Profilo non disponibile nel dataset dimostrativo.</p></main>; return <main className="stack"><header><DataConfidenceBadge meta={profile.team.meta} /><h1>{profile.team.name}</h1><p>{profile.team.country} · {profile.team.shortName}</p></header><TeamProfileStats profile={profile} /><section><h2>Partite recenti</h2><MatchList matches={profile.recentMatches} /></section><SubstackCTA label="Leggi su Substack" /></main>; }
