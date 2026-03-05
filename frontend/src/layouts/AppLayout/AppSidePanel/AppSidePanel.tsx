import cn from 'classnames'

import { useAuthData } from '@/hooks'
import { Icons } from '@/ui'

import {
	AuthorizedItem,
	BottomNavigation,
	Navigation,
	NavItem,
	SidePanel,
	SidePanelSkeleton,
	ThemeToggle,
	TopArea
} from './components'
import { NAV_ITEMS } from './constants/navItems'

import styles from './SidePanel.module.scss'

const Logo = () => (
	<>
		<Icons.BrainIcon className={cn(styles.bookIcon, styles.topLogo)} />
		<div className={styles.topTitle}>Eni</div>
	</>
)

const NavItemsList = () => (
	<>
		{NAV_ITEMS.map((config) => {
			const navItem = <NavItem key={config.to} config={config} />

			return config.authorizedOnly ? (
				<AuthorizedItem key={config.to}>{navItem}</AuthorizedItem>
			) : (
				navItem
			)
		})}
	</>
)

export const AppSidePanel = () => {
	const { isMeFetching } = useAuthData()

	if (isMeFetching) return <SidePanelSkeleton />

	return (
		<SidePanel>
			<TopArea>
				<Logo />
			</TopArea>

			<Navigation>
				<NavItemsList />
			</Navigation>

			<BottomNavigation />

			<ThemeToggle />
		</SidePanel>
	)
}
