import { Icons } from '@/ui'

import styles from '../SidePanel.module.scss'

export const NAV_ITEMS = [
	{
		ariaLabel: 'search movies',
		icon: <Icons.SearchIcon className={styles.searchIcon} />,
		text: 'Search',
		to: '/search'
	},
	{
		ariaLabel: 'profile with words',
		authorizedOnly: true,
		className: styles.words,
		icon: <Icons.BookIcon className={styles.bookIcon} />,
		isToMe: true,
		isWordsItem: true,
		text: 'Words',
		to: '/user'
	},
	{
		ariaLabel: 'popular words',
		icon: <Icons.PopularIcon className={styles.popularIcon} />,
		text: 'Popular',
		to: '/popular'
	},
	{
		ariaLabel: 'settings',
		authorizedOnly: true,
		icon: <Icons.SettingsIcon />,
		text: 'Settings',
		to: '/settings'
	}
]
