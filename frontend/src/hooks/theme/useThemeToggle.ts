import { useContext } from 'react'

import { ThemeToggleContext } from '@/contexts'

export const useThemeToggle = () => {
	const context = useContext(ThemeToggleContext)

	if (!context) {
		throw new Error('useToggleTheme must be used within a ThemeProvider')
	}

	return context
}
