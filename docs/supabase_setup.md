# Configurazione Supabase sicura

## Stato dello Step 5

Il progetto è predisposto per Supabase, ma non è collegato a un progetto reale. `schema.sql` non è stato eseguito, Auth/RLS non sono configurati e non è stata effettuata alcuna richiesta di rete.

Le dipendenze `@supabase/ssr` e `@supabase/supabase-js` sono dichiarate in `package.json`, ma non risultano installate nella cartella del progetto. Non è stato eseguito `npm install`.

## Posizione di `.env.local`

Il file deve trovarsi direttamente nella root Next.js:

```text
Regista Avanzato/Progetto Definitivo/.env.local
```

Il file fornito inizialmente era `env.local.pages`, un archivio Apple Pages/ZIP che Next.js non può interpretare. Il documento è stato preservato senza leggerlo ed escluso da Git. È stato creato un nuovo `.env.local` testuale con chiavi vuote/default e permessi `600`; il contenuto del documento Pages non è stato estratto o copiato.

`.gitignore` include `.env.local`, `.env`, `.env.*.local` ed `env.local.pages`.

## Variabili

### Esposte al browser

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

Sono le sole variabili Supabase usate da `lib/supabase/client.ts`. La chiave anon è pubblica per definizione, ma deve operare sempre con RLS corretta.

### Solo server

```env
SUPABASE_SERVICE_ROLE_KEY=
APIFY_TOKEN=
APIFY_SOFASCORE_ACTOR_ID=
APIFY_MONTHLY_BUDGET_EUR=30
APIFY_WARNING_BUDGET_EUR=24
APIFY_HARD_STOP_EUR=30
SPORTS_DATA_API_BASE_URL=
SPORTS_DATA_API_KEY=
STABLE_PROVIDER_DAILY_BUDGET_REQUESTS=
STABLE_PROVIDER_MONTHLY_BUDGET_REQUESTS=
```

Queste variabili non hanno prefisso `NEXT_PUBLIC_` e non devono essere importate da componenti client. `SUPABASE_SERVICE_ROLE_KEY` bypassa RLS.

Supabase sta introducendo chiavi `publishable` e `secret` al posto delle legacy `anon` e `service_role`. Questo step mantiene i nomi richiesti e già previsti dal progetto; una migrazione futura dovrà essere esplicita.

## Client predisposti

### Browser

`lib/supabase/client.ts` è un modulo client e usa esclusivamente URL e anon key pubbliche tramite `createBrowserClient`.

### Server SSR

`lib/supabase/server.ts` è protetto da `server-only`, usa cookie di Next.js e anon key, quindi opera come l'utente e rispetta RLS. Non usa la service role. Il futuro Proxy/Middleware dovrà gestire il refresh dei token.

### Admin

`lib/supabase/admin.ts` è separato e protetto da `server-only`. Usa `@supabase/supabase-js` direttamente, disabilita persistenza/refresh della sessione e legge la service role soltanto quando viene creata l'istanza.

Non importare mai `admin.ts` in componenti con `"use client"`, componenti condivisi con il browser o moduli raggiungibili dal bundle client.

## Controllo credenziali

La scansione dei file non-env ha individuato un Personal Access Token GitHub hardcoded nello script storico `setup_github_vercel.command`. Il valore è stato rimosso e lo script ora richiede `GITHUB_TOKEN` dalla shell, usa un remote senza credenziale e non esegue push automatici.

La credenziale già esposta deve comunque essere revocata/ruotata su GitHub e rimossa anche dalla cronologia Git o da copie remote eventualmente esistenti.

## Passi manuali futuri

1. Compilare manualmente il nuovo `.env.local` testuale nella root Next.js; non usare il documento Pages.
2. Installare le dipendenze solo dopo approvazione e generare il lockfile.
3. Scegliere chiavi legacy o nuove chiavi Supabase e aggiornare i nomi in modo coordinato.
4. Applicare lo schema solo in staging tramite migrazione versionata.
5. Creare policy RLS e testarle per `anon`, `authenticated` e admin.
6. Aggiungere Proxy/Middleware per session refresh e test anti-cache.
7. Ruotare il token GitHub storico.

Nessuno di questi passaggi è stato eseguito automaticamente.
