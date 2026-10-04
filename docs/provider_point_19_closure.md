# Punto 19 — Manual Data Admin + Fixture Preview closure

Stato: completato localmente.

## Perché esiste Punto 19

Dopo il Punto 18 il progetto ha una strategia fallback senza provider reali. Punto 19 rende questa strategia usabile in admin: le fixture/manual data possono essere visualizzate e validate in read-only.

## Cosa è stato aggiunto

- Modulo condiviso `lib/provider/manualFixtures.ts`.
- Script `npm run dry-run:manual-fixtures` mantenuto compatibile e basato sul modulo condiviso.
- Sezione read-only “Manual fixture preview” in `/admin/imports`.
- Documentazione `docs/manual_fixture_preview_p19.md`.

## Cosa mostra la preview

- Stato provider sospesi/off.
- Stato manual/mock active/safe.
- Summary fixture.
- Competitions preview.
- Teams preview.
- Standings preview.
- Validazione campi e riferimenti.
- Mapping teorico possibile.

## Cosa resta vietato

- Import reale.
- Scrittura DB.
- Server Action di scrittura.
- Bottoni run/import/sync/save/delete.
- Provider call.
- Apify/SofaScore.
- `service_role`.
- `db push/reset`.
- Deploy/Production.

## Cosa è consentito ora

- Visualizzare fixture locali/manuali.
- Eseguire dry-run locale.
- Usare la preview admin per valutare forma e coerenza dei dati.
- Preparare un futuro piano di import manuale staging solo come step separato.

## Decisione finale

Punto 19 completato.

Admin può visualizzare e validare fixture/manual data in read-only.

Nessun import reale è autorizzato.

Nessuna scrittura DB è autorizzata.

Provider reali restano sospesi.

## Prossimo step consigliato

Punto 20: decidere se proseguire con un import manuale staging esplicitamente autorizzato oppure rafforzare ulteriormente contenuti/manual data senza scritture.
