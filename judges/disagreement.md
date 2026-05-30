# Judge Disagreement Protocol — planned for v1.1.0

The v1.0.0 reference engine uses a single judge (Claude Sonnet 4.5). v1.1.0
will introduce a two-judge protocol to reduce systematic judge bias. This
document sketches the planned protocol.

## Two-judge default

For v1.1.0, each question will be judged by two models:

- **Judge A**: Claude Sonnet 4.5 (`claude-sonnet-4-5-20250929`) — primary
- **Judge B**: A non-Anthropic model of comparable capability — secondary

The two judges score independently. The Pariksha score for a question is the
mean of the two judge scores **if** they agree within a tolerance of 10
points. Otherwise, a disagreement-resolution procedure applies.

## Disagreement resolution

When |A − B| > 10:

1. Both judges are re-invoked with their original input and asked to produce a
   revised score with explicit reference to the four-criteria rubric.
2. If the revised scores still disagree by > 10, the question is flagged for
   human review. The flagged question's score is computed as the mean of the
   four revised judge scores, but the question is also added to the
   `disputed_questions.json` audit log.
3. A question that appears in `disputed_questions.json` across three or more
   benchmark runs is considered structurally ambiguous and is retired in the
   next minor version of the benchmark.

## Why this is deferred to v1.1.0

A two-judge protocol roughly doubles the cost of running a benchmark and
requires the user to have access credentials for a second model provider.
v1.0.0 prioritises reproducibility with a single-model setup. The two-judge
protocol is documented here so contributors can begin running it as an opt-in.
