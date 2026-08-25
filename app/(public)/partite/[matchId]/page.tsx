import { DataConfidenceBadge } from "@/components/public/DataConfidenceBadge";
import { HighlightLinkBox } from "@/components/public/HighlightLinkBox";
import { HighlightLinksPreviewBlock } from "@/components/public/HighlightLinksPreviewBlock";
import { LoginRequiredBlock } from "@/components/public/LoginRequiredBlock";
import { MatchStatsBox } from "@/components/public/MatchStatsBox";
import { SubstackCTA } from "@/components/public/SubstackCTA";
import { getCurrentUser } from "@/lib/auth/access";
import { getPublicStatsAccess } from "@/lib/publicData/accessRules";
import { getPublicMatchDetail } from "@/lib/publicData/getPublicMatchDetail";
type Params = { matchId: string };
export default async function MatchPage({ params }: { params: Params | Promise<Params> }) { const { matchId } = await Promise.resolve(params); const user = await getCurrentUser(); const access = getPublicStatsAccess(user); const detail = await getPublicMatchDetail(matchId, { includeFullStats: access.canViewFullStats, includeFullHighlights: access.canViewFullHighlights }); if (!detail) return <main><h1>Partita non trovata</h1><p>Dati non disponibili.</p></main>; const m = detail.match; return <main className="stack"><header><DataConfidenceBadge meta={m.meta} /><span className="eyebrow">{m.competitionName} · {m.round}</span><h1>{m.homeTeamName} {m.status === "finished" ? `${m.homeScore}–${m.awayScore}` : "vs"} {m.awayTeamName}</h1><p>{detail.baseSummary}</p></header><section><h2>Statistiche partita</h2>{detail.teamStats ? <MatchStatsBox stats={detail.teamStats} /> : <LoginRequiredBlock />}</section>{access.canViewFullHighlights ? <HighlightLinkBox links={detail.highlights ?? []} /> : <HighlightLinksPreviewBlock />}<SubstackCTA label="Leggi su Substack" /></main>; }
