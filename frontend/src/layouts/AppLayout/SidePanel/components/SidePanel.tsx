import { MenuBurgerButton } from './MenuBurgerButton'

import styles from './SidePanel.module.scss'

interface SidePanelProps {
	children: React.ReactNode
}

export const SidePanel = ({ children }: SidePanelProps) => (
	<>
		<MenuBurgerButton />
		<aside className={styles.sidepanel}>{children}</aside>
	</>
)
