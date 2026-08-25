import Link from "next/link";
import type { PublicPlayer } from "@/lib/publicData/publicDataTypes";
import { DataConfidenceBadge } from "./DataConfidenceBadge";
export function PlayerCard({ player }: { player: PublicPlayer }) { return <article className="public-stat-card"><DataConfidenceBadge meta={player.meta} /><h3>{player.name}</h3><p>{player.position} · {player.nationality}{player.age ? ` · ${player.age} anni` : ""}</p><Link href={`/giocatori/${player.id}`}>Scheda giocatore</Link></article>; }
