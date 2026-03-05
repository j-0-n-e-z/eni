import cn from 'classnames'
import { NavLink, type NavLinkProps } from 'react-router-dom'

import { useAuthData } from '@/hooks'
import { useGetWordsByUserIdQuery } from '@/store/api'
import { Icons } from '@/ui'

import type { NavItemConfig } from '../../constants/navItems'

import styles from '../../SidePanel.module.scss'

interface NavItemProps extends Omit<NavLinkProps, 'children' | 'to'> {
	config: NavItemConfig
}

export const NavItem = ({ config, ...props }: NavItemProps) => {
	const { to, iconName, text, isWordsItem = false } = config
	const { me } = useAuthData()
	const { data: savedWords } = useGetWordsByUserIdQuery(me?.id ?? '', {
		skip: !isWordsItem || !me?.id
	})

	if (isWordsItem && !me) return null

	const IconComponent = Icons[iconName]
	const resolvedPath = isWordsItem && me ? `${to}/${me.username}` : to
	const hasWordsCount = isWordsItem && savedWords && savedWords.length > 0

	return (
		<li>
			<NavLink
				to={resolvedPath}
				className={({ isActive }) =>
					cn(styles.navLink, {
						[styles.active]: isActive,
						[styles.words]: isWordsItem
					})
				}
				{...props}
			>
				<IconComponent />

				<span className={styles.navLinkText}>{text}</span>

				{hasWordsCount && (
					<div className={styles.wordsCount}>{savedWords.length}</div>
				)}
			</NavLink>
		</li>
	)
}
