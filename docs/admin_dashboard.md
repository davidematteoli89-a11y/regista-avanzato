# Admin Dashboard

## Ruolo

L'area `/admin` è il futuro centro operativo privato di Regista Avanzato. Raccoglie stato progetto, competizioni, provider, import, budget, utenti e workflow editoriali senza esporre queste informazioni nel sito pubblico.

Le sezioni previste controllano:

- competizioni, squadre, giocatori e partite;
- provider, consumo API, budget Apify e import;
- Content Radar e News Radar;
- Video Radar e link highlights;
- Story Library e Historical Echo;
- queue Substack e contenuti generati;
- utenti free e utilizzo ricerca.

## Stato mock attuale

Tutte le pagine leggono oggetti in memoria da `lib/admin`. La dashboard non interroga Supabase, non legge env o token, non chiama provider, Apify, YouTube o Substack e non contiene form operativi. Non sono presenti azioni distruttive o pulsanti che fingano salvataggi.

Ogni route eredita il layout admin e mostra chiaramente:

- `mock_admin` / dry-run;
- Supabase non collegato;
- chiamate e scritture reali pari a zero;
- warning sulle funzionalità non operative.

## Protezione futura

`adminAccess.ts` restituisce oggi `isAdminMock: true` per mantenere lo scaffold navigabile. Questa non è sicurezza reale: le route non devono essere distribuite in produzione finché non esistono:

1. autenticazione server-side verificata;
2. ruolo `admin`/`super_admin` letto in modo affidabile;
3. deny-by-default per anonimi, free user ed editor non autorizzati;
4. RLS e policy separate per le tabelle amministrative;
5. middleware/proxy e controllo su ogni server action;
6. audit log, session timeout e protezioni CSRF;
7. principio del minimo privilegio per service role e job.

Il service role non dovrà mai raggiungere componenti client. L'interfaccia non dovrà mostrare token, env, email o dati sensibili non necessari.

## Collegamento futuro a Supabase

I getter mock verranno sostituiti da reader server-side per viste di overview, provider/import logs, budget, content queue e utenti. Le future scritture dovranno usare server action/RPC dedicate, validazione, autorizzazione, idempotenza e conferma esplicita per operazioni distruttive.

Prima del collegamento servono schema/migrazioni revisionati, RLS, staging, seed non sensibili, paginazione, filtri, error handling e test dei ruoli.

## Separazione dal pubblico

I log tecnici, costi, errori provider, note di review e dati utenti appartengono soltanto all'admin. Pubblicarli confonderebbe i lettori, esporrebbe informazioni operative e potrebbe rivelare sicurezza, contratti o dati personali. Il sito pubblico continua a leggere esclusivamente reader pubblici e contenuti approvati.

## Mancanze prima della produzione

Auth/RBAC reali, Supabase, RLS, audit, writer sicuri, gestione segreti, alert, monitoraggio, retention log, approvazioni editoriali, workflow di revoca e test end-to-end. Fino ad allora la dashboard è una rappresentazione tecnica non operativa.
