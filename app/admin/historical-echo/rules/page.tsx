import { AdminHistoricalEchoRulesPanel } from "@/components/admin/AdminHistoricalEchoRulesPanel";
import { AdminWarningBox } from "@/components/admin/AdminWarningBox";
import { HISTORICAL_ECHO_RULES } from "@/lib/historicalEcho/historicalEchoRules";

export default function HistoricalEchoRulesPage() {
  return <main className="admin-page"><header><h2>Regole Historical Echo</h2><p>Trigger, soglie di review e destinazioni editoriali ammesse.</p></header><AdminHistoricalEchoRulesPanel rules={HISTORICAL_ECHO_RULES} /><AdminWarningBox warning={{ id: "weak-trigger", level: "warning", title: "Trigger deboli", message: "Paese, parole chiave o somiglianze tattiche non sono mai sufficienti da soli e richiedono riscontri aggiuntivi." }} /></main>;
}
