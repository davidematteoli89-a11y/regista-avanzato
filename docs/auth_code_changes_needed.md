# Auth code changes needed after Supabase migration

## Profilo utente

Lo schema crea il profilo tramite trigger su `auth.users` con ruolo default `free_user`. Dopo la migrazione, il codice applicativo dovra' trattare `users_profile` come profilo gia' esistente.

Aggiornato in FASE B.6:

- `createUserProfile()` non imposta piu' `role` dal client.
- La registrazione passa `display_name` come metadata Auth.
- Le update profilo lato utente restano limitate a campi consentiti.

Resta valido:

- Qualsiasi promozione admin deve essere manuale, auditata e server-side.

## Login e conferma email

Da decidere per staging:

- conferma email attiva o disattiva;
- pagina/callback di conferma email;
- recupero password futuro;
- comportamento se il profilo e' `pending`, `suspended` o assente.

## Ricerca avanzata

Il codice in `lib/freeSearch` e gli helper login sono stati collegati alla RPC:

- `get_user_search_usage_status()` per leggere quota;
- `increment_user_search_usage()` per consumare quota;
- nessuna scrittura diretta su `user_search_usage`;
- nessun incremento per view stats, highlights, Video Radar, profili giocatore, squadre o partite.

La chiamata RPC deve essere server-side o comunque tramite client authenticated senza service role nel browser.

## Client Supabase

- `lib/supabase/client.ts` deve usare solo `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
- `lib/supabase/admin.ts` puo' usare `SUPABASE_SERVICE_ROLE_KEY` solo in server-only modules.
- Nessun componente client deve importare admin client o service role.

## Admin

`/admin` ora ha gate server-side Supabase Auth/RBAC. Restano da completare:

- sostituire progressivamente reader mock con view `admin_*`;
- scrivere audit log per azioni reali future.
