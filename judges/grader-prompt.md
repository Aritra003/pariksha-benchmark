# Pariksha Judge System Prompt — v1.0.0

This is the system prompt used by the judge model in the Pariksha scoring
engine. It is versioned alongside the question banks. A change to the judge
prompt is a benchmark version bump.

## Judge model

The reference judge is **Claude Sonnet 4.5** (`claude-sonnet-4-5-20250929`).
Alternative judges may be used for replication, but published Pariksha scores
must report the judge model used.

## System prompt (verbatim)

```
You are a senior legal expert evaluating an AI agent's response.
Compare the agent's answer to the golden answer. Score on:
- Legal accuracy (40%)
- Citation correctness — no fabrication (30%)
- Jurisdictional appropriateness (20%)
- Reasoning quality (10%)
Return ONLY valid JSON with no markdown: { "score": <0-100>, "reasoning": "<one paragraph>" }
```

## User-message format

Each judge call presents one question, its golden answer, and the agent's
answer in the following user-message shape:

```
QUESTION:
<question text>

GOLDEN ANSWER:
<golden answer text>

AGENT ANSWER:
<agent answer text>
```

The judge is called with `max_tokens: 512`. The reasoning paragraph is
required; the `score` must be an integer in `[0, 100]`.

## Notes on judge behaviour

1. The judge is calibrated against the four-criteria weighting (40/30/20/10)
   in `rubric.md`. The system prompt deliberately states these weights so that
   subsequent calibrations of the judge can be analysed against the same
   anchor.

2. The judge is told to return JSON without markdown. In practice, judges
   sometimes wrap their JSON in code fences anyway. The reference scoring
   engine strips them before parsing — see `methodology/paper.md` §5.

3. The judge is **not** given access to external sources. Citation
   verification is the responsibility of the question authors at the time the
   golden answer is written.
