import { useTheme, useThemeToggle } from '@/hooks'
import { Icons } from '@/ui'

import styles from '../SidePanel.module.scss'

interface ThemeIconProps {
	position: string
}

const ThemeIcon = ({ position }: ThemeIconProps) => (
	<div
		className={styles.themeIcon}
		style={
			{
				'--position': position
			} as React.CSSProperties
		}
	>
		<Icons.Moon />
		<Icons.Sun />
	</div>
)

export const ThemeToggle = () => {
	const theme = useTheme()
	const toggleTheme = useThemeToggle()

	const position = theme === 'light' ? '-1.25rem' : '1.25rem'

	return (
		<button
			aria-label='toggle theme'
			className={styles.themeToggle}
			type='button'
			onClick={toggleTheme}
		>
			<ThemeIcon position={position} />
		</button>
	)
}
