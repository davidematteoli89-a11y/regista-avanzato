import Link from "next/link";
import type { PublicTeam } from "@/lib/publicData/publicDataTypes";
import { DataConfidenceBadge } from "./DataConfidenceBadge";
export function TeamCard({ team }: { team: PublicTeam }) { return <article className="public-stat-card"><DataConfidenceBadge meta={team.meta} /><h3>{team.name}</h3><p>{team.country}{team.position ? ` · posizione mock ${team.position}` : ""}</p><Link href={`/squadre/${team.id}`}>Scheda squadra</Link></article>; }
