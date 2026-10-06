# Manual Import Point 87 Decision — from P86

## Decision

P86 raccomanda P87 — Implement public product polish.

P87 deve essere un intervento UI/copy sul percorso pubblico già esistente, senza nuove scritture dati e senza cambiare lo stato Supabase.

## Allowed in P87

- polish homepage;
- polish `/competitions`;
- polish `/competitions/manual-serie-a`;
- copy più editoriale;
- CTA verso `/competitions`;
- CTA newsletter senza URL inventata;
- microcopy MVP/manual data;
- miglioramenti responsive/accessibility;
- eventuale static copy/config pubblico;
- verifiche locali no-auth.

## Not allowed in P87 without new explicit authorization

- DB write;
- rollback;
- visibility change;
- provider/import;
- Apify;
- migrations;
- Supabase schema/RLS/policy;
- Server Action write;
- admin write actions;
- bottoni Run/Import/Execute/Sync/Save/Apply;
- deploy Production;
- Vercel config/env/root changes;
- dati `private_admin`;
- debug/raw payload pubblici.

## Expected P87 outcome

- `p87_recommended=implement_public_product_polish`
- public routes remain live;
- public data remains visible;
- no DB write;
- no provider/import;
- no Apify;
- no Production deploy unless explicitly authorized later.
