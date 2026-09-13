# Provider import runs RLS/readiness test plan — D.7

## Stato

Migrazione `0009_provider_import_runs.sql` applicata manualmente su Supabase staging “Regista Avanzato”.

Questa fase prepara test read-only e readiness.

Non vengono eseguiti:

- provider reali;
- Apify;
- import;
- fetch esterne;
- scritture DB;
- deploy;
- Production.

## File SQL read-only

Creato:

- `supabase/manual/provider_import_runs_rls_d7.sql`.

Il file contiene solo `SELECT`.

Uso:

```bash
pbcopy < supabase/manual/provider_import_runs_rls_d7.sql
```

Poi incollare nel Supabase SQL Editor del solo progetto staging “Regista Avanzato”.

## Controlli inclusi

Il file verifica:

1. `provider_import_runs` esiste;
2. RLS attiva;
3. policy presenti;
4. grants coerenti;
5. colonne della tabella;
6. colonne `import_run_id`/`batch_id` su:
   - `provider_import_logs`;
   - `api_usage_logs`;
   - `import_logs`;
7. indici principali;
8. `provider_import_runs_count`;
9. provider esterni ancora off;
10. import ancora disabilitati;
11. assenza policy `DELETE`;
12. helper RBAC nel contesto SQL Editor.

## Risultati attesi

- `to_regclass` restituisce `provider_import_runs`;
- `relrowsecurity = true`;
- policy attese:
  - `provider_import_runs_editor_select`;
  - `provider_import_runs_admin_insert`;
  - `provider_import_runs_admin_update`;
- nessuna policy `DELETE`;
- `provider_import_runs_count = 0`;
- `stable_provider`, `the_stats_api`, `api_football`, `apify_sofascore` con `is_active = false`;
- query `import_enabled = true` restituisce 0 righe.

## Test RLS con ruoli

Il SQL Editor non rappresenta una sessione applicativa utente.

Per test positivo/negativo completo servono sessioni reali:

- anon: non deve leggere/scrivere;
- free_user: non deve leggere/scrivere;
- editor/admin: deve poter leggere;
- admin: potrà insert/update solo in futura azione controllata.

Nessun test insert va eseguito in D.7 senza conferma separata.

## Admin visibility

Se utile, il prossimo passaggio può aggiungere un reader admin read-only per mostrare `provider_import_runs` nell’area admin.

Condizioni:

- usare solo sessione Supabase admin/editor;
- nessun service role;
- nessuna scrittura;
- nessun provider/import attivato;
- empty state se `provider_import_runs_count = 0`.

## Residui

- verificare risultati reali delle query manuali;
- decidere se creare una view admin esplicita per import runs;
- decidere se collegare `/admin/imports` a reader read-only;
- mantenere `realWritesEnabled=false`.

## D.7-B — Risultati verifica manuale D.7-A

La verifica D.7-A è stata eseguita manualmente nel Supabase SQL Editor del progetto staging “Regista Avanzato”.

Metodo:

- query read-only;
- nessun `insert`;
- nessun `update`;
- nessun `delete`;
- nessun `supabase db push`;
- nessun `supabase db reset`;
- nessun deploy;
- Production non toccata.

Risultati registrati:

- `provider_import_runs` presente;
- RLS attiva = `true`;
- `provider_import_runs_count = 0`;
- provider esterni ancora off;
- query `import_enabled = true`: nessuna riga;
- policy `DELETE`: nessuna riga;
- SQL Editor senza sessione applicativa:
  - `auth.uid() = null`;
  - `public.is_admin() = false`;
  - `public.is_editor_or_admin() = false`.

Conferme sicurezza:

- nessuna scrittura DB;
- nessun dato reale inserito;
- nessun provider attivato;
- Apify non attivato;
- nessuna fetch esterna;
- nessun token letto o stampato;
- Production non toccata;
- `realWritesEnabled=false`.

Residui:

- test RLS con sessione applicativa admin/editor/free_user ancora da fare;
- nessun writer reale abilitato;
- admin reader read-only non ancora creato;
- migration history Supabase ancora manuale.

Prossimo step consigliato:

- D.8 — admin reader read-only per `provider_import_runs` in `/admin/imports`, con empty state e nessuna scrittura.

## D.8 — Collegamento UI admin read-only

Preparato reader admin read-only per rendere visibile `provider_import_runs` in `/admin/imports`.

Vincoli rispettati:

- solo lettura server-side;
- solo sessione utente Supabase;
- RLS rispettata;
- nessun service role;
- nessun insert/update/delete/upsert;
- nessuna fetch esterna;
- nessun provider attivato;
- Apify spento;
- `realWritesEnabled=false`.

Comportamento con tabella vuota:

- mostra empty state esplicito;
- comunica che l’assenza di run è corretta in staging;
- ribadisce che provider reali, Apify e scritture sono ancora disabilitati.

Residuo:

- verificare in Preview con utente admin/editor reale che `/admin/imports` mostri la sezione e rimanga vuota.

## D.9 — Preview readiness

Verifica tecnica Preview:

- deployment Preview Ready;
- branch alias attivo;
- route `/admin/imports` presente nella build;
- Vercel Authentication attiva;
- accesso non autenticato intercettato da SSO.

Resta da verificare manualmente con sessione admin:

- sezione `Provider import runs`;
- badge `Read-only`, `Provider off`, `Apify off`, `realWritesEnabled=false`;
- empty state;
- nessun bottone di scrittura/import;
- blocco per logout/non admin.

DB invariato:

- nessuna scrittura eseguita;
- `provider_import_runs_count` resta da confermare manualmente con query read-only se necessario;
- provider/import restano spenti.

## D.9-B — Risultato Preview manuale

La UI admin è stata verificata manualmente dall’utente su Preview.

Confermato:

- URL verificato: `https://regista-avanzato-git-preview-davide-matteoli.vercel.app/admin/imports`;
- commit Preview: `dbc83703c1364721ecb8a4a88db72067d2ff9734`;
- `/admin/imports` accessibile da admin;
- sezione `Provider import runs` visibile;
- empty state corretto;
- badge presenti:
  - `Read-only`;
  - `Provider off`;
  - `Apify off`;
  - `realWritesEnabled=false`;
- nessun bottone di scrittura/import/run/delete/update;
- non autenticato bloccato da Vercel Authentication.

Stato DB/provider:

- DB invariato per quanto verificato;
- nessun provider attivato;
- Apify non attivato;
- import spenti;
- Production non toccata.

Residuo:

- test free_user applicativo ancora da fare, se viene creato o reso disponibile un utente free_user controllato.
