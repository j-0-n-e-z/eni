import cn from 'classnames'
import { Link } from 'react-router-dom'

import { useAuthData } from '@/hooks'
import { Icons } from '@/ui'

import {
	AuthorizedItem,
	BottomNavigation,
	MenuBurgerButton,
	NavItem,
	Navigation,
	ThemeToggle
} from './components'
import { NAV_ITEMS } from './constants/navItems'
import { SidePanelSkeleton } from './SidePanelSkeleton'

import styles from './SidePanel.module.scss'

const TopArea = () => (
	<Link aria-label='hero' className={styles.topArea} to='/'>
		<Icons.Brain className={cn(styles.bookIcon, styles.topLogo)} />
		<div className={styles.topTitle}>Eni</div>
	</Link>
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

export const SidePanel = () => {
	const { isMeFetching } = useAuthData()

	if (isMeFetching) return <SidePanelSkeleton />

	return (
		<>
			<MenuBurgerButton />

			<aside aria-label='main navigation' className={styles.sidepanel}>
				<TopArea />

				<Navigation>
					<NavItemsList />
				</Navigation>

				<BottomNavigation />

				<ThemeToggle />
			</aside>
		</>
	)
}
