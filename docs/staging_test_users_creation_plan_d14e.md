# D.14-E — Piano creazione controllata utenti test staging

## Stato

D.14-E prepara la procedura per creare o usare utenti test staging necessari ai test ruoli `free_user` ed `editor`.

Non vengono creati utenti, non vengono modificati ruoli e non vengono eseguite query di scrittura.

## Utenti test previsti

| Scopo | Email documentata | Ruolo atteso | Status atteso | Risultato atteso |
| --- | --- | --- | --- | --- |
| Test negativo free user | `davide.m***@funcode.it` | `free_user` | `approved` | `/admin/imports` bloccato |
| Test positivo editor read-only | `caffe1***@gmail.com` | `editor` | `approved` | `/admin/imports` accessibile solo read-only |

Le email complete non devono essere committate nei documenti. Password e credenziali non devono essere salvate.

## Pre-check progetto

Prima di qualunque azione manuale:

1. Aprire Supabase Dashboard.
2. Entrare solo nel progetto staging “Regista Avanzato”.
3. Non entrare in OS-Business.
4. Non entrare in Production.
5. Verificare che provider, Apify e import restino spenti.

## Creazione utenti da Dashboard

Da fare solo dopo conferma esplicita.

Percorso:

1. Authentication → Users.
2. Creare l’utente test free_user.
3. Creare l’utente test editor.
4. Non salvare password nei docs.
5. Non condividere password in chat.
6. Non usare service role lato app.

Il trigger `handle_new_auth_user()` dovrebbe creare automaticamente il profilo in `public.users_profile` con:

- `role = free_user`;
- `status = approved`.

## Verifica read-only utenti

Usare solo query `SELECT`:

```sql
select
  p.id,
  left(coalesce(u.email, ''), 6) || '***' as email_masked,
  p.display_name,
  p.role,
  p.status,
  p.created_at
from public.users_profile p
join auth.users u on u.id = p.id
where u.email ilike '%funcode.it%'
   or u.email ilike '%gmail.com%'
order by p.created_at desc;
```

Prima di usare un ID in qualunque query di ruolo, copiarlo dalla riga corretta e verificare email mascherata/contesto.

## Assegnazione ruolo editor

L’utente free_user deve restare `free_user`.

L’utente editor richiede promozione controllata solo dopo conferma esplicita.

Template documentale, NON eseguire ora:

```sql
-- NON eseguire senza conferma esplicita.
-- Sostituire <EDITOR_TEST_USER_ID> con UUID verificato manualmente.
update public.users_profile
set role = 'editor',
    status = 'approved'
where id = '<EDITOR_TEST_USER_ID>'
  and role = 'free_user';
```

Regole:

- update vincolato a UUID specifico;
- mai update globale;
- mai update su email generica senza verifica ID;
- non modificare l’admin esistente;
- non usare service role lato app.

## Rollback ruolo editor

Template documentale, NON eseguire ora:

```sql
-- NON eseguire senza conferma esplicita.
-- Riporta l’utente editor test al ruolo free_user.
update public.users_profile
set role = 'free_user'
where id = '<EDITOR_TEST_USER_ID>'
  and role = 'editor';
```

## Test Preview

Dominio Preview:

```text
https://regista-avanzato-git-preview-davide-matteoli.vercel.app
```

### free_user

1. Login con utente test `free_user`.
2. Aprire `/admin/imports`.
3. Atteso:
   - bloccato / `notFound()` / redirect;
   - non vede `Provider import runs`;
   - non vede bottoni run/import/delete/update.

### editor

1. Login con utente test `editor`.
2. Aprire `/admin/imports`.
3. Atteso:
   - accesso consentito;
   - `Provider import runs` visibile;
   - empty state se `provider_import_runs_count = 0`;
   - badge read-only visibili;
   - nessun bottone run/import/delete/update.

### admin e non autenticato

- Admin: già verificato ok.
- Non autenticato: già verificato bloccato.

## Verifica DB invariato

Query read-only post-test:

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

Atteso:

- `provider_import_runs_count = 0`;
- provider esterni off;
- nessuna riga `import_enabled=true`.

## Cleanup

Da fare solo dopo conferma:

1. Logout utenti test.
2. Eventuale disabilitazione/rimozione utenti test dalla Dashboard staging.
3. Eventuale rollback ruolo editor a `free_user`.
4. Nessuna cancellazione dati non-test.
5. Nessuna azione su Production.

## Conferme D.14-E

- Nessun utente creato.
- Nessun ruolo modificato.
- Nessuna query update eseguita.
- Nessuna scrittura DB.
- Nessun provider chiamato.
- Nessun Apify/SofaScore.
- Nessun import attivato.
- Production non toccata.
