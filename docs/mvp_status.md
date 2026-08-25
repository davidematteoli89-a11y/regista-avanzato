# MVP Status Check

Audit locale concluso il 25 agosto 2026. Questo documento fotografa il repository, non lo stato di servizi esterni. Non sono stati letti i valori di `.env.local`, eseguite migrazioni, effettuate chiamate di rete o installate dipendenze.

## Valutazione generale

Regista Avanzato è un **MVP dimostrabile in modalità mock**, con una struttura ampia e coerente, regole di sicurezza e copyright già espresse nel codice e nella documentazione. Non è ancora un MVP operativo in produzione: i dati reali, Supabase, Auth, RLS, provider, import pianificati e workflow editoriali persistenti non sono attivati.

Classificazione primaria dell'audit: **14 moduli completi nel perimetro mock/configurativo**, **5 parziali** e **8 mock o da collegare**. La parola “completo” non implica integrazione reale: indica che lo scopo safe/mock richiesto dallo step corrispondente è presente.

Legenda:

- **Completo**: obiettivo dello step implementato e utilizzabile nel perimetro mock dichiarato.
- **Parziale**: struttura presente, ma restano incoerenze o verifiche tecniche.
- **Mock**: demo coerente senza integrazioni o persistenza reali.
- **Da collegare**: preparato, ma dipende da servizi, credenziali, mapping o policy esterne.

## Audit dei 27 moduli

