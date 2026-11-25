import { expect, test } from "bun:test"
import { Env } from "../src/env"

test("session environment omits server credentials", () => {
  const previousPassword = process.env.OPENCONTENT_PASSWORD
  const previousLegacyPassword = process.env.OPENCONTENT_SERVER_PASSWORD
  const previousValue = process.env.OPENCONTENT_SESSION_ENV_TEST
  process.env.OPENCONTENT_PASSWORD = "password"
  process.env.OPENCONTENT_SERVER_PASSWORD = "legacy"
  process.env.OPENCONTENT_SESSION_ENV_TEST = "included"

  const environment = Env.session()

  if (previousPassword === undefined) delete process.env.OPENCONTENT_PASSWORD
  else process.env.OPENCONTENT_PASSWORD = previousPassword
  if (previousLegacyPassword === undefined) delete process.env.OPENCONTENT_SERVER_PASSWORD
  else process.env.OPENCONTENT_SERVER_PASSWORD = previousLegacyPassword
  if (previousValue === undefined) delete process.env.OPENCONTENT_SESSION_ENV_TEST
  else process.env.OPENCONTENT_SESSION_ENV_TEST = previousValue

  expect(environment.OPENCONTENT_PASSWORD).toBeUndefined()
  expect(environment.OPENCONTENT_SERVER_PASSWORD).toBeUndefined()
  expect(environment.OPENCONTENT_SESSION_ENV_TEST).toBe("included")
})
