# Piano Auth e amministrazione staging

Questo documento non crea utenti, trigger, policy o ruoli.

## Flusso free consigliato

1. Registrazione email/password tramite client SSR Supabase.
2. Conferma email attiva in staging condiviso; configurare Site URL e redirect URL solo per localhost e URL Preview autorizzati.
3. Callback Auth server-side che scambia il code e porta all'account.
4. Creazione idempotente di `users_profile` con ruolo fisso `free_user`.
5. Creazione lazy/idempotente di `user_preferences`; la quota nasce alla prima ricerca avanzata tramite RPC.
6. Login, logout e refresh sessione tramite cookie SSR.
7. Recupero password futuro con callback e pagina di reset dedicate.

## Bootstrap del profilo

Il codice corrente crea il profilo solo se `signUp()` restituisce già una sessione. Questo non copre la conferma email. Prima del test reale scegliere una strategia unica:

- **Trigger Auth raccomandato:** trigger `after insert` su `auth.users`, funzione `security definer`, `search_path` fissato e insert del solo ID/display name; ruolo sempre `free_user`.
- **Alternativa server action:** dopo callback/login chiamare un upsert idempotente autenticato. Richiede policy insert rigorosa e non deve accettare ruolo dal form.

Non mantenere entrambe come fonti di logica. In entrambi i casi impedire al client di impostare `role`, `status` e `internal_notes`.

## Ruoli

Per staging sono sufficienti `free_user`, `editor`, `admin`, `super_admin`, già ammessi dal check dello schema. Il valore autorevole è nel database, non in `user_metadata`. Se la gestione ruoli cresce, valutare una tabella `user_roles`; per il primo staging `users_profile.role` è sufficiente.

La promozione admin deve avvenire manualmente dopo aver creato un vero utente Auth di staging. Non inserire un profilo fittizio: la FK verso `auth.users` lo renderebbe invalido e non va mai seedata una password.

## Protezione `/admin`

Prima di esporre Preview con Supabase:

1. rendere `getAdminAccess()` server-side e basato su `getCurrentUser()`;
2. leggere il ruolo con RLS sicura o helper server;
3. negare/redirectare nel layout admin prima di renderizzare children;
4. applicare RLS staff alle tabelle operative;
5. mantenere Vercel Authentication come secondo perimetro staging;
6. non usare la service role per simulare la sessione admin.

Lo stato attuale `mock_admin` consente l'accesso a chiunque raggiunga `/admin`; la UI dichiara il mock ma non è una barriera di sicurezza.

## Email e recovery

- Decidere esplicitamente conferma email; raccomandata per staging condiviso.
- Configurare redirect allowlist, evitando wildcard e domini production.
- Prevedere `/auth/callback` e successivamente richiesta/reset password.
- Limitare rate e messaggi per evitare account enumeration.
- Non creare newsletter subscriber automaticamente senza consenso separato.

## Test Auth

- Registrazione confermata e non confermata.
- Profilo creato una sola volta anche con retry.
- Login/logout e session refresh.
- Preferenze proprie modificabili; quelle altrui negate.
- Free negato su `/admin`; admin ammesso; ruolo non elevabile dal client.
- Account disabilitato/rejected trattato come non autorizzato.
- Nessuna service role presente nel bundle client o nei log.
