# RPC quota ricerca preparata

`0005_search_usage_rpc.sql` prepara due funzioni non applicate.

## `increment_user_search_usage()`

- Nessun parametro: serve esclusivamente per action advanced.
- Identità da `auth.uid()`, mai dal browser.
- Mese calcolato in UTC dal database.
- Insert/upsert atomico con update soltanto quando count `< 3`.
- Count protetto anche dal check `0..3` della tabella.
- Restituisce allowed, used, limit, remaining, periodo, incremented e reason.
- Quarto tentativo restituisce `allowed=false` senza incremento.
- `security definer`, search path fissato, execute soltanto authenticated.

## `get_user_search_usage_status()`

Read-only e autenticata. Se la riga mensile non esiste restituisce 0/3 senza crearla.

## Accesso tabella

L'utente può leggere soltanto la propria riga. Insert/update/delete diretti sono revocati; anche un client autenticato deve passare dalla RPC.

## Integrazione futura

Sostituire la scrittura read-then-write di `lib/auth/searchUsage.ts` e consolidare gradualmente `lib/auth`/`lib/freeSearch`. Nessuna view normale deve chiamare la RPC: stats, highlight, Video Radar, profili e pagine partita non consumano quota.

## Test necessari

- 10 invocazioni concorrenti da count zero: tre `incremented=true`, count finale 3.
- Quarto tentativo negato.
- A non vede/incrementa B.
- anon riceve permission denied.
- passaggio mese crea una riga nuova.
- view action lascia la quota invariata.

Per retry idempotenti futuri valutare un `request_id` server-side con tabella eventi; non è incluso in questa fase.
