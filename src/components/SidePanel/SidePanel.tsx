import cn from 'classnames'

import { useLogoutMutation } from '@/api'
import { useAppSelector } from '@/app/index'
import { useAuth } from '@/hooks'
import { selectWords } from '@/slices'

import styles from './SidePanel.module.scss'

export const SidePanel = () => {
	const { words } = useAppSelector(selectWords)
	const [logout] = useLogoutMutation()
	const { isLoading, user, isAuthenticated } = useAuth()

	async function handleLogout() {
		await logout()
		window.location.href = '/login'
	}

	if (isLoading) return <div>User is loading</div>

	return (
		<aside className={styles.sidepanel}>
			<a className={styles.topLogo} href='/' target='_self'>
				<img
					alt='logo'
					className={styles.logo}
					src='/assets/images/eni_huge_logo.webp'
				/>
			</a>
			<nav className={styles.navigation}>
				<a className={styles.navItem} href='/'>
					search
				</a>

				<a className={styles.navItem} href='/popular' target='_self'>
					popular
				</a>

				{isAuthenticated && (
					<>
						<a
							className={cn(styles.navItem, styles.words)}
							href={`/user/${user!.username}`}
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
