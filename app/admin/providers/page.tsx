import { AdminProviderStatusCard } from "@/components/admin/AdminProviderStatusCard";
import { getAdminProviders } from "@/lib/admin/getAdminProviders";
export default async function AdminProvidersPage() { const providers = await getAdminProviders(); return <main className="admin-page"><header><h2>Provider</h2><p>Stato di configurazione senza chiamate, token o connessioni.</p></header><div className="admin-section-grid">{providers.map((provider) => <AdminProviderStatusCard key={provider.id} provider={provider} />)}</div></main>; }
