import { Option, Schema } from "effect"

declare const OPENCONTENT_VERSION: string
declare const OPENCONTENT_CHANNEL: string
declare const OPENCONTENT_ARTIFACT: string
declare const OPENCONTENT_RELEASE_HIGHLIGHTS: string

const version = typeof OPENCONTENT_VERSION === "string" ? OPENCONTENT_VERSION : "local"
const channel = typeof OPENCONTENT_CHANNEL === "string" ? OPENCONTENT_CHANNEL : "local"
const artifact = typeof OPENCONTENT_ARTIFACT === "string" ? OPENCONTENT_ARTIFACT : "cli"
// Stable release builds embed the release notes' Highlights; every other build has none.
const highlights =
  typeof OPENCONTENT_RELEASE_HIGHLIGHTS === "string"
    ? Option.getOrElse(
        Schema.decodeUnknownOption(
          Schema.fromJsonString(Schema.Array(Schema.Struct({ title: Schema.String, body: Schema.String }))),
        )(OPENCONTENT_RELEASE_HIGHLIGHTS),
        () => [],
      )
    : []

export {
  version as OPENCONTENT_VERSION,
  channel as OPENCONTENT_CHANNEL,
  artifact as OPENCONTENT_ARTIFACT,
  highlights as OPENCONTENT_HIGHLIGHTS,
}
export const OPENCONTENT_LOCAL = channel === "local"
