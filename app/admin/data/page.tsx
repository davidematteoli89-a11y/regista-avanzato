import Link from "next/link";

export default function AdminDataPage() {
  return (
    <main className="admin-page">
      <header>
        <h2>Manual data</h2>
        <p>
          Superfici admin read-only per ispezionare i dati manuali staging. Nessuna scrittura,
          import provider o esposizione pubblica.
        </p>
      </header>

      <section className="admin-section-card">
        <div className="admin-card-head">
          <div>
            <h2>Manual competitions</h2>
            <p className="muted">
              Visualizza competition, teams e standings manuali già scritti in staging.
            </p>
          </div>
          <div className="admin-badge-row">
            <span className="admin-safety-badge">Read-only</span>
            <span className="admin-safety-badge">Admin only</span>
            <span className="admin-safety-badge">Public disabled</span>
          </div>
        </div>
        <p>
          <Link href="/admin/data/competitions">Vai alle manual competitions</Link>
        </p>
      </section>
    </main>
  );
}
