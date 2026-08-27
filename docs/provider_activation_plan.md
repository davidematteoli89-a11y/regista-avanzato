# Provider Activation Plan

## Principio

Il frontend non conosce provider esterni. Solo job server-side chiamano adapter, normalizzano dati e scrivono su Supabase. Le pagine leggono snapshot salvati.

## Stato attuale

- `mock_provider`: usato per sviluppo/demo.
- Stable provider: disattivato.
- TheStatsAPI adapter: placeholder.
- API-Football adapter: placeholder.
- Apify/SofaScore: disattivato.
- Manual provider: disponibile per contenuti/link inseriti manualmente.

## Checklist prima dei provider reali

- [ ] Confermare provider stabile da usare.
- [ ] Definire mapping ID esterni per competizioni/squadre/giocatori/partite.
- [ ] Configurare budget richieste giornaliero/mensile.
- [ ] Verificare logging `api_usage_logs`.
- [ ] Eseguire dry-run senza scrittura.
- [ ] Eseguire import su un sottoinsieme minimo.
- [ ] Verificare deduplica e rollback.
- [ ] Verificare che nessuna pagina pubblica chiami provider.
- [ ] Verificare che il sito legga solo Supabase.
- [ ] Verificare contratto/licenza, attribuzione e diritti di memorizzazione/pubblicazione.

## Pilot FULL consigliato

1. Scegliere una competizione e una stagione.
2. Inserire token e base URL solo nei secret server-side.
3. Implementare endpoint minimi: competitions e teams.
4. Salvare fixture anonimizzate dei payload per i test.
5. Completare mapping ID esterni e normalizzatori conservativi.
6. Eseguire dry-run e confrontare quantità/identità.
7. Attivare upsert su Supabase staging solo dopo conferma.
8. Aggiungere fixtures/results, poi standings, infine statistiche.
9. Misurare richieste e costo prima di ampliare copertura.

## Checklist prima di Apify

- [ ] Lasciare `apify_sofascore` disattivato fino a test budget.
- [ ] Confermare budget 30 €/mese, warning 24 €, hard stop 30 €.
- [ ] Testare `checkApifyMonthlyBudget`.
- [ ] Testare piano weekly import solo latest round.
- [ ] Verificare che priority 1 venga prima di priority 2.
- [ ] Verificare che FULL_OFFICIAL non usi mai Apify.
- [ ] Nessun live scraping.
- [ ] Nessun download/reupload video.
- [ ] Nessuna chiamata lato utente.
- [ ] Verificare termini/licenze di Apify, actor e fonte dati.

## Guardie operative

- Provider disattivato significa nessuna fetch, non solo fallback UI.
- Budget non configurato significa safe/mock.
- Ogni chiamata ha request/run ID e log redatto.
- Budget check e prenotazione quota devono essere atomici.
- Timeout e retry limitati; nessun retry infinito.
- Import idempotenti; correzioni provider aggiornano senza duplicare.
- Fallback all'ultimo snapshot valido; un failure non cancella dati.

## FASE C consigliata

1. Collegare public readers Supabase minimi.
2. Pubblicare seed demo controllato.
3. Rendere admin editoriale manuale utile.
4. Tenere stable provider in dry-run.
5. Attivare primo import reale solo dopo conferma.
6. Tenere Apify spento fino a test budget.
7. Rifinire CTA Substack.

## Go/no-go

Go solo se contratto/licenza, budget, mapper testati, upsert idempotente, monitoraggio e fallback sono tutti verificati. In assenza di uno di questi elementi, mantenere `active: false` e usare mock.
