# Supabase staging next steps

## Prossima fase consigliata

FASE B.7: test manuale UI locale con Supabase staging e preparazione env Vercel Preview.

## Prima di collegare Vercel Preview

- Utente test e trigger `users_profile` gia' verificati in staging.
- Testare manualmente login, account e preferenze contro staging.
- Quota ricerca collegata alla RPC staging in codice locale.
- `/admin` protetto server-side con ruolo admin/editor/super_admin.
- Non inserire `SUPABASE_SERVICE_ROLE_KEY` in client o componenti browser.

## Test database da completare

- Decidere come allineare la cronologia Supabase migrations dopo l'applicazione manuale una-per-una.
- Test RPC quota con profilo approved: completato in modo sequenziale.
- Test concorrenza RPC con chiamate parallele.
- Test `free_user` su profilo/preferenze proprie.
- Test admin dopo promozione manuale controllata: completato.
- Test dati published minimi su view pubbliche.
- Test UI locale con password inserita solo nel browser: completato per login, account, preferenze, ricerca quota, admin e logout.

## Prossimo passaggio operativo

Preparare Vercel Preview con le sole env Supabase staging necessarie, mantenendo Deployment Protection attiva e senza collegare provider reali o Apify.
- Test che draft/private restino invisibili ad anon e free_user.

## Env staging futuri

Da inserire manualmente solo quando si passa al collegamento applicativo:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`, solo se serve per job/server action e mai nel client.

Non inserire ancora token provider, token Apify o chiavi calcistiche.

## Vercel Preview

Collegare Vercel Preview a Supabase staging solo dopo i test Auth/RLS minimi. Mantenere Deployment Protection attiva.

## Cose da non fare ancora

- Non fare deploy production.
- Non creare provider reali.
- Non chiamare TheStatsAPI, API-Football o Apify.
- Non importare dati calcistici reali.
- Non pubblicare contenuti reali.
- Non creare utenti admin senza procedura manuale e audit.
