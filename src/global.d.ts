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
	readonly VITE_API_URL: string
}
