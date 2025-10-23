import { type ReactNode } from 'react'

import { useAuthData } from '@/hooks'
import { Skeleton } from '@/ui'

import { MenuBurgerButton } from './MenuBurgerButton'
import styles from './SidePanel.module.scss'
import { AuthorizedItem } from './components/AuthorizedItem'
import { BottomNavigation } from './components/BottomNavigation'
import { NavItem } from './components/NavItem'
import { Navigation } from './components/Navigation'
import { ThemeToggle } from './components/ThemeToggle'
import { TopArea } from './components/TopArea'

interface SidePanelProps {
	children: ReactNode
}

export const SidePanel = ({ children }: SidePanelProps) => {
	const { isMeFetching } = useAuthData()

	if (isMeFetching)
		return (
			<aside className={styles.sidepanel}>
				<Skeleton containerClassName='flex1' height='100%' variant='dark' />
			</aside>
		)

	return (
		<>
			<MenuBurgerButton />
			<aside className={styles.sidepanel}>{children}</aside>
		</>
	)
}

SidePanel.TopArea = TopArea
SidePanel.Navigation = Navigation
SidePanel.NavItem = NavItem
SidePanel.BottomNavigation = BottomNavigation
SidePanel.AuthorizedItem = AuthorizedItem
SidePanel.ThemeToggle = ThemeToggle
