import { describe, expect } from "bun:test"
import type { Plugin } from "@opencode/plugin/effect"
import type { SessionHooks } from "@opencode/plugin/effect/session"
import { AppNodeBuilder } from "@opencode/core/effect/app-node-builder"
import { Agent } from "@opencode/core/agent"
import { Location } from "@opencode/core/location"
import { ContentPlugin } from "@opencode/core/plugin/content"
import { Project } from "@opencode/core/project"
import { AbsolutePath } from "@opencode/core/schema"
import { Skill } from "@opencode/core/skill"
import { FSUtil } from "@opencode/util/fs-util"
import { LayerNode } from "@opencode/util/effect/layer-node"
import { Effect, Types } from "effect"
import fs from "fs"
import os from "os"
import path from "path"
import { testEffect } from "../lib/effect"
import { host } from "./host"

const it = testEffect(AppNodeBuilder.build(LayerNode.group([Skill.node, FSUtil.node])))

type Command = Parameters<Parameters<Plugin.Context["command"]["transform"]>[0]>[0] extends {
  add: (command: infer C) => void
}
  ? C
  : never

function workspace(files: Record<string, string>) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "opencontent-"))
  for (const [file, text] of Object.entries(files)) {
    fs.mkdirSync(path.dirname(path.join(root, file)), { recursive: true })
    fs.writeFileSync(path.join(root, file), text)
  }
  return root
}

/** Runs the content plugin in `directory`, capturing agents, the context hook, commands and prompts. */
const run = Effect.fnUntraced(function* (directory: string) {
  const skill = yield* Skill.Service
  const agents = new Map<string, Types.DeepMutable<Agent.Info>>()
  const state = { default: undefined as string | undefined }
  const storage = new Map<string, unknown>()
  const commands = new Map<string, Command>()
  const prompts: string[] = []
  let context: ((event: SessionHooks["context"]) => Effect.Effect<void>) | undefined

  yield* ContentPlugin.Plugin.effect(
    host({
      location: new Location.Info({
        directory: AbsolutePath.make(directory),
        project: {
          id: Project.ID.global,
          directory: AbsolutePath.make(directory),
          canonical: AbsolutePath.make(directory),
        },
      }),
      agent: {
        get: () => Effect.die("unused agent.get"),
        list: () => Effect.die("unused agent.list"),
        reload: () => Effect.die("unused agent.reload"),
        transform: (callback) => {
          callback({
            list: () => [...agents.values()],
            get: (id) => agents.get(id),
            default: (id) => {
              state.default = id
            },
            update: (id, update) => {
              const current = agents.get(id) ?? (Agent.Info.default(Agent.ID.make(id)) as Types.DeepMutable<Agent.Info>)
              agents.set(id, current)
              update(current)
            },
            remove: (id) => {
              agents.delete(id)
            },
          })
          return Effect.succeed({ dispose: Effect.void })
        },
      },
      skill: { list: () => Effect.die("unused skill.list"), transform: skill.transform, reload: skill.reload },
      storage: {
        get: (key) => Effect.succeed(storage.get(key) as never),
        set: (key, value) => Effect.sync(() => void storage.set(key, value)),
        remove: (key) => Effect.sync(() => void storage.delete(key)),
        scan: () => Effect.die("unused storage.scan"),
      },
      command: {
        list: () => Effect.die("unused command.list"),
        reload: () => Effect.die("unused command.reload"),
        transform: (callback) => {
          callback({
            list: () => [...commands.values()],
            get: (name: string) => commands.get(name),
            add: (command: Command) => void commands.set(command.name, command),
            remove: (name: string) => void commands.delete(name),
          } as never)
          return Effect.succeed({ dispose: Effect.void })
        },
      },
      session: {
        hook: (name, callback) => {
          // Hook names and callbacks are correlated, but TypeScript does not narrow this generic registration API.
          // oxlint-disable-next-line typescript-eslint/no-unsafe-type-assertion
          if (name === "context") context = callback as unknown as typeof context
          return Effect.succeed({ dispose: Effect.void })
        },
        prompt: (input) => Effect.sync(() => void prompts.push(input.text ?? "")) as never,
      },
    }),
  )
  if (!context) return yield* Effect.die("content plugin did not register a context hook")
  const hook = context
  const brand = Effect.fnUntraced(function* (agent = "writer") {
    const event = { agent, system: [] as Array<{ type: "text"; text: string }> } as unknown as SessionHooks["context"]
    yield* hook(event)
    return event.system.map((part) => part.text).join("\n")
  })
  const command = (name: string, text: string) => {
    const found = commands.get(name)
    if (!found) throw new Error(`missing command ${name}`)
    return found.execute({ sessionID: "ses_test", prompt: { text }, delivery: "queue" } as never) as Effect.Effect<void>
  }
  return { agents, state, brand, command, prompts, skills: yield* skill.list() }
})

