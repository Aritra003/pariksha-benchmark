# Pariksha Question Banks — v1.0.0

Tagged: 2026-05-25 · Immutable.

## Coverage

| File | Jurisdiction | Code | Questions | Difficulty mix |
|---|---|---|---|---|
| [india.json](india.json) | India (Delhi HC focus) | IN | 5 | 3 medium / 2 hard |
| [singapore.json](singapore.json) | Singapore | SG | 5 | 3 medium / 2 hard |
| [uae-difc.json](uae-difc.json) | UAE-DIFC | AE-DIFC | 5 | 2 medium / 3 hard |
| [us-delaware-federal.json](us-delaware-federal.json) | US (Delaware corporate + federal securities) | US-DE | 5 | 1 medium / 4 hard |

**Total: 20 questions, all `last_verified: 2026-05-25`.**

## On the US set

The US set is **deliberately Delaware-corporate and federal-securities scoped**.
A US-commercial-generalist set covering broader US state contract law, IP, and
employment is planned for v1.1.0. We chose to release the specialist set first
because:

1. Delaware corporate law has been the single most asked-about jurisdiction
   in legal AI evaluations to date.
2. The questions exercise real recent statutory changes (DGCL §102(b)(7) 2022
   amendment, Lorenzo v. SEC 2019 scheme liability) that distinguish current
   models from older training cuts.

## File schema

See `tools/validate-question.mjs` for the authoritative JSON-schema check.
Each file is shaped:

```json
{
  "version": "1.0.0",
  "jurisdiction": "<human-readable>",
  "jurisdiction_code": "<ISO-like code>",
  "agent_focus": "<reference ENS name of the production agent for this jurisdiction>",
  "description": "<one paragraph>",
  "last_verified": "YYYY-MM-DD",
  "question_count": <integer>,
  "questions": [
    {
      "id": "<jur>-<###>",
      "question": "...",
      "goldenAnswer": "...",
      "category": "...",
      "jurisdiction": "...",
      "expected_topics": ["..."],
      "difficulty": "medium" | "hard",
      "last_verified": "YYYY-MM-DD"
    }
  ]
}
```

## Re-verification cadence

Every question is re-verified against current law every six months. Next
review date: **2026-11-25**. If any citation is found stale or any answer is
made incorrect by an amendment, a `v1.0.1` (or `v1.1.0` if a question is
fully replaced) will be tagged with a `CHANGELOG.md` entry.
