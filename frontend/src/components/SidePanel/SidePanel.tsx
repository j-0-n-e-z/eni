import { type ReactNode } from 'react'

import { useSidePanelContext } from '@/hooks'

import { MenuBurgerButton } from './MenuBurgerButton'
import styles from './SidePanel.module.scss'
import { SidePanelSkeleton } from './SidePanelSkeleton'
import { AuthorizedItem } from './components/AuthorizedItem'
import { BottomNavigation } from './components/BottomNavigation'
import { NavItem } from './components/NavItem'
import { Navigation } from './components/Navigation'
import { TopArea } from './components/TopArea'

interface SidePanelProps {
	children: ReactNode
}

export const SidePanel = ({ children }: SidePanelProps) => {
	const { isMeFetching } = useSidePanelContext()

	if (isMeFetching) return <SidePanelSkeleton />

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
