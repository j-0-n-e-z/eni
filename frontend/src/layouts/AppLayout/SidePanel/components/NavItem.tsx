import cn from 'classnames'
import React, { type ReactNode } from 'react'
import { NavLink } from 'react-router-dom'

import { useAuthData } from '@/hooks'
import { useGetWordsByUserIdQuery } from '@/store/api'

import styles from '../SidePanel.module.scss'

interface NavItemProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
	to: string
	icon: ReactNode
	text: string
	isWordsItem?: boolean
	isToUserPath?: boolean
	customClassName?: string
}

export const NavItem = ({
	to,
	icon,
	text,
	isToUserPath = false,
	isWordsItem = false,
	customClassName,
	...props
}: NavItemProps) => {
	const { me } = useAuthData()
	const { data: savedWords } = useGetWordsByUserIdQuery(me?.id ?? '', {
		skip: !isWordsItem || !me?.id
	})

	if (isToUserPath && !me) return null

	const finalTo = isToUserPath && me ? `${to}/${me.username}` : to

	return (
		<li>
			<NavLink
				aria-label={props['aria-label']}
				to={finalTo}
				className={({ isActive }) =>
					cn(styles.navLink, customClassName, {
						[styles.active]: isActive
					})
				}
			>
				{icon}
				<span className={styles.navLinkText}>{text}</span>
				{isWordsItem && savedWords && savedWords.length > 0 && (
					<div className={styles.wordsCount}>{savedWords.length}</div>
				)}
			</NavLink>
		</li>
	)
}
