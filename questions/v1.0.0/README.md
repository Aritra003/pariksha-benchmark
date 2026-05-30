# Pariksha Question Banks — v1.0.0

Tagged: 2026-05-30 · Immutable.

## Coverage

| File | Jurisdiction | Code | Questions | Difficulty mix |
|---|---|---|---|---|
| [india.json](india.json) | India (Delhi HC focus) | IN | 5 | 3 medium / 2 hard |
| [singapore.json](singapore.json) | Singapore | SG | 5 | 3 medium / 2 hard |
| [uae-difc.json](uae-difc.json) | UAE-DIFC | AE-DIFC | 5 | 2 medium / 3 hard |
| [us-delaware-federal.json](us-delaware-federal.json) | US (Delaware corporate + federal securities) | US-DE | 5 | 1 medium / 4 hard |
| [us-generalist.json](us-generalist.json) | US (commercial / corporate generalist) | US | 5 | 1 medium / 4 hard |

**Total: 25 questions. `last_verified` 2026-05-25 for india, singapore, uae-difc, us-delaware-federal; 2026-05-30 for us-generalist.**

## On the US coverage

The US coverage is split across two complementary banks:
[`us-delaware-federal.json`](us-delaware-federal.json) (Delaware corporate +
federal securities, the most asked-about specialist scope in legal AI evals)
and [`us-generalist.json`](us-generalist.json) (broader US commercial
contracts and securities content authored alongside the vidhi.us production
agent).

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
review date: **2026-11-30**. If any citation is found stale or any answer is
made incorrect by an amendment, a `v1.0.1` (or `v1.1.0` if a question is
fully replaced) will be tagged with a `CHANGELOG.md` entry.
