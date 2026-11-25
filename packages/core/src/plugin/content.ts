/// <reference path="../markdown.d.ts" />

export * as ContentPlugin from "./content.js"

import { define } from "@opencode/plugin/effect/plugin"
import type { SessionHooks } from "@opencode/plugin/effect/session"
import { FSUtil } from "@opencode/util/fs-util"
import { Effect } from "effect"
import path from "path"
import { Agent } from "../agent.js"
import { AbsolutePath } from "../schema.js"
import { SessionSystemPrompt } from "../session/system-prompt.js"
import { Skill } from "../skill.js"
import SYSTEM from "./content/system.txt"
import BRIEF from "./content/command/brief.txt"
import CALENDAR from "./content/command/calendar.txt"
import CRITIQUE from "./content/command/critique.txt"
import DE_AI from "./content/command/de-ai.txt"
import HEADLINES from "./content/command/headlines.txt"
import HOOKS from "./content/command/hooks.txt"
import NEWSLETTER from "./content/command/newsletter.txt"
import ONBOARD from "./content/command/onboard.txt"
import REPURPOSE from "./content/command/repurpose.txt"
import THREAD from "./content/command/thread.txt"
import SKILL_DE_AI from "./content/skill/de-ai.md" with { type: "text" }
import SKILL_FRAMEWORKS from "./content/skill/frameworks.md" with { type: "text" }
import SKILL_HOOKS from "./content/skill/hooks.md" with { type: "text" }
import SKILL_PLATFORMS from "./content/skill/platforms.md" with { type: "text" }
import SKILL_REPURPOSING from "./content/skill/repurposing.md" with { type: "text" }

export const writer = Agent.ID.make("writer")
export const strategist = Agent.ID.make("strategist")
export const editor = Agent.ID.make("editor")
export const researcher = Agent.ID.make("researcher")
export const factChecker = Agent.ID.make("fact-checker")

/** Characters of brand profile loaded into each request; the rest is left for the agent to read on demand. */
export const BRAND_LIMIT = 30_000

/** Agents that never need the brand: they name, summarize or compact sessions. */
const internal = new Set(["title", "summary", "compaction"])

export const system = SessionSystemPrompt.render(SYSTEM, ["shell", "write", "edit"])

const STRATEGIST = (directory: string) => `You are in Strategist mode: plan content rather than produce finished pieces. Work on positioning, audience research, content pillars, calendars, briefs and campaign plans. You may write only in ${path.join(directory, "briefs")}, ${path.join(directory, "plans")} and ${path.join(directory, "research")}. When the user wants a finished piece, tell them to switch to the Writer agent.`

const PROMPT_EDITOR = `${system}

# Your role
You are the editor subagent. Improve the draft you are given without changing its meaning or inventing facts. Tighten it, sharpen the hook, enforce the brand voice and rules, fix flow, and remove the tells of machine writing from the de-ai skill. Edit the file in place, then report the main changes in a few bullets.`

const PROMPT_RESEARCHER = `${system}

# Your role
You are the researcher subagent. Find facts, statistics, examples, quotes, competitor content and audience language on the topic you are given, using web search and web fetch. Prefer primary sources and recent data. For every finding record the claim, the source URL, the date and how reliable it is. Save the findings to \`research/<slug>.md\` and reply with the path and the five most useful findings.`

const PROMPT_FACT_CHECKER = `${system}

# Your role
You are the fact-checker subagent. Do not edit files. Read the draft you are given and list every factual claim: numbers, dates, names, quotes, studies, product details and comparisons. Verify each one with web search and web fetch. Report a table with the claim, the verdict (verified, wrong, unverifiable or opinion), the source URL and the suggested fix. Flag anything that could create legal risk, such as health, financial or comparative claims.`

const skills = [
  {
    id: "hooks",
    name: "Hooks",
    description:
      "Use when writing or improving the opening of any piece: post first lines, video hooks, thread openers, subject lines, headlines and ad hooks. Lists proven hook patterns with examples and per-platform rules.",
    content: SKILL_HOOKS,
  },
  {
    id: "frameworks",
    name: "Copywriting frameworks",
    description:
      "Use when structuring persuasive or long-form content: ads, landing pages, sales emails, case studies, posts, articles and SEO pages. Covers AIDA, PAS, BAB, 4 Ps, PASTOR and other frameworks plus persuasion devices.",
    content: SKILL_FRAMEWORKS,
  },
  {
    id: "platforms",
    name: "Platform formats",
    description:
      "Use when writing for a specific platform: LinkedIn, X, Instagram, TikTok, Reels, Shorts, YouTube, newsletters, email sequences, blogs and SEO, Meta and Google ads, podcasts. Gives lengths, limits, structures and what performs.",
    content: SKILL_PLATFORMS,
  },
  {
    id: "de-ai",
    name: "De-AI",
    description:
      "Use before handing over any draft, and whenever the user says text sounds robotic, generic or AI-written. Checklist of words, structures and habits that mark machine writing, and what to put in their place.",
    content: SKILL_DE_AI,
  },
  {
    id: "repurposing",
    name: "Repurposing",
    description:
      "Use when turning one piece of content into others: a video, podcast, article, webinar or thread into posts, threads, carousels, newsletters, scripts and clips. Covers atomization, standard output sets and reuse over time.",
    content: SKILL_REPURPOSING,
  },
] as const

