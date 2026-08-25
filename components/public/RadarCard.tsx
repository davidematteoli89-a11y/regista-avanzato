import Link from "next/link";
import type { PublicRadarView } from "@/lib/publicWebsite/publicWebsiteTypes";

export function RadarCard({ item }: { item: PublicRadarView }) {
  return <article className="radar-card"><div className="stats-badge-row"><span className="editorial-badge">{item.type.replaceAll("_", " ")}</span><span className="radar-signal">{item.signalLabel}</span></div><h2>{item.title}</h2><p>{item.summary}</p><p className="muted">Segnale editoriale: non è presentato come certezza.</p>{item.relatedHref && <Link href={item.relatedHref}>Approfondisci</Link>}</article>;
}
