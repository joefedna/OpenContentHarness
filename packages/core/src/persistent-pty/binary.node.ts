export const available = true

export async function resolveBinary() {
  return process.env.OPENCONTENT_PTY_BIN || "opencode-pty"
}
