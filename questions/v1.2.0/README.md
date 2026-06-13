# Pariksha Question Banks — v1.2.0

Tagged: 2026-06-13 · Immutable.

## Coverage

| File | Jurisdiction | Code | Questions | Difficulty mix |
|---|---|---|---|---|
| [japan.json](japan.json) | Japan | JP | 5 | 5 hard |

**Total: 5 questions. `last_verified` 2026-06-13.**

## On the verification fields

Citations carry `primary_verified: true` when verified against a primary
source — for Japan, that means [japaneselawtranslation.go.jp](https://www.japaneselawtranslation.go.jp/),
the Japan Ministry of Justice's official English statute portal. One
citation (`Civil Code Article 644`, applied by cross-reference from
Companies Act Article 330) carries `primary_verified: false` with
`secondary_corroboration_sources: 4` because the verification was made
via cross-reference rather than a separate primary fetch. The v1.1.0
verification schema (`verification_method` top-level field; per-citation
`primary_verified`) is preserved.

## File schema

See `tools/validate-question.mjs` for the authoritative JSON-schema check.
v1.2.0 banks use the same schema as v1.1.0.

## Re-verification cadence

Every question is re-verified against current law every six months.
Next review date: **2026-12-13**. If any citation is found stale or any
answer is made incorrect by an amendment, a `v1.2.1` (or `v1.3.0` if a
question is fully replaced) will be tagged with a `CHANGELOG.md` entry.
