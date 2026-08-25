# Newsletter / Substack Generator

## Ruolo e confini

Il modulo prepara esclusivamente bozze editoriali private per l’area admin. Copre newsletter free, candidati Substack paid, digest settimanali, Talent Radar, report sui campionati minori, Historical Echo, Video Watchlist e Creator Pack. Non pubblica, non invia email e non chiama API Substack, provider sportivi, Apify, Supabase o modelli AI esterni.

La generazione attuale è deterministica e usa soltanto fixture già presenti nel repository. Il Markdown viene restituito come stringa in memoria: non viene creato alcun file.

## Piani

- `free`: estensione gratuita del sito, con selezione sintetica e CTA prudente.
- `paid`: candidato a report editoriale più approfondito; non rappresenta un acquisto, un entitlement o una promessa commerciale.
- `mixed`: sezioni free e sezioni marcate chiaramente `paid` nello stesso draft.
- `internal_only`: appunti e pacchetti creativi destinati esclusivamente alla redazione.

Ogni risultato mantiene `visibility: private_admin`, `autoPublish: false` e `autoSend: false`. Le destinazioni sono indicazioni editoriali, non operazioni eseguite.

## Input e raccolta fonti

Gli input specificano formato, piano, tono, destinazione e riferimenti mock. Il collector può leggere dati mock da Story Library, News Radar, Historical Echo, Video Radar, Article Generator e trigger partita disponibili. Conserva brevi sintesi e metadati, non articoli interi o testi lunghi.

Il prompt interno distingue:

- fatto verificato;
- segnale da contestualizzare;
- ipotesi da verificare;
- interpretazione/opinione editoriale;
- contenuto non utilizzabile prima del fact-check.

Il prompt è una stringa di istruzioni: nessun modello AI viene invocato.

## Output e formati

L’output contiene sezioni tipizzate, fonti, rischi, checklist, frontmatter e anteprima Markdown. I formati principali applicano strutture diverse: il weekly digest riserva slot per tre storie, tre talenti e tre link highlights ufficiali; gli altri formati espongono le sezioni specifiche richieste per talenti, campionati minori, Historical Echo, video e Creator Pack.

Uno slot highlights resta esplicitamente vuoto se manca un URL ufficiale verificato. Il sistema non inventa URL e non interpreta un’identità mock come prova di disponibilità del video.

## Copyright, video e fonti

- niente copia di testi lunghi o import di articoli completi;
- niente citazioni o URL inventati;
- niente download, ritaglio o reupload di clip partita;
- solo link ufficiali verificati per gli highlights;
- sintesi originali e brevi, sempre collegate alla fonte interna;
- possibili problemi di copyright o diritti video sono segnalati come rischio.

## Rischi e review umana

Le regole segnalano rumor, infortuni, controversie, dati non verificati, copyright, highlights non ufficiali, promesse commerciali eccessive, linguaggio da scouting certificato e affermazioni troppo assertive. Una bozza senza fonti è bloccata. Un rischio medio, alto o bloccato impedisce qualunque futura automazione; in questo step anche il rischio basso non abilita invio o pubblicazione.

La checklist richiede 13 controlli: fonti, nomi, date, punteggi, diritti immagini/video, tono, titolo e oggetto, rumor, citazioni, destinazione free/paid, link sito/Substack, CTA e rettifiche. Il controllo umano è obbligatorio prima di copiare manualmente una bozza verso un sistema esterno.

## Perché non pubblica e non invia

La separazione protegge da errori fattuali, violazioni dei diritti, rumor presentati come fatti, segmentazione free/paid errata e promesse commerciali non sostenibili. Una destinazione `substack_paid` non implica che il contenuto sia approvato o che esista un abbonamento interno.

## Attivazione futura

Per collegare Supabase serviranno schema, mapping, RLS, accesso admin verificato, repository server-side e audit log. Per una vera API AI serviranno provider scelto, credenziali server-only, budget, logging, gestione dati inviati al modello, output strutturato, controlli anti-invenzione e fallback. Per Substack serviranno una scelta esplicita sull’integrazione disponibile, autorizzazione, gestione sicura delle credenziali e un workflow umano di approvazione. Nessuno di questi collegamenti è presente ora.

## Rischi editoriali e commerciali

I dati mock non dimostrano copertura reale. I Talent Radar sono contenuti editoriali e non scouting professionale certificato. I report paid non devono promettere dati live, risultati economici o completezza non garantita. Termini, licenze, diritti video, fonti e claim commerciali dovranno essere verificati prima di qualsiasi uso reale.
