import type { PublicNewsRadarItem } from "@/lib/newsRadar/newsRadarTypes";
import { NewsGrid } from "./NewsGrid";

export function NewsRadarPreview({ items }: { items: readonly PublicNewsRadarItem[] }) {
  return <section className="stack"><header><span className="eyebrow">News Radar pubblico</span><h2>Segnali approvati da seguire</h2><p>La selezione mostra temi editoriali, non score, log o certezze.</p></header><NewsGrid items={items.slice(0, 4)} /></section>;
}
