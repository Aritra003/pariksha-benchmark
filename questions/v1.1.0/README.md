# Pariksha Question Banks — v1.1.0

Tagged: 2026-05-31 · Immutable.

## Coverage

| File | Jurisdiction | Code | Questions | Difficulty mix |
|---|---|---|---|---|
| [england-wales.json](england-wales.json) | England & Wales | EW | 5 | 2 medium / 3 hard |
| [korea.json](korea.json) | Republic of Korea | KR | 5 | 3 medium / 2 hard |
| [eu.json](eu.json) | European Union | EU | 5 | 2 medium / 3 hard |

**Total: 15 questions. `last_verified` 2026-05-31 across all three banks.**

## On the verification fields

Citations carry `primary_verified: true` when verified against a primary source
(EUR-Lex, legislation.gov.uk, Springer Nature, US Federal Judicial Center, etc.).
Where the primary host blocked automated fetches, `primary_verified: false` is
paired with `secondary_corroboration_sources: N` — the number of authoritative
secondary sources that corroborated the same content unanimously. The
[`korea.json`](korea.json) bank carries a bank-level `verification_note`
documenting its statute-plus-doctrinal-commentary verification posture;
per-case citations were deliberately avoided to stay inside the verification
gate. See [`docs/archive/`](../../docs/archive/) for the development notes
behind this methodology.

## File schema

See `tools/validate-question.mjs` for the authoritative JSON-schema check.
v1.1.0 banks extend the v1.0.0 schema with two top-level fields
(`verification_method` on all three; `verification_note` on `korea.json`) and
add `primary_verified` (renaming the v1.0.0 `verified` field) plus an optional
`secondary_corroboration_sources` integer on each citation.

## Re-verification cadence

Every question is re-verified against current law every six months. Next
review date: **2026-11-30**. If any citation is found stale or any answer is
made incorrect by an amendment, a `v1.1.1` (or `v1.2.0` if a question is
fully replaced) will be tagged with a `CHANGELOG.md` entry.
