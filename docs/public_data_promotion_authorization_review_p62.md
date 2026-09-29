# Public Data Promotion Authorization Review — P62

## Scope

Punto 62 è **authorization review only**.

- Nessuna promotion eseguita.
- Nessun SQL eseguito.
- Nessuna DB write.
- Nessun cambio `visibility`.
- Nessun provider/import.
- Nessun deploy.
- Nessuna Production.

## Candidate review

| Item | Expected | Status |
|---|---:|---|
| candidate slug | `manual-serie-a` | confirmed |
| competitions | 1 | confirmed |
| teams | 2 | confirmed |
| standings | 2 | confirmed |
| current visibility | `private_admin` | unchanged |
| target future visibility | `public` | future only |

## Pack review

| Pack item | Exists | Apply status |
|---|---:|---|
| promotion SQL outline | true | no_apply |
| rollback SQL outline | true | no_apply |
| post-verification SQL outline | true | no_apply |

## Authorization requirement

La promotion reale **NON** è autorizzata da questo Punto 62.

La promotion reale richiederà una frase esplicita e completa:

```text
Autorizzo il Punto 63: esegui la promotion a public della fixture manual-serie-a in Supabase staging, includendo competition, teams e standings, senza Production, senza provider/import, senza deploy.
```

Qualsiasi frase generica come:

- procedi
- vai
- continua
- ok
- fallo

non autorizza la DB write.

## Real apply risk summary

Un futuro apply reale cambierebbe:

- `visibility` competition: `private_admin` → `public`;
- `visibility` teams: `private_admin` → `public`;
- `visibility` standings: `private_admin` → `public`;
- public readers: da 0/0/0 a 1/2/2;
- public routes: da empty/not_found a dati visibili.

## Pre-apply checklist for future P63

Prima del futuro apply reale, verificare:

- ambiente Supabase staging selezionato;
- Production esclusa;
- scope 1/2/2 confermato;
- rollback pronto;
- post-verification pronta;
- provider/import off;
- Apify off;
- deploy non previsto;
- autorizzazione esplicita ricevuta;
- nessun token/cookie/header esposto;
- nessun service role in app.

## P62 result

- `authorization_review_completed=true`
- `point_62_public_data_promotion_authorization_review_completed=true`
- `public_data_promotion_mode=authorization_review_no_write`
- `promotion_candidate=manual-serie-a`
- `expected_promotion_competitions_count=1`
- `expected_promotion_teams_count=2`
- `expected_promotion_standings_count=2`
- `explicit_authorization_required=true`
- `generic_proceed_authorizes_write=false`
- `promotion_executed=false`
- `real_sql_executed=false`
- `db_write=false`
- `visibility_changed=false`
- `provider_fetch=false`
- `provider_import_enabled=false`
- `apify_enabled=false`
- `production_touched=false`
- `deploy_executed=false`
- `service_role_used=false`
