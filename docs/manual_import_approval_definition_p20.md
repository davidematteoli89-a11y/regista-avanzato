# Punto 20 — Definizione manual import approvato

Stato: definizione preparata, nessun import eseguito.

## Definizione

Un “manual import approvato” è un futuro processo controllato che:

- usa solo fixture/manual data locali o file controllati;
- non usa provider reali;
- viene eseguito solo in staging;
- scrive nel database solo dopo approvazione esplicita dell'utente;
- ha audit log;
- ha piano rollback;
- ha validazione pre-import;
- ha preview mapping;
- ha conferma ambiente;
- non tocca Production.

## Cosa non è

Un manual import approvato non è:

- provider import;
- sync automatico;
- import live;
- scraping;
- deploy;
- aggiornamento Production;
- attivazione TheStatsAPI / Stats API;
- attivazione API-Football;
- attivazione Apify/SofaScore;
- autorizzazione implicita a scrivere dati.

## Stato Punto 20

Punto 20 prepara solo piano tecnico, mapping e checklist.

Nessun insert/update/delete/upsert viene eseguito.

Nessuna query SQL viene applicata.

Nessun provider viene attivato.
