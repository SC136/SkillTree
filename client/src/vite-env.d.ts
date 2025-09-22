/// <reference types="vite/client" />/// <reference types="vite/client" />/// <reference types="vite/client" />



interface ImportMetaEnv {

  readonly VITE_API_URL: string

  readonly VITE_SUPABASE_URL: stringinterface ImportMetaEnv {interface ImportMetaEnv {

  readonly VITE_SUPABASE_ANON_KEY: string

  readonly VITE_ENABLE_MOCK_AUTH: string  readonly VITE_API_URL: string  readonly VITE_SUPABASE_URL?: string

  readonly VITE_ENABLE_ANALYTICS: string

  readonly MODE: string  readonly VITE_SUPABASE_URL: string  readonly VITE_SUPABASE_ANON_KEY?: string

  readonly PROD: boolean

  readonly DEV: boolean  readonly VITE_SUPABASE_ANON_KEY: string  readonly VITE_DEMO_MODE?: string

}

  readonly VITE_ENABLE_MOCK_AUTH: string}

interface ImportMeta {

  readonly env: ImportMetaEnv  readonly VITE_ENABLE_ANALYTICS: string

}
  readonly MODE: stringinterface ImportMeta {

  readonly PROD: boolean  readonly env: ImportMetaEnv

  readonly DEV: boolean}
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}