# Admin protection todo

## Stato attuale

La dashboard admin resta mock/dry-run sul piano dei dati operativi, ma il codice applica ora un blocco server-side Supabase Auth/RBAC.

## Protezione minima staging

- Mantenere Vercel Authentication attiva sui deployment Preview.
- Non collegare provider reali, Apify o dati sensibili.
- Non inserire `SUPABASE_SERVICE_ROLE_KEY` in ambienti client.
- Mostrare chiaramente stato mock/non produttivo nelle pagine admin.
- Mostrare un tasto `Esci` visibile nell'area admin per chiudere la sessione Supabase senza passare dall'account pubblico.
- La navbar pubblica legge ora la sessione server-side: da non loggato mostra `Accedi` e `Registrati gratis`, da loggato mostra `Account`.

## Protezione applicativa futura

- In `app/admin/layout.tsx`, la sessione e il ruolo vengono verificati prima di renderizzare sidebar/contenuti.
- Accesso consentito a `admin`, `super_admin` ed `editor`.
- Profilo mancante, non approved o ruolo insufficiente viene bloccato server-side.
- Non leggere dati admin da componenti client.
- Continuare a sostituire i reader mock con view `admin_*` e RPC server-side.

## Promozione admin

- Creare l'utente con Supabase Auth.
- Lasciare che il trigger crei il profilo `free_user`.
- Promuovere manualmente con SQL controllato in staging.
- Registrare la promozione in `admin_audit_logs` quando sara' disponibile il flusso audit operativo.
- Non usare metadata client per decidere il ruolo.

## Esito test staging

- L'utente test e' stato promosso ad `admin` dopo conferma.
- `is_admin()` e `is_editor_or_admin()` risultano true.
- `has_role('editor')` resta false, come atteso per un ruolo admin non editor.
- La lettura dei contenuti operativi admin passa da view `admin_*`, non da SELECT diretto sulle tabelle base.

## Test da fare

- Utente anon: `/admin` bloccato prima del render, verificato localmente come 404.
- Utente free_user: `/admin` bloccato.
- Utente editor: accesso solo alle aree editoriali previste.
- Utente admin: accesso alle aree operative via helper server-side e view `admin_*`, verificato localmente.
- Logout: `/admin` bloccato dopo uscita, verificato localmente.
- C.4.2: il logout admin deve reindirizzare a `/login` e lasciare `/admin` bloccato per non autenticati.
- Nessun log, costo, provider config o source payload visibile fuori da admin.
- Dopo login Supabase, la navbar pubblica non deve più mostrare `Accedi`/`Registrati gratis`; deve mostrare `Account` senza esporre ruolo o dati admin.

## C.4.3 — Test Preview completato manualmente

La verifica tecnica ha confermato:

- deployment Preview Ready per il branch `preview` e commit `11646dc`;
- Deployment Protection attiva con redirect anonimo a Vercel SSO;
- Production non toccata.

Conferme browser manuali:

- tasto `Esci` visibile in `/admin`;
- click `Esci` con redirect a `/login`;
- `/admin` bloccato dopo logout;
- navbar pubblica `Accedi`/`Registrati gratis` da non loggato;
- navbar pubblica `Account` da loggato.
- registrazione funzionante dopo configurazione corretta degli URL Supabase Auth;
- `/admin` accessibile solo con account admin;
- utenti non loggati/non admin bloccati o 404.

Nota: il test automatico non è stato completato perché la protezione Vercel funziona e il browser agent non è disponibile nella sessione locale. La chiusura è basata su verifica manuale dell'utente.

Checklist aggiornata dopo fix CTA:

- da non loggato, la navbar deve mostrare `Accedi` e `Registrati gratis`;
- `Accedi` deve aprire `/login`;
- `Registrati gratis` deve aprire `/registrati`;
- da loggato, la navbar deve mostrare solo `Account` verso `/account`.

## Supabase Auth URL per Preview

