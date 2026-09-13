# D.14-B — Checklist manuale test ruoli `/admin/imports`

## Stato

Checklist preparatoria per testare manualmente `free_user` ed `editor` su Preview.

Non vengono creati utenti, non vengono modificati ruoli e non vengono eseguite query di scrittura.

## Stato ruoli già noto

- Admin: verificato end-to-end su `/admin/imports`.
- Non autenticato: bloccato da Vercel Authentication / app.
- `free_user`: atteso bloccato, non ancora testato end-to-end.
- `editor`: atteso ammesso in read-only, non ancora testato end-to-end.

## Checklist manuale

### 1. Aprire Supabase staging

Aprire Supabase Dashboard del solo progetto staging “Regista Avanzato”.

Non aprire Production e non usare altri progetti.

### 2. Verificare utenti test

Cercare utenti test dedicati:

- `regista-test-free-user`;
- `regista-test-editor`.

Se non esistono, fermarsi e chiedere conferma prima di crearli.

### 3. Se gli utenti esistono

Verificare senza stampare email complete:

- `regista-test-free-user`:
  - `role = free_user`;
  - `status = approved`.
- `regista-test-editor`:
  - `role = editor`;
  - `status = approved`.

Non toccare l’admin esistente.

Query read-only compatibile con lo schema staging:

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

Nota: `public.users_profile` non contiene `email`; l’email va letta, se necessario, da `auth.users` e sempre mascherata.

### 4. Aprire Preview

Usare solo il dominio Preview:

```text
https://regista-avanzato-git-preview-davide-matteoli.vercel.app
```

Non usare il dominio Production.

### 5. Test `free_user`

1. Fare login con utente `free_user` staging.
2. Aprire:

```text
/admin/imports
```

Atteso:

- accesso bloccato;
- `notFound()` o redirect/blocco equivalente;
- non deve vedere `Provider import runs`;
- non deve vedere badge admin;
- non deve vedere bottoni run/import/delete/update.

### 6. Test `editor`

1. Fare logout dal `free_user`.
2. Fare login con utente `editor` staging approved.
3. Aprire:

```text
/admin/imports
```

Atteso:

- accesso consentito;
- sezione `Provider import runs` visibile;
- empty state visibile se `provider_import_runs_count = 0`;
- badge visibili:
  - `Read-only`;
  - `Provider off`;
  - `Apify off`;
  - `realWritesEnabled=false`;
- nessun bottone:
  - `Run`;
  - `Import`;
  - `Delete`;
  - `Update`;
  - altre azioni di scrittura.

### 7. Verifica DB invariato

Usare solo query read-only su Supabase staging:

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

### 8. Cleanup

Dopo i test:

1. Fare logout dagli utenti test.
2. Non cancellare utenti senza conferma.
3. Non modificare ruoli senza conferma.
4. Se in futuro vengono creati utenti test, documentare cleanup separato.

## Divieti

- Non creare utenti senza conferma.
- Non modificare ruoli senza conferma.
- Non usare service role.
- Non fare `insert/update/delete/upsert`.
- Non scrivere in `provider_import_runs`.
- Non attivare provider.
- Non attivare import.
- Non chiamare provider.
- Non chiamare Apify/SofaScore.
- Non toccare Production.

## Esito da registrare dopo test

Quando la checklist verrà eseguita manualmente, registrare:

- data;
- commit Preview;
- utente `free_user` mascherato;
- risultato accesso `free_user`;
- utente `editor` mascherato;
- risultato accesso `editor`;
- conferma empty state;
- conferma assenza bottoni scrittura;
- conferma DB invariato;
- eventuali errori.

## D.14-C — Esecuzione guidata

Documento operativo:

- `docs/role_access_manual_test_d14c.md`.

D.14-C aggiunge istruzioni puntuali per eseguire manualmente la checklist su Preview e registrare i risultati, senza creare utenti o modificare ruoli.

## D.14-D — Utenti test non trovati

La query read-only D.14-C è stata eseguita manualmente nello staging “Regista Avanzato”.

Risultato:

- `Success. No rows returned`;
- nessun utente test `regista-test-*` trovato;
- nessun utente creato;
- nessun ruolo modificato;
- nessuna scrittura DB.

Le email operative della fase successiva vanno documentate solo mascherate:

- `davide.m***@funcode.it`;
- `caffe1***@gmail.com`.
