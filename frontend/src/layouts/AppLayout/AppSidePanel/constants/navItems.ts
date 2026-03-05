import type { Icons } from '@/ui'

export type IconName = keyof typeof Icons

export interface NavItemConfig {
	to: string
	iconName: IconName
	text: string
	authorizedOnly?: boolean
	isWordsItem?: boolean
	'aria-label': string
}

export const NAV_ITEMS: readonly NavItemConfig[] = [
	{
		'aria-label': 'search movies',
		iconName: 'SearchIcon',
		text: 'Search',
		to: '/search'
	},
	{
		'aria-label': 'profile with words',
		authorizedOnly: true,
		iconName: 'BookIcon',
		isWordsItem: true,
		text: 'Words',
		to: '/user'
	},
	{
		'aria-label': 'popular words',
		iconName: 'PopularIcon',
		text: 'Popular',
		to: '/popular'
	},
	{
		'aria-label': 'settings',
		authorizedOnly: true,
		iconName: 'SettingsIcon',
		text: 'Settings',
		to: '/settings'
	}
]
