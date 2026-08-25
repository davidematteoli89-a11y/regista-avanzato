# Article Generator

## Ruolo

Article Generator trasforma riferimenti editoriali già presenti nel progetto in una bozza strutturata per l'area admin. Può raccogliere Story Library, News Radar, Historical Echo e Video Radar mock. I tipi prevedono inoltre futuri match trigger, segnali statistici, note manuali, fonti ufficiali e dati mock.

L'output non è un articolo pubblico: è una bozza `generated` o `draft`, sempre `private_admin`, con `autoPublish: false` e review umana obbligatoria.

## Pipeline mock

1. `articleSourceCollector` risolve soltanto ID presenti negli array mock.
2. Conserva etichetta, riassunto breve, confidenza e flag di rischio; non copia corpi lunghi.
3. `articlePromptBuilder` prepara istruzioni interne distinguendo fatti verificati, segnali, ipotesi, interpretazione ed elementi da verificare.
4. `articleDraftGenerator` compone deterministicamente titolo, sottotitolo e sezioni.
5. Le regole calcolano rischi e checklist.
6. Il formatter restituisce una stringa Markdown con frontmatter, senza scrivere file.

Non vengono chiamati modelli AI, Supabase, provider, Apify, rete o filesystem.

## Fatto, segnale, ipotesi e opinione

- `verified`: elemento classificato come verificato dalla fixture mock, da ricontrollare comunque prima dell'uso reale.
- `likely`: segnale plausibile o storia revisionata, da contestualizzare.
- `uncertain`/`unknown`: ipotesi o dato insufficiente; vietato presentarlo come verità.
- `opinion`: interpretazione editoriale, angolo narrativo o CTA.

La bozza conserva la confidenza per sezione e gli ID delle fonti utilizzate.

## Struttura della bozza

Le sezioni coprono titolo, sottotitolo, apertura, contesto, interesse, dati/segnali, collegamento storico, angolo editoriale, verifiche e CTA eventuale. Il testo è un outline editoriale originale e prudente, non un articolo finale generato da AI.

## Copyright e fonti

Il collector usa soltanto metadati e summary brevi già presenti nei mock. Non importa articoli, PDF, citazioni o trascrizioni integrali, non inventa URL e non acquisisce clip. Story Library e Video Radar attivano sempre controlli copyright/diritti.

## Rischi

Una bozza senza fonte è `blocked`. Rumor, controversie e dati incerti sono `high`; copyright, infortuni e diritti video almeno `medium`. Affermazioni assertive incompatibili con fonti incerte vengono segnalate. Qualunque rischio impedisce l'automazione e, anche senza rischi rilevati, `autoPublish` resta sempre falso.

## Review umana

La checklist richiede controllo di fonti, nomi, date, punteggi, diritti immagini/video, tono, titolo, rumor, citazioni e destinazione. Nessuna destinazione viene attivata automaticamente.

## Destinazioni

I metadati possono proporre articolo o preview sito, Substack free/paid, Weekly Digest, seed per video script o nota privata. Sono indicazioni di lavorazione: il modulo non pubblica sul sito, non invia a Substack e non genera video.

## Collegamento futuro a Supabase

Serviranno tabelle versionate per bozze, fonti, rischi e checklist; RLS admin-only; audit log; writer transazionale; deduplica; server action autorizzate e workflow di approvazione. I reader pubblici non dovranno accedere alle bozze.

## Eventuale AI futura

Prima di usare una vera API AI serviranno approvazione esplicita, modello e costi, policy dati, limiti prompt/output, logging senza segreti, redazione dei dati sensibili, controlli anti-allucinazione, citazioni tracciabili, eval e conferma umana. L'API non dovrà avere permessi di pubblicazione.

## Rischi editoriali

I principali rischi sono invenzione di fatti o citazioni, propagazione di rumor, falsa certezza su scouting/infortuni, violazioni copyright, perdita di provenienza, titoli clickbait e invio al canale sbagliato. Le guard tecniche riducono il rischio ma non sostituiscono competenza editoriale o valutazione legale.
