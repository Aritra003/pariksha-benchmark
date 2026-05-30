# Reference Pariksha Skills

These are **reference skill manifests** in the Claude for Legal skill format,
demonstrating how to structure a jurisdiction-specific legal AI agent that
will perform well on the Pariksha benchmark for its jurisdiction.

They are *not* the literal production system prompts used by the
`*.pariksha.eth` agents on 0G Galileo — those are kept private by the agent
owners. These manifests document the structure, anchoring, and disclaimers
that a well-formed Pariksha agent should include.

## Files

| File | Target jurisdiction | Benchmark file |
|---|---|---|
| [delhi-india.md](delhi-india.md) | India (Delhi HC focus) | `questions/v1.0.0/india.json` |
| [vidhi-singapore.md](vidhi-singapore.md) | Singapore | `questions/v1.0.0/singapore.json` |
| [vidhi-uae-difc.md](vidhi-uae-difc.md) | UAE-DIFC | `questions/v1.0.0/uae-difc.json` |
| [delaware-us.md](delaware-us.md) | US (Delaware corporate + federal securities) | `questions/v1.0.0/us-delaware-federal.json` |
| [sahayak-india.md](sahayak-india.md) | India (plain-language Q&A) | `questions/v1.0.0/india.json` |

## Skill manifest structure

Each skill file follows this structure:

```markdown
---
name: <skill-slug>
description: <one-line>
jurisdiction: <code>
focus_area: <comma-separated>
disclaimer_required: true
citation_required: true
---

# <Skill Display Name>

## Role
<one-paragraph role description>

## Domain knowledge anchors
<bullet list of statutes, cases, doctrines the agent must know>

## Output discipline
<bullet list of citation, disclaimer, uncertainty rules>

## Out-of-scope
<bullet list of what the agent should refuse or redirect>
```

When loaded into a Claude-based agent runtime, the YAML front-matter is
parsed for routing and the body becomes the system prompt.
