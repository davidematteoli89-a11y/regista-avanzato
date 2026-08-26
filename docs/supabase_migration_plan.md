# Piano migrazioni Supabase staging

Le migrazioni sono state preparate ma **non eseguite**. `supabase/schema.sql` resta il riferimento monolitico legacy; la futura fonte applicabile è `supabase/migrations/`.

## Ordine obbligatorio

| Migrazione | Scopo | Verifica immediata |
| --- | --- | --- |
| `0001_base_schema.sql` | enum, 38 tabelle, FK, constraint, indici, trigger `updated_at`, RLS attiva senza policy | inventario oggetti; anon/auth non accedono |
| `0002_admin_rbac.sql` | helper ruolo, bootstrap profilo Auth, `admin_audit_logs` | nuovo utente diventa solo `free_user`; helper negano free |
| `0003_rls_policies.sql` | ownership utente, letture pubblicate, staff/admin e audit append-only | matrice anon/free/editor/admin con test deny |
| `0004_public_views.sql` | allowlist di colonne e masking contenuti completi | nessuna colonna interna nelle view; link/script anon null |
| `0005_search_usage_rpc.sql` | status quota e incremento atomico | 10 chiamate concorrenti producono massimo count 3 |
| `0006_seed_base_data.sql` | 6 provider e 43 competizioni staging | provider esterni inactive; contenuti draft/private |

Non configurare Vercel Preview tra una migrazione e la successiva. Le env applicative vanno aggiunte solo dopo l'intera matrice RLS.

## Procedura staging futura

1. Creare progetto Supabase staging separato e vuoto.
2. Salvare le credenziali soltanto negli ambienti autorizzati.
3. Eseguire un controllo SQL locale o su database effimero compatibile.
4. Applicare le migrazioni in ordine con il runner Supabase, senza incollare selettivamente frammenti.
5. Fermarsi e validare gli assert dopo ogni file.
6. Creare un utente Auth free di test e verificare il trigger profilo.
7. Promuovere manualmente un solo admin staging.
8. Eseguire test anon/free/editor/admin/service role.
9. Solo dopo aggiungere URL e anon key a Vercel Preview; service role esclusa finché non serve a un job autorizzato.

## Rollback staging

Prima dell'applicazione creare un backup o usare un progetto staging ricreabile. Non sono inclusi down migration automatici perché drop di enum/tabelle può distruggere dati.

- Errore in `0001`: ricreare il database staging vuoto; non tentare riparazioni manuali parziali.
- Errore `0002`: rimuovere prima trigger Auth, poi helper e audit table, soltanto se non ci sono audit da conservare.
- Errore `0003`: revocare grant e rimuovere policy/view `admin_*` create dal file.
- Errore `0004`: rimuovere le sole view pubbliche e `can_read_published_content()`.
- Errore `0005`: revocare execute e rimuovere le due funzioni RPC; la tabella quota resta intatta.
- Errore `0006`: cancellare solo righe identificabili dal seed se nessun dato successivo le referenzia; altrimenti ripristinare backup.

In caso di dubbio, rollback tramite restore completo dello staging è preferibile a SQL distruttivo improvvisato.

## Limiti

- Migrazioni non validate ancora da un motore PostgreSQL/Supabase reale.
- Nessun tipo Database TypeScript è stato generato.
- Nessun middleware/session refresh o admin reader reale è stato collegato.
- Le view `admin_*` preparano lettura staff; le scritture reali richiederanno endpoint server testati e audit obbligatorio.
- Questa struttura non è ancora dichiarata production-ready.
