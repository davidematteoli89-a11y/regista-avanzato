import type { PublicTalent } from "@/lib/publicWebsite/publicWebsiteTypes";
import { EmptyPublicState } from "./EmptyPublicState";
import { TalentCard } from "./TalentCard";

export function TalentGrid({ talents }: { talents: readonly PublicTalent[] }) {
  return talents.length ? <div className="talent-grid">{talents.map((talent) => <TalentCard key={talent.id} talent={talent} />)}</div> : <EmptyPublicState title="Nessun talento approvato" />;
}
