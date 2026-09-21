# Supabase Dashboard checklist — Manual import schema values

## Safety rules

1. Aprire solo Supabase Dashboard del progetto staging `Regista Avanzato`.
2. Non aprire SQL Editor per eseguire query.
3. Non copiare chiavi, token, URL segreti o `service_role`.
4. Non usare `service_role`.
5. Non modificare dati, schema, RLS o policy.
6. Usare solo viste di Dashboard in modalità lettura:
   - Table Editor;
   - Database > Tables;
   - Database > Views;
   - Authentication/Policies solo se necessario per leggere RLS/policy.
7. Prendere nota dei valori reali e incollarli nel template sotto.

## Copy/paste result template

Competitions:

- real table name:
- internal id column:
- provider/external id column:
- name column:
- slug column:
- country column:
- category/status column:
- created_at/updated_at:
- FK/relationships:
- existing views:
- RLS enabled:
- SELECT policies:

Teams:

- real table name:
- internal id column:
- provider/external id column:
- name column:
- slug column:
- country column:
- competition relation column:
- created_at/updated_at:
- FK/relationships:
- existing views:
- RLS enabled:
- SELECT policies:

Standings:

- real table name:
- internal standing id column:
- competition id/ref column:
- team id/ref column:
- season column:
- round column:
- rank/position column:
- played column:
- wins column:
- draws column:
- losses column:
- goals_for column:
- goals_against column:
- points column:
- created_at/updated_at:
- FK/relationships:
- existing views:
- RLS enabled:
- SELECT policies:

Conferme:

- SQL executed=false
- DB write=false
- service_role_used=false
- migration_created=false
- migration_applied=false
- db_push_reset=false
- Production untouched=true

