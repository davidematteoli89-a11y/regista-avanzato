# Public Data Promotion Apply Correction — P66

## Scope

Correzione del Punto 66 dopo il fallimento del primo apply manuale in Supabase staging.

- Staging only.
- Nessuna Production.
- Nessun deploy.
- Nessun provider/import.
- Nessun Apify.
- Nessuna migration/schema change.
- Nessun service role lato app.
- Nessun token letto o stampato.

## Failure reason

Il primo file apply P66 usava `public` come target `visibility`, ma l'enum reale `content_visibility` non contiene quel valore.

Enum reale verificato:

- `private_admin`
- `public_free`
- `public_login_required`
- `public_preview`
- `substack_free`
- `substack_paid`

## Corrected target

Per le route pubbliche no-auth, il target corretto è:

```text
public_free
```

Il target invalido `public` non deve più essere usato come valore DB reale per `content_visibility`.

## Post-failed-apply state

Verifica dopo errore:

| Entity | Visibility | Count |
|---|---|---:|
| competitions | `private_admin` | 1 |
| teams | `private_admin` | 2 |
| standings | `private_admin` | 2 |

Quindi nessuna promotion è stata completata.

## Files corrected

- `supabase/manual/public_data_promotion_apply_p66.sql`
  - target visibility corretto da `public` a `public_free`;
  - precheck/postcheck aggiornati;
  - rollback scope resta `public_free -> private_admin` se mai autorizzato in futuro.
- `lib/public-data/contracts.ts`
  - aggiunta costante `PUBLIC_FREE_VISIBILITY = "public_free"`;
  - `PUBLIC_VISIBILITY` resta alias compatibile verso `PUBLIC_FREE_VISIBILITY`.
- `lib/public-data/readers.ts`
  - continua a usare `PUBLIC_VISIBILITY`, ora risolta a `public_free`.
- audit/dry-run public reader aggiornati per riflettere `public_free`.

## Expected behavior after a future corrected apply

Solo dopo esecuzione manuale corretta in Supabase SQL Editor staging:

- public readers: 1 competition / 2 teams / 2 standings;
- public bundle: `ready`;
- `/competitions`: data visible;
- `/competitions/manual-serie-a`: data visible;
- nessun dato fuori scope;
- nessun provider/import;
- nessun Apify;
- nessuna Production.

## Current status

- `old_invalid_visibility=public`
- `corrected_visibility=public_free`
- `enum_verified=true`
- `post_failed_apply_state_still_private_admin=true`
- `promotion_executed=false`
- `visibility_changed=false`
- `db_write=false`
- `provider_fetch=false`
- `provider_import_enabled=false`
- `apify_enabled=false`
- `production_touched=false`
- `deploy_executed=false`
- `service_role_used=false`
