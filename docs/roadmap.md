# Roadmap

## Step 0 — Struttura iniziale (questo step)

- Route, cartelle, configurazioni minime e documentazione.
- Nessuna integrazione o persistenza operativa.

## Step 1 — Da approvare

- Definire MVP, modello canonico, catalogo competizioni e provider primario.
- Bloccare versioni dipendenze e impostare qualità, test e CI.

## Step 2 — Fondazioni dati e accessi

- Schema PostgreSQL iniziale preparato ma non applicato; restano migrazioni, policy RLS, ruoli, funzioni Auth e contatori atomici.
- Utility Supabase browser, SSR e admin predisposte in modalità non collegata; restano installazione dipendenze, Proxy/Middleware e test delle sessioni.
- Login, registrazione, account free, preferenze, preview/gating e quota ricerca predisposti con fallback safe; restano collegamento reale, RLS e recupero password.
- Mock provider e fixture verificabili.

## Step 3 — Stats Hub e provider

- Adapter primario, normalizzazione, cache/import e pagine pubbliche.
- Gating server-side per statistiche complete e ricerca avanzata.

## Step 4 — Editoriale e video

- Workflow contenuti, Story Library, Historical Echo e link highlight.
- Video Radar con soli asset originali o incorporamenti autorizzati.

## Step 5 — Admin e osservabilità

- Dashboard protetta, revisioni, audit log, consumi API/Apify e alert budget.

## Step 6 — Substack e ottimizzazione

- Workflow editoriale verso Substack, analytics, SEO, accessibilità e hardening.

Ogni step richiede approvazione separata; questa roadmap non autorizza l'esecuzione automatica.
