# Security TODO

## Bloccanti prima di collegare utenti reali

- [ ] Inizializzare/verificare il repository Git e controllare anche la storia per secret accidentalmente committati.
- [ ] Revocare/ruotare il PAT storicamente segnalato nel sottoprogetto separato `Sito Magazine` e verificare cronologia/remote senza stamparne il valore.
- [ ] Mantenere `.env.local` ignorato; usare secret manager in hosting e CI.
- [ ] Fissare versioni e generare lockfile; eseguire audit delle dipendenze.
- [ ] Applicare RLS a tutte le tabelle accessibili e creare policy deny-by-default.
- [ ] Testare ogni policy come anon, authenticated, editor e admin.
- [ ] Rimuovere l'accesso `mock_admin` dagli ambienti non locali.
- [ ] Aggiungere middleware/proxy admin e ripetere sempre l'autorizzazione nelle funzioni server.
- [ ] Garantire che `SUPABASE_SERVICE_ROLE_KEY` sia importabile solo da moduli `server-only`.
- [ ] Creare una RPC atomica per verifica e incremento quota ricerca.
- [ ] Validare input e output di tutte le operazioni server-side.

## Secret ed env

- Solo URL Supabase e anon key possono avere prefisso `NEXT_PUBLIC_`.
- Service role, token Apify, chiavi provider, budget e configurazioni operative devono restare server-side.
- Non stampare env, header Authorization o payload contenenti token.
- Ruotare immediatamente una chiave se è stata copiata in issue, chat, log o commit.
- Validare a startup presenza e formato delle variabili richieste, senza mostrarne il valore.

## Auth e autorizzazione

- Distinguere autenticazione da autorizzazione: essere loggati non implica essere admin.
- Conservare ruoli in una fonte server-side protetta; non fidarsi di parametri o stato client.
- Proteggere account, preferenze, preferiti e search usage per `auth.uid()`.
- Definire session expiry, logout globale, recovery e gestione email non verificate.
- Aggiungere CSRF/origin checks dove applicabile e rate limiting per login/ricerca.

## Provider e job

- Eseguire provider solo in worker/job server, mai nel browser o in risposta all'apertura pagina.
- Applicare allowlist endpoint, timeout, retry limitati e redazione dei log.
- Rendere atomici budget e lock per impedire run concorrenti.
- Validare payload esterni come non affidabili.
- Usare account e token a privilegi minimi e separati per ambiente.

## Contenuti e copyright

- Conservare URL fonte, stato di verifica, revisore e timestamp.
- Non fare proxy, download o reupload di clip partita.
- Prevedere takedown, revoca link e controllo periodico degli embed.
- Sanitizzare Markdown e contenuti editoriali prima del rendering.
- Impedire auto-publish e auto-send finché non esiste audit trail.

## Verifiche consigliate

- SAST e secret scan in CI.
- Dependency audit e aggiornamenti controllati.
- Test RLS automatizzati.
- E2E per escalation ruolo, accesso cross-user e quota ricerca concorrente.
- Security headers, CSP, frame policy e cookie secure/httpOnly/sameSite.
- Backup, restore e incident response tabletop.
