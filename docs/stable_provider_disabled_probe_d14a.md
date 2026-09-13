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
