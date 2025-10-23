import { useTheme, useThemeToggle } from '@/hooks'
import { MoonIcon, SunIcon } from '@/ui'

import styles from '../SidePanel.module.scss'

export const ThemeToggle = () => {
  const theme = useTheme()
  const toggleTheme = useThemeToggle()

	return (
		<button className={styles.themeToggle} onClick={toggleTheme}>
			{theme === 'light' ? <MoonIcon /> : <SunIcon />}
		</button>
	)
}
