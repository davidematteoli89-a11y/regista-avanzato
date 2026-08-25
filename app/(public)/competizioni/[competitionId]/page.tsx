import Link from "next/link";
import { CompetitionCoverageBadge } from "@/components/public/CompetitionCoverageBadge";
import { DataConfidenceBadge } from "@/components/public/DataConfidenceBadge";
import { MatchList } from "@/components/public/MatchList";
import { StandingsTable } from "@/components/public/StandingsTable";
import { StatsPreviewBlock } from "@/components/public/StatsPreviewBlock";
import { SubstackCTA } from "@/components/public/SubstackCTA";
import { getCurrentUser } from "@/lib/auth/access";
import { getPublicStatsAccess } from "@/lib/publicData/accessRules";
import { getPublicCompetitionDetail } from "@/lib/publicData/getPublicCompetitionDetail";
type Params = { competitionId: string };
export default async function CompetitionPage({ params }: { params: Params | Promise<Params> }) { const { competitionId } = await Promise.resolve(params); const [detail, user] = await Promise.all([getPublicCompetitionDetail(competitionId), getCurrentUser()]); if (!detail) return <main><h1>Competizione non trovata</h1><p>Dati non disponibili.</p></main>; const access = getPublicStatsAccess(user); const c = detail.competition; return <main className="stack"><header><div className="stats-badge-row"><CompetitionCoverageBadge trackingLevel={c.trackingLevel} /><DataConfidenceBadge meta={c.meta} /></div><h1>{c.name}</h1><p>{c.country} · {c.continent}</p><nav className="section-nav"><Link href={`/competizioni/${c.id}/classifica`}>Classifica</Link><Link href={`/competizioni/${c.id}/partite`}>Partite</Link><Link href={`/competizioni/${c.id}/squadre`}>Squadre</Link><Link href={`/competizioni/${c.id}/giocatori`}>Giocatori</Link></nav></header><section><h2>Classifica base</h2><StandingsTable standings={detail.standings.slice(0, 5)} /></section><section><h2>Risultati e calendario</h2><MatchList matches={detail.recentMatches.slice(0, 4)} /></section><StatsPreviewBlock fullAccess={access.canViewFullStats} title="Statistiche complete della competizione" /><SubstackCTA label="Leggi su Substack" /></main>; }
