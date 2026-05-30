# Pariksha — Claude for Legal Plugin

This directory contains the plugin manifest for contributing Pariksha to the
`anthropics/claude-for-legal` repository's `external_plugins/` slot.

## What this plugin provides

When installed into a Claude Code environment that has `claude-for-legal`
loaded, this plugin makes available:

1. **Five reference Pariksha skills** — jurisdiction-specific legal AI agent
   manifests for India (Delhi HC focus), Singapore, UAE-DIFC, US (Delaware
   corporate + federal securities), and India plain-language.
2. **The Pariksha benchmark v1.0.0** — 20 expert-written questions across 4
   jurisdictions, plus the judge prompt and scoring rubric, for evaluating any
   legal AI agent.
3. **MCP server discovery** — points the Claude Code MCP client at the hosted
   Pariksha MCP server, which exposes legal_research, precedent_lookup, and
   legal_qa tools paid via x402 USDC settlement.
4. **AI-agent identity manifest** — links to the `.well-known/ai-agent.json`
   describing the agent endpoints, ERC-721 iNFT contract address on 0G
   Galileo testnet, and ENS naming convention.

## How to propose this to anthropics/claude-for-legal

1. Fork `https://github.com/anthropics/claude-for-legal`.
2. Add a directory `external_plugins/pariksha/` containing
   [plugin.json](plugin.json) and this README (paths inside the manifest
   are relative to the plugin directory, which inside the upstream repo
   would be `external_plugins/pariksha/`).
3. Add an entry to the upstream `external_plugins/README.md` index
   pointing to this directory.
4. Open a PR titled along the lines of: **"Add `external_plugins/pariksha/`
   — agent-economy-native legal AI benchmark and MCP marketplace"**.
5. PR body should explain:
   - What Pariksha is (benchmark + on-chain agent marketplace)
   - That it complements the Claude for Legal skill format rather than
     forking it
   - That the MCP server is hosted and rate-limited in demo mode (no key
     required)
   - That the benchmark is Apache 2.0 and immediately reusable

## Status

**Draft.** Pariksha's main repo (`pariksha/legal-benchmark`) does not yet
exist publicly; this plugin manifest depends on the public release. Steps:

1. Tag v1.0.0 of the benchmark repo and push to GitHub.
2. Verify the hosted MCP server is reachable from external clients.
3. Verify `https://pariksha-brown.vercel.app/.well-known/ai-agent.json`
   returns the expected manifest.
4. Open the PR.
