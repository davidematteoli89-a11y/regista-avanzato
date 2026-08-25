import type { PublicRadarView } from "@/lib/publicWebsite/publicWebsiteTypes";
import { EmptyPublicState } from "./EmptyPublicState";
import { RadarCard } from "./RadarCard";

export function RadarGrid({ items }: { items: readonly PublicRadarView[] }) {
  return items.length ? <div className="radar-grid">{items.map((item) => <RadarCard key={item.id} item={item} />)}</div> : <EmptyPublicState title="Nessun segnale pubblico" />;
}
