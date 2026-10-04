# Punto 26 — Supabase read-only access root cause

Data: 2026-09-18  
Modalità: investigazione read-only, no-write.

## Sintesi

Il Punto 25 ha usato un client Supabase anon/pubblico e ha eseguito solo letture limitate, ma non ha confermato `competitions`, `teams`, `standings` né le public views correlate.

Il Punto 26 classifica le cause possibili senza usare service role, senza admin client e senza scritture.

## Cause analizzate

| Causa | Evidence locale | Verificabile ora | Richiede DB read | Richiede migrazione futura | Richiede service_role | Status |
|---|---|---:|---:|---:|---:|---|
| 1. Tabella reale diversa dal nome previsto | Schema locale e migrazione `0001` definiscono `competitions`, `teams`, `standings`. | parziale | sì | no | no | possible |
| 2. Tabella esiste ma non leggibile da anon per RLS | Migrazione `0003` revoca direct grants e usa view come interfaccia pubblica. | parziale | sì | no | no | likely |
| 3. View pubblica esiste ma script non la usa | Lo script P25 tenta anche `public_competitions`, `public_teams`, `public_standings`; non confermate. | sì | sì | no | no | ruled_out come unica causa |
| 4. View admin esiste ma richiede sessione/ruolo | Admin readers usano `createSupabaseServerClient()` con sessione cookie; script anon non ha sessione admin. | sì | no | no | no | confirmed |
| 5. Schema locale conferma tabelle ma DB read-only non ha accesso diretto | P24 conferma schema locale; P25 non conferma DB anon. | sì | sì | no | no | confirmed |
| 6. Fixture ids non corrispondono a seed/demo | Lookup fixture returned zero matches; non stampa payload. | sì | sì | no | no | possible |
| 7. Client anon corretto ma query sbagliata | Query usa nomi base table e public views documentati; senza payload errore resta non conclusivo. | parziale | sì | no | no | possible |
| 8. Client anon non sufficiente per introspezione schema | Supabase REST anon non offre introspezione completa; script verifica solo select. | sì | sì | no | no | confirmed |
| 9. Serve view read-only dedicata futura | Per import lookup servono provider ids/dedup/FK non esposti dalle public views generiche. | sì | no | sì | no | likely |
| 10. Serve solo schema confirmation da migrazioni locali | Possibile fallback se non si vuole nuova view; non risolve lookup live. | sì | no | no | no | possible |

## Root cause più probabile

```text
rls_or_missing_view_or_wrong_table_name_or_insufficient_anon_access
```

Più precisamente:

- direct table access non è un percorso affidabile con anon;
- public views esistenti sono pensate per lettura pubblica, non per lookup import;
- admin readers richiedono sessione/ruolo e non sono adatti a script anon;
- manca una view/read route dedicata al lookup import manuale in read-only.

## Decisione

Punto 26 non abilita write. Il blocco resta operativo fino a una delle due conferme:

1. query manuali `SELECT` da SQL Editor staging documentate, oppure
2. proposta no-write di view read-only dedicate, poi eventuale applicazione manuale separata.
