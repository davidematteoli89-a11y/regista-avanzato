import type { PublicPlayerProfile } from "@/lib/publicData/publicDataTypes";
import { LoginRequiredBlock } from "./LoginRequiredBlock";
import { PlayerStatsTable } from "./PlayerStatsTable";
export function PlayerProfileStats({ profile }: { profile: PublicPlayerProfile }) { return <section className="preview-block"><h2>Statistiche giocatore</h2><div className="stat-summary"><span>Presenze <strong>{profile.baseStats.appearances}</strong></span><span>Gol <strong>{profile.baseStats.goals}</strong></span><span>Assist <strong>{profile.baseStats.assists}</strong></span></div>{profile.fullStats ? <PlayerStatsTable stats={profile.fullStats} /> : <LoginRequiredBlock />}</section>; }
