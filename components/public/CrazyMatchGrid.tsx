import type { PublicCrazyMatch } from "@/lib/publicWebsite/publicWebsiteTypes";
import { CrazyMatchCard } from "./CrazyMatchCard";
import { EmptyPublicState } from "./EmptyPublicState";

export function CrazyMatchGrid({ matches }: { matches: readonly PublicCrazyMatch[] }) {
  return matches.length ? <div className="crazy-match-grid">{matches.map((match) => <CrazyMatchCard key={match.id} match={match} />)}</div> : <EmptyPublicState title="Nessuna partita pazza approvata" />;
}
