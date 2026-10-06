import Link from "next/link";
import type { PublicCompetition } from "@/lib/public-data/contracts";
import { PublicDataBadge } from "./PublicDataBadge";

type PublicCompetitionCardProps = {
  competition: PublicCompetition;
};

function formatCompetitionMeta(competition: PublicCompetition): string {
  return [competition.country, competition.season].filter(Boolean).join(" · ") || "Dettagli in aggiornamento";
}

export function PublicCompetitionCard({ competition }: PublicCompetitionCardProps) {
  return (
    <article className="public-stat-card">
      <PublicDataBadge>Campionato nel radar</PublicDataBadge>
      <h2>{competition.name}</h2>
      <p>{formatCompetitionMeta(competition)}</p>
      <p>
        Una scheda pubblica per leggere il campionato con contesto, squadre e
        classifica essenziale. In questa fase MVP i dati sono curati manualmente.
      </p>
      <Link href={`/competitions/${competition.slug}`}>Apri la scheda</Link>
    </article>
  );
}
