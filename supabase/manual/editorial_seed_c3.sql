-- Regista Avanzato — C.3 seed editoriale demo controllato
-- Da usare SOLO su Supabase staging, copiando manualmente le sezioni desiderate
-- nel Supabase SQL Editor.
--
-- Regole:
-- - non attiva provider;
-- - non attiva import;
-- - non chiama API esterne;
-- - non crea utenti;
-- - non modifica ruoli;
-- - pubblica solo contenuti demo/staging chiaramente etichettati.

begin;

-- =============================================================================
-- SEZIONE 1 — SEED EDITORIALE DEMO
-- =============================================================================

-- Cleanup idempotente in ordine esplicito.
-- L'Historical Echo va cancellato prima della story perché
-- historical_echoes.related_story_id usa una FK con on delete restrict.
delete from public.historical_echoes
where slug = 'echo-demo-c3';

delete from public.story_library
where slug = 'storia-demo-c3';

delete from public.news_archive
where slug = 'news-demo-c3';

delete from public.public_articles
where slug = 'articolo-demo-c3';

insert into public.public_articles (
  slug,
  title,
  excerpt,
  body,
  competition_id,
  status,
  visibility,
  login_required,
  published_at,
  reviewed_at,
  internal_notes
)
values (
  'articolo-demo-c3',
  '[DEMO/STAGING] Dentro la Serie A Demo: come leggere il dato senza fretta',
  'Articolo demo manuale per verificare i reader editoriali Supabase. Non contiene dati live o fonti esterne.',
  'Questo articolo è un contenuto dimostrativo di staging. Serve a verificare che il sito pubblico legga da public_articles_published senza esporre note interne, score o payload privati.

Il testo non cita fonti reali, non usa dati live e non viene generato da automazioni. In produzione ogni contenuto dovrà essere revisionato prima della pubblicazione.',
  (select id from public.competitions where slug = 'serie-a' limit 1),
  'published',
  'public_free',
  false,
  timezone('utc', now()),
  timezone('utc', now()),
  'C3 demo seed: nota interna non esposta dalla public view.'
);

insert into public.news_archive (
  slug,
  title,
  summary,
  body,
  source_name,
  source_url,
  source_published_at,
  category,
  sources,
  signals,
  internal_score,
  priority,
  review_status,
  internal_warnings,
  duplicate_candidate,
  reviewed_by_human,
  competition_id,
  status,
  visibility,
  login_required,
  published_at,
  reviewed_at,
  internal_notes
)
values (
  'news-demo-c3',
  '[DEMO/STAGING] Una nota editoriale sulla Serie A Demo',
  'News demo manuale: nessuna fonte esterna, nessun rumor, nessun dato live.',
  'Questa news dimostrativa serve soltanto a verificare public_news_published. Non è una notizia reale e non contiene URL o fonti inventate.',
  'Redazione Regista Avanzato — staging demo',
  null,
  null,
  'cultural_story',
  '[]'::jsonb,
  '[]'::jsonb,
  '{"demo": true, "not_public": true}'::jsonb,
  'low',
  'approved',
  array['Warning demo non esposto dalla public view'],
  false,
  true,
  (select id from public.competitions where slug = 'serie-a' limit 1),
  'published',
  'public_free',
  false,
  timezone('utc', now()),
  timezone('utc', now()),
  'C3 demo seed: note interne non esposte.'
);

insert into public.story_library (
  slug,
  title,
  summary,
  story_body,
  story_type,
  historical_period,
  source_references,
  tags,
  status,
  visibility,
  login_required,
  published_at,
  reviewed_at,
  internal_notes
)
values (
  'storia-demo-c3',
  '[DEMO/STAGING] La piccola storia della giornata demo',
  'Story demo manuale per testare la Story Library pubblica da Supabase.',
  'Questa storia è scritta apposta per lo staging. È originale, breve e non deriva da testi esterni o fonti non autorizzate.',
  'cultural_story',
  'Staging 2026/27',
  '[]'::jsonb,
  array['demo', 'staging', 'story-library'],
  'published',
  'public_free',
  false,
  timezone('utc', now()),
  timezone('utc', now()),
  'C3 demo seed: riferimento interno non esposto.'
);

