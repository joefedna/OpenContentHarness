import path from "node:path"
import { OPENCONTENT_CHANNEL } from "./version"

export function databasePath(data: string) {
  const filename =
    process.env.OPENCONTENT_DB ??
    (["latest", "dev", "beta", "next", "prod"].includes(OPENCONTENT_CHANNEL) ||
    process.env.OPENCONTENT_DISABLE_CHANNEL_DB === "1" ||
    process.env.OPENCONTENT_DISABLE_CHANNEL_DB === "true"
      ? "opencode.db"
      : `opencode-${OPENCONTENT_CHANNEL.replace(/[^a-zA-Z0-9._-]/g, "-")}.db`)
  return filename === ":memory:" ? filename : path.resolve(data, filename)
}
