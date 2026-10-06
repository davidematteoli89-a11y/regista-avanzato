# Public Product Polish Plan — P86

## Scope

P86 è solo pianificazione prodotto/editoriale per il primo polish pubblico post-MVP.

In questa fase:

- nessuna modifica codice;
- nessun deploy;
- nessun merge;
- nessuna DB write;
- nessun rollback;
- nessuna modifica visibility;
- nessun provider/import;
- nessun Apify;
- nessuna modifica Vercel/env/root directory;
- nessuna lettura o stampa di `.env.local`, token, cookie o header auth.

## Current production baseline

| Item | Stato |
| --- | --- |
| Production URL | `https://regista-avanzato-rouge.vercel.app/` |
| Home | HTTP 200 |
| `/competitions` | HTTP 200, dati visibili |
| `/competitions/manual-serie-a` | HTTP 200, dati visibili |
| Public data | `public_competitions_count=1`, `public_teams_count=2`, `public_standings_count=2`, `public_bundle_status=ready` |
| Provider/import | `provider_import_enabled=false` |
| Apify | `apify_enabled=false` |
| DB write aggiuntive | `false` |
| Rollback | `rollback_executed=false` |

## Current public UI inventory

### Home

La homepage pubblica esiste e collega già il percorso pubblico verso `/competitions`.

Elementi osservati in sola lettura:

- hero con posizionamento “Dove i numeri incontrano le storie”;
- CTA primaria verso `/competitions`;
- sezioni editoriali già presenti: articoli, talenti, partite pazze, historical echo, video radar;
- CTA newsletter già instradata tramite componente dedicato;
- sezione competizioni pubbliche collegata a `/competitions`;
- alcuni testi ancora tecnici, per esempio “Public data only”, `public_free` e note da validazione tecnica.

Rischio UX attuale:

- il valore del prodotto è presente ma non abbastanza immediato per un utente nuovo;
- il linguaggio tecnico può sembrare da staging/demo invece che da prodotto editoriale;
- il link legacy `/competizioni` resta utile per sezioni storiche, ma non deve confondere il percorso MVP `/competitions`.

### `/competitions`

La pagina pubblica usa `getPublicCompetitions()` e mostra solo dati pubblici tramite public readers.

Elementi osservati:

- titolo “Competizioni pubbliche”;
- count competizioni disponibili;
- card per competizioni pubbliche;
- link dettaglio a `/competitions/[slug]`;
- empty state sicuro;
- copy esplicito su dati `public_free` e public reader;
- nessun bottone operativo.

Rischio UX attuale:

- testo corretto ma ancora tecnico;
- manca una cornice editoriale più forte su “campionati nel radar”;
- la spiegazione MVP/manual data può essere più trasparente e meno interna.

### `/competitions/[slug]`

La pagina dettaglio usa `getPublicCompetitionBundleBySlug(slug)`.

Elementi osservati:

- dettaglio pubblico visibile;
- summary competition/country/season;
- conteggio teams e standings;
- lista squadre;
- tabella classifica con overflow responsive;
- link back a `/competitions`;
- empty/not found state sicuro;
- nessun fallback admin/private;
- nessun bottone operativo.

Rischio UX attuale:

- pagina funziona, ma può sembrare più “scheda dati” che prodotto editoriale;
- mancano microcopy su “scheda MVP”, stato dati e prossimi contenuti editoriali;
- si può rendere più leggibile la gerarchia: competizione, squadre, classifica, cosa arriverà dopo.

### Shared public components

Componenti rilevanti:

- `components/public/HomeHero.tsx`;
- `components/public/PublicNavigation.tsx`;
- `components/public/PublicCompetitionCard.tsx`;
- `components/public/PublicDataBadge.tsx`;
- `components/public/PublicStandingsTable.tsx`;
- `components/public/NewsletterCTA.tsx`;
- `components/public/SubstackCTA.tsx`.

Nota Substack:

- la CTA newsletter esiste;
- se la URL Substack non è configurata, la CTA deve restare disabilitata/documentata;
- non va inventata una URL.

## Product positioning

Messaggio guida:

