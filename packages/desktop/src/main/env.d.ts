interface ImportMetaEnv {
  readonly OPENCONTENT_CHANNEL: string
  readonly OPENCONTENT_VERSION?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