| # | Modulo | Stato | Funziona oggi | Mock / placeholder | Manca per produzione | Rischi e dipendenze |
|---|---|---|---|---|---|---|
| 1 | Struttura iniziale | Parziale | App Router, TypeScript, cartelle e documentazione sono presenti | Gran parte dei contenuti è dimostrativa | Installazione riproducibile, lockfile, build verificata e layout pubblico uniforme | Dipendenze `latest`, nessun test, navigazione ripetuta nelle singole pagine |
| 2 | Competizioni e provider | Completo nel perimetro config | 43 competizioni: 14 FULL, 15 P1, 14 P2; sei provider configurati | ID esterni, calendario import e copertura reale | Verifica commerciale e mapping con il provider scelto; eventuali competizioni TRIGGER reali | Copertura e nomenclature variano per provider |
| 3 | Schema Supabase | Da collegare | Schema SQL ampio con tabelle, enum, indici e trigger `updated_at` | È una definizione locale | Migrazioni versionate, applicazione su progetto dev, seed controllato, policy RLS | RLS è abilitabile ma non esistono policy; lo stato remoto non è stato verificato |
| 4 | Usage e budget provider/Apify | Completo nel perimetro safe | Soglie, decisioni e log leggibili sono modellati | Letture e scritture budget non persistono | Contatori transazionali, dati di costo reali, alert e hard stop server-side | Concorrenza e stime di costo possono superare le soglie senza atomicità |
| 5 | Client Supabase e `.env` | Parziale / da collegare | Separazione browser/server/admin e variabili documentate | Client dipendono da pacchetti ed env non verificati | Installare dipendenze, configurare env, testare sessioni e cookie | Service role deve restare solo server; repository Git non rilevato, quindi storia dei secret non verificabile |
| 6 | Login e Free Access | Parziale | Pagine, form, guard e stato safe sono presenti | Profilo, preferenze e accesso reale dipendono da Supabase | Auth reale, redirect, RLS, RBAC, gestione errori e test sessione | Nessun middleware di protezione; verificare un possibile caso `user` nullo nelle preferenze |
| 7 | Provider astratto | Completo nel perimetro mock | Interfaccia comune, tipi, normalizzazione, router e fallback mock | Nessuna sorgente reale attiva | Test di contratto per ogni adapter e persistenza import | Drift tra payload esterno e modello normalizzato |
| 8 | Provider stabile | Mock / da collegare | Wrapper e adapter TheStatsAPI/API-Football non rompono senza config | Endpoint e mapping reali sono placeholder | Scelta provider, contratto, token, mapping ID, rate limit e test sandbox | Costi, copertura differente e lock-in se il wrapper viene aggirato |
| 9 | Provider Apify/SofaScore | Mock / da collegare | Validazione latest-round, esclusione FULL e controlli budget | Nessuna actor run reale | Verifica termini/licenze, actor affidabile, token, parser fixture e persistence | Fragilità scraping, variazioni schema, budget e diritti di riuso |
| 10 | Import competizioni e squadre | Mock | Piano dry-run, mapping payload e fallback provider | Nessun upsert | Resolver degli ID, transazioni, deduplica e log persistenti | Duplicati e associazioni errate senza chiavi esterne stabili |
| 11 | Import partite e risultati | Mock | Piano dry-run per match, risultati, eventi e trigger | Nessun dato remoto o upsert | Stato partita idempotente, timezone, rinvii, reconciliation | Match duplicati, correzioni post-gara e calendari instabili |
| 12 | Import statistiche FULL | Mock | Guardia FULL-only e payload squadra/giocatore conservativi | Stats generate per demo | Provider con copertura verificata, ID risolti, upsert idempotenti | Campi mancanti, definizioni statistiche non uniformi, xG/xA non universali |
| 13 | Import Apify settimanale | Mock | P1 precede P2, soglie 24/30 €, latest round, nessuna write | Scheduler e run sono disabilitati | Scheduler, lock, retry, persistenza costo e ultimo dato valido | Run duplicate, stima costo imprecisa e fallimenti parziali |
| 14 | Ricerca avanzata free | Parziale / mock | UI, indice mock e limite nominale di 3 ricerche | Uso non persistente; due implementazioni della quota | Unificare il servizio e creare RPC atomica con RLS | Race condition, doppio conteggio e differenze tra periodo UTC/server |
| 15 | Newsletter/Substack pubblico | Completo nel perimetro mock | Pagine, piani, preview e CTA safe | URL può essere placeholder; nessuna API | URL ufficiale, copy legale/commerciale definitivo e analytics consentiti | Evitare promesse eccessive sui report paid |
| 16 | Public Stats Hub | Completo nel perimetro mock | Rotte e viste statistiche dimostrative | Lettura da mock, non da Supabase | Query read-only, loading/error/empty state, cache e access control reale | Dati obsoleti e leakage di campi interni se i mapper vengono bypassati |
| 17 | Video Radar e highlights | Completo nel perimetro mock | Preview/access rules, fonti ufficiali e blocchi copyright | Link e record dimostrativi | Workflow admin verificato, provenance, takedown e audit trail | Embed rimossi, geoblocking, diritti e fonti non più ufficiali |
| 18 | Admin Dashboard | Mock, non production-ready | Pagine gestionali e warning dimostrativi | Accesso admin consente un `mock_admin` | Auth reale, RBAC, middleware, server-action checks e RLS | Oggi non costituisce un confine di sicurezza |
| 19 | Story Library Markdown | Completo nel perimetro mock | Parsing/modello, stato editoriale e pubblicazione filtrata | Corpus e persistenza sono demo | Ingest controllato, storage/versioning, attribution e backup | Fonti incomplete, copyright PDF e metadati incoerenti |
| 20 | Historical Echo Engine | Completo nel perimetro mock | Matching e output dimostrativo con review | Trigger e collegamenti sono mock | Dataset reale, valutazione qualità, explainability e persistence | Falsi parallelismi storici e presentazione di inferenze come fatti |
| 21 | Public Website magazine | Parziale / mock | Homepage e sezioni editoriali sono navigabili nel codice | Contenuti prevalentemente mock | Layout pubblico unico, CMS/workflow, SEO e build/browser test | Header/footer non uniformi tra tutte le rotte pubbliche |
| 22 | News Radar | Completo nel perimetro mock | Scoring interno, filtri pubblici e review | Nessun ingest reale | Feed autorizzati, deduplica, attribuzione, fact-check e persistence | Rumour, licenze, duplicati e diffusione di informazioni non verificate |
| 23 | Article Generator | Completo nel perimetro mock | Generazione strutturata e human review | Nessun modello AI, DB o publish | Provenance, fact-check, versioning e approvazione editoriale | Allucinazioni e perdita di attribuzione se automatizzato |
| 24 | Newsletter Generator | Completo nel perimetro mock | Composizione preview e checklist | Nessun invio, API o storage | Flusso revisione, export Substack e consenso editoriale | Invii accidentali e promesse commerciali incoerenti |
| 25 | Reel/Video Script Generator | Completo nel perimetro mock | Script e indicazioni editoriali senza clip non autorizzate | Nessuna produzione media o pubblicazione | Asset rights, voice/visual workflow e approvazione | Copyright, likeness, musica e rappresentazione fuorviante |
| 26 | Daily Radar | Completo nel perimetro mock | Aggregazione dimostrativa e blocco Apify giornaliero | Nessuno scheduler o stato persistente | Job server, deduplica, osservabilità e review | Ripetizioni, fonti stale e tentazione di introdurre scraping live |
| 27 | Weekly Digest | Completo nel perimetro mock | Digest aggregato da snapshot, senza auto-invio | Nessuno scheduler, DB o Substack | Persistenza snapshot, approvazione ed export manuale/controllato | Dati incompleti, duplicati e pubblicazione prematura |

