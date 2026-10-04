import { CompetitionCard } from "@/components/public/CompetitionCard";
import { EmptyPublicState } from "@/components/public/EmptyPublicState";
import { PublicStatFilters } from "@/components/public/PublicStatFilters";
import { getPublicCompetitions } from "@/lib/publicData/getPublicCompetitions";

export const dynamic = "force-dynamic";

export default async function CompetitionsPage() {
  const data = await getPublicCompetitions();

  return (
    <main className="stack">
      <header>
        <span className="eyebrow">Public Stats Hub</span>
        <h1>Competizioni</h1>
        <p>Campionati, risultati e copertura pubblica da snapshot interni approvati.</p>
      </header>
      <PublicStatFilters />
      {data.items.length ? (
        <div className="public-stats-grid">
          {data.items.map((competition) => <CompetitionCard key={competition.id} competition={competition} />)}
        </div>
      ) : (
        <EmptyPublicState title="Dati in preparazione" message="Le competizioni saranno visibili quando verrà pubblicato un seed demo controllato." />
      )}
      <p className="notice">{data.meta.warning} Navigare nello Stats Hub non consuma ricerche avanzate.</p>
    </main>
  );
}
