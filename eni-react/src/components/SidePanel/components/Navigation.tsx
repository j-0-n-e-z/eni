import type { ReactNode } from 'react'

import styles from '../SidePanel.module.scss'

interface NavigationProps {
	children: ReactNode
}

export const Navigation = ({ children }: NavigationProps) => (
	<nav className={styles.navigation}>
		<ul className={styles.navList}>{children}</ul>
	</nav>
)
