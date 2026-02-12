import { useTheme, useThemeToggle } from '@/hooks'
import { Icons } from '@/ui'

import styles from '../SidePanel.module.scss'

export const ThemeToggle = () => {
	const theme = useTheme()
	const toggleTheme = useThemeToggle()

	return (
		<button className={styles.themeToggle} onClick={toggleTheme}>
			<div
				className={styles.themeIcon}
				style={
					{
						'--position': theme === 'light' ? '-1.25rem' : '1.25rem'
					} as React.CSSProperties
				}
			>
				<Icons.MoonIcon />
				<Icons.SunIcon />
			</div>
		</button>
	)
}
