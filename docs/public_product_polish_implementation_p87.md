# Public Product Polish Implementation — P87

## Scope

P87 implementa il polish UI/copy pubblico pianificato in P86.

Scope rispettato:

- UI/copy public only;
- no deploy;
- no merge main;
- no DB write;
- no rollback;
- no provider/import;
- no Apify;
- no Vercel/env/root directory changes.

## Files changed

- `app/(public)/page.tsx`
- `app/(public)/competitions/page.tsx`
- `app/(public)/competitions/[slug]/page.tsx`
- `components/public/HomeHero.tsx`
- `components/public/NewsletterCTA.tsx`
- `components/public/PublicCompetitionCard.tsx`
- `components/public/PublicDataBadge.tsx`
- `docs/public_product_polish_implementation_p87.md`
- `docs/public_product_polish_implementation_checklist_p87.md`
- `docs/manual_import_point_88_decision_p87.md`
- `docs/provider_point_87_closure.md`
- `docs/production_readiness.md`
- `docs/c_phase_progress.md`
- `docs/supabase_staging_next_steps.md`

## Homepage changes

La homepage ora comunica più chiaramente:

- cos’è Regista Avanzato;
- il posizionamento “calcio fuori dal mainstream”;
- valore prodotto: dati, storie, contesto e radar video;
- CTA primaria verso `/competitions`;
- CTA newsletter senza inventare URL esterne;
- nota MVP sui primi dati curati manualmente;
- sezione “Cosa trovi” con quattro blocchi:
  - Campionati radar;
  - Squadre e classifiche;
  - Storie e talenti;
  - Video e highlights ufficiali.

Il fallback della homepage è stato allineato allo stesso messaggio prodotto.

## Competitions page changes

`/competitions` ora usa un tono meno tecnico e più editoriale:

- titolo aggiornato a “Campionati nel radar”;
- descrizione del radar competizioni;
- microcopy MVP/dati manuali;
- count competizioni disponibili;
- card più orientate al valore prodotto;
- nessun campo interno esposto;
- nessun bottone operativo.

## Competition detail changes

`/competitions/[slug]` ora presenta la competizione come scheda pubblica/editoriale:

- headline “Scheda competizione”;
- nota “Scheda dimostrativa MVP”;
- stato dati “Dati MVP curati manualmente”;
- sezioni più leggibili per squadre e classifica;
- box “Prossimi sviluppi” con storie, talenti, video radar e highlights ufficiali;
- link di ritorno ai campionati.

## Safety

Conferme:

- `provider_import_enabled=false`;
- `apify_enabled=false`;
- `db_write_additional=false`;
- `production_touched=false`;
- `deploy_executed=false`;
- nessuna modifica env/Vercel;
- nessun dato `private_admin` esposto;
- nessun admin link aggiunto;
- nessun debug/raw payload aggiunto;
- nessun bottone Run/Import/Execute/Sync/Save/Apply aggiunto;
- nessun reader DB modificato;
- nessun filtro visibility modificato;
- nessuna migration/schema/RLS modificata.

## Local verification

Da verifiche P87:

- `/` resta parte del percorso pubblico atteso;
- `/competitions` resta parte del percorso pubblico atteso;
- `/competitions/manual-serie-a` resta parte del percorso pubblico atteso;
- public readers restano in stato `public_competitions_count=1`, `public_teams_count=2`, `public_standings_count=2`, `public_bundle_status=ready`;
- `lint`, `typecheck` e `build` richiesti prima del commit.

## Decision

- `point_87_public_product_polish_implemented=true`
- `public_product_polish_implemented=true`
- `no_deploy=true`
- `db_write_additional=false`
- `provider_import_enabled=false`
- `apify_enabled=false`
- `production_touched=false`
