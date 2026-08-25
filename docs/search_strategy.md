# Strategia della ricerca

## Prima versione mock

Il motore attuale usa un piccolo indice TypeScript in memoria. I record sono dichiarati mock, i filtri sono funzioni pure e nessun modulo interroga Supabase, provider sportivi, Apify o siti esterni. `advancedSearch()` riceve dal caller lo stato quota già calcolato e non lo modifica.

L'indice dimostrativo copre:

- giocatori;
- squadre;
- competizioni;
- partite;
- storie e articoli;
- link highlights ufficiali;
- Video Radar;
- Historical Echo;
- News Radar.

## Query, filtri e risultati

Sono supportati tipo, testo, paese, competizione, stagione, intervallo date, presenza highlights e presenza Video Radar. Input e limite risultati vengono normalizzati prima della ricerca.

I risultati sono normalizzati in `SearchResult` e raggruppati per entità. Ogni card mantiene un link interno alla risorsa; l'indice non ospita video e non genera link esterni fittizi.

## Separazione dalla navigazione

La ricerca avanzata è un'azione esplicita del form. Seguire un risultato, aprire una scheda o consultare statistiche, highlights e Video Radar non richiama `incrementUserSearchUsage()` e non consuma quota. Anche l'anteprima pubblica è gratuita e non esegue la ricerca completa.

## Futuro indice Supabase

In futuro il sito continuerà a interrogare soltanto Supabase. Un indice server-side potrà combinare viste/materialized view o PostgreSQL full-text search sulle sole righe approvate e visibili. Provider e Apify alimenteranno Supabase esclusivamente tramite import batch separati; non saranno mai invocati dal motore o dal browser.

Prima dell'implementazione reale servono:

- schema indice e ranking verificato;
- resolver permessi per anonimo e account free;
- RPC atomica per reservation quota;
- paginazione, deduplica e strategie linguistiche italiane;
- test su contenuti non pubblici e dati rimossi;
- logging minimale senza salvare dati sensibili inutili.

## Privacy e anti-abuso

Le query possono rivelare interessi dell'utente. Andranno definite retention breve, minimizzazione, accesso amministrativo limitato e informativa privacy. Rate limit, idempotency key, limiti di lunghezza, protezione bot e audit aggregato dovranno affiancare la quota mensile, senza trasformare normali visualizzazioni in ricerche consumanti.
