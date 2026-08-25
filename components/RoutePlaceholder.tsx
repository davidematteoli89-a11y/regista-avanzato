type RoutePlaceholderProps = {
  title: string;
  area: "Sito pubblico" | "Stats Hub" | "Account gratuito" | "Admin";
  description?: string;
};

export function RoutePlaceholder({ title, area, description }: RoutePlaceholderProps) {
  return (
    <main>
      <section className="placeholder">
        <span className="eyebrow">{area} · Placeholder</span>
        <h1>{title}</h1>
        <p>{description ?? "Struttura iniziale: contenuti e funzionalità saranno definiti nei prossimi step."}</p>
      </section>
    </main>
  );
}
