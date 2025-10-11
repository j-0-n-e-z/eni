import { useContext } from 'react'

import { ThemeToggleContext } from '@/contexts'

export const useThemeToggle = () => {
	const context = useContext(ThemeToggleContext)

	if (context === null) {
		throw new Error('useToggleTheme must be used within a ThemeProvider')
	}

	return context
}
