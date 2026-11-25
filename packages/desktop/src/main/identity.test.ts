import { expect, test } from "bun:test"
import { isCollidingDevShortcut, resolveIdentity } from "./identity"

test.each([
  {
    channel: "dev",
    packaged: true,
    appName: "OpenCode Dev",
    appID: "ai.opencontent.desktop.dev",
    appUserModelID: "ai.opencontent.desktop.dev",
  },
  {
    channel: "beta",
    packaged: true,
    appName: "OpenCode Beta",
    appID: "ai.opencontent.desktop.beta",
    appUserModelID: "ai.opencontent.desktop.beta",
  },
  {
    channel: "prod",
    packaged: true,
    appName: "OpenCode",
    appID: "ai.opencontent.desktop",
    appUserModelID: "ai.opencontent.desktop",
  },
  {
    channel: "local",
    packaged: false,
    appName: "OpenCode Dev",
    appID: "ai.opencontent.desktop.dev",
    appUserModelID: "ai.opencontent.desktop.local",
  },
  {
    channel: "dev",
    packaged: false,
    appName: "OpenCode Dev",
    appID: "ai.opencontent.desktop.dev",
    appUserModelID: "ai.opencontent.desktop.local",
  },
] as const)(
  "identity for $channel (packaged=$packaged) isolates unpackaged AUMID from installed channels",
  ({ channel, packaged, appName, appID, appUserModelID }) => {
    expect(resolveIdentity(channel, packaged)).toEqual({ appName, appID, appUserModelID })
  },
)

const installedExe = "C:\\Users\\user\\AppData\\Local\\Programs\\ai.opencontent.desktop.dev\\OpenCode Dev.exe"

const devElectron = "D:\\repo\\node_modules\\electron\\dist\\electron.exe"

test.each([
  {
    name: "unpackaged Electron.lnk claiming the installed dev AUMID",
    shortcut: { appUserModelId: "ai.opencontent.desktop.dev", target: devElectron },
    expected: true,
  },
  {
    name: "case-insensitive AUMID match",
    shortcut: { appUserModelId: "AI.OpenContent.Desktop.Dev", target: devElectron },
    expected: true,
  },
  {
    name: "unpackaged Electron.lnk with the isolated local AUMID",
    shortcut: { appUserModelId: "ai.opencontent.desktop.local", target: devElectron },
    expected: false,
  },
  {
    name: "unrelated app shortcut",
    shortcut: { appUserModelId: "com.example.other", target: devElectron },
    expected: false,
  },
  {
    name: "shortcut without an AUMID",
    shortcut: { target: devElectron },
    expected: false,
  },
  {
    name: "shortcut targeting the installed executable itself",
    shortcut: { appUserModelId: "ai.opencontent.desktop.dev", target: installedExe.toLowerCase() },
    expected: false,
  },
])("isCollidingDevShortcut returns $expected for $name", ({ shortcut, expected }) => {
  expect(isCollidingDevShortcut(shortcut, "ai.opencontent.desktop.dev", installedExe)).toBe(expected)
})
