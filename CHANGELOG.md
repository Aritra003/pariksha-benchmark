# Changelog

All notable changes to the Pariksha Benchmark are documented in this
file. Question banks follow [Semantic Versioning](https://semver.org/);
see the versioning policy in [README.md](README.md).

## [v1.1.0] — 2026-05-31

Adds three new jurisdiction banks; refines the citation verification
posture; publishes development findings.

### Question banks added (3)

- `questions/v1.1.0/england-wales.json` — England & Wales commercial:
  Arbitration Act 1996, UCTA 1977, Companies Act 2006, Sale of Goods
  Act 1979, CPR Part 36.
- `questions/v1.1.0/korea.json` — Republic of Korea: Commercial Act
  (Arts 397, 398, 64), Civil Act tort (Art 750), FIPA foreign
  investment, persuasive-precedent doctrine.
- `questions/v1.1.0/eu.json` — European Union: GDPR (Art 6), DSA
  (Arts 17, 34), DMA (Art 3).

Total benchmark coverage moves from 25 questions across 5 jurisdictions
(v1.0.0) to 40 questions across 8 jurisdictions.

### Methodology refinement

- Citations now carry an explicit `primary_verified` boolean (renaming
  the v1.0.0 `verified` field). Where the primary host blocked
  automated fetches, citations record a
  `secondary_corroboration_sources` integer alongside the verbatim
  quotation.
- The refinement was prompted by a WebFetch hallucination caught on
  DMA Article 3(2) during EU drafting and recovered via a raw-curl
  re-fetch against EUR-Lex.
- Bank-level fields: `verification_method` on all three new banks;
  `verification_note` on `korea.json` (statute + doctrinal-commentary
  posture).

### Development findings published

- [`docs/archive/eu-baseline-findings.md`](docs/archive/eu-baseline-findings.md)
  — EU bank verification including the DMA Art 3(2) recovery.
- [`docs/archive/seoul-kr-anchor-experiment.md`](docs/archive/seoul-kr-anchor-experiment.md)
  — discarded Korea anchor-question experiment.
- [`docs/archive/legacy-rescore-v1-1-findings.md`](docs/archive/legacy-rescore-v1-1-findings.md)
  — rescoring v1.0.0 agents against v1.1.0 methodology.

### Notes

- v1.0.0 question files remain immutable. v1.1.0 banks live under their
  own `questions/v1.1.0/` directory.
- Re-verification cadence unchanged: every six months. Next review
  **2026-11-30**.

## [v1.0.0] — 2026-05-30

Initial public release.

### Question banks (5)

- `questions/v1.0.0/india.json` — Delhi HC commercial litigation focus;
  IBC, NI Act, Specific Relief, contract, taxation.
- `questions/v1.0.0/singapore.json` — SIAC arbitration, IAA,
  SICC jurisdiction, Singapore commercial law.
- `questions/v1.0.0/uae-difc.json` — DIFC Courts commercial and
  employment.
- `questions/v1.0.0/us-delaware-federal.json` — Delaware corporate
  (DGCL) and US federal securities.
- `questions/v1.0.0/us-generalist.json` — Cross-state US commercial
  generalist baseline.

Each bank holds 5 expert-written questions with golden answers carrying
verified statutory and case-law citations, expected-topic lists, and
difficulty tiers. All citations cleared the citation verification gate
on or before each question's `last_verified` ISO date.

### Methodology

- Pariksha engine **v1.1.0** scoring methodology is the basis for this
  release:
  - **3-sample-mean** per-question scoring (each question sampled three
    times against the model under test; per-question score is the
    arithmetic mean of the three judge scores).
  - **Judge prefill** to stabilise rubric-section output.
  - **Parser fallback** for handling judge responses that deviate from
    the structured format.
- **Four-criteria rubric** weighted to 100: legal accuracy (40%),
  citation correctness (30%), jurisdictional appropriateness (20%),
  reasoning quality (10%). See [judges/rubric.md](judges/rubric.md).
- Full methodology in [methodology/paper.md](methodology/paper.md),
  including the citation verification gate and the Korea anchor
  cross-contamination finding (§7).

### Tooling

- `tools/validate-question.mjs` — JSON-schema validator for question
  bank contributions; required for every PR that adds or amends a
  question.
- `judges/grader-prompt.md` — judge system prompt.
- `judges/rubric.md` — scoring rubric with partial-credit bands.
- `judges/disagreement.md` — disagreement-resolution protocol for cases
  where the three judge samples diverge by more than 10 points.
- `skills/` — reference skill manifests for each jurisdictional agent,
  in the format used by Anthropic's Claude for Legal framework.
- `external_plugins/pariksha/` — plugin manifest for use inside the
  `anthropics/claude-for-legal` ecosystem.

### Notes

- Each question's `last_verified` ISO date records the most recent
  citation re-verification. Re-verification cadence: every six months
  per the policy in [README.md](README.md).
- Once a version is tagged, the question files in that directory are
  immutable. Errata ship as a new `vX.Y+1.Z` release with a CHANGELOG
  entry.
