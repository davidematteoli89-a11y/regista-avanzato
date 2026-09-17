# Punto 23 — Root cause needs_review

Stato: analisi completata, no-write.

## Competitions

- Tabella confermata: sì, `public.competitions`.
- Colonne confermate: sì, colonne minime presenti nello schema locale.
- Mapping fixture confermato: parziale.
- Causa precisa `needs_review`:
  - fixture non contiene `continent`;
  - fixture non contiene `season`;
  - `category/status` richiede mapping verso enum/schema locale;
  - generazione `slug` non ancora formalizzata.
- Blocker reale o cautela:
  - cautela documentale e operativa, non mancanza tabella/colonna.
- Cosa servirebbe per passare a ready:
  - policy valori default per `continent`, `season`, `tracking_level`, `update_frequency`;
  - regola slug;
  - conferma dedup key `internal_key + season` o `slug + season`.

## Teams

- Tabella confermata: sì, `public.teams`.
- Colonne confermate: sì, colonne minime presenti nello schema locale.
- Mapping fixture confermato: parziale.
- Causa precisa `needs_review`:
  - `provider_competition_id` richiede lookup verso `competition_id`;
  - generazione `slug` non ancora formalizzata;
  - uso di `source_provider_id + api_team_id` richiede manual provider id confermato.
- Blocker reale o cautela:
  - cautela operativa su lookup/deduplica, non mancanza tabella/colonna.
- Cosa servirebbe per passare a ready:
  - policy lookup competition;
  - regola slug;
  - scelta dedup key;
  - conferma manual provider id se usato.

## Standings

- Tabella confermata: sì, `public.standings`.
- Colonne confermate: sì, colonne minime presenti nello schema locale.
- Mapping fixture confermato: parziale.
- Causa precisa `needs_review`:
  - `provider_competition_id` richiede lookup verso `competition_id`;
  - `provider_team_id` richiede lookup verso `team_id`;
  - fixture non contiene `season`;
  - policy `stage/matchday` non definita;
  - `goal_difference` è calcolabile ma non ancora formalizzato.
- Blocker reale o cautela:
  - cautela operativa su lookup/policy, non mancanza tabella/colonna.
- Cosa servirebbe per passare a ready:
  - lookup competition/team confermati;
  - regole `season`, `stage`, `matchday`;
  - regola `goal_difference = goals_for - goals_against`;
  - conferma dedup key `competition_id + season + stage + matchday + team_id`.

## Decisione Punto 23

Nessuna area passa a `ready` perché manca ancora almeno una decisione operativa critica.

Nessuna area è `blocked` perché tabelle/colonne locali esistono.

Stato finale:

- competitions: `needs_review`;
- teams: `needs_review`;
- standings: `needs_review`;
- `next_write_allowed=false`.
