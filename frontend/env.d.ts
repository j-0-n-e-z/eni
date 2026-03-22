/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

interface ImportMeta {
	readonly env: ImportMetaEnv
}

interface ImportMetaEnv {
	readonly VITE_API_URL: string
	readonly VITE_NODE_ENV: string
	readonly VITE_OPENSUBTITLES_API_URL: string
	readonly VITE_OPENSUBTITLES_API_KEY: string
}

declare module '*.lottie' {
	const src: string
	export default src
}
