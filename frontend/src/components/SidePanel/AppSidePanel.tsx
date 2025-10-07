import cn from 'classnames'

import { SidePanelContextProvider } from '@/contexts'
import { useThemeContext } from '@/hooks'
import {
	BookIcon,
	BrainIcon,
	InfoIcon,
	PopularIcon,
	SearchIcon,
	SettingsIcon
} from '@/icons'

import { SidePanel } from './SidePanel'
import styles from './SidePanel.module.scss'

export const AppSidePanel = () => {
	const { toggleTheme } = useThemeContext()

	return (
		<SidePanelContextProvider>
			<button onClick={toggleTheme}>CHANGE THEME</button>
			<SidePanel>
				<SidePanel.TopArea>
					<BrainIcon className={cn(styles.bookIcon, styles.topLogo)} />
					<div className={styles.topTitle}>Eni</div>
				</SidePanel.TopArea>

				<SidePanel.Navigation>
					<SidePanel.NavItem
						ariaLabel='search movies'
						icon={<SearchIcon className={styles.searchIcon} />}
						text='Search'
						to='/search'
					/>

					<SidePanel.AuthorizedItem>
						<SidePanel.NavItem
							isToUserPath
							isWords
							ariaLabel='profile with words'
							customClassName={styles.words}
							icon={<BookIcon className={styles.bookIcon} />}
							text='Words'
							to='/user'
						/>
					</SidePanel.AuthorizedItem>

					<SidePanel.NavItem
						ariaLabel='popular words'
						icon={<PopularIcon className={styles.popularIcon} />}
						text='Popular'
						to='/popular'
					/>

					<SidePanel.AuthorizedItem>
						<SidePanel.NavItem
							ariaLabel='settings'
							icon={<SettingsIcon />}
							text='Settings'
							to='/settings'
						/>
					</SidePanel.AuthorizedItem>

					<SidePanel.NavItem
						ariaLabel='app info'
						icon={<InfoIcon />}
						text='Info'
						to='/info'
					/>
				</SidePanel.Navigation>

				<SidePanel.BottomNavigation />
			</SidePanel>
		</SidePanelContextProvider>
	)
}
