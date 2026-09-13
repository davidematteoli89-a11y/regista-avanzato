# D.11 — Chiusura residui ruoli e readiness gate writer reali

## Stato

Ultimo commit Preview di partenza:

- `2bc38ae4df975ce1863da4365671f440acfb5504`.

Stato operativo:

- `/admin/imports` verificata da admin;
- non autenticato bloccato da Vercel Authentication;
- `provider_import_runs` presente su staging;
- RLS attiva;
- `provider_import_runs_count = 0`;
- provider reali spenti;
- Apify spento;
- import spenti;
- `realWritesEnabled=false`;
- `write_attempt_blocked=true`;
- Production non toccata.

## Decisione D.11

Per D.11 non vengono creati utenti `free_user`/`editor` e non vengono modificati ruoli.

I test `free_user`/`editor` restano residui consapevoli.

La fase provider/import resta safe perché:

- admin è verificato;
- non autenticato è bloccato;
- il codice `requireAdmin()` esclude `free_user`;
- `editor` è ammesso solo secondo regola admin layout e RLS;
- UI `/admin/imports` è read-only;
- writer reali sono disabilitati;
- provider reali sono spenti;
- Apify è spento;
- import sono spenti.

## Matrice ruoli attuale

| Ruolo/sessione | Stato test | Comportamento |
| --- | --- | --- |
| Non autenticato | Verificato | Bloccato da Vercel Authentication / SSO Preview. |
| Admin | Verificato manualmente | Accede a `/admin/imports`, vede `Provider import runs`, empty state, badge sicurezza e nessun bottone di scrittura. |
| Free user | Non testato end-to-end | Atteso bloccato da `requireAdmin()` / `notFound()`. Non creare utente ora. |
| Editor | Non testato end-to-end | Atteso ammesso se `status=approved`, solo read-only. Non creare/modificare ruolo ora. |

## Readiness gate: NO WRITER REALI finché

Prima di qualsiasi writer/import reale devono essere completati tutti questi punti:

- repository GitHub confermato Private;
- service role key Supabase esposta in passato ruotata/rigenerata;
- env Supabase Vercel limitate a Preview, non Production e non All Environments;
- migrazioni Supabase manuali tracciate e coerenti;
- test RLS applicativo completato con:
  - admin;
  - editor;
  - `free_user`;
  - non autenticato;
- writer reali dietro flag esplicito;
- `realWritesEnabled=false` resta default;
- nessun writer usa service role lato UI;
- ogni import ha:
  - `import_run_id`;
  - `batch_id`;
  - status lifecycle;
  - rollback plan;
  - audit/log;
- provider stabile reale scelto ma non ancora attivato;
- budget guard Apify confermato prima di qualsiasi run Apify;
- hard stop Apify a 30 €/mese;
- warning Apify a 24 €/mese;
- nessuna chiamata provider lato utente;
- nessuna chiamata Apify lato utente;
- nessun import live;
- nessun import storico massivo;
- nessun deploy Production senza checklist dedicata.

## Stato DB/provider

In D.11:

- nessuna scrittura DB;
- nessun insert/update/delete/upsert;
- nessun utente creato;
- nessun ruolo modificato;
- nessun provider attivato;
- nessun import attivato;
- nessuna chiamata Apify.

## Prossimo step consigliato

D.12 — preparare una checklist operativa per test ruoli controllati `free_user`/`editor` oppure iniziare un piano provider reale solo documentale, mantenendo writer e provider disabilitati.

## D.12-A — Suite test ruoli controllata

D.12-A aggiunge una suite documentale senza creare utenti e senza modificare ruoli.

Documento dedicato:

- `docs/role_access_test_suite_d12a.md`.

La suite chiude il requisito operativo di pianificazione, ma non sostituisce i test end-to-end futuri con utenti `free_user` ed `editor`.

Gate invariato:

- nessun writer reale;
- nessun import reale;
- nessun provider reale;
- nessun Apify;
- nessuna Production;
- `realWritesEnabled=false` resta default;
- test `free_user`/`editor` richiesti prima di qualunque scrittura reale.

## D.12-B — Gate operativo utenti test

D.12-B definisce come eseguire i test `free_user`/`editor` senza abbassare la sicurezza.

Il readiness gate resta chiuso finché:

- non viene verificato un `free_user approved` bloccato da `/admin/imports`;
- non viene verificato un `editor approved` ammesso solo read-only;
- `provider_import_runs_count` resta invariato salvo test writer esplicitamente autorizzati;
- provider/Apify/import restano spenti;
- nessuna UI di import reale viene aggiunta.

La creazione o modifica ruoli degli utenti test richiede conferma separata.