const commands = [
  { name: "onboard", description: "set up a brand profile [website, handles or notes]", template: ONBOARD },
  { name: "brief", description: "turn a request into a content brief", template: BRIEF },
  { name: "hooks", description: "write 10 hooks for a topic or piece", template: HOOKS },
  { name: "headlines", description: "write and score headline variants", template: HEADLINES },
  { name: "repurpose", description: "turn one source into native pieces for other platforms", template: REPURPOSE },
  { name: "thread", description: "write an X thread", template: THREAD },
  { name: "newsletter", description: "write a newsletter issue with subject lines", template: NEWSLETTER },
  { name: "de-ai", description: "remove AI tells from a draft", template: DE_AI },
  { name: "critique", description: "score a draft against its brief and brand", template: CRITIQUE },
  { name: "calendar", description: "plan a content calendar", template: CALENDAR },
] as const

export const Plugin = define({
  id: "opencontent.content",
  effect: Effect.fn("ContentPlugin")(function* (ctx) {
    const fs = yield* FSUtil.Service
    const directory = ctx.location.directory
    const brandsDirectory = path.join(directory, "brands")
    const key = `brand:${directory}`

    yield* ctx.agent.transform((agents) => {
      agents.update(writer, (item) => {
        item.name = Agent.Name.make("Writer")
        item.description = "The default agent. Researches, drafts, edits and saves content in the brand's voice."
        item.mode = "primary"
        item.system = system
        item.permissions.push({ action: "question", resource: "*", effect: "allow" })
      })
      agents.update(strategist, (item) => {
        item.name = Agent.Name.make("Strategist")
        item.description = "Plans positioning, pillars, calendars, campaigns and briefs. Writes only briefs, plans and research."
        item.mode = "primary"
        item.system = `${system}\n\n# Strategist mode\n${STRATEGIST(directory)}`
        item.permissions.push(
          { action: "question", resource: "*", effect: "allow" },
          { action: "edit", resource: "*", effect: "deny" },
          ...["briefs", "plans", "research"].map((folder) => ({
            action: "edit",
            resource: path.join(directory, folder, "*"),
            effect: "allow" as const,
          })),
        )
      })
      agents.update(editor, (item) => {
        item.name = Agent.Name.make("Editor")
        item.description =
          "Edits a draft in place: tightens it, sharpens the hook, enforces the brand voice and removes AI tells. Give it the file path and the goal."
        item.mode = "subagent"
        item.system = PROMPT_EDITOR
        item.permissions.push(
          { action: "question", resource: "*", effect: "deny" },
          { action: "subagent", resource: "*", effect: "deny" },
        )
      })
      agents.update(researcher, (item) => {
        item.name = Agent.Name.make("Researcher")
        item.description =
          "Researches a topic on the web: facts, statistics, examples, competitor content and audience language, with sources. Saves findings to research/."
        item.mode = "subagent"
        item.system = PROMPT_RESEARCHER
        item.permissions.push(
          { action: "question", resource: "*", effect: "deny" },
          { action: "subagent", resource: "*", effect: "deny" },
          { action: "shell", resource: "*", effect: "deny" },
          { action: "edit", resource: "*", effect: "deny" },
          { action: "edit", resource: path.join(directory, "research", "*"), effect: "allow" },
        )
      })
      agents.update(factChecker, (item) => {
        item.name = Agent.Name.make("Fact-checker")
        item.description =
          "Checks every factual claim in a draft against sources and reports verdicts and fixes. Does not edit files."
        item.mode = "subagent"
        item.system = PROMPT_FACT_CHECKER
        item.permissions.push(
          { action: "question", resource: "*", effect: "deny" },
          { action: "subagent", resource: "*", effect: "deny" },
          { action: "shell", resource: "*", effect: "deny" },
          { action: "edit", resource: "*", effect: "deny" },
        )
      })
      agents.default(writer)
    })

    const registry = yield* Skill.Service
    yield* registry.transform((editor) => {
      for (const skill of skills) {
        editor.add(
          Skill.Info.make({
            id: Skill.ID.make(skill.id),
            name: Skill.Name.make(skill.name),
            description: skill.description,
            path: AbsolutePath.make(`skill://${skill.id}/SKILL.md`),
            content: skill.content,
          }),
        )
      }
    })

    const listBrands = fs.scan("*/BRAND.md", { cwd: brandsDirectory, include: "file" }).pipe(
      Effect.map((files) => files.map((file) => path.dirname(file)).sort()),
      Effect.orElseSucceed((): string[] => []),
    )

    const selected = Effect.gen(function* () {
      const value = yield* ctx.storage.get(key)
      return typeof value === "string" ? value : undefined
    }).pipe(Effect.orElseSucceed(() => undefined))

    const readProfile = Effect.fnUntraced(function* (root: string, files: string[]) {
      const sections = yield* Effect.forEach(files, (file) =>
        fs.readFileStringSafe(path.join(root, file)).pipe(
          Effect.map((text) => (text ? `<file path="${path.join(root, file)}">\n${text.trim()}\n</file>` : "")),
          Effect.orElseSucceed(() => ""),
        ),
      )
      const body = sections.filter(Boolean).join("\n\n")
      if (body.length <= BRAND_LIMIT) return body
      return `${body.slice(0, BRAND_LIMIT)}\n\n[Brand profile cut at ${BRAND_LIMIT} characters. Read the remaining files in ${root} when you need them.]`
    })

    const brandContext = Effect.gen(function* () {
      const brands = yield* listBrands
      const choice = yield* selected
      const active = choice && brands.includes(choice) ? choice : brands.length === 1 ? brands[0] : undefined
      if (active) {
        const root = path.join(brandsDirectory, active)
        const files = yield* fs.scan("**/*.md", { cwd: root, include: "file" }).pipe(
          Effect.map((found) => found.sort((a, b) => (a === "BRAND.md" ? -1 : b === "BRAND.md" ? 1 : a.localeCompare(b)))),
          Effect.orElseSucceed((): string[] => []),
        )
        const others = brands.filter((brand) => brand !== active)
        const note = others.length > 0 ? `\nOther brands in this workspace: ${others.join(", ")}. The user switches with /brand <slug>.` : ""
        return `<brand slug="${active}" directory="${root}">\n${yield* readProfile(root, files)}\n</brand>${note}`
      }
      if (brands.length > 1)
        return `<brand>\nNo brand is active. This workspace has these brands: ${brands.join(", ")}. Before writing brand content, ask the user which brand it is for, or tell them to run /brand <slug>.\n</brand>`
      const solo = yield* fs.readFileStringSafe(path.join(directory, "BRAND.md")).pipe(Effect.orElseSucceed(() => undefined))
      if (solo) return `<brand directory="${directory}">\n${yield* readProfile(directory, ["BRAND.md"])}\n</brand>`
      return `<brand>\nNo brand profile is set up in this workspace. When the user asks for content, offer to run /onboard first, or ask about the audience and voice before writing.\n</brand>`
    })

    yield* ctx.session.hook("context", (event: SessionHooks["context"]) =>
      Effect.gen(function* () {
        if (internal.has(event.agent)) return
        event.system.push({ type: "text", text: yield* brandContext })
      }),
    )

    yield* ctx.command.transform((editor) => {
      for (const command of commands) {
        editor.add({
          name: command.name,
          description: command.description,
          execute: (input) =>
            ctx.session
              .prompt({
                ...input.prompt,
                sessionID: input.sessionID,
                text: command.template
                  .replaceAll("${directory}", () => directory)
                  .replaceAll("$ARGUMENTS", () => input.prompt.text.trim() || "(nothing given; ask the user)"),
                delivery: input.delivery,
              })
              .pipe(Effect.asVoid),
        })
      }
      editor.add({
        name: "brand",
        description: "switch the active brand [slug], or list brands",
        execute: (input) =>
          Effect.gen(function* () {
            const slug = input.prompt.text.trim()
            const brands = yield* listBrands
            const found = brands.includes(slug)
            if (found) yield* ctx.storage.set(key, slug)
            const available = brands.length > 0 ? brands.join(", ") : "none yet"
            const text = !slug
              ? `List the brands in this workspace (${available}), say which is active, and explain that /brand <slug> switches and /onboard adds one.`
              : found
                ? `The user switched the active brand to "${slug}". Confirm in one line and describe its voice in a few words from the brand profile.`
                : `The user tried to switch to the brand "${slug}", which does not exist. Available brands: ${available}. Tell them, and offer /onboard to create it.`
            yield* ctx.session.prompt({ ...input.prompt, sessionID: input.sessionID, text, delivery: input.delivery })
          }).pipe(Effect.asVoid),
      })
    })
  }),
})
