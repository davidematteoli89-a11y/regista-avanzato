# Editorial Supabase readers plan

## Stato C.3

Implementazione minima predisposta in locale.

Le pagine editoriali pubbliche possono leggere da Supabase staging tramite sole public view sicure:

- `public_articles_published`;
- `public_news_published`;
- `public_stories_published`;
- `public_historical_echoes`.

## Pagine coinvolte

- `/articoli`;
- `/articoli/[articleId]`;
- `/news`;
- `/news/[newsId]`;
- `/storie`;
- `/storie/[storyId]`;
- `/il-calcio-si-ripete`;
- `/il-calcio-si-ripete/[echoId]`.

## Strategia

1. Se Supabase è configurato, i reader provano a leggere le public view.
2. Se la view restituisce righe, la pagina usa i dati Supabase.
3. Se la view è vuota, la pagina mostra uno stato controllato tramite i componenti esistenti.
4. Se Supabase non è configurato o la view non è disponibile, resta il fallback mock/safe già presente.
5. Nessuna pagina pubblica chiama provider, Apify, import o tabelle operative.

## Zero leakage

I reader pubblici non leggono tabelle base sensibili e non selezionano:

- `raw_payload`;
- `internal_score`;
- `internal_notes`;
- `internal_warnings`;
- `review_notes`;
- `source_references` private;
- costi;
- log;
- configurazioni provider;
- contenuti `draft` o `private_admin`.

## Limiti attuali

- Le view editoriali hanno campi pubblici minimi.
- Alcuni campi UI vengono normalizzati con fallback conservativi, per esempio categoria, formato, autore e tag demo.
- Non esiste ancora un editor admin reale per creare contenuti.
- Non esiste ancora generazione automatica.
- Non esiste integrazione Substack API.

## Prossimo passo

Applicare manualmente il seed `supabase/manual/editorial_seed_c3.sql` nello staging, verificare le public view e poi testare localmente le pagine editoriali con i dati demo persistiti.
