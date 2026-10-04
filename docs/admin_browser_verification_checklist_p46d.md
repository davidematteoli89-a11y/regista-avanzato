# Punto 46-D — Admin browser verification checklist

Checklist manuale per verificare la superficie admin read-only con una sessione admin reale.

## Before starting

- Confermare ambiente:
  - Preview già esistente, oppure
  - locale `http://localhost:3000`.
- Confermare esplicitamente: non Production.
- Accedere solo con account admin già esistente.
- Non creare utenti.
- Non modificare ruoli.
- Non modificare RLS/policy.
- Non condividere password, cookie, token, header auth o screenshot con segreti.
- Non premere bottoni di import/write se mai comparissero.

## Routes to check

| Step | Route | Expected | Result to report |
| ---: | --- | --- | --- |
| 1 | `/admin/data` | pagina admin data read-only, badge/testi sicurezza, link competitions | caricata sì/no; errori visibili senza segreti |
| 2 | `/admin/data/competitions` | lista con `Serie A Manual Sample` e `manual-serie-a` | competition visibile sì/no; conteggio competitions |
| 3 | `/admin/data/competitions/manual-serie-a` | dettaglio con 2 teams e 2 standings | teams count; standings count; eventuali errori |
| 4 | `/admin/imports` | link verso `/admin/data` e `/admin/data/competitions`; nessun bottone operativo | link visibili sì/no; bottoni write assenti sì/no |

## Expected data

Competition:

- name: `Serie A Manual Sample`;
- slug/internal_key/api_competition_id: `manual-serie-a`;
- country: `Italy`;
- season: `2026`;
- status: `draft`;
- visibility: `private_admin`.

Teams:

- `manual-team-1` / `Manual Team One`;
- `manual-team-2` / `Manual Team Two`.

Standings:

- `Manual Team One`, rank `1`, points `3.00`;
- `Manual Team Two`, rank `2`, points `0.00`.

## Safety checks

Riportare solo sì/no:

- nessun bottone `Run Import`;
- nessun bottone `Start Import`;
- nessun bottone `Execute`;
- nessun bottone `Sync`;
- nessun bottone `Save to DB`;
- nessun bottone `Apply`;
- nessun form write;
- nessun trigger provider/import;
- nessun riferimento a Production;
- nessun dato `private_admin` visibile nelle route pubbliche.

## What to report back

Riportare solo:

- route caricata: sì/no;
- dati visibili: sì/no;
- conteggio competitions visualizzate;
- conteggio teams visualizzati;
- conteggio standings visualizzate;
- eventuale messaggio errore visibile, senza token/cookie/password;
- screenshot solo se privo di segreti.

Non riportare:

- password;
- token;
- cookie;
- header auth;
- Supabase URL/key;
- valori da `.env.local`.
