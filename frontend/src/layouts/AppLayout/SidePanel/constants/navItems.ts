import type { Icons } from '@/ui'

export type IconName = keyof typeof Icons

export interface NavItemConfig {
	to: string
	iconName: IconName
	text: string
	authorizedOnly?: boolean
	isWordsItem?: boolean
	ariaLabel: string
}

export const NAV_ITEMS: readonly NavItemConfig[] = [
	{
		ariaLabel: 'search movies',
		iconName: 'Search',
		text: 'Search',
		to: '/search'
	},
	{
		ariaLabel: 'profile with words',
		authorizedOnly: true,
		iconName: 'Book',
		isWordsItem: true,
		text: 'Words',
		to: '/user'
	},
	{
		ariaLabel: 'popular words',
		iconName: 'Popular',
		text: 'Popular',
		to: '/popular'
	},
	{
		ariaLabel: 'settings',
		authorizedOnly: true,
		iconName: 'Settings',
		text: 'Settings',
		to: '/settings'
	}
]
