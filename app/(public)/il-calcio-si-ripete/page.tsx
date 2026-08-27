import { HistoricalEchoGrid } from "@/components/public/HistoricalEchoGrid";
import { StoryCopyrightNotice } from "@/components/public/StoryCopyrightNotice";
import { getPublicHistoricalEchoes } from "@/lib/historicalEcho/getPublicHistoricalEchoes";

export const dynamic = "force-dynamic";

export default async function HistoricalEchoPage() {
  const data = await getPublicHistoricalEchoes();
  return <main className="stack"><header><span className="eyebrow">Historical Echo</span><h1>Il calcio si ripete?</h1><p>Eventi moderni e storie del passato messi in relazione con prudenza editoriale, mostrando anche le differenze.</p></header><HistoricalEchoGrid echoes={data.items} /><StoryCopyrightNotice /><p className="notice">{data.message} La navigazione non consuma ricerche avanzate.</p></main>;
}
