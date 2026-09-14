# D.14-A — Disabled stable provider probe

## Stato

D.14-A prepara uno script per la futura prima probe read-only verso un provider stabile, ma lo lascia completamente disabilitato.

Script creato:

- `scripts/provider/disabledStableProviderProbe.ts`.

Comando:

```bash
npm run probe:stable-provider:disabled
```

## Cosa fa

Lo script produce solo un report console sicuro:

- `mode=disabled_probe`;
- `competition_slug=serie-a`;
- `provider_candidate=api_football`;
- `provider_alternative=the_stats_api`;
- `real_provider_probe_enabled=false`;
- `external_fetch=false`;
- `db_write=false`;
- `token_read=false`;
- `provider_activated=false`;
- `import_enabled=false`;
- `blocked_reason=REAL_PROVIDER_PROBE_DISABLED`.

## Cosa non fa

- Non legge `.env.local`.
- Non legge token.
- Non stampa env.
- Non chiama API-Football.
- Non chiama TheStatsAPI.
- Non chiama Apify.
- Non chiama SofaScore.
- Non fa scraping.
- Non usa `fetch`.
- Non apre client Supabase.
- Non scrive DB.
- Non attiva provider.
- Non attiva import.
- Non tocca Production.

## Guardia operativa

La probe reale è bloccata dal default:

```text
real_provider_probe_enabled=false
```

Il blocco atteso è:

```text
blocked_reason=REAL_PROVIDER_PROBE_DISABLED
```

Qualunque futura probe reale dovrà essere introdotta in un passaggio separato, con conferma esplicita e un nuovo script/procedura controllata.

## Criteri futuri per abilitare una probe reale

Prima di abilitare qualunque richiesta reale:

- provider scelto definitivamente;
- docs provider, costi, rate limit e licenza verificati manualmente;
- token provider salvato solo in env sicura;
- token mai stampato;
- massimo una richiesta;
- endpoint scelto tra standings o fixtures;
- timeout breve;
- output sanificato;
- nessuna scrittura DB;
- nessun import;
- nessun Apify;
- provider non attivato in `data_providers`;
- nessun `import_enabled=true`;
- `realWritesEnabled=false`;
- Production non toccata.

## Prossimo step possibile

D.14-B — checklist manuale finale per test ruoli `free_user`/`editor`, ancora senza creare utenti o modificare ruoli.

Oppure D.15 — scelta provider e bozza di probe reale, ma ancora non eseguita.

## D.15 — Gate successivo

La probe disabilitata resta il comportamento corrente.

D.15 aggiunge il documento:

- `docs/provider_probe_readiness_d15.md`.

Finché il gate D.15 non viene soddisfatto:

- `real_provider_probe_enabled=false`;
- nessuna fetch;
- nessun token letto;
- nessun DB write;
- provider/import spenti.

## D.16-A — Checklist manuale prima della probe

D.16-A mantiene la probe disabilitata e aggiunge solo documentazione:

- `docs/provider_manual_verification_checklist_d16a.md`.

La checklist richiede verifica manuale di:

- provider definitivo;
- prezzo/piano;
- rate limit;
- copertura Serie A;
- endpoint più sicuro;
- licenza/caching/pubblicazione;
- modalità auth;
- rischi payload e mapper.

La probe resta bloccata:

- `real_provider_probe_enabled=false`;
- `external_fetch=false`;
- `token_read=false`;
- `db_write=false`;
- provider/import off;
- Production non toccata.

## D.16-B — Provider scelto, probe ancora disabilitata

D.16-B sceglie `api_football` piano Free per la prima futura probe, ma non cambia lo script disabilitato.

Resta vero:

- nessuna chiamata API-Football;
- nessuna chiamata TheStatsAPI;
- nessun token letto;
- nessuna fetch;
- nessun DB write;
- provider/import spenti;
- `blocked_reason=REAL_PROVIDER_PROBE_DISABLED`.

La prossima fase D.16-C richiederà conferma esplicita prima di qualunque real-call.

## D.16-C1 — Key setup senza sblocco probe

D.16-C1 documenta la gestione futura della chiave API-Football Free, ma non cambia lo script disabilitato.

Restano veri:

- `real_provider_probe_enabled=false`;
- `API_FOOTBALL_PROBE_ENABLED=false`;
- nessuna chiave letta;
- nessuna fetch;
- nessun DB write;
- provider/import spenti;
- `blocked_reason=REAL_PROVIDER_PROBE_DISABLED`.
