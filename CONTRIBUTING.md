# Contributing to the Pariksha Benchmark

Thank you for considering a contribution. This benchmark is only useful
if its question banks and methodology are *trusted* — which means every
contribution clears the same verification bar that the v1.0.0 banks
cleared. The procedures below exist to keep that bar fixed.

By submitting a contribution you agree that your contribution is
licensed under the [Apache License 2.0](LICENSE).

## Table of contents

1. [Proposing a new question bank](#proposing-a-new-question-bank)
2. [Flagging a citation error](#flagging-a-citation-error)
3. [Citation verification standard](#citation-verification-standard)
4. [Prompt-revision discipline](#prompt-revision-discipline)

---

## Proposing a new question bank

New jurisdictional question banks are welcome. Each PR introducing a
new bank must:

1. **File location** — add the bank at
   `questions/v{next}/<jurisdiction-slug>.json`. The slug should be
   lower-kebab-case (e.g. `england-wales.json`, `korea.json`,
   `eu-general.json`). Do not edit a tagged version directory —
   immutability of tagged banks is a load-bearing property.

2. **Schema** — the bank must pass:

   ```bash
   node tools/validate-question.mjs questions/v{next}/<file>.json
   ```

   Failing the validator blocks merge. The validator enforces the
   schema documented in `README.md` under "Question structure".

3. **Coverage** — minimum 5 questions per bank. Each question must
   include all required fields: `id`, `question`, `goldenAnswer`,
   `category`, `jurisdiction`, `expected_topics`, `difficulty`,
   `last_verified`.

4. **Citation verification gate** — every statute and case-law cite in
   every `goldenAnswer` must clear the [citation verification
   standard](#citation-verification-standard) below. Set
   `last_verified` to the ISO date the last cite in that question was
   confirmed.

5. **Distribution of difficulty** — banks should not be uniformly easy
   or uniformly hard. A reasonable target is roughly: 1 `easy`, 2–3
   `medium`, 1–2 `hard` per 5-question set, but this is a guideline
   not a gate.

6. **No benchmark-question-specific anchors** — see
   [prompt-revision discipline](#prompt-revision-discipline). A bank
   contribution may not be paired with system-prompt or skill-manifest
   changes that reference the bank's specific questions, golden
   answers, or category structure.

### Pull request template

Use this template in the PR description:

```markdown
## New question bank: <Jurisdiction Name>

- File: `questions/v{next}/<file>.json`
- Question count: <n>
- Categories covered: <list>
- Difficulty distribution: <e.g. 1 easy / 3 medium / 1 hard>

### Citation sources used (per question)

| Question ID | Primary source(s) | Verified on |
|---|---|---|
| <slug>-001 | <statute / case + URL or reporter cite> | YYYY-MM-DD |
| <slug>-002 | ... | ... |
| ...

### Validator output

```text
$ node tools/validate-question.mjs questions/v{next}/<file>.json
<paste output>
```

### Methodology compliance

- [ ] All citations cleared the citation verification gate
- [ ] No anchor or prompt revision in this PR references benchmark questions
- [ ] `last_verified` ISO dates accurately reflect re-verification timestamps
- [ ] Bank file is in a `v{next}/` directory, not an existing tagged version
```

---

## Flagging a citation error

If you believe a published cite in a `goldenAnswer` is wrong,
mis-attributed, fabricated, or has been superseded by amendment, please
open an issue (do **not** open a PR that silently rewrites the
question). The issue must include:

1. **The cite as published** — quote the exact passage from the
   `goldenAnswer` and identify it by `<bank>:<question-id>` (e.g.
   `india:india-001`).
2. **The authoritative source** — primary source (official statute
   text, official case reporter) with URL or citation. Verified
   secondary sources are acceptable only if the primary source is
   genuinely unavailable; state which and why.
3. **The reason** — one of: *fabrication* (cite does not exist),
   *mis-attribution* (cite exists but stands for a different
   proposition), *staleness* (amendment supersedes), *typographical
   error* (wrong section/year).
4. **Suggested correction** — the corrected language, ideally with the
   replacement cite.

Maintainers will triage and, where the error is confirmed, ship the
correction as part of the next `vX.Y+1.Z` errata release with a
CHANGELOG entry crediting the reporter (unless anonymity is requested).

Cites are not silently amended. Every change to a published
`goldenAnswer` lives in version control with a citing rationale.

---

## Citation verification standard

Every cite in a `goldenAnswer` — every statute name, section number,
amendment year, case name, reporter cite, paragraph reference — must
be independently verified before the question ships.

**Primary source preferred.** A primary source is the official
publisher of the legal instrument: the government printer or official
gazette for statutes, the official reporter for case law, the
arbitral institution for institutional rules. Examples of primary
sources by jurisdiction:

| Jurisdiction | Statutes | Case law |
|---|---|---|
| India | India Code (indiacode.nic.in) | SCI / High Court official portals |
| Singapore | Singapore Statutes Online | Singapore Law Watch / official reporters |
| UAE — DIFC | DIFC Courts official publications | DIFC Courts judgments database |
| US (Delaware) | Delaware Code (delcode.delaware.gov) | Westlaw / Lexis official reporters |
| US (federal) | U.S. Code, Federal Register | SCOTUS slip opinions / official reporters |

**Verified secondary source acceptable with explicit fallback
notation.** Where a primary source is paywalled, missing, or
unreliable, a verified secondary source (a recognised legal publisher's
codified version, a bar council practice note, a leading textbook with
official endorsement) is acceptable. When a secondary source is used,
the PR or issue must state:

> Primary source unavailable for <reason>. Secondary source used:
> <publisher, edition, page or paragraph>.

This is recorded in the PR description, not in the question file
itself.

**Re-verification cadence.** Every published question's `last_verified`
ISO date is re-confirmed every six months. Maintainers run the
re-verification pass; contributors do not need to re-verify questions
they have already shipped. If a re-verification pass surfaces a stale
cite, it ships as an errata release per the flagging process above.

---

## Prompt-revision discipline

Prompt-revision discipline. When an agent's system prompt is revised, the
revision must be motivated by general statutory or doctrinal accuracy, not
by a specific benchmark question's failure mode. Anchors describing the
structure of a statute (e.g., listing the four cumulative conditions of
Arbitration Act 1996 s.69(3)) are permitted because they encode law a
competent practitioner would have. Anchors that reference a benchmark
question, its golden answer, or its category structure are not permitted.
When in doubt, the revision is tested for cross-question contamination: if
it improves the target question by more than 5 points but degrades any
other question by more than 5 points, it is rejected. Prompt revisions
that materially affect a flagged or borderline question are documented in
docs/_archive/.

---

## Questions

If something in this document is unclear, ambiguous, or contradicts the
methodology paper, that is itself a bug — please open an issue and we
will reconcile.
