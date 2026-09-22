# SEO baseline — 22 September 2026

Observed in the authenticated owner UI before this deployment. These values describe the previous live website, not results caused by the implementation.

## Google Search Console

Property: `sc-domain:palsec.agency`. Owner UI account: existing Arnau account.

Web search, 20 June–19 September 2026 (three-month view):

- 19 clicks
- 643 impressions
- 3% CTR
- Average position 7.7 across the reported query mix (not a rank for the target commercial queries).
- Overview: 47 indexed pages, 7 not indexed; not a URL-by-URL canonical audit.
- No Core Web Vitals field data in the overview.

Visible queries:

| Query | Clicks | Impressions |
| --- | ---: | ---: |
| palsec | 4 | 268 |
| logoteca | 2 | 59 |
| enteza | 0 | 104 |
| pal sec | 0 | 18 |
| branding costa brava | 0 | 17 |
| diseño web costa brava | 0 | 6 |

Not all queries are disclosed by Search Console; visible rows do not sum to the totals. Reassess the same period length with brand/non-brand, page, country and language segments after Google has crawled the release.

## Semrush before deployment

Project: 31315296, palsec.agency. API audit status FINISHED:

- 55 crawled URLs, 0 errors, 42 warnings, 11 notices.
- 39 thin-content warnings and 11 language-mismatch notices.
- Schema detection: 0, despite JSON-LD present in old source. Independent validation is necessary.
- Read-only Position Tracking API initially returned no targets; the UI subsequently displayed target 5517742, desktop Google Italy / Italian, one keyword, still collecting 0/1. This does not represent the requested Girona/Spain campaign.

No observed baseline establishes a top-three ranking or a lead forecast. Implementation checks and future search performance are separate evidence.
