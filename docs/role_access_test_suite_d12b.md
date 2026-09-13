# D.12-B — Piano test applicativo controllato con utenti staging

## Stato

D.12-B prepara il test end-to-end dei ruoli `free_user` ed `editor` su `/admin/imports`, ma si ferma prima di creare utenti o modificare ruoli.

Stato di partenza:

- D.12-A chiuso e committato;
- `/admin/imports` già verificata da admin;
- non autenticato già bloccato;
- `provider_import_runs` presente;
- RLS attiva;
- `provider_import_runs_count = 0`;
- provider reali spenti;
- Apify spento;
- import spenti;
- `realWritesEnabled=false`;
- `write_attempt_blocked=true`;
- Production non toccata.

## Cosa non viene fatto in D.12-B

- Nessun utente creato.
- Nessun ruolo modificato.
- Nessuna query di `insert/update/delete/upsert`.
- Nessuna scrittura su dati provider/import.
- Nessun uso di service role.
- Nessun `db push/reset`.
- Nessun provider reale.
- Nessun Apify.
- Nessun deploy.
- Nessuna Production.

## Verifica utenti test riutilizzabili

Non è possibile verificare automaticamente gli utenti Auth esistenti senza usare Dashboard Supabase o privilegi amministrativi. In D.12-B non si usa service role e non si leggono env locali.

Verifica manuale consigliata dalla Dashboard Supabase staging “Regista Avanzato”:

1. Aprire Authentication → Users.
2. Cercare eventuali utenti staging dedicati:
   - `regista-test-free-user`;
   - `regista-test-editor`.
3. Non stampare email complete in documentazione o chat.
4. Non creare nuovi utenti finché non viene confermato esplicitamente.
5. Non modificare ruoli finché non viene confermato esplicitamente.

Query read-only opzionale da SQL Editor staging, se si vuole contare senza esporre email:

```sql
select count(*) as auth_users_count
from auth.users;

select
  p.role,
  p.status,
  count(*) as profiles_count
from public.users_profile p
group by p.role, p.status
order by p.role, p.status;
```

Evitare output con email complete. Se serve identificare un utente, usare solo ID o email mascherata manualmente.

## Ruoli necessari

Per completare il test servono, in staging:

| Utente test | Ruolo | Status | Scopo |
| --- | --- | --- | --- |
| `regista-test-free-user` | `free_user` | `approved` | Test negativo: non deve accedere a `/admin/imports`. |
| `regista-test-editor` | `editor` | `approved` | Test positivo read-only: deve accedere ma non vedere azioni di scrittura. |

L’utente admin già esistente copre il caso admin.

Il caso non autenticato è già coperto da Vercel Authentication / blocco app.

## Azioni manuali necessarie, non eseguite ora

### Opzione A — Riutilizzare utenti test già presenti

1. Confermare dalla Dashboard che esistano utenti staging dedicati.
2. Verificare in `users_profile` che abbiano:
   - `role = free_user` e `status = approved`;
   - `role = editor` e `status = approved`.
3. Eseguire i test Preview con browser/sessioni separate.

### Opzione B — Creare utenti test staging

Da fare solo dopo conferma esplicita.

1. Creare utenti dalla Dashboard Supabase Auth.
2. Usare password non condivise in chat.
3. Lasciare il trigger creare profilo `free_user`.
4. Promuovere solo l’utente editor a `editor` con query manuale vincolata all’ID.
5. Non modificare l’utente admin esistente.

Query modello per editor, da adattare manualmente solo dopo conferma e con ID esatto:

```sql
-- NON eseguire senza conferma esplicita.
update public.users_profile
set role = 'editor',
    status = 'approved'
where id = '<EDITOR_TEST_USER_ID>'
  and role = 'free_user';
```

## Come evitare di sporcare Supabase

- Usare solo utenti chiaramente staging/test.
- Non creare dati provider/import.
- Non inserire righe in `provider_import_runs`.
- Non attivare provider.
- Non attivare import.
- Non usare service role dall’app.
- Non usare Production.
- Registrare ogni eventuale utente test creato in un piano cleanup.

## Rollback / cleanup

Se in futuro vengono creati utenti test:

1. Eseguire logout da tutte le sessioni test.
2. Rimuovere o disabilitare utenti test dalla Dashboard Auth staging.
3. Se necessario, cancellare i profili collegati solo dopo conferma e solo per ID test.
4. Non toccare l’utente admin reale.
5. Non cancellare dati provider/import.

Query modello da non eseguire ora:

```sql
-- NON eseguire senza conferma esplicita.
delete from public.users_profile
where id in ('<FREE_USER_TEST_ID>', '<EDITOR_TEST_USER_ID>');
```

La cancellazione Auth va gestita dalla Dashboard Supabase staging, non da Production.

## Matrice test Preview

URL:

```text
https://regista-avanzato-git-preview-davide-matteoli.vercel.app/admin/imports
```

| Caso | Azione | Atteso |
| --- | --- | --- |
| Non autenticato | Aprire `/admin/imports` | Blocco Vercel Authentication o login app. |
| Admin | Login admin e aprire `/admin/imports` | Accesso ok, empty state, badge sicurezza, nessun bottone scrittura. |
| `free_user` | Login free user approved e aprire `/admin/imports` | Bloccato / `notFound()` / redirect; non vede `Provider import runs`. |
| `editor` | Login editor approved e aprire `/admin/imports` | Accesso ok, read-only, empty state, nessun bottone run/import/delete/update. |

## Query read-only post-test

Da eseguire manualmente solo su Supabase staging “Regista Avanzato”, se serve confermare DB invariato:

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

Risultato atteso:

- `provider_import_runs_count = 0`;
- provider esterni `is_active = false`;
- nessuna riga con `import_enabled = true`.

## Discrepanze e rischi

Nessuna discrepanza codice/RLS bloccante rilevata.

Rischi residui:

- utenti `free_user`/`editor` non ancora verificati end-to-end;
- eventuale creazione utenti test richiede cleanup;
- promozione editor richiede query manuale vincolata all’ID;
- i test devono rimanere su Preview/Supabase staging, mai Production.

## Decisione D.12-B

D.12-B non completa ancora i test end-to-end, ma prepara la procedura sicura.

Il test può essere completato senza service role e senza toccare Production usando:

- utenti staging controllati;
- login browser reale;
- RLS tramite sessione Supabase dell’app;
- query DB solo read-only per conferma stato.

Prima di procedere servono conferme esplicite su:

1. riutilizzo o creazione degli utenti test;
2. eventuale promozione manuale di un utente a `editor`;
3. cleanup finale.
