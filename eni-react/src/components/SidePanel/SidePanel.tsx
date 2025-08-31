import cn from 'classnames'
import { Link, useLocation } from 'react-router-dom'

import { useAppSelector } from '@/app/index'
import {
	BookIcon,
	BrainIcon,
	InfoIcon,
	LoginIcon,
	PopularIcon,
	SearchIcon,
	SettingsIcon
} from '@/icons'
import { selectLearningWords } from '@/store'
import { useGetMeQuery, useLogoutMutation } from '@/store/api'

import styles from './SidePanel.module.scss'

export const SidePanel = () => {
	const learningWords = useAppSelector(selectLearningWords)
	const { data: me, isLoading: isMeLoading } = useGetMeQuery()
	const [
		logout,
		{ isLoading: isLogoutLoading, isError: isLogoutError, error }
	] = useLogoutMutation()
	const location = useLocation()

	const setActiveIf = (path: string) => ({
		[styles.active]: location.pathname === path
	})

	if (isMeLoading)
		return (
			<div style={{ position: 'fixed', top: 0, left: 0 }}>
				SidePanel Loading...
			</div>
		)
	if (isLogoutLoading) return <div>Loggin out...</div>
	if (isLogoutError)
		return <div>Could not log out: {JSON.stringify(error)}</div>

	return (
		<aside className={styles.sidepanel}>
			<Link aria-label='hero' className={styles.topArea} to='/'>
				<BrainIcon className={cn(styles.bookIcon, styles.topLogo)} />
				<div className={styles.topTitle}>Eni</div>
			</Link>
			<nav className={cn(styles.navigation)}>
				<ul className={styles.navList}>
					<li>
						<Link
							aria-label='search'
							className={cn(styles.navLink, setActiveIf('/search'))}
							to='/search'
						>
							<SearchIcon className={styles.searchIcon} />
							<span className={styles.navLinkText}>Search</span>
						</Link>
					</li>

					{me && (
						<li>
							<Link
								aria-label='profile with words'
								to={`/user/${me.username}`}
								className={cn(
									styles.navLink,
									styles.words,
									setActiveIf(`/user/${me.username.replaceAll(' ', '%20')}`)
								)}
							>
								<BookIcon className={styles.bookIcon} />
								<span className={styles.navLinkText}>Words</span>
								{learningWords.length > 0 && (
									<div className={styles.wordsCount}>
										{learningWords.length}
									</div>
								)}
							</Link>
						</li>
					)}

					<li>
						<Link
							aria-label='popular words'
							className={cn(styles.navLink, setActiveIf('/popular'))}
							to='/popular'
						>
							<PopularIcon className={styles.popularIcon} />
							<span className={styles.navLinkText}>Popular</span>
						</Link>
					</li>

					{me && (
						<li>
							<Link
								aria-label='settings'
								className={cn(styles.navLink, setActiveIf('/settings'))}
								to='/settings'
							>
								<SettingsIcon />
								<span className={styles.navLinkText}>Settings</span>
							</Link>
						</li>
					)}

					<li>
						<Link
							aria-label='app info'
							className={cn(styles.navLink, setActiveIf('/info'))}
							to='/info'
						>
							<InfoIcon />
							<span className={styles.navLinkText}>Info</span>
						</Link>
					</li>
				</ul>
			</nav>

			<div className={styles.bottomNavigation}>
				{me ? (
					<button
						aria-label='logout'
						className={styles.login}
						onClick={() => logout()}
					>
						<LoginIcon className={styles.logoutIcon} />
						<span className={styles.loginText}>Logout</span>
					</button>
				) : (
					<Link
						aria-label='login'
						className={cn(styles.login, setActiveIf('/login'))}
						to='/login'
					>
						<LoginIcon className={styles.loginIcon} />
						<span className={styles.loginText}>Login</span>
					</Link>
				)}
			</div>
		</aside>
	)
}
