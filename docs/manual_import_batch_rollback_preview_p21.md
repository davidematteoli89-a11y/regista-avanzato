# Punto 21 — Batch rollback preview

Stato: rollback preview documentale, nessun batch reale.

## Batch id simulato

Valore dry-run:

```text
manual-fixture-preview-20260917
```

Il batch id è una preview stabile e non rappresenta un import reale.

## Operazioni pianificate

Solo preview:

- competitions: create/update/skip preview;
- teams: create/update/skip preview;
- standings: create/update/skip preview.

Nessuna operazione è eseguita.

## Cosa servirebbe per rollback futuro

Prima di qualsiasi write servono:

- export righe target prima dell'import;
- batch id reale;
- elenco chiavi deduplica;
- before/after per update;
- elenco record creati;
- elenco record saltati;
- log errori;
- istruzioni di revert controllate.

## Dati da esportare prima del write

- Competitions nello scope fixture.
- Teams nello scope fixture.
- Standings nello scope fixture.
- Import log collegati, se usati.
- Provider/manual ids coinvolti.

## Cosa non è disponibile ora

- Nessun batch reale.
- Nessun record creato.
- Nessun record aggiornato.
- Nessun before/after reale.
- Nessun rollback reale.

## Perché non c'è rollback reale

Non si può fare rollback reale senza write reale. Punto 21 prepara solo la forma del rollback futuro.
