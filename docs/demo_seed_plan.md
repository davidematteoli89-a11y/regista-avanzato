# Demo seed plan C.2

## Stato

Il primo tentativo manuale del seed C.2 non ha prodotto righe visibili nelle public views.

Verifica read-only via anon client:

- `public_competitions`: 0 righe.
- `public_teams`: 0 righe.
- `public_matches`: 0 righe.
- `public_standings`: 0 righe.
- tabelle sensibili: non leggibili da anon.

## Causa probabile

La prima versione di `supabase/manual/demo_seed_c2.sql` filtrava `serie-a` con:

```sql
season = '2026'
```

Il seed base `0006_seed_base_data.sql` ha invece `serie-a` sulla stagione:

```sql
season = '2026/27'
```

Quindi l'update della competizione non ha trovato la riga target e le CTE successive non hanno creato dati visibili.

## File corretto

`supabase/manual/demo_seed_c2.sql` è stato corretto per usare `2026/27`.

Aggiornamento successivo: lo staging reale ha restituito errore su `on conflict (competition_id, slug)` nella tabella `teams`, quindi il file non usa più `ON CONFLICT` nella sezione seed.

La SEZIONE 1 ora è idempotente tramite:

1. delete preventivo solo delle righe demo note;
2. insert pulito del dataset demo;
3. nessun dato non-demo toccato.

## Dataset previsto

- 1 competizione pubblicata: `serie-a` come `Serie A Demo`.
- 4 squadre demo:
  - Aurora FC Demo.
  - Borgo United Demo.
  - Marina 1920 Demo.
  - Appennino Calcio Demo.
- 2 partite demo:
  - Aurora FC Demo 3–1 Borgo United Demo.
  - Marina 1920 Demo 1–1 Appennino Calcio Demo.
- 4 righe classifica coerenti.

## Rollback

La sezione rollback dello stesso file:

- elimina standings demo;
- elimina match demo;
- elimina team demo;
- riporta `serie-a` a `draft/private_admin`.

## Prossimo passo

Copiare nuovamente solo la SEZIONE 1 corretta nel Supabase SQL Editor, poi eseguire la SEZIONE 2 per verificare.

## Verifica finale C.2

Seed corretto applicato manualmente dal Supabase SQL Editor.

Risultati public views:

- `public_competitions`: 1 riga.
- `public_teams`: 4 righe.
- `public_matches`: 2 righe.
- `public_standings`: 4 righe.
- `active_providers`: 0.
- `enabled_imports`: 0.

Test locale route:

- `/competizioni`: mostra `Serie A Demo` da `public_competitions`.
- `/competizioni/serie-a`: mostra dettaglio `Serie A Demo` e dati collegati.
- `/competizioni/serie-a/squadre`: mostra squadre demo da `public_teams`; in anon preview ne mostra 3 per gating esistente.
- `/competizioni/serie-a/partite`: mostra partite demo da `public_matches`.
- `/competizioni/serie-a/classifica`: mostra classifica demo da `public_standings`.

Nessun provider o import è stato attivato.
