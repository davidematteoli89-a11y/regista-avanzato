# Punto 18 — Provider fallback strategy + manual/mock data mode closure

Stato: chiuso localmente.

## Sintesi

Punto 18 chiude la fase provider stabilendo una strategia fallback sicura:

- nessun provider reale attivo;
- TheStatsAPI / Stats API sospeso dopo 403;
- API-Football sospeso/no retry dopo 403;
- Apify spento;
- provider/import spenti;
- `realWritesEnabled=false`;
- dati manuali/mock come percorso operativo;
- fixture locali come dry-run tecnico, senza fetch e senza DB write.

## File principali

- `config/providers.ts`: note provider aggiornate con stato sospeso/off.
- `lib/provider/providerModes.ts`: stato esplicito manual/mock vs real provider.
- `fixtures/provider/manual/*.sample.json`: fixture locali versionate.
- `scripts/provider/manualFixtureDryRun.ts`: dry-run locale read-only.
- `app/admin/imports/page.tsx`: messaggio read-only/manual-mock più esplicito.

## Comando dry-run Punto 18

```bash
npm run dry-run:manual-fixtures
```

## Garanzie

- Nessuna chiamata TheStatsAPI / Stats API v1.
- Nessuna chiamata API-Football.
- Nessuna chiamata Apify/SofaScore.
- Nessuna fetch provider.
- Nessuna lettura/stampa token.
- Nessuna scrittura DB.
- Nessun `service_role`.
- Nessun `db push/reset`.
- Nessun deploy.
- Production non toccata.

## Prossimo step consigliato

Punto 19: continuare su contenuti/manual data e readiness prodotto senza dipendere da provider reali, oppure riaprire provider solo con checklist dedicata e conferma esplicita.
