# D.14-D — Risultato verifica utenti test mancanti

## Stato

La query read-only preparata in D.14-C è stata eseguita manualmente nel Supabase SQL Editor del solo progetto staging “Regista Avanzato”.

Risultato:

```text
Success. No rows returned.
```

Conclusione: non risultano utenti test dedicati con pattern `regista-test-*`.

## Conferme

- Query manuale solo read-only.
- Nessun utente creato.
- Nessun ruolo modificato.
- Nessuna scrittura DB.
- Nessun insert/update/delete/upsert.
- Nessun provider attivato.
- Nessun Apify attivato.
- Nessun import attivato.
- Production non toccata.

## Email operative proposte, mascherate

Per la fase successiva D.14-E sono state proposte email operative da usare solo manualmente, ma nei documenti restano mascherate:

- free_user test: `davide.m***@funcode.it`;
- editor test: `caffe1***@gmail.com`.

Nessuna password o credenziale deve essere salvata nei documenti.

## Scenario successivo

D.14-E dovrà preparare il piano controllato per creare o usare utenti test staging:

- `regista-test-free-user`;
- `regista-test-editor`.

La creazione utenti o modifica ruoli richiede conferma esplicita separata.
