# Piano RLS preparato

Le policy sono in `0003_rls_policies.sql`; non sono state applicate.

## Modello

- Deny-by-default su tutte le tabelle.
- `anon` e free usano view con allowlist, non query dirette alle tabelle editoriali.
- `authenticated` gestisce solo profilo, preferenze e preferiti propri; quota in sola lettura.
- `editor` gestisce contenuti e dati calcistici.
- `admin/super_admin` gestiscono anche provider, import, budget, subscriber e costi.
- `service_role` bypassa RLS soltanto nei job server autorizzati; nessuna policy client dedicata.

## Protezione colonne

RLS filtra righe, non colonne. Per questo:

- il SELECT diretto alle tabelle pubblicabili è revocato ad anon/authenticated;
- `0004_public_views.sql` espone solo colonne nominate;
- le view pubbliche applicano status, visibility, login e published_at;
- le view `admin_*` filtrano con `is_editor_or_admin()` e sono l'interfaccia di lettura completa staff;
- `internal_notes`, raw payload, score, warning, review, costi e log non sono nelle view pubbliche.

## Contenuti

Anon vede soltanto `published`, visibility free/preview, non login-required e `published_at <= now()`. Authenticated aggiunge `public_login_required`. `approved` non significa pubblico.

Highlight richiede anche `is_official` e `highlight_status = published`; URL completo è mascherato per anon. Video Radar maschera script, visual notes e official links per anon.

Le stats profonde non hanno policy anon. Authenticated le legge solo se la competition parent è pubblicata e `public_stats_enabled`.

## Dati utente

- Profilo: SELECT proprio; insert solo ID proprio e ruolo `free_user`; UPDATE con grant limitato a display name/avatar.
- Preferenze e preferiti: ownership `user_id = auth.uid()` in `using` e `with check`.
- Quota: SELECT propria; insert/update/delete revocati, incremento soltanto RPC.
- Ruolo, status e note interne non sono aggiornabili dal normale client.

## Audit e tabelle sensibili

`admin_audit_logs` permette solo SELECT/INSERT a admin e nessuna policy o grant UPDATE/DELETE. Provider config, API/import log, Apify costi/budget e subscriber sono admin-only. Generated content privato, candidate e radar interni sono staff-only.

## Test post-migrazione

1. Anon non può interrogare tabelle base e vede solo view published.
2. Free non vede colonne interne neppure usando REST direttamente.
3. Free non legge/modifica dati di un altro utente né eleva il ruolo.
4. Editor vede contenuti operativi ma non costi/provider admin-only.
5. Admin vede infrastruttura e può inserire, non modificare/cancellare, audit.
6. Draft, rejected, private_admin e pubblicazioni future sono invisibili.
7. URL highlight e script Video Radar sono null per anon e presenti per free quando pubblicati.

Rischio da testare: le view owner-based con `security_barrier` devono essere verificate sul PostgreSQL di staging insieme ai grant reali Supabase. Non collegare l'app prima di un test di leakage negativo.