> Regista Avanzato è un osservatorio calcistico narrativo: unisce dati, storie, contesto e video radar per scoprire campionati, squadre e talenti fuori dal mainstream.

La homepage deve chiarire in pochi secondi:

- cos’è Regista Avanzato;
- a chi serve;
- perché è diverso;
- cosa si può fare ora;
- che lo stato attuale è MVP con primi dati curati manualmente;
- come seguire il progetto/newsletter.

## Copy deck consigliato per P87

### Hero

- Title: `Regista Avanzato`
- Subtitle: `Il calcio fuori dal mainstream, letto con dati, storie e contesto.`
- Description: `Un osservatorio narrativo per seguire campionati, squadre e talenti meno raccontati: statistiche essenziali, percorsi, radar video e spunti editoriali in un unico spazio.`
- CTA primary: `Esplora i campionati`
- CTA secondary: `Segui la newsletter`
- MVP note: `MVP pubblico: i primi dati sono curati manualmente per validare struttura, esperienza e racconto.`

### “Cosa trovi”

Card consigliate:

- `Campionati radar`;
- `Squadre e classifiche`;
- `Storie e talenti`;
- `Video e highlights ufficiali`.

### “Perché esiste”

Copy consigliato:

`Regista Avanzato nasce per dare profondità a campionati e giocatori che spesso restano fuori dal racconto quotidiano: meno rumore, più contesto.`

### `/competitions`

- Title: `Campionati nel radar`
- Description: `Una prima selezione di competizioni monitorate da Regista Avanzato. In questa fase MVP i dati sono manuali e servono a testare il flusso pubblico.`
- Microcopy: `Primi campionati disponibili nel radar di Regista Avanzato. In questa fase MVP i dati sono curati manualmente e servono a validare esperienza, struttura e racconto.`

### `/competitions/[slug]`

- Section title: `Scheda competizione`
- Status block: `Dati MVP curati manualmente.`
- Future block: `Prossimi sviluppi: storie, giocatori da seguire, video radar e link ad highlights ufficiali.`

## P87 implementation plan — no-apply in P86

P87 consigliato: implementare solo polish UI/copy del percorso pubblico.

File candidati:

- `app/(public)/page.tsx`;
- `app/(public)/competitions/page.tsx`;
- `app/(public)/competitions/[slug]/page.tsx`;
- `components/public/HomeHero.tsx`;
- `components/public/PublicNavigation.tsx`;
- `components/public/PublicCompetitionCard.tsx`;
- `components/public/PublicDataBadge.tsx`;
- `components/public/PublicStandingsTable.tsx`;
- eventuale file statico di copy/config pubblico non operativo.

Out of scope P87:

- provider/import;
- Apify;
- DB write;
- visibility change;
- Supabase schema/RLS/policy;
- migrations;
- admin write actions;
- Server Action write;
- Vercel config/env/root directory;
- deploy Production automatico;
- bottoni Run/Import/Execute/Sync/Save/Apply;
- dati `private_admin`;
- debug/raw payload.

## Acceptance criteria P87

P87 potrà essere considerato riuscito se:

- `/` resta HTTP 200;
- `/competitions` resta HTTP 200;
- `/competitions/manual-serie-a` resta HTTP 200;
- `public_competitions_count=1`;
- `public_teams_count=2`;
- `public_standings_count=2`;
- `public_bundle_status=ready`;
- UI più chiara/editoriale;
- CTA primaria verso `/competitions`;
- CTA newsletter presente senza URL inventata;
- microcopy MVP/manual data presente;
- dati pubblici visibili;
- nessun `private_admin` visibile;
- nessun admin link pubblico;
- nessun debug/raw payload;
- nessun bottone operativo;
- provider/import/Apify off;
- `db_write=false`;
- `lint`, `typecheck` e `build` passano.

## Decision

- `point_86_public_product_polish_plan_completed=true`
- `public_product_polish_plan_created=true`
- `p87_recommended=implement_public_product_polish`
- `no_code_change=true`
- `no_deploy=true`
- `db_write_additional=false`
- `provider_import_enabled=false`
- `apify_enabled=false`
