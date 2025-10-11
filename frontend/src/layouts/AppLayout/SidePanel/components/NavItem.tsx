import cn from 'classnames'
import { type ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { useAuthData } from '@/hooks'
import { useGetWordsByUserIdQuery } from '@/store/api'

import styles from '../SidePanel.module.scss'

interface NavItemProps {
	to: string
	icon: ReactNode
	text: string
	ariaLabel: string
	showWordsCount?: boolean
	isToUserPath?: boolean
	customClassName?: string
}

export const NavItem = ({
	to,
	icon,
	text,
	ariaLabel,
	isToUserPath = false,
	showWordsCount: isWords = false,
	customClassName
}: NavItemProps) => {
	const { me } = useAuthData()
	const location = useLocation()
	const { data: savedWords } = useGetWordsByUserIdQuery(me?.id ?? '', {
		skip: !isWords || !me?.id
	})

	const setActiveIf = (path: string) => ({
		[styles.active]: location.pathname === path
	})

	if (isToUserPath && !me) return null

	const finalTo = isToUserPath && me ? `${to}/${me.username}` : to

	return (
		<li>
			<Link
				aria-label={ariaLabel}
				className={cn(styles.navLink, customClassName, setActiveIf(finalTo))}
				to={finalTo}
			>
				{icon}
				<span className={styles.navLinkText}>{text}</span>
				{isWords && savedWords && savedWords.length > 0 && (
					<div className={styles.wordsCount}>{savedWords.length}</div>
				)}
			</Link>
		</li>
	)
}
