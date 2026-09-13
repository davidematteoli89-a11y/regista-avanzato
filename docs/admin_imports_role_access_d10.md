# D.10 — Test accesso applicativo ruoli `/admin/imports`

## Stato

Base di partenza:

- ultimo commit Preview documentato: `321f95e0282e33e4bc80d9ca20ddbf6e83ed3c96`;
- D.9-B chiuso e committato;
- `/admin/imports` verificata su Preview con utente admin;
- sezione `Provider import runs` visibile;
- empty state corretto;
- nessun bottone di scrittura/import/run/delete/update;
- provider reali spenti;
- Apify spento;
- import spenti;
- `realWritesEnabled=false`;
- `write_attempt_blocked=true`;
- Production non toccata.

## Matrice accessi attesa

| Ruolo/sessione | Accesso `/admin/imports` | Lettura `provider_import_runs` | Note |
| --- | --- | --- | --- |
| Non autenticato | Bloccato da Vercel Authentication o login app | No | In Preview la protezione Vercel può bloccare prima dell’app. |
| `free_user` | Bloccato da `requireAdmin()` / `notFound()` | No | Non deve vedere admin né leggere import runs. |
| `editor` approved | Consentito se ammesso dall’admin layout | Solo read-only | RLS `provider_import_runs_editor_select` consente SELECT tramite `is_editor_or_admin()`. |
| `admin` approved | Consentito | Solo read-only dalla UI D.8 | Nessun bottone di scrittura/import/run/delete/update. |

## Audit codice accessi

File analizzati:

- `app/admin/layout.tsx`;
- `app/admin/imports/page.tsx`;
- `lib/admin/requireAdmin.ts`;
- `lib/admin/adminProviderImportRuns.ts`;
- `lib/auth/access.ts`;
- `lib/auth/profile.ts`.

Risultati:

- `app/admin/layout.tsx` usa `requireAdmin()` server-side e `dynamic = "force-dynamic"`;
- `requireAdmin()` richiede Supabase configurato;
- utente non autenticato viene reindirizzato a `/login?next=/admin`;
- profilo assente, non approved o ruolo non admin/editor causa `notFound()`;
- ruoli ammessi: `editor`, `admin`, `super_admin`;
- `free_user` non è ammesso;
- `adminProviderImportRuns` usa `createSupabaseServerClient()` con cookie della sessione utente;
- nessuna service role;
- reader con solo `.select(...)`;
- nessun `insert/update/delete/upsert`;
- nessuna RPC;
- nessun fetch esterno;
- `/admin/imports` non contiene form o bottoni di scrittura/import/run/delete/update.

## Verifica Preview

Già confermato da D.9-B:

- `/admin/imports` accessibile da admin;
- `Provider import runs` visibile;
- empty state corretto;
- badge sicurezza presenti;
- nessun bottone di scrittura;
- accesso non autenticato bloccato da Vercel Authentication.

Verifica read-only D.10:

- richiesta non autenticata a `/admin/imports` su branch alias Preview;
- risposta Vercel iniziale `302` verso SSO;
- poi redirect alla login Vercel;
- conferma che l’utente non autenticato non raggiunge direttamente l’app admin.

Residui D.10:

- test applicativo `free_user` ancora da fare se disponibile utente controllato;
- test applicativo `editor` ancora da fare se disponibile utente controllato;
- non creare o modificare utenti/ruoli senza conferma separata.

## DB invariato

In D.10 non sono state eseguite query DB di scrittura.

Se serve conferma manuale DB, usare solo query read-only:

```sql
select count(*) as provider_import_runs_count
from public.provider_import_runs;

select provider_key, is_active
from public.data_providers
where provider_key in ('stable_provider', 'the_stats_api', 'api_football', 'apify_sofascore')
order by provider_key;

select c.slug, pc.import_enabled
from public.competitions c
left join public.provider_competition_config pc on pc.competition_id = c.id
where pc.import_enabled = true
limit 20;
```

## Conferme

- Nessun provider reale chiamato.
- Apify non chiamato.
- Nessun fetch provider esterno.
- Nessuna scrittura DB.
- Nessun `db push/reset`.
- Nessuna service role.
- Production non toccata.
- Provider/import non attivati.

## Prossimo step consigliato

D.11 — preparare test manuale controllato per ruoli `free_user`/`editor`, oppure documentare formalmente che al momento il progetto usa solo admin test e mantiene `editor/free_user` come test residuo.

## D.11 — Chiusura residui ruoli

Decisione:

- non creare utenti `free_user`/`editor`;
- non modificare ruoli;
- mantenere i test `free_user`/`editor` come residui consapevoli.

Motivazione:

- admin già verificato manualmente;
- non autenticato già bloccato;
- `requireAdmin()` esclude `free_user`;
- `editor` è ammesso solo se `status=approved`;
- `/admin/imports` è read-only;
- provider/import/Apify restano spenti.

Gate:

- nessun writer reale prima di test ruoli controllati e checklist dedicata.

## D.12-A — Suite ruoli controllata preparata

È stata preparata la suite documentale `docs/role_access_test_suite_d12a.md`.

La suite formalizza:

- ruoli effettivi: `free_user`, `editor`, `admin`, `super_admin`;
- `status = approved` come requisito per entrare nell’area admin;
- `free_user` bloccato da `requireAdmin()` / `notFound()`;
- `editor`, `admin` e `super_admin` ammessi all’admin layout se approved;
- `provider_import_runs` leggibile via RLS solo da `is_editor_or_admin()`;
- INSERT/UPDATE su `provider_import_runs` riservati ad admin dalla RLS;
- nessuna policy DELETE;
- `/admin/imports` resta UI read-only senza bottoni run/import/delete/update.

In D.12-A non vengono creati utenti, non vengono modificati ruoli e non viene scritto nel database.

## D.12-B — Piano test end-to-end free_user/editor

Preparato:

- `docs/role_access_test_suite_d12b.md`.

La procedura spiega come completare i residui D.10 senza service role e senza Production:

- verificare se esistono utenti staging test riutilizzabili;
- usare un utente `free_user approved` per test negativo;
- usare un utente `editor approved` per test read-only;
- confermare che `/admin/imports` non espone azioni run/import/delete/update;
- confermare DB invariato con sole query read-only.

Non eseguito in D.12-B:

- creazione utenti;
- modifica ruoli;
- scritture DB;
- provider/import/Apify.

## D.14-B — Checklist manuale ruoli

Preparata checklist:

- `docs/role_access_manual_test_checklist_d14b.md`.

La checklist richiede:

- verifica utenti test da Dashboard staging;
- test `free_user` su Preview con atteso blocco;
- test `editor` su Preview con atteso accesso read-only;
- query post-test solo read-only;
- nessun cleanup distruttivo senza conferma.

D.14-B non crea utenti e non modifica ruoli.

## D.14-C — Esecuzione manuale guidata

Preparato:

- `docs/role_access_manual_test_d14c.md`.

Aggiornamento importante:

- la query utenti test deve fare join tra `public.users_profile` e `auth.users`;
- `users_profile` non contiene email;
- le email vanno sempre mascherate.

I test `free_user`/`editor` restano da eseguire manualmente su Preview.

## D.14-D — Verifica utenti test mancanti

La ricerca manuale read-only degli utenti `regista-test-*` su Supabase staging ha restituito:

```text
Success. No rows returned.
```

Quindi i test end-to-end `free_user`/`editor` non possono ancora essere completati senza creare o predisporre utenti test.

Nessun utente creato e nessun ruolo modificato in D.14-D.
