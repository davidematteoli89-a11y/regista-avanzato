# Next Steps

Il percorso consigliato riduce il rischio attivando un confine alla volta. Ogni fase richiede criteri di uscita verificabili prima della successiva.

## Primi 5 passi pratici

1. **Rendere la build riproducibile**: scegliere e fissare versioni compatibili di Next.js, React, Supabase ed ESLint; generare un lockfile; installare localmente; eseguire typecheck, lint e build.
2. **Correggere gli errori emersi**: risolvere nullabilità utente, typing cookie e qualsiasi errore reale rimasto dopo l'installazione; uniformare il layout pubblico.
3. **Creare Supabase dev**: versionare lo schema come migrazioni, applicarlo solo a un progetto di sviluppo, aggiungere seed mock non sensibili e verificare indici/constraint.
4. **Implementare sicurezza dati**: definire ruoli, policy RLS, guard server e middleware admin; aggiungere la RPC atomica per le tre ricerche mensili.
5. **Attivare un solo provider in sandbox**: scegliere TheStatsAPI oppure API-Football, mappare una competizione FULL e importare competizioni/squadre in dry-run, poi su Supabase dev.

## Roadmap A–F

### Fase A — Stabilizzazione locale

Obiettivo: ottenere una baseline installabile e verificata.

- Fissare le versioni invece di `latest`.
- Generare e versionare il lockfile.
- Eseguire `typecheck`, lint e build.
- Correggere gli errori TypeScript globali.
- Consolidare componenti e servizi duplicati, in particolare la quota ricerca.
- Definire PublicLayout e AdminLayout definitivi.
- Pulire route, navigazione e componenti non più necessari.
- Aggiungere smoke test per mapper, guard, router, quote e filtri pubblici.

Criterio di uscita: clone pulito → install → test/typecheck/build tutti verdi.

### Fase B — Supabase staging

Obiettivo: rendere reali dati e accessi solo in ambiente di sviluppo.

- Creare progetto Supabase staging.
- Convertire `schema.sql` in migrazioni ordinabili.
- Applicare schema e seed iniziali per provider/competizioni.
- Definire RLS per ogni tabella esposta.
- Attivare Auth e profilo senza trigger automatici finché il flusso non è testato.
- Implementare RPC atomica per `user_search_usage`.
- Creare reader pubblici, writer admin server-side e audit log.

Criterio di uscita: test RLS positivi e negativi, nessun accesso admin o service role dal browser.

### Fase C — Admin reale

Obiettivo: trasformare l'area di controllo mock in uno strumento privato e tracciato.

- Implementare RBAC e protezione `/admin`.
- Controllare l'autorizzazione in ogni writer/azione server-side.
- Rendere persistente il workflow di review e approvazione.
- Richiedere conferma per le azioni sensibili.
- Persistire i risultati degli import dry-run e i relativi log.
- Aggiungere gestione utenti minima e audit trail.

Criterio di uscita: un utente normale non può accedere o agire come admin; ogni mutazione è attribuibile.

### Fase D — MVP pubblico

Obiettivo: pubblicare una versione staging credibile basata su dati approvati.

- Inserire contenuti reali approvati e completare la homepage.
- Leggere statistiche base da Supabase staging.
- Attivare login free e limite ricerca reali.
- Configurare l'URL Substack ufficiale.
- Eseguire deploy staging.
- Eseguire test browser, responsive, accessibilità, SEO e performance.

Criterio di uscita: beta con utenti invitati, metriche e rollback documentato.

### Fase E — Provider reali

Obiettivo: attivare fonti reali solo dopo che applicazione, DB e accessi sono stabili.

- Scegliere TheStatsAPI oppure API-Football.
- Completare mapping reali e test di rate limit.
- Attivare gradualmente import FULL_OFFICIAL.
- Verificare termini e testare un actor Apify su una sola P1.
- Rendere atomici budget, lock e log run.
- Attivare il weekly import reale solo dopo un pilot controllato.

Criterio di uscita: import idempotenti, costi sotto soglia, parser stabile e fallback provato.

### Fase F — Produzione

Obiettivo: aprire il servizio con presidi tecnici, legali ed editoriali.

- Configurare dominio, TLS e ambienti separati.
- Aggiungere analytics privacy-aware, monitoring e alert.
- Provare backup, restore, rollback e incident response.
- Pubblicare privacy policy, cookie policy e termini.
- Completare security review e test legale/editoriale.
- Mantenere review umana e disabilitare auto-publish finché non esplicitamente approvato.

Criterio di uscita: checklist di produzione firmata, monitoraggio attivo e rollback provato.

## Azioni da non anticipare

- Non aprire l'admin pubblico prima di Auth, RBAC e RLS.
- Non collegare più provider contemporaneamente.
- Non attivare Apify prima del pilot FULL e della verifica legale.
- Non promettere dati live o scouting certificato.
- Non automatizzare pubblicazione, email o video prima di un audit trail editoriale.
