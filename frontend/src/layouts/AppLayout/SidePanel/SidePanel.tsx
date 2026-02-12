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

export const AppSidePanel = () => {
	const { isMeFetching } = useAuthData()

	if (isMeFetching) return <SidePanelSkeleton />

	return (
		<SidePanel>
			<TopArea>
				<Icons.BrainIcon className={cn(styles.bookIcon, styles.topLogo)} />
				<div className={styles.topTitle}>Eni</div>
			</TopArea>

			<Navigation>
				{NAV_ITEMS.map((props) => {
					const navItem = <NavItem {...props} key={props.to} />

					return props.authorizedOnly ? (
						<AuthorizedItem key={props.to}>
							{navItem}
						</AuthorizedItem>
					) : (
						navItem
					)
				})}
			</Navigation>

			<BottomNavigation />

			<ThemeToggle />
		</SidePanel>
	)
}
