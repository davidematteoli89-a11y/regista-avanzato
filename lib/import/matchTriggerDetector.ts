import type { NormalizedMatch, NormalizedMatchEvent } from "@/lib/dataProvider/types";
import type { MatchTrigger } from "./matchImportTypes";

export type MatchTriggerContext = {
  youngPlayerIds?: ReadonlySet<string>;
  comebackDetected?: boolean;
  upsetDetected?: boolean;
};

export function detectMatchTriggers(
  match: NormalizedMatch,
  events: readonly NormalizedMatchEvent[] = [],
  context: MatchTriggerContext = {},
): MatchTrigger[] {
  if (match.status !== "finished" || match.homeScore === null || match.awayScore === null) return [];
  const triggers: MatchTrigger[] = [];
  const totalGoals = match.homeScore + match.awayScore;
  const goalDifference = Math.abs(match.homeScore - match.awayScore);
  const add = (trigger: MatchTrigger) => triggers.push(trigger);

  if (totalGoals >= 5) add({ type: "high_scoring_match", matchId: match.id, severity: totalGoals >= 8 ? "high" : "medium", reason: `Partita con ${totalGoals} gol.`, evidence: { homeScore: match.homeScore, awayScore: match.awayScore, totalGoals } });
  if (match.homeScore === 4 && match.awayScore === 4) add({ type: "draw_4_4", matchId: match.id, severity: "high", reason: "Risultato finale 4-4.", evidence: { scoreline: "4-4" } });
  if ((match.homeScore === 5 && match.awayScore === 4) || (match.homeScore === 4 && match.awayScore === 5)) add({ type: "result_5_4", matchId: match.id, severity: "high", reason: "Risultato finale 5-4/4-5.", evidence: { homeScore: match.homeScore, awayScore: match.awayScore } });
  if (goalDifference >= 4) add({ type: "big_win", matchId: match.id, severity: "high", reason: `Vittoria con ${goalDifference} gol di scarto.`, evidence: { goalDifference } });
  if (totalGoals >= 8) add({ type: "historical_scoreline", matchId: match.id, severity: "high", reason: "Punteggio raro candidato a confronto storico.", evidence: { totalGoals, homeScore: match.homeScore, awayScore: match.awayScore } });
  if (context.comebackDetected) add({ type: "comeback", matchId: match.id, severity: "high", reason: "Rimonta segnalata da una fonte strutturata.", evidence: { externallyConfirmed: true } });
  if (context.upsetDetected) add({ type: "upset_candidate", matchId: match.id, severity: "medium", reason: "Risultato inatteso segnalato da ranking o quote future.", evidence: { externallyConfirmed: true } });

  const goalEvents = events.filter((event) => event.type === "goal" || event.type === "penalty_goal");
  if (goalEvents.some((event) => event.minute >= 85)) add({ type: "late_goal", matchId: match.id, severity: "medium", reason: "Gol dall'85° minuto in poi.", evidence: { latestGoalMinute: Math.max(...goalEvents.map((event) => event.minute)) } });

  const goalsByPlayer = new Map<string, number>();
  for (const event of goalEvents) {
    if (!event.playerId) continue;
    goalsByPlayer.set(event.playerId, (goalsByPlayer.get(event.playerId) ?? 0) + 1);
  }
  for (const [playerId, goals] of goalsByPlayer) {
    if (goals >= 3) add({ type: "hat_trick_candidate", matchId: match.id, severity: "high", reason: "Tre o più eventi gol attribuiti allo stesso giocatore; verifica editoriale richiesta.", evidence: { playerId, goals } });
  }

  const youngScorer = goalEvents.find((event) => event.playerId && context.youngPlayerIds?.has(event.playerId));
  if (youngScorer?.playerId) add({ type: "young_player_candidate", matchId: match.id, severity: "medium", reason: "Giovane segnalato come decisivo; età e identità da verificare.", evidence: { playerId: youngScorer.playerId, minute: youngScorer.minute } });

  return triggers;
}
