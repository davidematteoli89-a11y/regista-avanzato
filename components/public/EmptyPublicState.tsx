export function EmptyPublicState({ title = "Nessun contenuto disponibile", message = "La sezione mostrerà soltanto elementi approvati o pubblicati." }: { title?: string; message?: string }) {
  return <div className="empty-public-state"><strong>{title}</strong><p>{message}</p></div>;
}