- Per test Preview, `Site URL` e `Redirect URLs` in Supabase Auth devono puntare al dominio Preview usato.
- `localhost` deve restare solo per sviluppo locale.
- Link email già generati prima del cambio URL possono puntare ancora al vecchio URL.
- Dopo cambio URL, rigenerare registrazione/email di conferma.

## Nota performance login/logout

- `force-dynamic` sul layout pubblico è intenzionale per evitare navbar statica non coerente con la sessione.
- `getCurrentUser()` è deduplicata per richiesta con `React.cache`.
- Le letture quota non rileggono la sessione quando ricevono già `userId`.
- Il logout admin resta minimale: `signOut()` Supabase server-side e redirect a `/login`.
- La lentezza percepita su Preview può dipendere da Vercel Authentication, Supabase Auth remoto e cold start Preview.
- Prima di ulteriori ottimizzazioni, misurare nel browser i tempi di:
  - click `Accedi` -> `/login`;
  - submit login -> `/account`;
  - click `Esci` admin -> `/login`.

## Stato C.4

- Le sezioni admin editoriali iniziano a leggere contenuti da Supabase staging con reader server-side.
- Reader collegati:
  - `getAdminEditorialArticles()`;
  - `getAdminNewsItems()`;
  - `getAdminStories()`;
  - `getAdminHistoricalEchoes()`;
  - `getAdminEditorialSummary()`.
- Le query passano da view `admin_*` protette da RLS/RBAC.
- Il client usato è quello server-side della sessione, non `SUPABASE_SERVICE_ROLE_KEY`.
- Le code mock/dry-run restano visibili e chiaramente separate dai blocchi Supabase staging.

## TODO sicurezza per azioni reali

- Aggiungere Server Actions con controllo `requireAdmin()` o helper equivalente.
- Bloccare update massivi senza filtro `id`.
- Registrare ogni scrittura in `admin_audit_logs`.
- Implementare rollback/unpublish prima di delete.
- Testare editor/admin/free_user/anon su ogni azione.

## C.4.4 — Hardening view admin

- Preparata e applicata manualmente su Supabase staging la migrazione `0007_admin_editorial_views_explicit_columns.sql`.
- Obiettivo: sostituire le quattro view admin editoriali usate dal codice con versioni a colonne esplicite.
- Nessuna policy RLS viene modificata.
- Nessuna tabella base viene alterata.
- Nessun dato viene cancellato.
- Le colonne interne restano visibili solo dove servono alla UI admin:
  - `internal_notes`;
  - `internal_warnings`;
  - `internal_score`.
- Le public view restano separate e non ricevono score/warning/note interne.

Verifiche C.4.4-A completate su staging:

- le quattro view esistono dopo la ricreazione;
- `information_schema.columns` conferma colonne esplicite;
- `pg_views` conferma `where public.is_editor_or_admin()`;
- `anon` non ha grant;
- `authenticated` ha `select`, ma i `free_user` non ricevono righe grazie al filtro RBAC;
- `postgres` e `service_role` hanno permessi tecnici normali Supabase;
- provider e Apify restano spenti.

Da completare in futuro:

- audit delle altre view `admin_*` non editoriali ancora fuori scope;
- verifica end-to-end Preview dopo eventuale commit/deploy della sola documentazione o dopo successive modifiche operative.

## C.5.1 — Blocco sicurezza per Server Actions reali

Audit completato:

- le tabelle editoriali hanno campi sufficienti per note interne e rollback/unpublish;
- RLS staff consente gestione delle tabelle editoriali solo a `is_editor_or_admin()`;
- `admin_audit_logs` è append-only e consente insert solo a `is_admin()`;
- non esiste ancora una RPC transazionale che garantisca `update + audit log` nello stesso blocco.

Decisione:

- non attivare Server Actions reali finché non esiste una funzione SQL transazionale controllata;
- non usare `service_role` per bypassare RLS;
- non implementare update multi-step da TypeScript come se fosse audit obbligatorio.

