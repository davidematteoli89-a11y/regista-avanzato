# Punto 21 — Collision strategy create/update/skip

Stato: strategia teorica, non eseguibile nel Punto 21.

## Create

Creare un record futuro solo se:

- ID provider/manual non presente;
- slug/nome non collisiona nello scope scelto;
- riferimento competition/team valido;
- campi obbligatori presenti;
- ambiente staging confermato;
- backup/rollback presenti;
- scrittura esplicitamente autorizzata.

## Update

Aggiornare un record futuro solo se:

- stesso provider id già presente;
- stesso scope competition/team;
- differenze non distruttive;
- audit richiesto e pronto;
- before/after esportabile;
- update consentito solo in staging;
- approvazione esplicita presente.

## Skip

Saltare un record se:

- campo obbligatorio mancante;
- riferimento non valido;
- collisione ambigua;
- differenza distruttiva;
- tabella/colonna non confermata;
- ambiente non staging;
- backup/rollback assenti;
- approvazione mancante.

## Stato Punto 21

Nessuna strategia è eseguibile nel Punto 21.

La strategia è solo readiness. Future write richiede Punto 22 o successivo con autorizzazione esplicita.
