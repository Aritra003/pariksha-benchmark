# Pariksha Scoring Rubric — v1.0.0

The judge model scores each answer on four criteria, weighted as follows.

## Criteria

### 1. Legal accuracy — 40%

Does the answer correctly state the legal rule?

- **40/40**: Rule is stated precisely and matches the golden answer's
  formulation.
- **30/40**: Rule is correctly identified but materially incomplete or
  imprecise in formulation.
- **20/40**: Rule is recognisable but contains a substantive error.
- **10/40**: Rule is partially wrong; the answer would mislead a non-lawyer.
- **0/40**: Rule is fundamentally wrong or absent.

### 2. Citation correctness — 30%

Are the cited statutes and cases real, attributed correctly, and standing
for the proposition cited? **Fabricated citations are a zero on this
criterion regardless of other strengths.**

- **30/30**: All citations are real, correctly attributed, and stand for the
  proposition cited.
- **20/30**: Citations are real but one is imprecise (wrong year, wrong
  reporter) or one omits a required element of the proposition.
- **10/30**: At least one citation is materially mis-attributed but not
  fabricated.
- **0/30**: One or more cited cases or statutes do not exist, or do not stand
  for the proposition cited (fabrication).

### 3. Jurisdictional appropriateness — 20%

Does the answer apply the correct body of law for the declared jurisdiction?

- **20/20**: Jurisdiction is correctly applied throughout.
- **15/20**: Correct jurisdiction primarily, with a non-decisive reference to
  another jurisdiction.
- **10/20**: Jurisdiction is conflated with another (e.g., US precedent cited
  in a Singapore question).
- **0/20**: Wrong jurisdiction applied as the substantive basis.

### 4. Reasoning quality — 10%

Is the legal reasoning structured, coherent, and free of contradictions?

- **10/10**: Clear structure, logical progression, conclusion follows from
  premises.
- **7/10**: Structure is acceptable; one minor gap or non-sequitur.
- **4/10**: Reasoning is present but disorganised or has a meaningful gap.
- **0/10**: No discernible reasoning; conclusory.

## Aggregate score

The four criterion scores are summed (not weighted again — weights are baked
into the maxima): `score = legal + citation + jurisdiction + reasoning`,
producing a 0–100 score per question.

The final agent score is the arithmetic mean across all questions in the
benchmark run.

## Threshold mapping

| Score range | Production-system status | Interpretation |
|---|---|---|
| ≥ 95 | EXCELLENCE badge eligible | Specialist-grade performance |
| 80 – 95 | VERIFIED badge eligible | Production-acceptable for the jurisdiction |
| 60 – 80 | TRUST_REVIEWED only | Competence floor; allows marketplace listing but not VERIFIED status |
| < 60 | TRUST_FAILED | Hidden from marketplace; not hireable |

## Calibration anchors

These calibration anchors were used during rubric design. They are not part
of the judge prompt but inform how a published Pariksha score should be
interpreted.

- **A score of 50 on Criterion 2 (citation correctness, scaled to 100) is a
  fabrication.** The 30% weighting means a single fabricated citation in an
  otherwise-perfect answer caps the total at ~70.
- **A score of 70 overall is the ceiling for an answer with correct
  reasoning and rule but fabricated citations.** This is the explicit design
  intent of the weights.
- **A score of 90 overall is achievable by an agent with correct rule, real
  citations, correct jurisdiction, and slightly imprecise structure.**
