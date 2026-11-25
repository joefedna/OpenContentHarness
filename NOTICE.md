# Notice and attribution

OpenContentHarness is built on **OpenCode** (https://github.com/anomalyco/opencode), an open-source AI coding agent, adapted for content generation.

## Origin

- OpenContentHarness started from the source of OpenCode **v2.4.1** (tag `v2.4.1`, commit `6f0514052a`, 23 November 2026). The first commit in this repository is that snapshot, unchanged.
- OpenCode is copyright (c) 2025 opencode and released under the MIT License. That copyright notice and the license text are kept in [LICENSE](LICENSE), as the license requires.
- OpenContentHarness is maintained independently. It does not track or merge later OpenCode releases.

## Our changes

Every change after the first commit is ours and is recorded in the git history. They include:

- a content layer: system prompt, agents, brand profiles, commands and playbooks (`packages/core/src/plugin/content.ts` and `packages/core/src/plugin/content/`), with tests
- removal of parts of OpenCode a content harness doesn't need: its website and cloud services, Salesforce integration, VS Code extension, Rust CLI, process daemon, Nix packaging, design specs, logos and brand assets, release workflows, issue templates, changelog, contributing and security guides, and translated READMEs
- our own README, this notice, the feature plan in `docs/FEATURES.md`, and a second copyright line in `LICENSE`. OpenCode's English README is kept for reference in `docs/upstream/`.

Our changes are also released under the MIT License.

## Trademarks and affiliation

OpenContentHarness is an independent project. It is not affiliated with, endorsed by, or supported by the OpenCode team. "OpenCode" and its logos belong to their respective owners and are used here only to identify the original project. Some internal names, package names and file paths still say `opencode` because they come from the original code.