describe("ContentPlugin.Plugin", () => {
  it.effect("registers content agents with writer as default and replaces the coding prompt", () =>
    Effect.gen(function* () {
      const result = yield* run(workspace({}))
      expect(result.state.default).toBe("writer")
      expect([...result.agents.keys()].sort()).toEqual(["editor", "fact-checker", "researcher", "strategist", "writer"])
      expect(result.agents.get("writer")?.system).toContain("OpenContent")
      expect(result.agents.get("writer")?.system).not.toContain("coding agent")
      expect(result.agents.get("writer")?.system).not.toContain("${OPENCONTENT_TOOL_GUIDANCE}")
      expect(result.agents.get("researcher")?.mode).toBe("subagent")
      expect(result.skills.map((skill) => skill.id)).toEqual(
        expect.arrayContaining(["hooks", "frameworks", "platforms", "de-ai", "repurposing"]),
      )
    }),
  )

  it.effect("offers onboarding when the workspace has no brand", () =>
    Effect.gen(function* () {
      const result = yield* run(workspace({}))
      expect(yield* result.brand()).toContain("/onboard")
    }),
  )

  it.effect("loads a solo BRAND.md at the workspace root", () =>
    Effect.gen(function* () {
      const result = yield* run(workspace({ "BRAND.md": "Voice: blunt, numbers-first." }))
      expect(yield* result.brand()).toContain("Voice: blunt, numbers-first.")
    }),
  )

  it.effect("activates the only brand folder automatically and loads its files with BRAND.md first", () =>
    Effect.gen(function* () {
      const result = yield* run(
        workspace({
          "brands/acme/BRAND.md": "Acme summary",
          "brands/acme/audience.md": "Shopify founders",
          "brands/acme/examples/best.md": "Example post",
        }),
      )
      const text = yield* result.brand()
      expect(text).toContain('slug="acme"')
      expect(text.indexOf("Acme summary")).toBeLessThan(text.indexOf("Shopify founders"))
      expect(text).toContain("Example post")
    }),
  )

  it.effect("asks which brand when several exist, and /brand switches", () =>
    Effect.gen(function* () {
      const result = yield* run(
        workspace({ "brands/acme/BRAND.md": "Acme voice", "brands/bloom/BRAND.md": "Bloom voice" }),
      )
      const before = yield* result.brand()
      expect(before).toContain("No brand is active")
      expect(before).toContain("acme, bloom")

      yield* result.command("brand", "bloom")
      const after = yield* result.brand()
      expect(after).toContain("Bloom voice")
      expect(after).not.toContain("Acme voice")
      expect(after).toContain("Other brands in this workspace: acme")
      expect(result.prompts.at(-1)).toContain('switched the active brand to "bloom"')

      yield* result.command("brand", "nope")
      expect(result.prompts.at(-1)).toContain("does not exist")
      expect(yield* result.brand()).toContain("Bloom voice")
    }),
  )

  it.effect("skips the brand for internal title agents", () =>
    Effect.gen(function* () {
      const result = yield* run(workspace({ "BRAND.md": "Voice" }))
      expect(yield* result.brand("title")).toBe("")
    }),
  )

  it.effect("fills command templates with the request and workspace", () =>
    Effect.gen(function* () {
      const directory = workspace({})
      const result = yield* run(directory)
      yield* result.command("onboard", "acme.com")
      expect(result.prompts.at(-1)).toContain("acme.com")
      expect(result.prompts.at(-1)).toContain(directory)
      expect(result.prompts.at(-1)).not.toContain("$ARGUMENTS")
    }),
  )
})
