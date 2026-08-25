import Link from "next/link";
import { HistoricalEchoBadge } from "@/components/public/HistoricalEchoBadge";
import { HistoricalEchoComparison } from "@/components/public/HistoricalEchoComparison";
import { HistoricalEchoConfidenceBadge } from "@/components/public/HistoricalEchoConfidenceBadge";
import { HistoricalEchoCTA } from "@/components/public/HistoricalEchoCTA";
import { HistoricalEchoTimeline } from "@/components/public/HistoricalEchoTimeline";
import { getPublicHistoricalEchoDetail } from "@/lib/historicalEcho/getPublicHistoricalEchoDetail";

type Params = { echoId: string };

export default async function HistoricalEchoDetailPage({ params }: { params: Params | Promise<Params> }) {
  const { echoId } = await Promise.resolve(params);
  const detail = await getPublicHistoricalEchoDetail(echoId);
  if (!detail) return <main><h1>Historical Echo non disponibile</h1><p>Il collegamento non esiste oppure non è approvato per il pubblico.</p><Link href="/il-calcio-si-ripete">Torna agli echo</Link></main>;
  const echo = detail.echo;
  return <main className="stack"><header><div className="stats-badge-row"><HistoricalEchoBadge type={echo.type} /><HistoricalEchoConfidenceBadge confidence={echo.confidence} label={echo.confidenceLabel} /></div><h1>{echo.title}</h1><p>{echo.summary}</p><Link href="/il-calcio-si-ripete">Tutti gli Historical Echo</Link></header><section className="story-body"><h2>Perché questo collegamento</h2><p>{echo.publicReason}</p><p className="muted">È un confronto editoriale, non la prova che due eventi siano equivalenti.</p></section>{detail.isPreview && <p className="notice">Questa versione mostra soltanto l’anteprima approvata.</p>}<HistoricalEchoComparison points={echo.comparisonPoints} matches={echo.relatedMatches} /><section><h2>Dal presente alla memoria</h2><HistoricalEchoTimeline events={echo.timeline} /></section><HistoricalEchoCTA story={echo.relatedStory} /></main>;
}
