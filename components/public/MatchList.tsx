import type { PublicMatch } from "@/lib/publicData/publicDataTypes";
import { MatchCard } from "./MatchCard";
export function MatchList({ matches }: { matches: readonly PublicMatch[] }) { return matches.length ? <div className="match-list">{matches.map((match) => <MatchCard key={match.id} match={match} />)}</div> : <p className="notice">Calendario e risultati non disponibili nel dataset dimostrativo.</p>; }
