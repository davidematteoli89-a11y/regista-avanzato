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

## C.3.1 — Dettagli editoriali demo su Preview

Stato: verificato online.

Deployment/fix verificato:

- Branch: `preview`.
- Commit fix: `8f83ef1`.
- Environment: Preview.
- Production non toccata.

Pagine dettaglio verificate:

- `/articoli/articolo-demo-c3`;
- `/news/news-demo-c3`;
- `/storie/storia-demo-c3`;
- `/il-calcio-si-ripete/echo-demo-c3`.

Esito:

- i dettagli editoriali demo sono visibili online sul dominio Preview;
- liste e dettagli usano lo stesso identificatore pubblico (`slug`);
- il precedente “contenuto non disponibile” era dovuto alla consultazione del dominio Production, non del Preview;
- Vercel Preview resta l’ambiente corretto per testare Supabase staging.

Non eseguito:

- deploy Production;
- promozione Preview a Production;
- attivazione provider;
- attivazione Apify;
- import automatici.

## C.4.1 — Admin editoriale Supabase su Preview

Stato: verificato online.

Deployment verificato:

- Environment: Preview.
- Branch: `preview`.
- Commit: `8a8f8b5`.
- Deployment status: Ready.
- Production non toccata.

Route admin testate online con utente Supabase admin:

- `/admin/generated-content/articles`: ok.
- `/admin/news-radar`: ok.
- `/admin/story-library`: ok.
- `/admin/historical-echo`: ok.

Esito:

- blocco Supabase staging visibile;
- contenuti demo editoriali visibili;
- mock/dry-run separati dai blocchi staging;
- provider spenti;
- Apify spento;
- nessuna azione reale di publish/edit/delete esposta.

Test protezione:

- dopo logout Supabase, `/admin` mostra 404;
- l’area admin è bloccata correttamente per utente non autenticato.

Non eseguito:

- deploy Production;
- promozione Preview a Production;
- attivazione provider;
- attivazione Apify;
- import automatici;
- azioni reali admin.

## C.4.3 — Deployment Preview admin logout/navbar

Stato: deployment fix CTA trovato e Ready; test manuale completato dall'utente, con nota performance da monitorare.

Deployment individuato:

- Project: `regista-avanzato`.
- Branch: `preview`.
- Commit atteso: `9690fa2`.
- Environment/target: Preview.
- Status: Ready.
- URL: `https://regista-avanzato-ao7cjk4xf-davide-matteoli.vercel.app`.
- Alias branch: `https://regista-avanzato-git-preview-davide-matteoli.vercel.app`.

Verifica protezione:

- richiesta anonima al Preview URL: redirect verso Vercel SSO;
- Deployment Protection/Vercel Authentication attiva;
- nessun contenuto applicativo esposto fuori dalla protezione.

Bug manuale rilevato:

- sul dominio Preview branch, da utente Supabase non loggato, il tasto `Accedi gratis` è visibile ma non naviga correttamente;
- la route corretta di login è `/login`;
- la route corretta di registrazione è `/registrati`.

Fix locale da verificare dopo push:

- sostituire il CTA unico `Accedi gratis` con:
  - `Accedi` verso `/login`;
  - `Registrati gratis` verso `/registrati`;
- usare anchor HTML standard per il link primario `Accedi`, così la navigazione non dipende dalla client navigation di Next;
- mantenere `Account` verso `/account` quando la sessione Supabase esiste.

Deployment dopo fix CTA:

- Commit: `11646dc`.
- Branch: `preview`.
- Environment/target: Preview.
- Status: Ready.
- URL deployment: `https://regista-avanzato-kwh385tqr-davide-matteoli.vercel.app`.
- Alias branch: `https://regista-avanzato-git-preview-davide-matteoli.vercel.app`.

Protezione dopo fix:

- richiesta anonima all'alias Preview: redirect verso Vercel SSO;
- Deployment Protection/Vercel Authentication attiva;
- nessun contenuto applicativo esposto fuori dalla protezione.

Verifica non completabile automaticamente in questa sessione:

- navbar anon/logged-in;
- login Supabase admin;
- click sul tasto `Esci` in `/admin`;
- controllo post-logout di `/admin`.

Motivo:

- il Preview è protetto correttamente da Vercel Authentication;
- il fetch protetto del connettore Vercel non riesce a creare un URL condivisibile;
- il browser agent non è disponibile localmente;
- non sono disponibili credenziali/sessione Supabase admin per test automatico, e non devono essere richieste/stampate in chat.

Checklist manuale Preview dopo push:

- aprire il Preview URL dopo autenticazione Vercel;
- da Supabase logout: homepage mostra `Accedi` e `Registrati gratis`;
- click su `Accedi` apre `/login`;
- click su `Registrati gratis` apre `/registrati`;
- login con utente admin test;
- homepage mostra `Account`;
- `/account` funziona;
- `/admin` funziona;
- tasto `Esci` visibile nell'header admin;
- `/admin/generated-content/articles`, `/admin/news-radar`, `/admin/story-library`, `/admin/historical-echo` restano funzionanti;
- click `Esci` reindirizza a `/login`;
- dopo logout, `/admin` mostra 404/blocco equivalente;
- homepage torna a mostrare `Accedi` e `Registrati gratis`.

Risultato manuale:

- C.4.3 è stato verificato manualmente sul dominio Preview;
- il flusso è funzionale;
- login/logout sono percepiti come lenti;
- tempi precisi non sono ancora stati annotati.

Audit performance locale:

- navbar pubblica: 1 lettura Supabase Auth server-side per richiesta;
- `getCurrentUser()` deduplicata per richiesta con `React.cache`;
- `/account`: la quota ricerca non rilegge più la sessione se la pagina passa già `userId`;
- logout admin: nessuna query profilo/quota, solo `signOut()` e redirect;
- nessun provider, Apify o fetch applicativo esterno coinvolto.

Possibili cause esterne:

- Vercel Authentication davanti al Preview;
- Supabase Auth staging remoto;
- route pubbliche dinamiche per leggere i cookie Supabase;
- cold start/region Preview.

Misure consigliate:

- registrare tempi approssimativi da click a render per login/logout;
- controllare nel Network panel eventuali doppie richieste a `/login`, `/account` o `/admin`;
- verificare se il ritardo è prima o dopo la chiamata Supabase Auth.

Non eseguito:

- deploy CLI;
- deploy Production;
- promozione a Production;
- modifica env;
- attivazione provider;
- attivazione Apify.
