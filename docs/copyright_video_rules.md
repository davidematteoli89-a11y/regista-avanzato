# Regole Copyright Video

Documento operativo preliminare, non parere legale.

## Consentito previa verifica

- Video, voice-over, grafiche e animazioni originali.
- Link verso highlight pubblicati da titolari o licenziatari ufficiali.
- Embed ufficiali se permessi da piattaforma, titolare, territorio e termini.
- Asset di terzi con licenza documentata e compatibile con l'uso previsto.

## Vietato

- Scaricare, ritagliare, ricodificare o ripubblicare clip partita non autorizzate.
- Caricare clip su sito, Supabase Storage, CDN, cloud o servizi esterni.
- Aggirare DRM, paywall, geoblocking o restrizioni embed.
- Considerare automaticamente lecito un video perché breve o già online.
- Creare compilation con clip non autorizzate o conservare raw clip in file locali, Mega, storage, CDN o database.

## Dati conservabili

Il database conserva URL, piattaforma, fonte, ufficialità, data, stato e revisione. Non sono previsti campi per file video partita. `official_links` deve contenere metadati e URL, non media copiati.

## Controllo

Ogni fonte deve registrare titolare, licenza/permesso, territorio, durata, attribuzione e prova. Link rimossi o permessi scaduti devono essere disattivabili. I casi dubbi richiedono verifica legale prima della pubblicazione.

Nel codice, `videoCopyrightRules.ts` mantiene una blocklist esplicita per `download`, `reupload`, `local_file`, `unofficial_stream`, `pirated_source`, `compilation_unauthorized` e `raw_clip_storage`. È un guard tecnico, non una valutazione legale.
