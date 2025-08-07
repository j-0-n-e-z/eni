import cn from 'classnames'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useLogoutMutation } from '@/api'
import { useAppSelector } from '@/app/index'
import { useAuth } from '@/hooks'
import { selectWords } from '@/slices'

import styles from './SidePanel.module.scss'

export const SidePanel = () => {
	const { words } = useAppSelector(selectWords)
	const [logout] = useLogoutMutation()
	const navigate = useNavigate()
	const { isLoading, me, isAuthenticated } = useAuth()
	const [isOpened, setIsOpened] = useState(false)

	async function handleLogout() {
		await logout()
		navigate('/login')
	}

	if (isLoading) return <div>User is loading</div>

	return (
		<aside
			className={cn(styles.sidepanel, {
				[styles.sidepanelCollapsed]: !isOpened
			})}
		>
			<a className={styles.topLogo} href='/' target='_self'>
				<img
					alt='logo'
					className={styles.logo}
					src='/assets/images/eni_huge_logo.webp'
				/>
			</a>

			<button className={styles.toggle} onClick={() => setIsOpened((p) => !p)}>
				{isOpened ? '<' : '>'}
			</button>

			<nav className={styles.navigation}>
				<a className={styles.navItem} href='/'>
					<img alt='search' className={styles.searchLogo} src='/assets/icons/icon-search.svg' />
					{isOpened && <span>search</span>}
				</a>

				<a className={styles.navItem} href='/popular' target='_self'>
					popular
				</a>

				{isAuthenticated && (
					<>
						<a
							className={cn(styles.navItem, styles.words)}
							href={`/user/${me!.username}`}
						>
							<span>W</span>
							{words.length > 0 && (
								<div className={styles.wordsCountWrapper}>
									<div className={styles.wordsCount}>{words.length}</div>
								</div>
							)}
						</a>
						<a className={styles.navItem} href='/settings'>
							settings
						</a>
					</>
				)}

				<a className={styles.navItem} href='/info'>
					info
				</a>

				{isAuthenticated ? (
					<button
						className={cn(styles.navItem, styles.logout)}
						onClick={handleLogout}
					>
						logout
					</button>
				) : (
					<a className={cn(styles.navItem, styles.logout)} href='/login'>
						login
					</a>
				)}
			</nav>
		</aside>
	)
}
