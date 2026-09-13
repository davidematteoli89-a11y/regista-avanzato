# D.14-C — Esecuzione manuale checklist ruoli free_user/editor

## Stato

D.14-C guida l’esecuzione manuale dei test ruoli su Preview.

Non vengono creati utenti, non vengono modificati ruoli e non vengono eseguite query di scrittura senza conferma esplicita.

## Stato locale verificato

- Branch corrente: `preview`.
- Working tree pulito prima delle modifiche documentali D.14-C.
- `audit:providers` conferma provider reali off.
- `dry-run:provider-writer-guards` conferma `realWritesEnabled=false` e `write_attempt_blocked=true`.
- `probe:stable-provider:disabled` conferma `real_provider_probe_enabled=false`.

## Stato accessi già noto

- Non autenticato: già verificato bloccato da Vercel Authentication / app.
- Admin: già verificato, accede a `/admin/imports` in read-only.
- `free_user`: atteso bloccato, da verificare end-to-end.
- `editor`: atteso ammesso read-only, da verificare end-to-end.

## Istruzioni manuali Dashboard Supabase

1. Aprire Supabase Dashboard.
2. Entrare solo nel progetto staging “Regista Avanzato”.
3. Non entrare in OS-Business.
4. Non entrare in Production.
5. Andare in Authentication → Users.
6. Cercare utenti test dedicati:
   - `regista-test-free-user`;
   - `regista-test-editor`.

Se gli utenti esistono:

- non modificare nulla;
- confermare solo che sono utenti staging/test;
- verificare ruolo/status con Dashboard o query read-only;
- non stampare email complete.

Se gli utenti non esistono:

- fermarsi;
- chiedere conferma esplicita prima di crearli;
- non creare utenti automaticamente.

## Query read-only profili test

`public.users_profile` non contiene la colonna `email`; l’email vive in `auth.users`.

Usare questa query solo nel SQL Editor del progetto staging “Regista Avanzato”:

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
where u.email ilike '%regista-test%'
   or p.display_name ilike '%regista-test%'
order by p.created_at desc;
```

Se la Dashboard non mostra ruoli/status, usare anche:

```sql
select
  p.role,
  p.status,
  count(*) as profiles_count
from public.users_profile p
group by p.role, p.status
order by p.role, p.status;
```

Non copiare in chat email complete, password, token o chiavi.

## Test Preview

URL:

```text
https://regista-avanzato-git-preview-davide-matteoli.vercel.app/admin/imports
```

### Non autenticato

Stato: già verificato.

Atteso:

- bloccato da Vercel Authentication o login app;
- nessun accesso alla sezione `Provider import runs`.

### Admin

Stato: già verificato.

Atteso:

- accesso ok;
- `Provider import runs` visibile;
- empty state corretto;
- badge sicurezza presenti;
- nessun bottone run/import/delete/update/scrittura.

### Free user

1. Fare login con utente test `free_user approved`.
2. Aprire `/admin/imports`.

Atteso:

- accesso bloccato;
- `notFound()` / redirect / blocco equivalente;
- non vede `Provider import runs`;
- non vede badge admin;
- non vede bottoni run/import/delete/update.

### Editor

1. Fare logout dal `free_user`.
2. Fare login con utente test `editor approved`.
3. Aprire `/admin/imports`.

Atteso:

- accesso consentito;
- `Provider import runs` visibile;
- empty state visibile se `provider_import_runs_count = 0`;
- badge `Read-only`, `Provider off`, `Apify off`, `realWritesEnabled=false`;
- nessun bottone run/import/delete/update/scrittura.

## Query read-only DB invariato

Da eseguire solo dopo test manuale, se serve conferma:

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

Dopo i test:

- fare logout dagli utenti test;
- non cancellare utenti senza conferma;
- non modificare ruoli senza conferma;
- non toccare l’admin esistente;
- non toccare Production.

## Esito da registrare

Compilare dopo l’esecuzione manuale:

```text
Data:
Commit Preview:
Utente free_user mascherato:
Risultato free_user:
Utente editor mascherato:
Risultato editor:
provider_import_runs_count:
Provider esterni off:
Import enabled false:
Errori:
```

## Conferme D.14-C preparatoria

- Nessun utente creato.
- Nessun ruolo modificato.
- Nessuna scrittura DB.
- Nessun insert/update/delete/upsert.
- Nessun provider chiamato.
- Nessun Apify/SofaScore.
- Nessun import attivato.
- Nessuna Production.
