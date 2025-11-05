import cn from 'classnames'
import { type ReactNode } from 'react'

import { useAuthData } from '@/hooks'
import { Icons, Skeleton } from '@/ui'

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

const SidePanel = ({ children }: SidePanelProps) => {
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

export const AppSidePanel = () => (
	<SidePanel>
		<SidePanel.TopArea>
			<Icons.BrainIcon className={cn(styles.bookIcon, styles.topLogo)} />
			<div className={styles.topTitle}>Eni</div>
		</SidePanel.TopArea>

		<SidePanel.Navigation>
			<SidePanel.NavItem
				ariaLabel='search movies'
				icon={<Icons.SearchIcon className={styles.searchIcon} />}
				text='Search'
				to='/search'
			/>

			<SidePanel.AuthorizedItem>
				<SidePanel.NavItem
					isToUserPath
					showWordsCount
					ariaLabel='profile with words'
					customClassName={styles.words}
					icon={<Icons.BookIcon className={styles.bookIcon} />}
					text='Words'
					to='/user'
				/>
			</SidePanel.AuthorizedItem>

			<SidePanel.NavItem
				ariaLabel='popular words'
				icon={<Icons.PopularIcon className={styles.popularIcon} />}
				text='Popular'
				to='/popular'
			/>

			<SidePanel.AuthorizedItem>
				<SidePanel.NavItem
					ariaLabel='settings'
					icon={<Icons.SettingsIcon />}
					text='Settings'
					to='/settings'
				/>
			</SidePanel.AuthorizedItem>
		</SidePanel.Navigation>

		<SidePanel.BottomNavigation />

		<SidePanel.ThemeToggle />
	</SidePanel>
)
