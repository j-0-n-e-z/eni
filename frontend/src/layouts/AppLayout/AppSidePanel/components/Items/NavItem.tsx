import cn from 'classnames'
import React, { type ReactNode } from 'react'
import { NavLink } from 'react-router-dom'

import { useAuthData } from '@/hooks'
import { useGetWordsByUserIdQuery } from '@/store/api'

import styles from '../../SidePanel.module.scss'

interface NavItemProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
	to: string
	icon: ReactNode
	text: string
	isWordsItem?: boolean
	isToMe?: boolean
}

export const NavItem = ({
	to,
	icon,
	text,
	isToMe = false,
	isWordsItem = false,
	className,
	...props
}: NavItemProps) => {
	const { me } = useAuthData()
	const { data: savedWords } = useGetWordsByUserIdQuery(me?.id ?? '', {
		skip: !isWordsItem || !me?.id
	})

	if (isToMe && !me) return null

	return (
		<li>
			<NavLink
				aria-label={props['aria-label']}
				to={isToMe && me ? `${to}/${me.username}` : to}
				className={({ isActive }) =>
					cn(styles.navLink, className, {
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
