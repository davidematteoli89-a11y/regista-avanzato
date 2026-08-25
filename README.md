# Regista Avanzato

Scaffold iniziale della piattaforma calcistica editoriale e statistica. Il repository include route, configurazioni, documentazione e una bozza di schema PostgreSQL/Supabase non ancora applicata; non contiene API, import, automazioni o dashboard operative.

## Aree

- **Public Website**: radar, news, storie, talenti, video e newsletter.
- **Public Stats Hub**: competizioni, classifiche, squadre, giocatori e partite.
- **Login Free Area**: contenuti completi, preferiti base e 3 ricerche avanzate/mese.
- **Admin Dashboard**: gestione futura di dati, provider, contenuti, utenti e consumi.
- **Data layer**: contratti indipendenti dai provider e arricchimento batch Apify.

## Avvio futuro

Requisiti previsti: Node.js LTS, npm, un progetto Supabase e credenziali dei provider scelti.

```bash
cp .env.example .env.local
npm install
npm run dev
```

Le versioni sono lasciate intenzionalmente a `latest` nello scaffold: prima dell'implementazione vanno scelte, bloccate nel lockfile e verificate tra loro.

## Struttura

```text
app/                    Route Next.js, pagine accesso e placeholder dati
components/             Componenti condivisi, preview e gating free
config/                 Configurazioni applicative future
content/                Contenuti editoriali Markdown futuri
docs/                   Decisioni e strategie del prodotto
lib/dataProvider/       Contratti e adapter dei provider sportivi
lib/apify/              Confine degli import batch Apify/SofaScore
prompts/                Prompt editoriali versionati futuri
scripts/                Script Node.js futuri, mai eseguiti lato utente
sources/pdf_markdown/    Fonti storiche PDF/Markdown da catalogare
supabase/               Schema SQL iniziale; migrazioni e policy applicative future
```

## Principi iniziali

1. Il sito legge dati normalizzati, non payload specifici dei provider.
2. Apify non viene chiamato live dagli utenti.
3. Token e service role restano server-side e fuori da Git.
4. Le clip partita non autorizzate non vengono caricate o redistribuite.
5. Funzionalità free e admin devono essere protette lato server, non solo nell'interfaccia.

Vedi [docs/roadmap.md](docs/roadmap.md). Ogni integrazione indicata è ancora un placeholder.
