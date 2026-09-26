# Punto 44 — Manual data routes plan

## Scope

Piano route future per mostrare dati manuali in sola lettura.

Punto 44 non implementa route, non fa deploy e non abilita il pubblico.

## Admin candidate routes

| Route | Purpose | Priority | Write actions |
| --- | --- | --- | --- |
| `/admin/data` | entrypoint dati manuali/read-only | medium | none |
| `/admin/data/competitions` | lista competizioni manuali | high | none |
| `/admin/data/competitions/[slug]` | dettaglio competition manuale | high | none |
| `/admin/data/competitions/[slug]/teams` | tabella squadre manuali | high | none |
| `/admin/data/competitions/[slug]/standings` | classifica manuale | high | none |

## Public candidate routes

| Route | Purpose | Status |
| --- | --- | --- |
| `/competitions` | public stats hub/list | existing/public reader, not manual private data |
| `/competitions/[slug]` | public competition detail | future only after visibility decision |
| `/competitions/[slug]/standings` | public standings | future only after visibility decision |

## Route policy

- admin prima del pubblico;
- pubblico solo dopo decisione esplicita su visibility/policy;
- dati `private_admin` non pubblici;
- nessun deploy nel Punto 44;
- nessuna Server Action write;
- nessun bottone Run/Import/Execute/Sync/Save to DB.

## Recommended next route

Punto 45 dovrebbe partire da una superficie admin read-only:

- `/admin/data/competitions`, oppure
- integrare provvisoriamente una sezione admin read-only dedicata in `/admin/imports`.
