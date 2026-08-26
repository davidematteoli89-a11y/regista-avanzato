# Local Supabase Auth test log

## Stato

FASE B.6: il codice locale e' stato collegato a Supabase Auth/RPC in modo controllato.

Non sono stati letti o stampati valori `.env.local`, non e' stato collegato Vercel, non sono stati chiamati provider o Apify, non sono state rilanciate migrazioni.

## Modifiche collegate

- Login e registrazione usano Supabase Auth server-side.
- La registrazione invia `display_name` nei metadata Auth per il trigger `users_profile`.
- `createUserProfile()` non imposta piu' `role`.
- Il profilo viene letto da `users_profile` reale.
- Preferenze leggono/scrivono `user_preferences` via RLS.
- La quota ricerca usa RPC reali.
- `/admin` e' protetto server-side da Supabase Auth e ruolo `admin`, `editor` o `super_admin`.

## Test eseguiti localmente

- `npm run typecheck`: passato dopo le modifiche intermedie.
- FASE B.7 pre-flight: `npm run lint`, `npm run typecheck`, `npm run build` passati.
- Dev server avviato su localhost e poi fermato per non lasciare processi appesi.
- Test anon via HTTP locale completati.
- Test UI login/account/admin completati manualmente dall'utente nel browser.

## Test anon B.7

- `/`: status 200.
- `/account`: status 200 con CTA/blocco login.
- `/account/preferenze`: status 200 con CTA/blocco login.
- `/admin`: status 404, quindi bloccato senza sessione.
- `/ricerca`: status 200 con preview/CTA login.
- `/video-radar`: status 200 con preview/CTA login.
- `/highlights`: status 200 con preview/CTA login.

Il blocco `/admin` anon avviene come 404 sicuro. In futuro si puo' decidere se preferire redirect esplicito a `/login`.

## Test manuali consigliati

Completati con dev server locale e credenziali inserite manualmente nel browser:

- login utente test: ok.
- `/account`: ok, mostra profilo reale e quota 3/3.
- `/account/preferenze`: ok.
- salvataggio preferenze: ok via RLS.
- `/ricerca`: ok.
- `/ricerca?search=1`: limite 3/3 mostrato correttamente.
- `/admin`: ok come admin.
- logout con "Esci": ok.
- `/admin` dopo logout: bloccato.
- `/account` dopo logout: bloccato.
- `/account/preferenze` dopo logout: bloccato.

## Confini

I dati editoriali/admin restano in larga parte mock/dry-run. Sono collegate solo basi sicure: Auth, profilo, preferenze, quota RPC, gate admin e prima lettura provider/users.

## Esito B.7

Il collegamento locale Auth/RLS/RPC/Admin e' validato per i flussi principali. Non e' stato collegato Vercel Preview e non sono stati attivati provider reali o Apify.
