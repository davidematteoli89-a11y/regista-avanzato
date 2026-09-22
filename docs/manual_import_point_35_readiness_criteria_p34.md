# Punto 34 — Punto 35 readiness criteria

Per poter aprire un futuro Punto 35 devono essere soddisfatti tutti i criteri seguenti:

- final gate documentato;
- draft review completata;
- blocking issues = 0;
- needs_review items accettati o risolti;
- staging project confermato;
- Production esclusa;
- backup checklist confermata;
- rollback checklist confermata;
- post-apply verification plan confermato;
- provider/API/Apify spenti;
- import reali spenti;
- autorizzazione esplicita utente ricevuta;
- nessun segreto esposto;
- `.env.local` non committato;
- `.vercel/` non committato;
- working tree pulito;
- branch `preview` confermato.

Se anche uno di questi manca, Punto 35 non deve partire.

Punto 35 non deve:

- attivare provider/import;
- toccare Production;
- usare `service_role` nell’app;
- bypassare backup/rollback;
- partire da frasi generiche.

Stato attuale:

- `explicit_user_authorization_received=true`;
- `point_35_blocked_without_explicit_authorization=false`;
- `ready_for_apply=false`;
- `next_write_allowed=false`.

## Punto 35 follow-up

Readiness parziale:

- branch `preview` confermato;
- target staging confermato;
- migration reale creata;
- apply DB non eseguito;
- post-apply verification non eseguita.

Il criterio “canale apply sicuro” resta non soddisfatto.
