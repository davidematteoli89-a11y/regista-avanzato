# Historical Echo Engine

## Scopo

Historical Echo collega un segnale calcistico moderno a una storia già presente nella Story Library. Il risultato è un candidato editoriale motivato: non un fatto nuovo, un articolo completo o un contenuto pubblicato automaticamente.

Il modulo potrà alimentare in futuro articoli, Daily Radar, Weekly Digest, Newsletter/Substack, Video Radar e generatori di Reel o video script. In questo step non esegue nessuna di queste operazioni.

## Flusso mock

1. Il motore riceve trigger già strutturati in memoria.
2. Seleziona le regole compatibili con il tipo di trigger.
3. Confronta il trigger soltanto con storie `approved` o `published` della Story Library mock.
4. Calcola uno score deterministico tra 0 e 100.
5. Produce una confidence `low`, `medium` o `high`, motivazioni e warning.
6. Restituisce esclusivamente suggerimenti con stato `idea_only` e `autoPublish: false`.

Non vengono eseguiti query Supabase, fetch, scraping, chiamate provider o Apify, letture di file e scritture database.

## Trigger e regole

I trigger includono 5–4, 4–4, partite con molti gol, goleade, rimonte, gol tardivi, possibili triplette, giovani decisivi, collegamenti italiani, ex Serie A, anniversari, stesso risultato o fixture, paese, pattern tattico e parole chiave.

Risultati eccezionali, rimonte documentate, giovani decisivi e anniversari sono segnali forti. Paese, lessico comune e pattern tattici sono segnali deboli: non sono pubblicabili e non bastano senza riscontri aggiuntivi.

Ogni regola dichiara categorie Story Library preferite, peso, soglia minima di review, destinazioni ammesse e obbligo di decisione umana.

## Scoring e confidence

Lo score combina forza del trigger, coerenza della categoria narrativa, corrispondenze tematiche, stato/fonti della storia e valore editoriale. Le soglie mock sono:

- `low`: meno di 50;
- `medium`: da 50 a 74;
- `high`: da 75.

Lo score serve soltanto a ordinare i candidati. Non misura verità storica, qualità assoluta o probabilità e non autorizza mai la pubblicazione. Il pubblico vede una label semplificata, mai il numero o le componenti tecniche.

## Pubblico e admin

Le pagine pubbliche espongono esclusivamente echo `approved` o `published` con visibilità `public_preview` o `public_full`. Non includono trigger tecnici, score numerico, fonti interne, warning o suggerimenti operativi. Una preview omette inoltre confronto completo, partite e timeline.

L'area admin mostra anche `candidate`, `pending_review`, `rejected` e `archived`, insieme a score, confidence, trigger, ragioni, fonti e warning. L'admin resta mock e non contiene azioni operative.

## Destinazioni editoriali

- **Sito:** collegamenti approvati, originali e verificati, con differenze contestuali esplicite.
- **Substack:** approfondimenti o report candidati, senza promessa di dati live o scouting certificato.
- **Video Radar:** possibile angolo narrativo basato su contenuti originali e link ufficiali, mai clip scaricate o ripubblicate.
- **Story Library:** arricchimento dei collegamenti tra storie e match, dopo review.

## Automazioni vietate

Il motore non deve pubblicare, scrivere articoli, creare newsletter, generare script video finali, trasformare score bassi in contenuti, copiare testi esterni o bypassare fact-check e copyright. Ogni passaggio verso un canale editoriale richiede review umana.

## Collegamento futuro ai dati reali

Serviranno schema e policy RLS, reader Supabase server-side, mapping stabile di match/storie, provenienza verificabile dei trigger, deduplica, versioning delle regole, audit log, workflow editoriale e test anti-falso-positivo. Provider e Apify dovranno alimentare Supabase tramite import programmati: il motore e le pagine non li chiameranno direttamente.
