# Login + Free Access

## Modello di accesso

Il sito pubblico non viene bloccato. Visitatori anonimi vedono homepage, articoli free, radar, classifiche e risultati base, anteprime statistiche, anteprime Video Radar e pagine newsletter/Substack.

Un account gratuito sblocca statistiche complete di giocatori e squadre, schede partita, riepiloghi, link highlight ufficiali, Video Radar completo, preferiti e tre ricerche avanzate mensili.

Non esistono pagamenti, Stripe, checkout, community o area premium interna.

## Implementazione predisposta

- `/login` e `/registrati`: form con Server Actions Supabase Auth.
- `/account`: profilo base, menu e quota ricerca.
- `/account/preferenze`: lingua, timezone e opt-in editoriale.
- `/newsletter` e `/substack`: pagine pubbliche con CTA esterna.
- Pagine giocatore, squadra, partita e Video Radar: anteprima pubblica e gating server-side.

I controlli sono in `lib/auth/access.ts`. `getCurrentUser()` usa `auth.getUser()` server-side e restituisce `null` in modalità safe o in caso di sessione assente. Le tre funzioni `requireLogin...` restituiscono decisioni tipizzate e non consumano ricerche.

## Modalità safe

Se URL o anon key mancano, nessun client viene creato e nessuna query viene eseguita. Login e registrazione risultano disabilitati, mentre pagine pubbliche e preview continuano a funzionare.

## Profilo

`getUserProfile()` e `createUserProfile()` sono pronti per `users_profile`. La registrazione tenta di creare il profilo solo se Supabase restituisce subito una sessione. Con conferma email attiva, la creazione profilo dovrà essere gestita al primo accesso o da un flusso server autorizzato.

Non è stato creato un trigger su `auth.users`.

## Sicurezza e limiti

RLS è abilitata nello schema ma non ha policy. Per questo le scritture profilo/preferenze non saranno operative su un database reale finché non verranno approvate policy specifiche. Il codice non usa mai la service role nei componenti o nei flussi utente.

## Da configurare

Dipendenze, env Supabase, Site URL e redirect consentiti, conferma email, policy RLS, recupero password, Proxy/Middleware sessione, profilo al primo login, privacy/consensi e test autorizzativi.
