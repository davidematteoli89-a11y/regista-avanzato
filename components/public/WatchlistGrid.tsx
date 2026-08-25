import type { VideoWatchlistItem } from "@/lib/videoRadar/videoRadarTypes";
import { WatchlistCard } from "./WatchlistCard";
export function WatchlistGrid({ items, preview = false }: { items: readonly VideoWatchlistItem[]; preview?: boolean }) { return items.length ? <div className="watchlist-grid">{items.map((item) => <WatchlistCard key={item.id} item={item} preview={preview} />)}</div> : <p className="notice">Nessun elemento approvato in watchlist.</p>; }
