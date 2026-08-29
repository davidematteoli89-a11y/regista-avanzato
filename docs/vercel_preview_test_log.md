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

Stato: completato e verificato manualmente sul Preview.

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

Checklist manuale Preview completata:

- aprire il Preview URL dopo autenticazione Vercel;
- da Supabase logout: homepage mostra `Accedi` e `Registrati gratis`;
- click su `Accedi` apre `/login`;
- click su `Registrati gratis` apre `/registrati`;
- registrazione funzionante;
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
- `/admin` funziona solo con account admin;
- utenti non loggati/non admin restano bloccati o ricevono 404;
- provider e Apify restano spenti;
- Production non è stata toccata;
- login/logout sono percepiti come lenti;
- tempi precisi non sono ancora stati annotati.

Nota Supabase Auth:

- la conferma email dipende dalla configurazione Supabase Auth `Site URL` e `Redirect URLs`;
- su Preview questi URL devono puntare al dominio Preview o all'alias Preview usato per i test;
- `localhost` è corretto solo per sviluppo locale;
- i link email già generati prima del cambio URL possono continuare a puntare al vecchio URL;
- dopo la correzione degli URL, rigenerare la registrazione o l'email di conferma.

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

## C.5.3-A — Server Action note interne admin

Stato: verifica manuale Preview completata.

Commit verificato:

- `91e3e89`.

Branch/environment attesi:

- branch `preview`;
- environment `Preview`;
- Deployment Protection attiva.

Route da testare:

- `/admin/generated-content/articles`.

Elementi UI attesi:

- blocco Supabase staging;
- textarea `Note interne`;
- bottone `Salva note`;
- badge `Staging manual action`;
- nessun bottone unpublish;
- nessun publish;
- nessun delete;
- nessun create draft operativo.

Test manuale completato:

1. deployment Preview commit `91e3e89` Ready;
2. login come admin riuscito;
3. `/admin/generated-content/articles` accessibile;
4. textarea `Note interne` visibile;
5. bottone `Salva note` visibile;
6. badge `Staging manual action` visibile;
7. modifica nota interna demo riuscita;
8. pagina aggiornata senza errore;
9. `admin_audit_logs` verificato con nuova riga `update_editorial_internal_notes`.

Query audit:

```sql
select
  action,
  entity_type,
  entity_id,
  before_data,
  after_data,
  metadata,
  created_at
from public.admin_audit_logs
where action = 'update_editorial_internal_notes'
order by created_at desc
limit 5;
```

Risultato confermato:

- `action = update_editorial_internal_notes`;
- `entity_type = article`;
- `before_data`, `after_data`, `metadata` presenti;
- `created_at` recente.
- unpublish non presente;
- publish non presente;
- delete non presente;
- create draft non presente;
- provider/Apify spenti;
- Production non toccata.

Nota:

- il test positivo richiede sessione admin reale nel browser;
- non va simulato dal Supabase SQL Editor, dove `auth.uid()` risulta `null`.

## C.6 — Stato Preview a chiusura MVP staging

Stato: Preview valida come demo staging protetta.

Verificato:

- deployment Preview funzionante;
- Vercel Authentication attiva;
- navbar pubblica auth-aware;
- login/registrazione/account funzionanti;
- pagine competizioni demo da Supabase;
- pagine editoriali demo da Supabase;
- admin protetto;
- admin editoriale legge dati Supabase staging;
- update note interne admin funzionante;
- audit log creato dalla RPC.

Non verificato/non attivo in Preview:

- Production;
- provider reali;
- Apify;
- import automatici;
- Substack API;
- publish/unpublish/delete/create draft.

Nota:

- la Preview resta il solo ambiente online collegato a Supabase staging;
- Production non deve ricevere env o deploy finché non viene completata una readiness review dedicata.

## C.5.4 — Test Preview da eseguire

Stato: test manuale Preview completato.

Commit verificato:

- `08d03bd`.

Deployment:

- target/environment: Preview;
- status: Ready;
- alias: `https://regista-avanzato-git-preview-davide-matteoli.vercel.app`.

Route principale:

- `/admin/generated-content/articles`.

Elementi UI attesi:

- form note interne ancora presente;
- nuova sezione `Rimuovi da pubblicazione` solo su contenuti `published`;
- select target `draft`/`archived`;
- campo `Motivo`;
- checkbox `Confermo rimozione pubblicazione`;
- badge `Staging destructive-like action`;
- nessun publish;
- nessun delete;
- nessun create draft.

Test manuale completato:

1. login come admin riuscito;
2. route `/admin/generated-content/articles` usata;
3. contenuto demo `published` selezionato;
4. target `draft` usato;
5. conferma spuntata;
6. click `Rimuovi da pubblicazione` completato;
7. pagina aggiornata senza errore;
8. contenuto rimosso dalla pubblicazione;
9. `admin_audit_logs` verificato.

Risultato confermato:

- `action = unpublish_editorial_content`;
- `entity_type = article`;
- `entity_id = f528beb7-6c57-4cb3-9c0b-4cca9757bd38`;
- `before_data.status = published`;
- `before_data.visibility = public_free`;
- `after_data.status = draft`;
- `after_data.visibility = private_admin`;
- `after_data.published_at = null`;
- `created_at` recente;
- provider/Apify spenti;
- Production non toccata.

Nota C.5.4-A:

- audit metadata ha `reason_present = false` e `reason_preview = ""`;
- il codice form/action passa correttamente `reason` alla RPC;
- se il motivo è stato lasciato vuoto, il risultato è coerente;
- se il motivo era compilato, serve micro-fix separato per renderlo obbligatorio;
- non è stato usato service role;
- non è stato fatto deploy CLI;
- publish/delete/create draft/bulk restano disabilitati.
