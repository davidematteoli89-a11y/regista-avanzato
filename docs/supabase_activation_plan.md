# Supabase Activation Plan

L'attivazione deve avvenire prima su un progetto **development** separato. Lo schema non va applicato direttamente in produzione.

## Stato di partenza

- Client browser: URL pubblico + anon key.
- Client server: URL pubblico + anon key con cookie SSR.
- Client admin: service role in modulo server-only.
- Schema SQL locale con modello dati esteso.
- RLS policy, migrazioni applicate e stato remoto: non verificati.

## Sequenza di attivazione

### 1. Baseline tecnica

- Installare versioni fissate di Supabase JS/SSR e Next.js.
- Far passare typecheck e build.
- Aggiungere validazione env per browser, server e admin.
- Verificare che il bundle client non contenga service role o token provider.

### 2. Progetto development

- Creare un progetto Supabase dev con regione e piano scelti.
- Inserire le chiavi solo in `.env.local`, hosting secret store o CI protetta.
- Non copiare valori nei documenti o nei log.

### 3. Migrazioni

- Spezzare `supabase/schema.sql` in migrazioni versionate.
- Ordinare enum, tabelle, constraint, indici, trigger e RLS.
- Creare seed mock ripetibili senza dati personali.
- Testare apply, reset e rollback su dev.

### 4. RLS deny-by-default

Definire almeno:

- lettura pubblica solo per record editoriali/pubblici approvati;
- lettura statistiche complete solo per utenti autenticati dove previsto;
- profilo, preferenze, preferiti e usage limitati al proprietario;
- tabelle provider, costi, log e contenuti interni non accessibili a client anon/auth;
- scritture admin/editor per ruolo verificato server-side;
- service role esclusivamente per job controllati.

### 5. Auth e profilo

- Attivare email/password in dev.
- Testare registrazione, login, logout, recovery e session refresh.
- Creare il profilo con una funzione server esplicita inizialmente.
- Aggiungere un trigger `auth.users` solo dopo aver definito retry, idempotenza e failure handling.

### 6. Quota ricerca atomica

- Scegliere un'unica implementazione tra `lib/auth/searchUsage` e `lib/freeSearch`.
- Creare RPC transazionale che controlla periodo e limite, incrementa una sola volta e restituisce stato.
- Definire timezone canonica, preferibilmente UTC nel database.
- Aggiungere unique constraint per utente e periodo e test concorrenti.

### 7. Import e letture

- Attivare prima upsert di competizioni e squadre su dev.
- Conservare provider ID, timestamp, run ID e provenance.
- Collegare il frontend con query di sola lettura.
- Mostrare freshness e mantenere ultimo snapshot valido in caso di errore.

## Criteri di accettazione

- Nessuna service role nel client bundle.
- Test RLS pass/fail documentati.
- Due utenti non possono leggere o modificare record privati reciproci.
- Un anonimo non può leggere statistiche complete o contenuti interni.
- Un utente non può autoassegnarsi il ruolo admin.
- La quota ricerca resiste a richieste concorrenti.
- Migrazioni e seed funzionano da ambiente pulito.
