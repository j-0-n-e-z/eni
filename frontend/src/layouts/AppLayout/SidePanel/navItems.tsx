import { Icons } from '@/ui'

import styles from './SidePanel.module.scss'



export const NAV_ITEMS = [
	{
		to: '/search',
		text: 'Search',
		ariaLabel: 'search movies',
		icon: <Icons.SearchIcon className={styles.searchIcon} />
	},
	{
		to: '/user',
		text: 'Words',
		ariaLabel: 'profile with words',
		icon: <Icons.BookIcon className={styles.bookIcon} />,
		authorizedOnly: true,
		isToMe: true,
		isWordsItem: true,
		className: styles.words
	},
	{
		to: '/popular',
		text: 'Popular',
		ariaLabel: 'popular words',
		icon: <Icons.PopularIcon className={styles.popularIcon} />
	},
	{
		to: '/settings',
		text: 'Settings',
		ariaLabel: 'settings',
		icon: <Icons.SettingsIcon />,
		authorizedOnly: true
	}
]