TODO C.5.2:

- preparare migrazione RPC per mutazioni editoriali singole e auditate;
- decidere se gli `editor` possono scrivere audit log o se le prime scritture restano solo `admin/super_admin`;
- validare `content_type`, `id`, `status` e `visibility` dentro SQL;
- testare anon/free_user/editor/admin prima di esporre form in UI.

## C.5.2 / C.5.2-A — RPC transazionali preparate e applicate su staging

Migrazione applicata manualmente su Supabase staging:

- `0008_admin_editorial_transactional_actions.sql`.

Funzioni:

- `update_editorial_internal_notes`;
- `unpublish_editorial_content`.

Scelta di sicurezza:

- solo admin/super_admin nella prima versione;
- niente editor finché non viene estesa e testata la policy di audit log;
- niente Server Actions UI finché le RPC non vengono testate con una sessione admin reale dell’app.

Controlli integrati:

- `auth.uid()` presente;
- `public.is_admin()` obbligatorio;
- content type whitelistato;
- update singolo per UUID;
- audit append-only nello stesso blocco SQL;
- niente delete;
- niente publish massivo;
- niente nomi tabella dinamici.

Verificato in C.5.2-A:

- il Supabase SQL Editor non fornisce una sessione Auth admin dell’app: `auth.uid()` risulta `null`;
- `public.is_admin()` risulta `false`;
- la RPC blocca correttamente la chiamata con `admin_editorial_action_forbidden`;
- il controllo `public.is_admin()` resta obbligatorio e non va rimosso.

Da verificare in C.5.3:

- admin esegue RPC tramite Server Action/sessione reale e genera audit;
- anon non esegue RPC;
- free_user non esegue RPC;
- rollback/unpublish rimuove pubblicazione ma non cancella dati;
- pagine pubbliche non mostrano più il contenuto dopo unpublish;
- pagine admin continuano a leggerlo come private/draft/archived.

## C.5.3 — Prima Server Action admin collegata

Implementata localmente:

- `updateAdminEditorialInternalNotesAction`.

Protezione:

- la action usa `requireAdmin()`;
- usa il client Supabase server-side con cookie sessione utente;
- non usa `SUPABASE_SERVICE_ROLE_KEY`;
- non chiama provider o Apify;
- non scrive direttamente tabelle editoriali o audit log.

Validazioni:

- content type whitelistato;
- UUID obbligatorio;
- note massimo 4000 caratteri;
- nessun update massivo;
- nessun nome tabella dinamico.

Limite voluto:

- `unpublish_editorial_content` resta non collegata;
- la UI permette solo salvataggio note interne;
- editori non ancora abilitati al test positivo finché la policy audit resta admin-only.

Test richiesti prima di considerarla stabile:

- admin salva nota e genera audit;
- free_user/anon bloccati da `/admin`;
- errore RPC gestito senza dettagli sensibili;
- nessuna modifica pubblica indesiderata.

## C.5.3-A — Test Preview completato

La Server Action è stata verificata manualmente su Vercel Preview con sessione admin reale.

Verificato manualmente:

- Deployment Preview del commit `91e3e89` in stato Ready;
- login admin riuscito;
- `/admin/generated-content/articles` accessibile;
- textarea `Note interne`, bottone `Salva note` e badge `Staging manual action` visibili;
- salvataggio nota interna demo riuscito;
- pagina aggiornata senza errore;
- riga `admin_audit_logs` creata dalla RPC `update_editorial_internal_notes`;
- `before_data`, `after_data`, `metadata` e `created_at` recente confermati;
- nessun pulsante unpublish/publish/delete/create esposto;
- provider/Apify spenti;
- Production non toccata.

Nota sicurezza:

- il test positivo non va simulato dal SQL Editor, dove `auth.uid()` risulta `null`;
- non rimuovere `public.is_admin()`;
- non usare service role;
- non aggirare RLS.
