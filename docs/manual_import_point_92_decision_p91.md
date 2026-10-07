# Manual Import Point 92 Decision — P91

## Context

P91 completed the post-production verification of the public product polish release.

Production is stable for:

- `/`;
- `/competitions`;
- `/competitions/manual-serie-a`.

Provider/import remain off, Apify remains off, no new DB write was executed, and rollback was not executed.

## Options

### A. P92 — Editorial content plan

Objective:

- plan the first real editorial content: stories, columns, newsletter and talents;
- keep provider/import off unless separately authorized;
- keep DB write planning separate from execution.

### B. P92 — Manual data expansion plan

Objective:

- plan expansion of manual competitions/demo data;
- define candidates, scope and review gates.

### C. P92 — Login/free quota plan

Objective:

- plan login, 3 free searches quota and content unlock flow.

### D. P92 — Continue production monitoring

Objective:

- stop product expansion;
- continue monitoring Production stability.

## Recommended decision

Recommended option: A — P92 Editorial content plan.

## Markers

- `point_91_post_production_polish_verification_completed=true`
- `p92_recommended=editorial_content_plan`
- `generic_proceed_authorizes_deploy=false`
- `generic_proceed_authorizes_db_write=false`
- `provider_import_enabled=false`
- `apify_enabled=false`
