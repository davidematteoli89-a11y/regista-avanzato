import type { HistoricalEcho } from "@/lib/historicalEcho/historicalEchoTypes";

export function HistoricalEchoTimeline({ events }: { events: HistoricalEcho["timeline"] }) {
  return events.length ? <ol className="story-timeline">{events.map((event) => <li key={event.id}><time>{event.dateLabel}</time><h3>{event.title}</h3><p>{event.description}</p></li>)}</ol> : <p className="muted">Timeline non disponibile in questa anteprima.</p>;
}
