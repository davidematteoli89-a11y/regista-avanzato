# Supabase SQL review

## Stato

Le migrazioni `0001`-`0006` sono pronte per un primo test controllato su un progetto Supabase staging vuoto. Non sono ancora da considerare validate per produzione: manca l'esecuzione reale su motore Supabase, il test PostgREST dei ruoli e il test concorrente della RPC quota.

## Ordine migrazioni

- `0001_base_schema.sql`: enum, funzione `set_updated_at`, tabelle, indici, trigger `updated_at`, RLS enabled.
- `0002_admin_rbac.sql`: helper RBAC e trigger su `auth.users` prima delle policy.
- `0003_rls_policies.sql`: policy e grant/revoke dopo tabelle e helper RBAC.
- `0004_public_views.sql`: view pubbliche/autenticate dopo le tabelle e dopo RLS.
- `0005_search_usage_rpc.sql`: RPC quota dopo `user_search_usage`.
- `0006_seed_base_data.sql`: seed dopo schema, enum, FK e provider.

L'ordine e' coerente: funzioni prima dei trigger che le usano, tabelle prima delle FK, helper RBAC prima delle policy, view e RPC dopo le tabelle, seed alla fine.

## Correzioni applicate durante la review

- `0001_base_schema.sql`: revocato `EXECUTE` web sulla funzione trigger `set_updated_at()` e rafforzato il check budget provider.
- `0002_admin_rbac.sql`: revocato `EXECUTE` di default sulle funzioni RBAC e sul trigger Auth, poi concesso solo dove serve.
- `0003_rls_policies.sql`: aggiunta revoca iniziale dei privilegi default per `anon` e `authenticated`; le view admin dinamiche revocano anche eventuali grant gia' presenti.
- `0004_public_views.sql`: rimosse colonne tecniche dalle view pubbliche, filtrate le entita' figlie rispetto alla competizione padre, mascherato `current_team_id` quando il team non e' leggibile, filtrate statistiche/eventi su competizione pubblicata e leggibile, revocati grant predefiniti sulle view.
- `0005_search_usage_rpc.sql`: le RPC richiedono profilo approvato, usano `auth.uid()`, non accettano `user_id`, e hanno grant solo per `authenticated`.
- `0006_seed_base_data.sql`: il seed dei mapping provider e' limitato alle sole competizioni seedate e lascia `import_enabled = false`.

## Compatibilita' PostgreSQL/Supabase da validare

- Le generated columns in `apify_budget_status` vanno testate sul runtime Postgres del progetto Supabase.
- Le view usano `security_barrier`; l'accesso client deve passare dalle view, non dalle tabelle base.
- Le funzioni `security definer` hanno `search_path` fissato a `public, pg_temp`.
- `auth.uid()` e il trigger su `auth.users` sono standard Supabase, ma vanno provati con email confirmation attiva e non attiva.
- Gli enum sono creati senza `IF NOT EXISTS`, coerentemente con una migrazione versionata applicata una sola volta su DB vuoto.

## RLS e leakage

L'approccio e' deny-by-default sui grant diretti, con view allowlist per il pubblico e view/admin policy per lo staff. Le view pubbliche non espongono token, raw payload, provider logs, costi, score interni, warning, review notes o note admin.

Rischi residui da testare:

- Le policy pubbliche sulle tabelle base esistono come difesa aggiuntiva, ma i grant diretti sono revocati. Va verificato via PostgREST che `anon` non possa interrogare le tabelle base.
- Le view sono owner-based. Va verificato che i filtri interni siano sufficienti e che nessuna colonna sensibile entri nei risultati.
- Alcuni campi relazionali pubblici, come `competition_id` o `match_id`, restano visibili per navigazione pubblica; vanno bene solo se le entita' correlate rispettano stato e visibilita'.

## RPC ricerca

`increment_user_search_usage()` e' disegnata per essere atomica:

- non accetta `user_id`;
- usa `auth.uid()`;
- richiede `authenticated` e profilo `approved`;
- usa mese corrente UTC;
- usa `ON CONFLICT ... DO UPDATE ... WHERE advanced_search_count < 3`;
- restituisce `allowed = false` quando il limite e' gia' raggiunto;
- non concede `INSERT/UPDATE/DELETE` diretto su `user_search_usage` ai client.

Va ancora testata con chiamate concorrenti reali per confermare che il conteggio non superi 3.

## Seed

Il seed non contiene token, password o utenti. I provider esterni restano disattivati. Apify resta disattivato come provider, anche se alcune competizioni hanno `apify_enabled = true` come eleggibilita' futura. Le competizioni sono `draft` e `private_admin`.

Prima di usare staging per demo con dati pubblici, confermare stagioni, slug, mapping esterni e contenuti da pubblicare.
