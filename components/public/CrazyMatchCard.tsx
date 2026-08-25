import Link from "next/link";
import type { PublicCrazyMatch } from "@/lib/publicWebsite/publicWebsiteTypes";

export function CrazyMatchCard({ match }: { match: PublicCrazyMatch }) {
  return <article className="crazy-match-card"><span className="eyebrow">{match.competitionLabel}</span><div className="crazy-score"><span>{match.homeTeam}</span><strong>{match.homeScore}–{match.awayScore}</strong><span>{match.awayTeam}</span></div><p className="muted">{match.dateLabel}</p><p>{match.editorialSummary}</p><p className="echo-reason">{match.whyItMatters}</p>{match.historicalEchoHref && <Link href={match.historicalEchoHref}>Scopri il collegamento storico</Link>}</article>;
}
