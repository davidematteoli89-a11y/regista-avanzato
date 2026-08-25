import { AdminHistoricalEchoCandidateBox } from "@/components/admin/AdminHistoricalEchoCandidateBox";
import { AdminWarningBox } from "@/components/admin/AdminWarningBox";
import { generateHistoricalEchoCandidates } from "@/lib/historicalEcho/historicalEchoEngine";
import { MOCK_HISTORICAL_ECHO_TRIGGERS } from "@/lib/historicalEcho/mockHistoricalEchoData";

export default function HistoricalEchoCandidatesPage() {
  const candidates = generateHistoricalEchoCandidates({ triggers: MOCK_HISTORICAL_ECHO_TRIGGERS, maximumCandidates: 8 });
  return <main className="admin-page"><header><h2>Candidati Historical Echo</h2><p>Output deterministico in memoria: idee editoriali, non articoli o contenuti pubblicati.</p></header><div className="admin-section-grid">{candidates.map((candidate) => <AdminHistoricalEchoCandidateBox key={candidate.id} candidate={candidate} />)}</div><AdminWarningBox warning={{ id: "candidate-safe", level: "critical", title: "Zero pubblicazioni", message: "Il motore non scrive database, non crea articoli completi e non avvia newsletter o script video." }} /></main>;
}
