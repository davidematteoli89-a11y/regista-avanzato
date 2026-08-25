# Story Library Markdown

## Ruolo

La Story Library è l'archivio narrativo interno per storie calcistiche, partite memorabili, profili, record, rivalità, connessioni italiane e possibili Historical Echo. In futuro fornirà materiale verificato ad articoli, newsletter/Substack, Video Radar, Daily/Weekly Radar e generatori di script, senza pubblicare direttamente.

## Pubblico e admin

Il pubblico vede soltanto storie `approved` o `published` con visibilità `public_preview` o `public_full`. Preview, corpo e relazioni vengono ridotti prima dell'output; fonti interne e warning di review non sono mostrati.

L'admin vede anche `draft`, `pending_review`, `archived` e `rejected`, insieme a metadati, fonti, affidabilità, warning copyright e stato fact-check. Lo scaffold admin è mock e non permette approvazioni o scritture.

## Stati e visibilità

Gli stati descrivono il workflow: bozza → review → approvazione → eventuale pubblicazione, con archivio/rifiuto. La visibilità è separata dallo stato: `private_admin`, `public_preview`, `public_full`, `substack_only` o `paid_substack_candidate`. Essere approved non rende automaticamente pubblico un record.

`autoPublished` resta sempre `false`. Ogni uso pubblico o downstream richiede una decisione editoriale umana.

## Fonti e copyright

Si conservano soltanto metadati, riferimenti bibliografici, URL quando disponibili, note originali e riassunti brevi. Non si importano articoli, libri, PDF, trascrizioni o altri testi protetti integralmente. Citazioni eventuali dovranno essere minime, necessarie, attribuite e verificate separatamente.

Materiale derivato da PDF, libri, articoli, video o Markdown esterno richiede fonte e review umana. Import senza provenienza, troppo lungo o simile a copia estesa viene bloccato. Le note originali devono essere dichiarate e confermate dalla redazione.

## Parser Markdown futuro

Il parser attuale accetta esclusivamente una stringa in memoria con frontmatter delimitato da `---`. Valida titolo, categoria, formato, tipo/riferimento fonte, summary e corpo. Restituisce soltanto `StoryImportPreview`: zero file letti, zero file/database scritti, zero pubblicazioni.

Per l'import reale serviranno fixture autorizzate, parser Markdown/YAML revisionato, sanitizzazione, deduplica, mapping fonti, limiti per file/batch, quarantena e review. Il filesystem non dovrà essere accessibile dalle pagine pubbliche.

## Collegamento Supabase futuro

Servono schema/migrazioni per storie-fonti-relazioni-timeline, RLS admin/pubblico, versionamento, provenance, audit, full-text search e writer idempotenti. Reader pubblici dovranno continuare a filtrare stato e visibilità server-side.

## Historical Echo e generatori

Historical Echo userà fatti, date, entità e relazioni approvate per proporre candidati, mai per affermare automaticamente equivalenze storiche. I generatori di articoli/video/reel riceveranno soltanto riassunti e note autorizzate, producendo bozze private soggette a fact-check, diritti e approvazione.

In questo step nessun PDF/Markdown reale è letto, nessuna fonte esterna è contattata e nessun contenuto viene pubblicato.
