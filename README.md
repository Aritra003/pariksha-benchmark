# Pariksha Benchmark

[![License: Apache 2.0](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](LICENSE)
[![Release](https://img.shields.io/badge/release-v1.2.0-green.svg)](CHANGELOG.md)

An open benchmark for jurisdiction-aware legal AI agents.

## What this is

Pariksha (Sanskrit: "examination") is a public benchmark for evaluating
legal AI agents on **jurisdictional accuracy**, **citation correctness**,
and **statutory grounding** — not on generic reasoning ability.

As of v1.2.0, Pariksha ships **9 question banks** (5 from v1.0.0, 3 from
v1.1.0, 1 added in v1.2.0), each with 5 expert-written questions, golden
answers carrying real statutory and case-law citations, expected-topic
lists, and difficulty tiers:

| Bank | Jurisdiction | Focus |
|---|---|---|
| [`india.json`](questions/v1.0.0/india.json) | India | Delhi HC commercial, IBC, NI Act, tax, contract |
| [`singapore.json`](questions/v1.0.0/singapore.json) | Singapore | SIAC arbitration, IAA, SICC jurisdiction, commercial law |
| [`uae-difc.json`](questions/v1.0.0/uae-difc.json) | UAE — DIFC | DIFC Courts commercial and employment |
| [`us-delaware-federal.json`](questions/v1.0.0/us-delaware-federal.json) | US (DE + Federal) | DGCL corporate, federal securities |
| [`us-generalist.json`](questions/v1.0.0/us-generalist.json) | US — Generalist | Cross-state US commercial baseline |
| [`england-wales.json`](questions/v1.1.0/england-wales.json) | England & Wales | Arbitration Act 1996, UCTA 1977, CA 2006, SoGA 1979, CPR Part 36 |
| [`korea.json`](questions/v1.1.0/korea.json) | Republic of Korea | Commercial Act, Civil Act tort, FIPA, persuasive-precedent doctrine |
| [`eu.json`](questions/v1.1.0/eu.json) | European Union | GDPR, DSA, DMA |
| [`japan.json`](questions/v1.2.0/japan.json) | Japan | Companies Act, Civil Code (2020 amendment), APPI (2022), Antimonopoly Act, FIEA |

Each question is paired with a verified golden answer. Every citation in
every golden answer must clear the **citation verification gate** before
the question ships — see methodology paper for procedure.

## Methodology summary

The full methodology is in [methodology/paper.md](methodology/paper.md).
The short version:

- **Four-criteria rubric**, weighted to 100:
  - Legal accuracy — **40%**
  - Citation correctness — **30%** (a single fabricated citation forces 0
    on this criterion regardless of other strengths)
  - Jurisdictional appropriateness — **20%**
  - Reasoning quality — **10%**

  Full rubric and partial-credit bands: [judges/rubric.md](judges/rubric.md).

- **3-sample-mean scoring under engine v1.1.0.** Each question is sampled
  three times against the model under test; the agent's per-question
  score is the arithmetic mean of the three independent judge scores.
  The agent's final benchmark score is the mean across questions. The
  v1.1.0 engine adds judge prefill, parser-fallback handling, and the
  3-sample protocol over the v1.0.0 single-shot scoring.

- **Citation verification gate.** A question may not enter a published
  question bank unless every statute, section, and case-law cite in its
  golden answer has been independently verified against a primary source
  (or a verified secondary source with explicit fallback notation). The
  `last_verified` ISO date on each question records when this was last
  re-confirmed. Re-verification cadence: every six months.

- **Anchor cross-contamination finding (Korea).** During v1.1.0 Korea
  benchmarking we observed that a statutory-anchor block written to fix a
  specific failure mode (Korean Commercial Act Art. 397 vs Art. 398
  conflation) **degraded** the agent's performance on unrelated questions
  touching adjacent statutes — Civil Act Art. 750 tort scoring collapsed
  from a stable ~92 to ~5 under a 1000-character anchor focused on
  Commercial Act director duties. The remediation rule: anchors require
  scope-isolation when the targeted statute shares doctrinal space with
  adjacent provisions. See methodology paper §7 for the full write-up.

## Question structure

Every question in every bank follows the same schema. Here is
`india-001` verbatim from [questions/v1.0.0/india.json](questions/v1.0.0/india.json),
as a representative example:

```json
{
  "id": "india-001",
  "question": "Under Section 138 of the Negotiable Instruments Act, what is the limitation period for filing a complaint, and how did the Delhi High Court clarify the cause-of-action accrual in 2023?",
  "goldenAnswer": "Under Section 142(b) of the NI Act, a complaint must be filed within one month of the cause of action under Section 138(c) — the date on which the 15-day payment window after demand notice expires. Delhi HC in Umesh Bhargava v. Vijay Shankar Pathak (2023) reaffirmed that each returned cheque gives rise to an independent cause of action and that filing delay beyond one month is fatal absent condonation under the proviso to Section 142(b).",
  "category": "limitation",
  "jurisdiction": "India",
  "expected_topics": ["Section 138", "NI Act", "limitation", "demand notice", "cause of action"],
  "difficulty": "medium",
  "last_verified": "2026-05-25"
}
```

Field contract:

- `id` — stable identifier; never reused across versions.
- `question` — the prompt presented to the agent under test.
- `goldenAnswer` — expert-written reference answer; every cite in here
  has cleared the citation verification gate.
- `category` — one of: `arbitration`, `contract`, `corporate`,
  `insolvency`, `limitation`, `procedure`, `securities`, `tax`,
  `employment` (extensible per jurisdiction).
- `jurisdiction` — human-readable jurisdiction name (the bank's
  `jurisdiction_code` is the canonical machine identifier).
- `expected_topics` — string array used by the judge to check coverage.
- `difficulty` — one of `easy`, `medium`, `hard`.
- `last_verified` — ISO date of the most recent citation re-verification.

The JSON schema is enforced by
[tools/validate-question.mjs](tools/validate-question.mjs).

## How to reproduce a score

High level (the methodology paper has the canonical procedure):

1. Pick a question bank from `questions/v1.0.0/`, `questions/v1.1.0/`, or `questions/v1.2.0/`.
2. For each question, prompt your agent with the `question` field and
   any system prompt or skill manifest that defines the agent's
   jurisdictional focus.
3. Score each answer against the golden answer using the prompt in
   [judges/grader-prompt.md](judges/grader-prompt.md) and the rubric in
   [judges/rubric.md](judges/rubric.md). Sample three times per question
   and take the arithmetic mean.
4. The agent's final score is the mean across all questions in the
   bank. See [judges/disagreement.md](judges/disagreement.md) for the
   protocol when judge samples diverge by more than 10 points.

See [methodology/paper.md](methodology/paper.md) for the full procedure,
including how the citation verification gate operates and how
re-verification is logged.

## Citation

If you use this benchmark in research or product evaluation, please
cite:

> Pariksha Benchmark v1.0.0, ATNIA Solutions, 2026,
> github.com/Aritra003/pariksha-benchmark

```bibtex
@misc{pariksha2026,
  title  = {Pariksha Benchmark: A Jurisdiction-Aware Benchmark for Legal AI Agents},
  author = {{ATNIA Solutions}},
  year   = {2026},
  version = {1.0.0},
  url    = {https://github.com/Aritra003/pariksha-benchmark}
}
```

## License

Apache License 2.0 — see [LICENSE](LICENSE).

## Provenance

Pariksha was developed alongside two live production legal AI systems:

- **Pariksha** — <https://pariksha-brown.vercel.app>. The reference
  scoring engine and public marketplace where benchmarked agents are
  listed with their Pariksha scores and on-chain attestations. The
  agents scored in production against these question banks are public
  there.
- **NyayaMitra** — <https://nyayamitraai.org>. The end-user legal
  assistant product family that the jurisdictional agents in this
  benchmark serve.

This benchmark is the methodology and question banks behind those
systems, released for independent reproduction and contribution.

**v1.1.0** (2026-05-31) added the England & Wales, Korea, and EU
question banks — primary-source verified against EUR-Lex,
legislation.gov.uk, Springer Nature, and the US Federal Judicial Center
where reachable, with authoritative secondary corroboration where
primary fetches were blocked by WAF. Development findings are published
in [`docs/archive/`](docs/archive/).

**v1.2.0** (2026-06-13) added Japan as a new Asian-jurisdiction bank
beyond the original eight-jurisdiction v1.1.0 roadmap — primary-source
verified against japaneselawtranslation.go.jp, the Japan Ministry of
Justice's official English statute portal, covering the Companies Act,
Civil Code (post-2020 obligations reform), APPI (2022 cross-border
amendment), Antimonopoly Act, and FIEA. See
[CHANGELOG.md](CHANGELOG.md) for the full release notes.

## What this is NOT

- **Not legal advice.** Nothing in this repository — questions, golden
  answers, methodology — is legal advice, and nothing here may be
  relied on as such.
- **Not a complete coverage** of any jurisdiction's law. Each bank is
  five questions. The benchmark is a *signal*, not a *survey*.
- **Not a substitute** for professional legal review. A high Pariksha
  score does not authorise the use of an AI agent in any matter
  requiring qualified legal judgment.

Released for research, evaluation, and methodology transparency.
