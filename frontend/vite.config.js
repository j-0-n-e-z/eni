import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import path from 'path'
import svgr from 'vite-plugin-svgr'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
	plugins: [
		react(),
		tsconfigPaths(),
		svgr({
			svgrOptions: {
				icon: false,
				deminsions: false
			}
		})
	],
	resolve: {
		alias: {
			'@styles': path.resolve(__dirname, './src/styles')
		}
	}
})
