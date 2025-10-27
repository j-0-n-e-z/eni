import { useTheme, useThemeToggle } from '@/hooks'
import { MoonIcon, SunIcon } from '@/ui'

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
				<MoonIcon />
				<SunIcon />
			</div>
		</button>
	)
}
