interface ImportMetaEnv {
    readonly VITE_BASE_URL: string
    readonly VITE_SOCKET_URL : string
    // add other env variables here
  }
  
interface ImportMeta {
  readonly env: ImportMetaEnv
}