insert into public.historical_echoes (
  slug,
  title,
  summary,
  echo_type,
  explanation,
  related_story_id,
  modern_match_id,
  trigger_data,
  comparison_points,
  related_matches,
  timeline,
  source_references,
  internal_score,
  internal_warnings,
  reviewed_by_human,
  status,
  visibility,
  login_required,
  published_at,
  reviewed_at,
  internal_notes
)
values (
  'echo-demo-c3',
  '[DEMO/STAGING] Quando una storia richiama un’altra',
  'Historical Echo demo manuale: confronto editoriale prudente, non equivalenza storica.',
  'cultural_echo',
  'Il collegamento è dimostrativo: mostra come presentare una somiglianza narrativa senza trasformarla in una prova storica.',
  (select id from public.story_library where slug = 'storia-demo-c3' limit 1),
  null,
  '{"demo": true, "live_data": false}'::jsonb,
  '[
    {
      "id": "tone",
      "label": "Tono editoriale",
      "modernValue": "Nota demo contemporanea",
      "historicalValue": "Storia demo collegata",
      "similarity": "contextual"
    }
  ]'::jsonb,
  '[]'::jsonb,
  '[
    {
      "id": "seed",
      "dateLabel": "Staging C.3",
      "title": "Seed manuale",
      "description": "Il contenuto viene pubblicato manualmente nello staging."
    }
  ]'::jsonb,
  '[]'::jsonb,
  '{"confidence": "medium", "demo": true}'::jsonb,
  array['Warning demo non esposto dalla public view'],
  true,
  'published',
  'public_free',
  false,
  timezone('utc', now()),
  timezone('utc', now()),
  'C3 demo seed: score e warning interni non esposti.'
);

select
  (select count(*) from public.public_articles where slug = 'articolo-demo-c3') as demo_articles_inserted,
  (select count(*) from public.news_archive where slug = 'news-demo-c3') as demo_news_inserted,
  (select count(*) from public.story_library where slug = 'storia-demo-c3') as demo_stories_inserted,
  (select count(*) from public.historical_echoes where slug = 'echo-demo-c3') as demo_echoes_inserted;

commit;

-- =============================================================================
-- SEZIONE 2 — VERIFICA PUBLIC VIEWS
-- =============================================================================

select id, slug, title, visibility, login_required, published_at
from public.public_articles_published
where slug = 'articolo-demo-c3';

select id, slug, title, visibility, login_required, published_at
from public.public_news_published
where slug = 'news-demo-c3';

select id, slug, title, visibility, login_required, published_at
from public.public_stories_published
where slug = 'storia-demo-c3';

select id, slug, title, visibility, login_required, published_at
from public.public_historical_echoes
where slug = 'echo-demo-c3';

-- Controlli di sicurezza: queste query sulle view pubbliche non devono esporre
-- raw payload, score interni, note interne, warning admin, costi, log o config provider.

select count(*) as active_providers
from public.data_providers
where active = true;

select count(*) as enabled_imports
from public.competitions
where import_enabled = true;

-- =============================================================================
-- SEZIONE 3 — ROLLBACK
-- =============================================================================

begin;

delete from public.historical_echoes
where slug = 'echo-demo-c3';

delete from public.story_library
where slug = 'storia-demo-c3';

delete from public.news_archive
where slug = 'news-demo-c3';

delete from public.public_articles
where slug = 'articolo-demo-c3';

commit;

-- Verifica rollback:
-- select count(*) from public.public_articles_published where slug = 'articolo-demo-c3';
-- select count(*) from public.public_news_published where slug = 'news-demo-c3';
-- select count(*) from public.public_stories_published where slug = 'storia-demo-c3';
-- select count(*) from public.public_historical_echoes where slug = 'echo-demo-c3';
