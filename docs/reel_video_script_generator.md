# Reel / Video Script Generator

## Ruolo

Il modulo prepara bozze testuali private per Reel da 30/60 secondi, short verticali, video da 2–3 minuti, lavagne tattiche, Talent Radar, Historical Echo, match story e Creator Pack. È uno strumento editoriale admin: non genera un video, non produce asset e non pubblica contenuti.

## Input e fonti

Gli input indicano formato, destinazione, tono e riferimenti mock. Il collector legge soltanto fixture già presenti in Story Library, News Radar, Historical Echo, Video Radar, Article Generator, Newsletter Generator e trigger partita disponibili. Conserva brevi sintesi e metadati; non legge file reali e non copia articoli interi.

## Output

Ogni draft contiene hook, voiceover, visual cue, testo on screen, sequenza scene, fonti da verificare, CTA e note di produzione. Il formatter restituisce una stringa Markdown/testo in memoria con frontmatter. Tutti i draft usano `private_admin`, `autoProduce: false` e `autoPublish: false`.

Uno script è un piano editoriale testuale. Un video reale richiederebbe produzione, asset autorizzati, voiceover, montaggio, controllo diritti ed esportazione: nessuna di queste operazioni esiste in questo step.

## Visual sicuri

Sono ammessi come suggerimenti:

- grafiche originali;
- lavagna tattica originale;
- screenshot futuri del sito;
- statistiche visuali;
- mappe e lineup disegnate;
- foto future con autorizzazione verificata;
- link ufficiali come riferimento esterno;
- voiceover originale.

Il guard blocca `download_video`, `reupload_clip`, `local_video_file`, `unauthorized_compilation`, `unofficial_stream`, `pirated_source` e `raw_match_clip_storage`. Non vengono usati Mega, storage clip o file locali di highlights.

## Link ufficiale, embed e clip

Un link ufficiale rimanda a un contenuto ospitato dalla fonte autorizzata e deve essere verificato manualmente. Un embed mostra il player della piattaforma esterna ed è utilizzabile soltanto se termini, permessi e restrizioni territoriali lo consentono. Una clip è una copia del media: scaricarla, archiviarla o ricaricarla è fuori scope e vietato dal modulo. L’esistenza di un canale o dominio ufficiale non certifica automaticamente il singolo URL.

## Rischi e review

Le regole bloccano script senza fonti e segnalano rumor, infortuni, controversie, dati non verificati, copyright/video, link non ufficiali, linguaggio troppo certo e claim da scouting certificato. La checklist umana copre fonti, nomi, date, punteggi, visual, diritti, tono, hook, testo on screen, rumor, citazioni, CTA, piattaforma e rettifiche.

Anche un draft a rischio basso non può essere prodotto o pubblicato automaticamente.

## Creator Pack

La fixture iniziale contiene tre hook, tre reel seed, uno script breve, un’idea carosello e un’idea newsletter. Sono idee `private_admin`, non asset pronti e non contenuti social pubblicati.

## Destinazioni

Le destinazioni tipizzate sono Instagram Reel, TikTok, YouTube Shorts, YouTube video, preview sito, Substack paid, Creator Pack e nota privata. Indicano soltanto l’adattamento editoriale previsto.

## Attivazione futura

Per Supabase serviranno schema, repository server-side, RLS admin, audit e versioning. Per una vera API AI serviranno provider/modello, credenziali server-only, budget, logging, policy sui dati, output strutturato ed eval anti-invenzione. Per produrre media serviranno un workflow separato, asset autorizzati, proof of rights, revisione umana e strumenti approvati esplicitamente. Nessun collegamento è presente ora.

## Rischi copyright ed editoriali

Prima dell’uso reale vanno verificati diritti su immagini, loghi, musiche, font, embed e link; accuratezza di nomi, date e risultati; trattamento di rumor e infortuni; claim commerciali e scouting. Il testo originale non rende automaticamente utilizzabile un’immagine o una clip di terzi.
