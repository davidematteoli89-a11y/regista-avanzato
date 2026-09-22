# Punto 33 — Staging rollback checklist no-apply

Questo documento progetta il rollback futuro per le view read-only di manual import, senza eseguirlo.

Stato:

- `DOCUMENTATION_ONLY`
- `DO NOT RUN`
- `NO DB WRITE AUTHORIZED`
- `next_write_allowed=false`

## Scenari

### Errore durante creazione view

- Fermare l’apply.
- Non improvvisare correzioni live.
- Salvare messaggio errore sanificato.
- Tornare alla draft e aprire fase di hardening separata.

### Name conflict

- Verificare se esistono view con stesso nome.
- Confrontare definizioni salvate nella backup checklist.
- Non fare drop/replace senza review manuale e autorizzazione esplicita.

### Permessi/RLS non coerenti

- Non allargare policy o grant live senza review.
- Verificare ruolo previsto per la lettura.
- Preparare correzione separata no-apply.

### `/admin/imports` non legge le view

- Verificare prima che la pagina resti read-only.
- Verificare nomi view e colonne attese.
- Non aggiungere azioni di scrittura per compensare il problema.

### Campo non desiderato esposto

- Considerare la view non accettata.
- Preparare nuova draft con colonna rimossa.
- Non procedere con import o writer.

## Strategia rollback documentale

Qualunque rollback futuro dovrà essere preparato come piano separato, con:

- stato backup iniziale;
- oggetti toccati;
- azione proposta;
- impatto previsto;
- autorizzazione esplicita.

Eventuali `DROP`/`CREATE OR REPLACE` devono restare `DOCUMENTATION_ONLY / DO NOT RUN` finché non autorizzati in uno step dedicato.

