# Punto 51 — Decision after P50

## Option A — Public reader design dry-run

Obiettivo:

- disegnare lettori pubblici separati;
- definire query che filtrano solo `visibility='public'`;
- non implementarli operativamente;
- non esporre dati reali;
- non creare route pubbliche operative;
- non modificare visibility.

Consigliato se vogliamo avanzare l’architettura pubblica in sicurezza.

## Option B — Repeat browser admin verification with real session

Obiettivo:

- chiudere la verifica admin reale ancora pendente;
- verificare `/admin/data`, `/admin/data/competitions`, dettaglio manuale e `/admin/imports`;
- confermare link `/admin/data`;
- confermare sidebar `Manual Data`.

Consigliato se è disponibile una sessione admin reale osservabile.

## Option C — Public routes mock-only plan

Obiettivo:

- progettare pagine pubbliche mock/empty state;
- non leggere dati reali;
- non usare admin reader;
- non cambiare visibility.

## Recommended decision

Scelta consigliata:

- A se si vuole avanzare l’architettura pubblica senza rischio;
- B se è disponibile una sessione admin reale.

## Decisione eseguita

Punto 51 ha selezionato l’Opzione A:

- public reader design dry-run;
- nessun public reader operativo;
- nessuna route pubblica reale;
- nessun cambio visibility;
- nessuna DB write;
- nessun provider/import;
- Production non toccata.

## Hard constraints

- dati `private_admin` non pubblici;
- no provider/import;
- no deploy;
- no Production;
- no DB write senza autorizzazione esplicita;
- no service_role;
- no public route operativa nel Punto 50.
