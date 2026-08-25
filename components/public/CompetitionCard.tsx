import Link from "next/link";
import type { PublicCompetition } from "@/lib/publicData/publicDataTypes";
import { CompetitionCoverageBadge } from "./CompetitionCoverageBadge";
import { DataConfidenceBadge } from "./DataConfidenceBadge";
export function CompetitionCard({ competition }: { competition: PublicCompetition }) { return <article className="public-stat-card"><div className="stats-badge-row"><CompetitionCoverageBadge trackingLevel={competition.trackingLevel} /><DataConfidenceBadge meta={competition.meta} /></div><h2>{competition.name}</h2><p>{competition.country} · {competition.continent}</p><Link href={`/competizioni/${competition.id}`}>Apri competizione</Link></article>; }
