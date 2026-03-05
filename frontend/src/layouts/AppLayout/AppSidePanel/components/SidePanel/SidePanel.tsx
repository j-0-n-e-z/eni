import { type ReactNode } from 'react'

import { MenuBurgerButton } from '../MenuBurgerButton'

import styles from '../../SidePanel.module.scss'

interface SidePanelProps {
	children: ReactNode
}

export const SidePanel = ({ children }: SidePanelProps) => (
	<>
		<MenuBurgerButton />
		<aside aria-label='main navigation' className={styles.sidepanel}>
			{children}
		</aside>
	</>
)
