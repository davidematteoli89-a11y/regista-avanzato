# Daily Radar

## Ruolo

Il Daily Radar è un sistema di triage editoriale privato. Raccoglie segnali già disponibili nei mock, li ordina e propone cosa osservare, quali articoli valutare e quali idee potrebbero alimentare Substack, Video Radar, Reel, Creator Pack o Weekly Digest. Non crea contenuti finali e non espone score tecnici al pubblico.

## Daily Radar e Weekly Digest

Il Daily Radar opera sul breve periodo e produce una queue interna di candidati. Il Weekly Digest è un prodotto editoriale successivo: seleziona, verifica e organizza contenuti approvati in un formato leggibile. Un segnale Daily Radar non entra automaticamente nel digest.

## Input mock

Il collector usa soltanto dati in memoria già creati da:

- match trigger disponibili;
- News Radar;
- Story Library;
- Historical Echo;
- Video Radar;
- Article Generator;
- Newsletter/Substack Generator;
- Reel/Video Script Generator.

Statistiche e import reali non sono collegati. Non vengono letti file, Supabase, provider o sorgenti esterne.

## Output privato

Ogni run contiene sorgenti, segnali, candidati ordinati e una preview di digest interno. I candidati includono spiegazione, priorità, score interno, warning e destinazioni suggerite. Status e visibilità restano `candidate`/`pending_review` e `private_admin`; `autoPublish`, `autoSend` e `autoProduce` sono sempre `false`.

## Scoring e priorità

Lo score mock 0–100 aumenta per fonti ufficiali, partite pazze, giovani talenti, collegamenti italiani, Historical Echo forte, utilità Video Radar e contenuti già provvisti di fonti. Diminuisce per rumor, fonti deboli, dati incompleti, copyright incerto e duplicati.

Le soglie producono priorità low, medium, high o urgent. Score e priorità servono esclusivamente a ordinare la queue admin: uno score alto non equivale a verità, approvazione o pubblicabilità.

## Regole e review

- review umana sempre obbligatoria;
- rumor non verificati bloccati;
- candidati senza fonte mantenuti privati e bloccati;
- video non autorizzati vietati;
- nessuna pubblicazione, email o produzione automatica;
- nessun consumo della quota ricerca utenti;
- nessuno score tecnico nel payload pubblico.

## Perché Apify non è daily

Il Daily Radar non chiama Apify. Apify rimane confinato all’import settimanale dei campionati minori per controllare budget, ridurre scraping e rispettare lo scope `latest_round`. Mescolare la scansione quotidiana con il batch weekly violerebbe i confini operativi e di costo già definiti.

## Destinazioni editoriali

Le destinazioni sono suggerimenti: review admin, articolo sito, Radar pubblico futuro, Substack free/paid, Video Radar, Reel script, Creator Pack, Weekly Digest e nota privata. Nessuna destinazione avvia un’azione.

## Attivazione futura

Per Supabase serviranno schema, mapping, RLS admin, repository server-side, audit e deduplica persistente. Per uno scheduler futuro serviranno approvazione esplicita, timezone, idempotenza, lock, retry, osservabilità e separazione rigorosa dal batch Apify weekly. Per fonti reali serviranno provenienza, licenze, timestamp, correzioni e controlli editoriali. Nessuno di questi collegamenti è attivo.

## Rischi editoriali e copyright

I rischi principali sono duplicati, rumor trasformati in fatti, risultati o nomi errati, score interpretati come giudizio editoriale, diritti video incerti e sovrapposizione tra candidati. Ogni elemento deve essere verificato, contestualizzato e approvato da una persona prima di qualunque uso esterno.