## Controlli obbligatori

### Sicurezza

- `.env.local` esiste, è ignorato da `.gitignore` e ha permessi locali restrittivi. I valori non sono stati letti.
- La scansione dei file sorgente, escludendo gli env locali, non ha trovato token reali evidenti.
- Non è stato rilevato un repository Git nella directory del progetto: non è quindi possibile certificare che credenziali non siano mai state versionate in passato.
- La memoria di workspace segnala una precedente esposizione di PAT in un sottoprogetto storico distinto (`Sito Magazine`): la rotazione/revoca e la bonifica della cronologia restano un'attività di sicurezza separata da questo audit.
- `SUPABASE_SERVICE_ROLE_KEY` compare nel client admin server-only e non nei componenti client rilevati.
- Apify e provider stabile usano variabili server-side, senza prefisso `NEXT_PUBLIC_`.
- L'area admin non è protetta realmente: RBAC, middleware e controlli server-side sono attività bloccanti prima della produzione.
- Nelle directory applicative controllate non sono state rilevate azioni distruttive reali attive.

### Provider e flussi dati

- `mock_provider` e `manual_provider` sono attivi; provider stabile, TheStatsAPI, API-Football e Apify sono disattivati.
- Nessun `fetch` o accesso provider reale è presente nei percorsi applicativi controllati.
- Le pagine pubbliche non importano router/provider/Apify: la separazione prevista è provider → import server → Supabase → sito.
- I generatori e gli import mantengono disabilitati write, fetch, auto-publish e auto-send.

### Supabase e accessi

- I client browser, server e admin sono separati correttamente a livello architetturale.
- Lo schema non risulta applicato da questo audit; lo stato remoto non è stato interrogato.
- Le policy RLS non sono implementate.
- Login, profili, preferenze e usage contengono percorsi preparati per Supabase, ma non sono dimostrabili senza dipendenze/configurazione.
- Il limite di ricerca è mock e deve diventare una singola operazione atomica server-side.

### Copyright e pubblicazione

- Sono vietati download, reupload, storage locale e fonti video non autorizzate.
- I link pubblici devono risultare approvati e verificati; URL mancanti non vengono inventati.
- News, storie, Historical Echo e contenuti generati applicano stati editoriali e review umana.
- Non sono state trovate automazioni attive di pubblicazione, invio newsletter o produzione video.

### Build e qualità

- Non sono presenti `node_modules` o lockfile; le dipendenze dichiarate non sono installate.
- Non è stato possibile eseguire la build Next.js reale senza installare pacchetti, operazione esclusa dallo step.
- I pacchetti dichiarati da installare in futuro sono `next`, `react`, `react-dom`, `@supabase/supabase-js`, `@supabase/ssr`, `typescript`, `eslint`, `eslint-config-next`, `@types/node`, `@types/react` e `@types/react-dom`, con versioni fissate e lockfile.
- Un controllo TypeScript esterno al progetto ha prodotto molti errori dovuti soprattutto alle dipendenze mancanti; ha inoltre evidenziato punti da riesaminare dopo l'installazione, tra cui nullabilità utente nelle preferenze e typing cookie Supabase.
- Non sono presenti test automatici, test runner o verifiche browser/responsive/accessibilità.

## Cosa posso mostrare oggi

### Già navigabile mock

- Magazine pubblico, Radar, Stats Hub, Video Radar, ricerca, newsletter e Substack.
- Login/account in stato safe dimostrativo.
- Story Library, Historical Echo, News Radar e preview editoriali.

### Utile per demo interna

- Admin Dashboard con dati e warning mock, dichiarandola esplicitamente non protetta.
- Generator di articoli, newsletter e script Reel con review umana.
- Piani dry-run per import FULL, Apify weekly, Daily Radar e Weekly Digest.

### Non pronto per pubblico reale

- Registrazione/login reale e persistenza profilo.
- Quota di tre ricerche realmente applicata.
- Dati sportivi aggiornati automaticamente.
- Budget provider/Apify realmente contabilizzato.
- Area admin protetta, pubblicazione, newsletter o workflow video automatici.

### Vietato usare come dato reale

- Risultati, statistiche, classifiche, profili, usage, costi e link presenti nei dataset mock.
- Qualunque flusso che richieda dati personali, ruoli admin, scritture DB o garanzie di aggiornamento.

## Decisione consigliata

Non andare subito sui provider reali. Prima rendere riproducibile la build, poi collegare Supabase staging, attivare Auth/RLS, provare un import mock persistito e solo dopo scegliere un provider reale. Fino a quel momento il prodotto deve restare chiaramente etichettato come demo mock e chiuso ai flussi sensibili.
