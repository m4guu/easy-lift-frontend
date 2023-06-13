/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_INTERNAL_API_URL: string;
  readonly VITE_EXERCISE_DB_API_URL: string;
  readonly VITE_RAPID_API_KEY: string;
  readonly VITE_MAP_BOX_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
