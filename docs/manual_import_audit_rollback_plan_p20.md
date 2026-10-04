# Punto 20 — Manual import audit e rollback plan

Stato: piano preparato, nessuna scrittura eseguita.

## Audit minimo futuro

Un futuro manual import staging deve registrare:

- chi ha approvato l'import;
- data/ora approvazione;
- ambiente confermato;
- file fixture usati;
- checksum/hash dei file fixture, mai di token;
- counts prima/dopo;
- record creati;
- record aggiornati;
- record saltati;
- errori;
- batch id/import run id;
- riferimento rollback;
- conferma provider reali non coinvolti;
- conferma Production esclusa.

## Rollback minimo futuro

Prima di scrivere dati bisogna predisporre:

- backup prima dell'import;
- export righe coinvolte;
- identificatori provider/manual fixture;
- batch id;
- elenco chiavi deduplica;
- piano di revert per batch id, se disponibile;
- piano manuale se rollback automatico non disponibile;
- verifica post-rollback.

## Condizioni prima del futuro import

- Solo staging.
- Mai Production.
- Backup verificato.
- Rollback verificato.
- RLS/audit verificati.
- Approvazione esplicita utente.
- Dry-run passato.
- Nessun provider reale coinvolto.
- Nessuna chiave/token letta o stampata.

## Stato Punto 20

Punto 20 non esegue backup, export, import o rollback.

Prepara solo la policy operativa per un futuro step separato.
