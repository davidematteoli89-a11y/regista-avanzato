# Public Website Magazine

## Ruolo

Il Public Website è il livello editoriale di Regista Avanzato. Riunisce articoli, Story Library, talenti, Radar, partite pazze, Historical Echo, anteprime Video Radar, classifiche di base e CTA verso account free e Substack.

Non è un pannello operativo e non espone dettagli sull'infrastruttura. Le pagine pubbliche leggono soltanto reader pubblici filtrati; in futuro questi reader useranno snapshot salvati su Supabase.

## Pubblico e admin

Il sito pubblico mostra soltanto record `approved` o `published` con una visibilità compatibile. Sono esclusi draft, pending review, rejected, record `private_admin`, note interne, warning, score tecnici, log provider, token e costi Apify.

L'admin resta separato sotto `/admin`. Nessun componente del magazine importa queue o reader admin.

## Accesso senza login

Un visitatore anonimo può consultare homepage, articoli free, anteprime, storie pubbliche, talenti editoriali, Radar pubblico, partite revisionate, Historical Echo approvati, classifiche e risultati base, newsletter e pagine informative.

La normale navigazione, compresa l'apertura di articoli, statistiche base, Video Radar preview e Historical Echo, non consuma le tre ricerche avanzate mensili.

## Accesso free

L'account gratuito servirà per statistiche complete, schede partita complete, link highlights ufficiali, Video Radar completo e preferiti base. Gli articoli `login_required` mostrano una preview anonima e una CTA di registrazione. In questo step il magazine non esegue query Auth e resta in modalità anonima sicura.

## Substack

Gli articoli `substack_only` e `paid_substack_candidate` mostrano sul sito soltanto titolo, summary e preview originale. La CTA usa la configurazione server-side esistente e resta disabilitata se `SUBSTACK_URL` manca. Il sito non gestisce pagamenti, entitlement, checkout o utenti paganti.

## Dati mock e collegamenti futuri

- **Supabase:** sostituirà gli array mock con reader server-side e viste pubblicabili protette da RLS.
- **Story Library:** alimenterà articoli e approfondimenti soltanto con storie approvate.
- **Historical Echo:** fornirà confronti pubblici senza score o warning tecnici.
- **Video Radar:** offrirà preview anonime e contenuti completi dopo login, usando link ufficiali già salvati.
- **Stats Hub:** continuerà a fornire classifiche e risultati base pubblici, con statistiche profonde dietro login free.

Provider e Apify importeranno in futuro dati su Supabase tramite job programmati. Non verranno mai chiamati dalle pagine del magazine.

## Limiti editoriali

Talenti e Radar sono osservazioni editoriali, non scouting certificato o previsioni. Una partita entra in “Partite pazze” soltanto dopo revisione del trigger. Historical Echo deve mostrare differenze oltre alle somiglianze. Articoli e fonti richiedono fact-check, provenienza verificabile e rispetto del copyright.

Sono vietati auto-pubblicazione, generazione automatica di articoli finali, copia di testi esterni, scraping, download o reupload video e presentazione di segnali come fatti certi.

## Stato corrente

Tutti i contenuti sono mock. Non sono presenti query Supabase, fetch, provider, Apify, scraping, scritture database, pagamenti o automazioni editoriali. Per l'attivazione reale serviranno dipendenze Next/React, Auth, RLS, reader Supabase, workflow di review, URL Substack e dataset approvati.
