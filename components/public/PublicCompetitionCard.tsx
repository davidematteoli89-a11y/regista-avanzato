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
      <PublicDataBadge />
      <h2>{competition.name}</h2>
      <p>{formatCompetitionMeta(competition)}</p>
      <p>
        Classifiche e squadre pubblicate dopo revisione: questa scheda usa solo
        dati approvati per la consultazione esterna.
      </p>
      <Link href={`/competitions/${competition.slug}`}>Apri la competizione</Link>
    </article>
  );
}
