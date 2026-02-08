import type { ReactNode } from 'react'
import { createContext, useCallback, useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

export const ThemeContext = createContext<Theme | null>(null)
export const ThemeToggleContext = createContext<(() => void) | null>(
	null
)

interface ThemeProviderProps {
	children: ReactNode
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
	const [theme, setTheme] = useState<Theme>('light')

	useEffect(() => {
		const savedTheme = localStorage.getItem('theme') as Theme
		const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
			.matches
			? 'dark'
			: 'light'
		
		setTheme(savedTheme || systemTheme)
	}, [])

	useEffect(() => {
		document.documentElement.setAttribute('data-theme', theme)
		localStorage.setItem('theme', theme)
	}, [theme])

	const toggleTheme = useCallback(() => {
		setTheme((theme) => (theme === 'light' ? 'dark' : 'light'))
	}, [])

	return (
		<ThemeContext.Provider value={theme}>
			<ThemeToggleContext.Provider value={toggleTheme}>
				{children}
			</ThemeToggleContext.Provider>
		</ThemeContext.Provider>
	)
}
