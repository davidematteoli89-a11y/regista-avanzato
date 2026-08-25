import { AdminEmptyState } from "@/components/admin/AdminEmptyState";
export default function AdminPlayersPage() { return <main className="admin-page"><header><h2>Giocatori</h2><p>Controllo futuro di profili, statistiche e mapping.</p></header><AdminEmptyState title="Giocatori non collegati" message="I profili correnti sono dimostrativi; nessun provider viene interrogato." /></main>; }
