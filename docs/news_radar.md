# News Radar

## Scopo

News Radar raccoglie e classifica segnali calcistici che, dopo verifica, potranno diventare articoli, contenuti Radar, newsletter/Substack, Historical Echo, Video Radar, Daily Radar o Weekly Digest. In questo step lavora soltanto su fixture mock in memoria e produce idee editoriali, mai articoli completi.

## Pubblico e admin

Il pubblico vede esclusivamente record `approved` o `published`, con visibilità compatibile e almeno una fonte ammessa dalle regole pubbliche. Non riceve score numerici, priorità, warning, note interne, fonti riservate, informazioni sui provider o costi tecnici.

L'admin mostra anche `draft`, `candidate`, `pending_review`, `rejected` e `archived`, insieme a score, priorità, segnali, fonti, affidabilità, warning e destinazioni suggerite. Le pagine admin non hanno azioni operative e non scrivono dati.

## Stati e visibilità

Gli stati descrivono il workflow: `draft`, `candidate`, `pending_review`, `approved`, `published`, `rejected`, `archived`. Candidate e pending restano sempre privati. Approvazione e pubblicazione non rendono automaticamente un record pubblico: serve anche una visibilità diversa da `private_admin` e una fonte compatibile.

Le visibilità supportano contenuto pubblico completo, preview, account free, Substack e candidati paid esterni. `login_required` e `substack_only` sono scopribili sul sito, ma il corpo resta nascosto nella preview anonima.

## Categorie

Le categorie distinguono news ufficiali, mercato, infortuni, tattica, talenti, campionati minori, collegamenti italiani, candidati Historical Echo e Video Radar, controversie, segnali dati, cultura, preview e reaction delle partite.

## Fonti e affidabilità

Le fonti possono essere club, leghe, federazioni o giocatori ufficiali; giornalisti verificati; testate; segnali database; ricerca manuale; social; rumor o fonti sconosciute. L'affidabilità è `official`, `high`, `medium`, `low` o `unverified`.

Ogni record richiede una fonte. `unknown`, `unverified`, rumor e social sono bloccati per il pubblico. La classificazione è soltanto offline: nessun URL viene aperto o verificato in rete. Una fonte media o manuale richiede comunque decisione umana.

## Scoring e priorità

Lo score mock resta tra 0 e 100. Aumenta con fonte ufficiale, club italiano, ex Serie A, giovane talento, partita pazza e candidati Historical Echo/Video Radar. Diminuisce con rumor, bassa affidabilità, duplicati e fonte mancante.

Le priorità sono `low`, `medium`, `high`, `urgent`. Servono esclusivamente a ordinare la queue admin: anche score 100 e priorità urgent non autorizzano la pubblicazione e non sono mostrati al pubblico.

## Rumor, social e controversie

Richiedono sempre review umana e fonti indipendenti. Un rumor non verificato non riceve destinazioni editoriali operative. Titoli sensazionalistici o assertivi vengono bloccati quando la fonte non è ufficiale. Le formulazioni devono distinguere chiaramente possibilità, fonte e livello di verifica.

## Destinazioni future

Le regole possono suggerire articolo, Radar pubblico, Substack free/paid, Historical Echo, Video Radar e Weekly Digest. Sono soltanto indicazioni `idea_only`: non creano contenuti, newsletter o script e non inviano nulla agli altri moduli.

## Automazioni vietate

Sono vietati fetch, scraping, API news, auto-pubblicazione, generazione automatica di articoli finali, propagazione automatica di rumor, bypass della review e visualizzazione pubblica di dati tecnici interni.

## Collegamento futuro

Per usare fonti reali serviranno reader Supabase protetti da RLS, modello di provenienza, deduplica/versioning, timestamp e autore della fonte, fact-check, audit log, workflow di rettifica, policy legale e test anti-leak. Eventuali acquisizioni dovranno avvenire server-side tramite import approvati: le pagine pubbliche non chiameranno siti o API news.
