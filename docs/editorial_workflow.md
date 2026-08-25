# Editorial Workflow

## Obiettivo

Portare segnali da dati e fonti a contenuti pubblicabili senza automatizzare decisioni editoriali, diritti o invio.

## Flusso proposto

1. **Ingest** — snapshot provider salvati, fonti editoriali autorizzate, Markdown/PDF con provenienza.
2. **Candidate generation** — Radar, trigger e generatori creano candidati, mai pubblicazioni.
3. **Triage** — editor assegna priorità, formato, pubblico e scadenza.
4. **Research** — si raccolgono fonti primarie/ufficiali e si distinguono fatti, inferenze e opinioni.
5. **Draft** — articolo, Story, Echo, newsletter o script video conserva riferimenti e limiti.
6. **Review** — fact-check, tono, privacy, copyright, link e promessa commerciale.
7. **Approval** — un ruolo autorizzato registra approvazione e versione.
8. **Publish/export** — sito o export manuale Substack; auto-publish disabilitato.
9. **Maintenance** — correzioni, link rotti, takedown, aggiornamento e archivio.

## Stati consigliati

`candidate → triaged → researching → draft → in_review → approved → published → archived`

Stati alternativi: `rejected`, `needs_rights_review`, `needs_correction`, `withdrawn`.

## Regole per modulo

- **News Radar**: rumor sempre etichettato e non pubblicato automaticamente; deduplica e fonte obbligatoria.
- **Story Library**: conservare autore/fonte/licenza e non importare integralmente PDF protetti senza diritto.
- **Historical Echo**: mostrare perché il parallelo è proposto e far verificare date, contesto e differenze.
- **Article Generator**: nessun fatto senza fonte; output è bozza.
- **Newsletter/Weekly Digest**: snapshot e link verificati al momento della revisione; invio manuale iniziale.
- **Reel/Video Radar**: usare grafica e commento originali; solo link/embed ufficiali, niente download/reupload.
- **Substack paid**: contenuto editoriale, non promessa di scouting professionale certificato o dati live.

## Provenance minima

Ogni contenuto dovrebbe conservare:

- fonti e URL;
- data di accesso;
- snapshot/run dati usato;
- autore o generatore;
- versione prompt/template, se applicabile;
- editor e revisore;
- checklist copyright/fact-check;
- approvazione e timestamp;
- cronologia correzioni.

## Separazione pubblico/interno

Score, costi, warning, note private, log provider e motivazioni di moderazione restano admin-only. Il mapper pubblico deve usare allowlist di campi, non semplicemente rimuovere alcuni campi noti.

## KPI iniziali

- percentuale candidati approvati;
- tempo candidate → publish;
- correzioni post-pubblicazione;
- link rimossi o non più ufficiali;
- contenuti con provenance completa;
- costo per contenuto, senza premiare volume automatico.
