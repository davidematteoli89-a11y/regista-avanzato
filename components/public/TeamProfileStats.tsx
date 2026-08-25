import type { PublicTeamProfile } from "@/lib/publicData/publicDataTypes";
import { LoginRequiredBlock } from "./LoginRequiredBlock";
import { TeamStatsTable } from "./TeamStatsTable";
export function TeamProfileStats({ profile }: { profile: PublicTeamProfile }) { return <section className="preview-block"><h2>Statistiche squadra</h2><div className="stat-summary"><span>Partite <strong>{profile.baseStats.matches}</strong></span><span>Gol fatti <strong>{profile.baseStats.goalsFor}</strong></span><span>Gol subiti <strong>{profile.baseStats.goalsAgainst}</strong></span></div>{profile.fullStats ? <TeamStatsTable stats={profile.fullStats} /> : <LoginRequiredBlock />}</section>; }
