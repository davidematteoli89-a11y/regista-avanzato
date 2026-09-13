# D.12-A — Suite test ruoli controllata

## Stato

D.12-A prepara una suite di test controllata per verificare l’accesso applicativo a `/admin/imports` con ruoli diversi, senza creare utenti e senza modificare ruoli.

In questa fase non vengono eseguite scritture DB, non vengono chiamati provider, non viene usato Apify e non viene toccata Production.

## Ruoli e stati effettivi

Ruoli rilevati da codice e helper RBAC:

- `free_user`;
- `editor`;
- `admin`;
- `super_admin`.

Regola applicativa admin:

- `app/admin/layout.tsx` usa `requireAdmin()` server-side;
- `requireAdmin()` richiede sessione Supabase reale;
- il profilo deve avere `status = approved`;
- ruoli ammessi all’area admin: `editor`, `admin`, `super_admin`;
- `free_user`, profili non approved e utenti anonimi sono bloccati.

Regola RLS per `provider_import_runs`:

- SELECT: `authenticated` solo se `public.is_editor_or_admin()`;
- INSERT: `authenticated` solo se `public.is_admin()`;
- UPDATE: `authenticated` solo se `public.is_admin()`;
- DELETE: nessuna policy;
- anon: nessun grant utile.

## Matrice accessi pianificata

| Sessione/ruolo | Stato profilo | `/admin` | `/admin/imports` | SELECT `provider_import_runs` | Scritture | Stato test |
| --- | --- | --- | --- | --- | --- | --- |
| Non autenticato | n/a | Bloccato da Vercel Authentication o redirect login app | Bloccato | No | No | Verificato in D.9/D.10 |
| `free_user` | `approved` | `notFound()` | `notFound()` | No | No | Da testare con utente controllato |
| `free_user` | non approved | `notFound()` | `notFound()` | No | No | Da testare solo se serve |
| `editor` | `approved` | Ammesso | Ammesso read-only | Sì | No dalla UI; INSERT/UPDATE bloccati da RLS admin-only | Da testare con utente editor controllato |
| `admin` | `approved` | Ammesso | Ammesso read-only | Sì | Nessuna UI di scrittura provider/import | Verificato manualmente |
| `super_admin` | `approved` | Ammesso | Ammesso read-only | Sì | Nessuna UI di scrittura provider/import | Da testare solo se creato esplicitamente |

Nota: `editor` è ammesso nell’admin layout secondo la regola attuale; il nome `requireAdmin()` è quindi una semplificazione storica, non una policy solo-admin.

## Suite test manuale futura

### Test non autenticato

1. Aprire Preview branch alias su `/admin/imports`.
2. Confermare blocco da Vercel Authentication oppure redirect/blocco app.
3. Confermare che non viene visualizzata la sezione `Provider import runs`.

### Test `free_user`

Prerequisito futuro: utente staging controllato `free_user`, creato o reso disponibile solo con conferma esplicita.

1. Login come `free_user` approved.
2. Aprire `/admin/imports`.
3. Atteso: `notFound()` o blocco equivalente.
4. Confermare che non sono visibili dati `provider_import_runs`.
5. Non modificare quote, preferenze o ruoli durante il test.

### Test `editor`

Prerequisito futuro: utente staging controllato `editor` approved, creato o promosso solo con conferma esplicita.

1. Login come `editor`.
2. Aprire `/admin/imports`.
3. Atteso: pagina accessibile.
4. Confermare empty state se `provider_import_runs_count = 0`.
5. Confermare badge `Read-only`, `Provider off`, `Apify off`, `realWritesEnabled=false`.
6. Confermare assenza di bottoni run/import/delete/update/scrittura.

### Test `admin`

Già verificato manualmente:

1. Login admin.
2. `/admin/imports` accessibile.
3. `Provider import runs` visibile.
4. Empty state corretto.
5. Nessuna azione di scrittura provider/import disponibile.

## Regole per utenti test

- Non creare utenti in D.12-A.
- Non modificare ruoli in D.12-A.
- Non usare Production.
- Non usare service role.
- Futuri utenti test devono essere staging-only e chiaramente identificabili.
- Ogni promozione/demozione ruolo deve avere conferma separata e rollback documentato.

## Readiness gate collegato

Prima di qualunque writer/import reale:

- completare test applicativo `free_user`;
- completare test applicativo `editor`;
- confermare di nuovo admin e non autenticato;
- mantenere `realWritesEnabled=false` come default;
- mantenere `/admin/imports` senza bottoni run/import/delete/update;
- confermare provider, Apify e import ancora spenti;
- non abilitare scritture senza `import_run_id`, `batch_id`, audit/log e rollback plan.

## Discrepanze rilevate

Nessuna discrepanza bloccante rilevata.

Osservazioni:

- il reader `provider_import_runs` è coerente con RLS ed è solo SELECT;
- la UI `/admin/imports` non contiene form o bottoni di scrittura;
- `requireAdmin()` ammette anche `editor`, coerentemente con la policy RLS `is_editor_or_admin()`;
- per utenti non autenticati l’app redirecta a `/login?next=/admin`, non alla route completa `/admin/imports`; non è un rischio di sicurezza, ma può essere raffinato in futuro se serve UX più precisa.

## Conferme D.12-A

- Nessun utente creato.
- Nessun ruolo modificato.
- Nessuna migrazione modificata.
- Nessuna scrittura DB.
- Nessun insert/update/delete/upsert.
- Nessuna fetch provider esterna.
- Provider reali spenti.
- Apify spento.
- Import spenti.
- Production non toccata.

## D.12-B — Piano operativo utenti staging

Documento successivo:

- `docs/role_access_test_suite_d12b.md`.

D.12-B prepara il test con utenti staging `free_user` ed `editor`, ma non crea utenti e non modifica ruoli.

Il piano prevede:

- verifica manuale Dashboard degli utenti test riutilizzabili;
- matrice Preview per non autenticato/admin/free_user/editor;
- query read-only post-test per confermare DB invariato;
- cleanup futuro se vengono creati utenti test;
- conferma esplicita prima di qualunque creazione utente o modifica ruolo.
