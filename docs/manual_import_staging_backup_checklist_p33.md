# Punto 33 — Staging backup checklist no-apply

Checklist futura da completare prima di qualunque apply staging. Nulla in questo documento è stato eseguito.

Stato:

- `DOCUMENTATION_ONLY`
- `DO NOT RUN`
- `NO DB WRITE AUTHORIZED`
- `next_write_allowed=false`

## Checklist

- Confermare il progetto Supabase staging corretto.
- Confermare di NON essere su Production.
- Esportare o salvare lo schema prima dell’apply tramite procedura approvata nello step futuro.
- Annotare la lista delle view esistenti.
- Annotare la definizione di eventuali view esistenti con gli stessi nomi.
- Verificare dipendenze delle view candidate.
- Verificare RLS/policy attuali sulle tabelle base.
- Salvare il commit hash corrente.
- Salvare hash/contenuto della draft revisionata.
- Confermare provider/API/Apify disattivati.
- Confermare import reali disattivati.
- Confermare nessuna sessione Production aperta.
- Confermare autorizzazione esplicita utente per lo step futuro.

## Boundaries

Questa checklist non contiene comandi operativi da lanciare. Eventuali comandi o query dovranno essere preparati in uno step successivo, marcati e autorizzati separatamente.

## Punto 34 gate

La checklist resta preparatoria. Punto 35 è bloccato finché non viene fornita la frase esplicita definita in `docs/manual_import_apply_authorization_language_p34.md`.
