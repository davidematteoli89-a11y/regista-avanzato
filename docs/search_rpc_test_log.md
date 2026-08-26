# Search RPC test log

## Stato

La quota ricerca avanzata e' collegata nel codice locale alle RPC Supabase staging:

- `get_user_search_usage_status()`
- `increment_user_search_usage()`

Non ci sono piu' scritture dirette applicative su `user_search_usage` nel flusso server della ricerca avanzata.

## Flusso applicativo

- `/ricerca` legge lo stato quota con `checkUserSearchLimit()`.
- Se l'utente non e' autenticato, mostra preview e CTA login.
- Se arriva `search=1` e la quota e' disponibile, il server chiama `increment_user_search_usage()`.
- Solo dopo incremento riuscito viene eseguito il motore ricerca mock in memoria.
- Se la quota e' esaurita, viene mostrato il messaggio limite e CTA Substack.

## Cosa non consuma quota

Non chiamano la RPC di incremento:

- apertura statistiche;
- link highlights;
- Video Radar;
- profili giocatore;
- profili squadra;
- schede partita;
- navigazione pubblica normale.

## Stato test database precedente

La RPC e' stata verificata in staging con utente controllato:

- chiamata 1: allowed true, count 1;
- chiamata 2: allowed true, count 2;
- chiamata 3: allowed true, count 3;
- chiamata 4: allowed false, count resta 3;
- insert/update/delete diretti su `user_search_usage` bloccati per `authenticated`.

## Da testare ancora

- Flusso UI completo dopo login locale con credenziali inserite manualmente dall'utente.
- B.7 anon: `/ricerca` visibile come preview senza consumo quota.
- B.7 autenticato: `/ricerca` ok e `/ricerca?search=1` mostra limite 3/3 correttamente.
- Test concorrente RPC.
- Reset quota o nuova finestra mensile in ambiente controllato.
