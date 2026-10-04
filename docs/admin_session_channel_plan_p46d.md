# Punto 46-D — Admin session channel plan

## Scope

Predisposizione di un canale verificabile per ottenere una sessione browser admin reale e ripetere la verifica UI read-only della superficie manual data admin.

Il Punto 46-D non esegue:

- nuove scritture DB;
- provider/import;
- Apify;
- deploy;
- Production;
- creazione utenti;
- modifica ruoli;
- modifica RLS/policy.

Non vengono letti o stampati `.env.local`, cookie, sessioni, header auth, token o chiavi.

## Current blocker

I Punti 46-B e 46-C sono rimasti bloccati con:

- browser_admin_verification_result: `pending_no_admin_session`;
- verification_channel: `unavailable`;
- admin_session_available: `false`;
- route admin protette correttamente con redirect auth per utente non autenticato.

Serve una sessione admin reale per verificare nel browser:

- `/admin/data`;
- `/admin/data/competitions`;
- `/admin/data/competitions/manual-serie-a`;
- `/admin/imports`.

## Auth/admin audit

| Area | File/Route | Finding | Notes |
| --- | --- | --- | --- |
| login route | `app/(public)/login/page.tsx` | route pubblica `/login` disponibile | mostra form login se Supabase runtime è configurato |
| login action | `app/(public)/login/actions.ts` | usa `supabase.auth.signInWithPassword` via server client sessione utente | redirect finale a `/account`; non espone token |
| admin layout guard | `app/admin/layout.tsx` | tutte le route `/admin/*` passano da `requireAdmin()` | layout dinamico server-side |
| admin guard | `lib/admin/requireAdmin.ts` | richiede Supabase configurato, utente autenticato e profilo approvato | non autenticato: redirect `/login?next=/admin`; non admin: `notFound()` |
| admin role check | `lib/admin/requireAdmin.ts` | ruoli ammessi: `editor`, `admin`, `super_admin` | `status` richiesto: `approved` |
| profile table | `users_profile` via `lib/auth/profile.ts` | profilo letto da `users_profile` | ruoli validi: `free_user`, `editor`, `admin`, `super_admin` |
| Supabase SSR client | `lib/supabase/server.ts` | usa solo `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY` | rispetta RLS; commento esplicito: non usa service role |
| browser client | `lib/supabase/client.ts` | usa sole env pubbliche Supabase | permessi regolati da RLS |
| local dev support | `npm run dev` | disponibile se env locali sono configurate | non stampare `.env.local`; login locale richiede account admin esistente |
| preview support | Preview alias documentato | `https://regista-avanzato-git-preview-davide-matteoli.vercel.app` | non creare deploy; usare solo preview già esistente |

## Recommended verification channel

- admin_session_channel_status: `manual_user_browser_session`
- recommended_verification_channel: `manual_user_browser_session`
- admin_session_available: `false`
- browser_admin_verification_result: `pending_admin_session_channel`

Motivo:

- il tool browser `agent-browser` non è disponibile nel PATH locale;
- l’assistente non deve ricevere credenziali, cookie, token o header auth;
- esiste già un Preview alias documentato e protetto;
- esiste una route login app `/login`;
- l’utente può usare un account admin già esistente senza condividere segreti.

Canale alternativo: `local_browser_admin_session`, solo se l’utente apre localmente `npm run dev` e accede con un admin esistente nel proprio browser, senza condividere token/cookie/password.

## Safe user steps

Non incollare password, cookie, token, header auth o screenshot contenenti segreti.

1. Aprire uno dei due ambienti:
   - Preview già esistente: `https://regista-avanzato-git-preview-davide-matteoli.vercel.app`;
   - locale: `http://localhost:3000`, solo se già configurato.
2. Confermare che non sia Production.
3. Accedere da `/login` con account admin già esistente.
4. Aprire `/admin`.
5. Confermare che l’accesso admin sia consentito.
6. Aprire `/admin/data`.
7. Confermare presenza di entry point admin data, testo/badge read-only e assenza di bottoni write.
8. Aprire `/admin/data/competitions`.
9. Confermare presenza di `Serie A Manual Sample`, `manual-serie-a`, `Italy`, `2026`, `draft`, `private_admin`.
10. Aprire `/admin/data/competitions/manual-serie-a`.
11. Confermare:
    - `Manual Team One` / `manual-team-1`;
    - `Manual Team Two` / `manual-team-2`;
    - standings rank 1/2;
    - points 3.00/0.00.
12. Aprire `/admin/imports`.
13. Confermare link verso `/admin/data` e `/admin/data/competitions`.
14. Verificare che non esistano bottoni `Run Import`, `Start Import`, `Execute`, `Sync`, `Save to DB`, `Apply`.

## If admin user is missing

Non creare utenti e non modificare ruoli nel Punto 46-D.

Se non esiste un admin staging:

- admin_user_available: `false`;
- admin_session_channel_status: `blocked_requires_admin_user`;
- prossimo step: piano dedicato per configurare un admin staging, solo con autorizzazione esplicita futura.

## Safety status

- db_write: `false`;
- provider_fetch: `false`;
- external_fetch: `false`;
- provider_import_enabled: `false`;
- apify_enabled: `false`;
- production_touched: `false`;
- deploy_executed: `false`;
- service_role_used: `false`;
- user_created: `false`;
- role_modified: `false`;
- rls_modified: `false`;
- public_exposure_enabled: `false`;
- current_visibility: `private_admin`.
