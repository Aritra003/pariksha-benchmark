# Changelog

All notable changes to the Pariksha Benchmark are documented in this
file. Question banks follow [Semantic Versioning](https://semver.org/);
see the versioning policy in [README.md](README.md).

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
