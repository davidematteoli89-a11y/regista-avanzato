# Strategia Video Radar e highlights

## Ruolo

Video Radar raccoglie idee, watchlist e contenuti originali di Regista Avanzato: script, commento, voice-over, grafiche, animazioni e analisi basate su dati già salvati. Può affiancare URL o embed di titolari e licenziatari ufficiali, ma non conserva media di terzi.

Il visitatore anonimo vede una preview degli elementi `approved` e una preview dei link. L'account free vede l'elenco approvato completo, le note editoriali previste e i link ufficiali disponibili. Elementi `draft`, `pending_review`, `rejected` o `archived` non sono pubblici. La visualizzazione non consuma ricerche avanzate.

## Link, embed e contenuto originale

- **Link:** apre il contenuto sul sito/canale ufficiale; è il fallback preferito quando l'embed non è permesso.
- **Embed:** resta ospitato dalla piattaforma originale ed è usabile soltanto se termini, titolare, territorio e configurazione lo consentono.
- **Contenuto originale:** video, audio, script e grafiche prodotti da Regista Avanzato senza incorporare clip partita non autorizzate.

Un dominio noto non prova che un canale sia ufficiale. `validateOfficialVideoUrl()` esegue solo controlli sintattici offline e restituisce `official`, `trusted`, `pending_review` o `rejected`; la review umana rimane obbligatoria. Solo link `approved` con fonte verificata entrano nei reader pubblici.

## Divieti

Sono bloccati download, reupload, file locali, streaming non ufficiale, fonti pirata, compilation non autorizzate e storage di clip grezze. Non sono previsti downloader, upload, CDN, Supabase Storage, Mega, scraping o conversioni video.

Non scaricare evita la creazione di copie non autorizzate, riduce esposizione copyright e impedisce che un link legittimo venga trasformato in redistribuzione. Anche un video breve o già online può essere protetto.

## Workflow editoriale futuro

```text
candidato → identificazione titolare → verifica URL/canale → verifica embed/licenza
→ fact-check → approvazione umana → pubblicazione metadati/link
→ controllo periodico disponibilità e permessi
```

L'admin review futuro dovrà registrare revisore, data, fonte, titolare, territorio, scadenza/permesso, prova e motivo delle decisioni. Serviranno audit, revoca rapida e job per segnalare link rimossi, ma nessuno di questi è attivo.

## YouTube futuro

Una futura integrazione YouTube API potrà leggere metadati pubblici, stato embed e disponibilità, esclusivamente server-side e con budget/rate limit. Prima servono progetto API, credenziali protette, termini approvati, allowlist canali, mapping video-canale e cache Supabase. L'API non deve essere usata per download né per considerare automaticamente ufficiale qualsiasi video YouTube.

## Rischi

Copyright, diritti territoriali, licenze musicali, cambi di titolarità, video rimossi, restrizioni embed, geoblocking, canali imitazione e termini delle piattaforme. La validazione tecnica non sostituisce review editoriale o consulenza legale.

In questo step dati e fonti sono mock, gli URL reali sono assenti e nessuna chiamata esterna o scrittura viene effettuata.
