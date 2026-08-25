import { AdminEmptyState } from "@/components/admin/AdminEmptyState";
export default function AdminMatchesPage() { return <main className="admin-page"><header><h2>Partite</h2><p>Controllo futuro di gare, risultati, anomalie e copertura.</p></header><AdminEmptyState title="Dataset partite non collegato" message="Gli import preparano payload mock, ma questa vista non legge Supabase." /></main>; }
