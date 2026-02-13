import styles from '../../SidePanel.module.scss'
import { MenuBurgerButton } from '../MenuBurgerButton'

interface SidePanelProps {
	children: React.ReactNode
}

export const SidePanel = ({ children }: SidePanelProps) => (
	<>
		<MenuBurgerButton />
		<aside className={styles.sidepanel}>{children}</aside>
	</>
)
