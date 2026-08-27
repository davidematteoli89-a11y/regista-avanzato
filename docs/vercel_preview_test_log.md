# Vercel Preview test log

## Stato

- Environment: Preview.
- Branch: `preview`.
- Commit: `b5327ba`.
- Deployment status: Ready.
- Deployment Protection: attiva.
- Production non toccata.

## Env configurate

Configurate manualmente solo su Preview:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

Non configurate su Production:

- Supabase staging env.
- Token provider.
- Token Apify.
- Chiavi API calcistiche.

## Test online completati

- Login Supabase: ok.
- `/account`: ok.
- `/account/preferenze`: ok.
- Salvataggio preferenze: ok.
- `/ricerca`: ok.
- `/ricerca?search=1` con quota 3/3: blocco corretto.
- `/admin` con utente admin: ok.
- Logout: ok.
- `/admin` dopo logout: bloccato.
- `/account` dopo logout: bloccato.
- `/account/preferenze` dopo logout: bloccato.

## Cose da non fare

- Non usare `vercel --prod`.
- Non promuovere il Preview a Production.
- Non aggiungere env staging a Production.
- Non disattivare Deployment Protection prima della revisione Production.

## Verifiche manuali consigliate

- Aprire il Preview URL in incognito e confermare richiesta Vercel Authentication.
- Confermare in dashboard Vercel che Production Branch sia `production`.
- Confermare che il deployment del commit `b5327ba` sia Environment Preview.

## C.2.1 — Public Stats Hub demo su Preview

Stato: verificato online.

Deployment verificato:

- Environment: Preview.
- Branch: `preview`.
- Commit: `bb9f8dd`.
- Deployment status: Ready.
- Production non toccata.

Pagine verificate online:

- `/competizioni`.
- `/competizioni/serie-a`.
- `/competizioni/serie-a/squadre`.
- `/competizioni/serie-a/partite`.
- `/competizioni/serie-a/classifica`.

Esito:

- dati demo Supabase visibili online;
- public views e public readers funzionanti in Preview;
- Vercel Preview continua a essere l’unico ambiente collegato a Supabase staging;
- provider reali spenti;
- Apify spento;
- nessun deploy Production;
- nessuna attivazione import.
