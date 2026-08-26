# Admin role test plan

## Stato

Step 5 eseguito su Supabase staging `Regista Avanzato`.

L'unico utente test presente e' stato promosso da `free_user` ad `admin` dopo conferma esplicita. Non sono stati creati altri utenti, non sono stati inseriti audit log, non sono stati attivati provider o Apify.

## Query di promozione usata

```sql
update public.users_profile
set
  role = 'admin',
  updated_at = timezone('utc', now())
where id = (select id from auth.users limit 1)
  and role = 'free_user'
  and status = 'approved'
returning
  role,
  status,
  created_at is not null as has_created_at,
  updated_at is not null as has_updated_at;
```

Risultato: `role = admin`, `status = approved`, timestamp presenti.

## Helper RBAC

Con contesto `authenticated` dell'utente test:

- `has_role('admin') = true`.
- `is_admin() = true`.
- `is_editor_or_admin() = true`.
- `has_role('editor') = false`.
- Il ruolo corrente non e' piu' `free_user`.

## Letture admin

Letture riuscite come admin:

- `data_providers`: 6 righe.
- `provider_competition_config`: 100 righe.
- `api_usage_logs`: 0 righe.
- `apify_usage_logs`: 0 righe.
- `import_logs`: 0 righe.
- `admin_audit_logs`: 0 righe.
- `active_external_providers`: 0 righe.
- `import_enabled_configs`: 0 righe.

Per i contenuti operativi, la lettura sicura passa dalle view `admin_*`:

- `admin_competitions` con draft/private: 43 righe.
- `admin_generated_content`: 0 righe.

Le tabelle base `competitions` e `generated_content` restano senza SELECT diretto per `authenticated`: e' coerente con il modello difensivo che separa scritture RLS e letture admin via view.

## Audit log

Nessun audit log e' stato inserito in questo step. Per testarlo, usare in futuro un insert minimale confermato esplicitamente:

```sql
insert into public.admin_audit_logs (
  admin_user_id,
  action,
  entity_type,
  entity_id,
  metadata
)
select
  auth.uid(),
  'staging_admin_role_test',
  'system_test',
  null,
  '{"scope":"staging_rbac_test"}'::jsonb;
```

La query va eseguita solo con contesto admin autenticato e dopo conferma.

## Esito

RBAC admin funzionante per gli helper e per le letture operative previste. Nessun provider reale attivo, nessun import abilitato, nessun audit log inserito.
