# Import partite, risultati ed eventi

## Percorso

Il modulo prepara un futuro import server-side senza eseguire rete o scritture:

```text
script server-side → config → budget/guard → providerRouter → match/event mapper → trigger detector → log → Supabase
Supabase → sito pubblico
```

Il sito non chiama provider quando un utente apre una pagina. Calendari, risultati ed eventi verranno letti soltanto da Supabase, così l'ultimo snapshot valido resta disponibile anche quando una fonte fallisce.

## Modalità

- `dry_run`, default: genera payload e riepilogo, senza persistenza;
- `mock`: usa esplicitamente il dataset locale, sempre senza rete;
- `real_disabled`: rappresenta il futuro percorso reale ma mantiene writer, fetch e actor bloccati.

La stagione predefinita `2026/27-mock` è deliberatamente non produttiva.

## Comportamento per tracking level

### FULL_OFFICIAL

Prepara fixtures, risultati ed eventi. Il provider stabile verrà usato solo quando attivo e autorizzato dal budget; oggi il router usa il mock. Apify è vietato. Le match stats profonde non sono importate: è predisposto soltanto il confine futuro.

### Apify light P1

È limitato a `latest_round`. In futuro potrà includere risultati, eventi principali e statistiche base quando disponibili. Non effettua storico massivo, live scraping o download video.

### Apify light P2

Viene valutato dopo P1 e solo con budget residuo. Risultati e calendario sono opzionali; l'assenza di statistiche profonde non blocca la partita.

### Trigger

Prepara soltanto risultati minimi e trigger editoriali forti. Non richiede statistiche complete e non avvia Apify.

## Mapping verso lo schema

La terminologia del brief viene tradotta nei campi esistenti:

- `external_match_id` → `matches.api_match_id`;
- `match_date` → `matches.kickoff_at`;
- provider/source provider → `source_provider_id`;
- `external_event_id` → `match_events.api_event_id`;
- `injury_time` → `match_events.stoppage_minute`;
- `related_player_id` → `match_events.assist_player_id` quando semanticamente appropriato.

Gli UUID di competizione, squadre, partite, giocatori e provider restano `null` nel dry-run con warning. Poiché nello schema sono obbligatori per alcune tabelle, questi payload non possono essere scritti finché il futuro resolver non li completa.

`matches` non contiene raw payload né highlight URL. I raw event sono ammessi in `match_events.raw_data` solo con autorizzazione futura; gli highlight ufficiali andranno nella tabella separata `highlight_links` e non vengono scaricati.

## Deduplica

- partita: `provider + external match ID`, corrispondente alla unique key futura `source_provider_id + api_match_id`;
- evento: `provider + external event ID`, corrispondente a `source_provider_id + api_event_id`.

Il batch scarta duplicati locali. La distinzione reale tra record creati e aggiornati richiederà un confronto con Supabase e upsert idempotenti.

## Trigger editoriali

Il detector può produrre:

- `high_scoring_match`, `draw_4_4`, `result_5_4`, `big_win`, `historical_scoreline` dai risultati;
- `late_goal` e `hat_trick_candidate` dagli eventi disponibili;
- `young_player_candidate` solo con una lista età verificata;
- `comeback` e `upset_candidate` solo con segnali strutturati futuri.

I trigger sono candidati per revisione, non contenuti pubblicati automaticamente. Ex Serie A e contesto storico richiederanno mapping editoriali esterni, quindi non vengono inventati in questo step.

## Errori e copertura parziale

Eventi o statistiche assenti producono warning e collezioni vuote. Un errore provider non genera cancellazioni: il summary imposta sempre `preservePreviousData: true`. L'ultimo dato valido già salvato resterà visibile.

## Cosa manca

Resolver UUID, provider reali, writer Supabase, confronto create/update, transazioni, usage log persistenti, lock budget, fixture reali, validazione raw, retry, scheduler, alert e test idempotenza. Nessuno di questi elementi è stato attivato; non sono state create player stats profonde, newsletter, dashboard o pubblicazioni automatiche.
