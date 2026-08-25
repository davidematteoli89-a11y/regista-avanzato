# Weekly Digest

## Ruolo

Il Weekly Digest organizza i migliori segnali mock della settimana in una bozza editoriale privata. Serve a preparare candidati per newsletter free, Substack paid, articoli, report sui campionati minori, Talent Radar, Video Radar, Reel e Creator Pack. Non è una newsletter inviata e non è un contenuto pubblico.

## Differenza dal Daily Radar

Il Daily Radar individua e ordina segnali giornalieri. Il Weekly Digest aggrega quegli output, riduce le ripetizioni e li dispone in sezioni editoriali. Nessun candidato Daily entra automaticamente nel digest e nessuna sezione Weekly diventa pubblicabile senza una nuova review.

## Input mock

Il collector usa le run Daily Radar in memoria, che includono match trigger, statistiche FULL_OFFICIAL mock, News Radar, Story Library, Historical Echo, Video Radar, Article Generator, Newsletter Generator e Video Script Generator. Aggiunge soltanto due snapshot Apify weekly mock `latest_round` già preparati per campionati minori.

Non legge Supabase o file reali, non interroga provider e non avvia Apify.

## Output privato

Ogni digest contiene segnali, fonti, candidati, 14 sezioni e una preview Markdown in memoria. Status iniziale `generated`/`draft`, visibilità `private_admin`, review obbligatoria e flag `autoPublish`, `autoSend`, `autoProduce` sempre falsi.

Il formatter distingue sezioni free candidate, paid candidate e internal. Prepara apertura, tre storie, tre talenti, tre slot video ufficiali, partita pazza, Historical Echo, campionati minori, collegamenti italiani, statistiche, articoli, Substack, Reel, Creator Pack, CTA e checklist. Se manca un URL ufficiale verificato, lo slot video resta esplicitamente vuoto.

## Scoring e priorità

Lo score interno 0–100 aumenta per fonte ufficiale, partita pazza, giovane talento, collegamento italiano, Historical Echo forte, utilità Video Radar, segnale Apify weekly e fonti esistenti. Diminuisce per rumor, fonte debole, dati incompleti, copyright incerto e duplicati.

Score e priorità low/medium/high/urgent servono soltanto al triage admin. Non costituiscono approvazione, accuratezza garantita o permesso di pubblicazione.

## Apify weekly, mai diretto o daily

Il digest accetta solo output weekly mock o in futuro già salvati. Non chiama actor, token o dataset e non avvia run. Apify rimane nel batch settimanale separato, con budget e scope `latest_round`; l’uso daily resta vietato.

## Email, Substack e video

Il modulo non invia email, non chiama API Substack e non produce video. Le destinazioni sono suggerimenti editoriali. Link/embed ufficiali devono essere verificati; clip scaricate, archiviate o ricaricate sono escluse.

## Review umana

Prima di qualunque uso vanno verificati fonti, nomi, date, punteggi, rumor, rettifiche, copyright, link ufficiali, CTA e separazione free/paid/internal. Rumor non verificati, fonti assenti e video non autorizzati restano bloccati.

## Attivazione futura

Per Supabase serviranno schema, repository server-side, RLS admin, audit, versioning e deduplica. Per uno scheduler serviranno approvazione, timezone, idempotenza, lock, retry e osservabilità. Per Substack o email servirà un workflow separato con credenziali server-only e approvazione finale umana. Nessuna integrazione è presente ora.

## Rischi editoriali, copyright e commerciali

I rischi includono duplicati, dati obsoleti, rumor trattati come fatti, diritti video/immagine, segmentazione free/paid errata e promesse eccessive sui report. Un candidato paid non implica acquisto, entitlement, completezza dei dati o scouting professionale certificato.
