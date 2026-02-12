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
						<AuthorizedItem key={props.to}>{navItem}</AuthorizedItem>
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
