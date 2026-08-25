import Link from "next/link";
import { AdminHistoricalEchoMatchPreview } from "@/components/admin/AdminHistoricalEchoMatchPreview";
import { AdminHistoricalEchoReviewPanel } from "@/components/admin/AdminHistoricalEchoReviewPanel";
import { getAdminHistoricalEchoDetail } from "@/lib/historicalEcho/getAdminHistoricalEchoDetail";

type Params = { echoId: string };

export default async function AdminHistoricalEchoDetailPage({ params }: { params: Params | Promise<Params> }) {
  const { echoId } = await Promise.resolve(params);
  const detail = await getAdminHistoricalEchoDetail(echoId);
  if (!detail) return <main className="admin-page"><h2>Historical Echo non trovato</h2><Link href="/admin/historical-echo">Torna all’elenco</Link></main>;
  const echo = detail.echo;
  return <main className="admin-page"><header><h2>{echo.title}</h2><p>{echo.summary}</p><Link href="/admin/historical-echo">Torna all’elenco</Link></header><div className="admin-section-grid"><AdminHistoricalEchoReviewPanel echo={echo} /><section className="admin-section-card"><h2>Trigger e collegamento</h2><dl className="admin-metadata"><dt>Trigger</dt><dd>{echo.trigger.label}</dd><dt>Tipo</dt><dd>{echo.trigger.type}</dd><dt>Forza</dt><dd>{echo.trigger.strength}</dd><dt>Story Library</dt><dd>{echo.relatedStory.title}</dd><dt>Visibilità</dt><dd>{echo.visibility}</dd></dl><h3>Spunto, non articolo</h3><p>{echo.editorialSuggestion.angle}</p></section><section className="admin-section-card"><h2>Fonti mock</h2>{echo.sources.length ? <ul>{echo.sources.map((source) => <li key={source.id}>{source.label} · {source.verified ? "verificata" : "da verificare"}</li>)}</ul> : <p>Nessuna fonte sufficiente.</p>}</section></div><AdminHistoricalEchoMatchPreview matches={echo.relatedMatches} /></main>;
}
