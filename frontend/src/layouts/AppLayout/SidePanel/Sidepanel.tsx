import cn from 'classnames'
import type { ReactNode } from 'react'

import { useAuthData } from '@/hooks'
import { Icons } from '@/ui'

import { SidePanelSkeleton } from './SidePanelSkeleton'
import { AuthorizedItem } from './components/AuthorizedItem'
import { BottomNavigation } from './components/BottomNavigation'
import { MenuBurgerButton } from './components/MenuBurgerButton'
import { NavItem } from './components/NavItem'
import { Navigation } from './components/Navigation'
import { ThemeToggle } from './components/ThemeToggle'
import { TopArea } from './components/TopArea'
import { NAV_ITEMS } from './constants/navItems'

import styles from './SidePanel.module.scss'

interface SidePanelProps {
	children: ReactNode
}

const SidePanel = ({ children }: SidePanelProps) => (
	<>
		<MenuBurgerButton />
		<aside className={styles.sidepanel}>{children}</aside>
	</>
)

SidePanel.TopArea = TopArea
SidePanel.Navigation = Navigation
SidePanel.NavItem = NavItem
SidePanel.BottomNavigation = BottomNavigation
SidePanel.AuthorizedItem = AuthorizedItem
SidePanel.ThemeToggle = ThemeToggle

export const AppSidePanel = () => {
	const { isMeFetching } = useAuthData()

	if (isMeFetching) return <SidePanelSkeleton />

	return (
		<SidePanel>
			<SidePanel.TopArea>
				<Icons.BrainIcon className={cn(styles.bookIcon, styles.topLogo)} />
				<div className={styles.topTitle}>Eni</div>
			</SidePanel.TopArea>

			<SidePanel.Navigation>
				{NAV_ITEMS.map((props) => {
					const navItem = <SidePanel.NavItem {...props} key={props.to} />

					return props.authorizedOnly ? (
						<SidePanel.AuthorizedItem key={props.to}>
							{navItem}
						</SidePanel.AuthorizedItem>
					) : (
						navItem
					)
				})}
			</SidePanel.Navigation>

			<SidePanel.BottomNavigation />

			<SidePanel.ThemeToggle />
		</SidePanel>
	)
}
