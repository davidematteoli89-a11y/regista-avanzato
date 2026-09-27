# Punto 47 — Admin read-only UX polish implementation plan

## Goal

Preparare uno step futuro di polish UI read-only per la superficie manual data admin.

Questa fase non implementa codice UI. L’implementazione potrà avvenire in Punto 48 solo se autorizzata.

## Future implementation sequence

### 1. Improve `/admin/data` as hub

Allowed future changes:

- aggiungere breadcrumb `Admin / Manual data`;
- rendere più visibili badge `Read-only`, `Admin only`, `Provider off`, `Import off`, `Public disabled`;
- aggiungere una card “Manual fixture staging data”;
- aggiungere una nota “browser admin verification pending”.

Not allowed:

- bottoni `Run`, `Import`, `Sync`, `Save`, `Execute`;
- form;
- Server Action write.

### 2. Improve `/admin/data/competitions`

Allowed future changes:

- summary cards:
  - expected competitions: `1`;
  - visibility: `private_admin`;
  - provider/import: `off`;
- badge `draft` e `private_admin`;
- empty state più descrittivo:
  - “Nessuna competition leggibile: verificare sessione admin/RLS, senza modificare DB”;
- link dettaglio più chiaro.

Not allowed:

- edit status;
- edit visibility;
- import/sync;
- provider fetch.

### 3. Improve `/admin/data/competitions/[slug]`

Allowed future changes:

- breadcrumb `Admin / Manual data / Competitions / manual-serie-a`;
- summary card competition;
- teams count card;
- standings count card;
- standings table con rank/points più leggibili;
- badge `private_admin`;
- warning “public exposure disabled”;
- warning “admin browser verification pending” finché non passa Punto 46-E/Fix.

Not allowed:

- edit team;
- edit standings;
- recalc standings;
- save to DB;
- import provider.

### 4. Improve `/admin/imports`

Allowed future changes:

- evidenziare link verso `/admin/data`;
- evidenziare link verso `/admin/data/competitions`;
- aggiungere stato Punto 46/47:
  - read-only admin surface implemented;
  - browser admin verification pending;
  - provider/import off.

Not allowed:

- run import;
- apply SQL;
- rollback;
- sync provider.

### 5. Repeat browser verification

Quando sarà disponibile una sessione admin reale:

- verificare `/admin/data`;
- verificare `/admin/data/competitions`;
- verificare `/admin/data/competitions/manual-serie-a`;
- verificare `/admin/imports`;
- documentare counts reali.

## Safety constraints for Punto 48

Punto 48 deve restare:

- read-only;
- nessuna DB write;
- nessun provider/import;
- nessun Apify;
- nessun deploy;
- nessuna Production;
- nessun cambio auth/RLS/visibility;
- nessun dato `private_admin` pubblico.

## Verification for future implementation

Ogni futura implementazione UI deve passare:

- `npm run dry-run:manual-import-preview`;
- `npm run probe:thestatsapi:gated`;
- `THESTATSAPI_PROBE_TARGET=competitions_v1 npm run probe:thestatsapi:gated`;
- `npm run probe:api-football:gated`;
- `npm run audit:providers`;
- `npm run dry-run:provider-writer-guards`;
- `npm run lint`;
- `npm run typecheck`;
- `npm run build`.
