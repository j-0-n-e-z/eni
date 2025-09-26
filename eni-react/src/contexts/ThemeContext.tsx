import type { ReactNode } from 'react'
import { createContext, useCallback, useEffect, useMemo, useState } from 'react'

export interface ThemeContextType {
	theme: 'light' | 'dark'
	toggleTheme: () => void
}

export const ThemeContext = createContext<ThemeContextType | null>(null)

interface ThemeProviderProps {
	children: ReactNode
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
	const [theme, setTheme] = useState<'light' | 'dark'>('light')

	useEffect(() => {
		const savedTheme = localStorage.getItem('theme') as 'light' | 'dark'
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
		setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
	}, [])

	const contextValue = useMemo(
		() => ({ theme, toggleTheme }),
		[theme, toggleTheme]
	)

	return (
		<ThemeContext.Provider value={contextValue}>
			{children}
		</ThemeContext.Provider>
	)
}
