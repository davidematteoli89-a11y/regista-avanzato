import type { PublicHistoricalEcho } from "@/lib/historicalEcho/historicalEchoTypes";
import { HistoricalEchoCard } from "./HistoricalEchoCard";

export function HistoricalEchoGrid({ echoes }: { echoes: readonly PublicHistoricalEcho[] }) {
  return echoes.length ? <div className="historical-echo-grid">{echoes.map((echo) => <HistoricalEchoCard key={echo.id} echo={echo} />)}</div> : <p className="notice">Nessun collegamento storico approvato disponibile.</p>;
}
