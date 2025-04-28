/// <reference types="vite/client" />

interface ImportMeta {
	readonly env: ImportMetaEnv
}

interface ImportMetaEnv {
	readonly VITE_OPENSUBTITLES_API_KEY: string
	readonly VITE_TMDB_AUTH_TOKEN: string
}
