# OpenContentHarness

**The open-source AI agent harness for content.** Plan, research, write, design, edit and publish posts, threads, newsletters, articles, scripts, reels, images, video, audio and email, in your brand's voice.

Built for solo creators, agencies and marketing teams.

## Why a harness

Coding agents got good because they work in a loop: edit a file, run a check, fix what failed, repeat. OpenContentHarness brings that loop to content. Every piece is a file, every draft is checked against the brief, the brand and the platform, and the agent revises until it passes. Text, video timelines, canvases and emails all work the same way: the agent edits the file, a renderer shows the result, and you adjust it by hand whenever you want.

## What it does today

- **Brand profiles.** Keep one `BRAND.md` for a single brand, or a `brands/<slug>/` folder per brand for agencies. The active brand's voice, audience, rules and examples go into every request, and `/brand <slug>` switches between brands.
- **Content agents.**
  - **Writer** drafts and saves finished pieces. It's the default agent.
  - **Strategist** plans pillars, calendars, campaigns and briefs.
  - **Editor**, **Researcher** and **Fact-checker** work alongside the Writer.
- **Commands:**

  | Command | What it does |
  |---|---|
  | `/onboard` | Builds a brand profile from your site, samples and an interview |
  | `/brand` | Switches the active brand, or lists brands |
  | `/brief` | Turns a request into a content brief |
  | `/hooks` | Writes 10 hooks in different patterns |
  | `/headlines` | Writes and scores headline variants |
  | `/repurpose` | Turns one source into native pieces for each platform |
  | `/thread` | Writes an X thread |
  | `/newsletter` | Writes a newsletter issue with subject lines |
  | `/de-ai` | Removes AI-writing tells |
  | `/critique` | Scores a draft against its brief and brand |
  | `/calendar` | Plans a content calendar |

- **Built-in playbooks** the agent loads when they fit: hook patterns, copywriting frameworks (AIDA, PAS, BAB, PASTOR and more), platform formats and limits, an AI-tells checklist, and repurposing.
- **Any model.** Use OpenRouter, Anthropic, OpenAI, Google, local models and more.
- **Terminal, desktop and web** interfaces.

## What's coming

- Long videos cut into postable reels automatically: best moments, vertical reframing, captions, music, hooks.
- Full video editing with intelligent cuts, and AI-generated or stock footage filling the gaps.
- Footage and images from open sources, free stock APIs and your own licensed stock accounts, with every license tracked.
- Every image, video, 3D, voice and music model on fal.ai, Replicate and direct providers, usable on release day.
- A design canvas, 3D previews, email design and sending, publishing, and analytics.

The full plan, with every feature and its status, is in [docs/FEATURES.md](docs/FEATURES.md).

## Getting started

OpenContentHarness is in early development. To run it from source you need [Bun](https://bun.sh) 1.4 or later:

```bash
bun install
bun run dev
```

> [!WARNING]
> For now OpenContentHarness shares its data folders with OpenCode. If you also use OpenCode on this machine, wait for the separate data folders (OPS-03 in the plan) before running it.

## Workspace layout

```
BRAND.md              # one brand, or:
brands/<slug>/        # one folder per brand: BRAND.md, voice, audience, examples/
briefs/               # content briefs
drafts/               # work in progress
published/            # final versions
research/             # sourced findings
swipe/                # examples worth learning from
plans/                # calendars and campaigns
```

## Contributing

The content layer lives in [`packages/core/src/plugin/content.ts`](packages/core/src/plugin/content.ts) and [`packages/core/src/plugin/content/`](packages/core/src/plugin/content/). Pick a feature from [docs/FEATURES.md](docs/FEATURES.md) and reference its ID in your branch and commits.

## Credits

OpenContentHarness is built on [OpenCode](https://github.com/anomalyco/opencode), the open-source AI coding agent, used under the MIT License. We started from OpenCode v2.4.1 and adapted its agent harness for content. Thanks to the OpenCode team and contributors. OpenContentHarness is an independent project and isn't affiliated with or endorsed by OpenCode. See [NOTICE.md](NOTICE.md) for details.

## License

MIT. See [LICENSE](LICENSE).
