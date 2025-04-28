declare module '*.module.scss' {
	const stylesModuleScss: { [key: string]: string }
	export default stylesModuleScss
}

declare module '*.scss' {
	const stylesScss: { [key: string]: string }
	export default stylesScss
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}

interface ImportMetaEnv {
	readonly VITE_OPENSUBTITLES_API_KEY: string
	readonly VITE_TMDB_AUTH_TOKEN: string
}
