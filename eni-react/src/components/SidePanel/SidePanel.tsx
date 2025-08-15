import cn from 'classnames'
import { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import { useGetMeQuery, useLogoutMutation } from '@/api'
import { useAppSelector } from '@/app/index'
import {
	BrainIcon,
	InfoIcon,
	LoginIcon,
	PopularIcon,
	SearchIcon,
	SettingsIcon
} from '@/icons'
import { selectWords } from '@/store'

import styles from './SidePanel.module.scss'

export const SidePanel = () => {
	const { words } = useAppSelector(selectWords)
	const { data: me, isLoading: isMeLoading } = useGetMeQuery(null)
	const [
		logout,
		{
			isLoading: isLogoutLoading,
			isSuccess: isLogoutSuccess,
			isError: isLogoutError,
			error
		}
	] = useLogoutMutation()
	const navigate = useNavigate()
	const location = useLocation()

	useEffect(() => {
		if (isLogoutSuccess) {
			navigate('/login')
		}
	}, [isLogoutLoading])

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
			<div className={styles.topArea}>
				<Link aria-label='search' className={styles.topWrapper} to='/'>
					<BrainIcon className={cn(styles.bookIcon, styles.topLogo)} />
					<div className={styles.topTitle}>Eni</div>
				</Link>
			</div>
			<nav className={cn(styles.navigation)}>
				<ul className={styles.navList}>
					<li>
						<Link
							aria-label='search'
							to='/search'
							className={cn(styles.navLink, {
								[styles.active]: location.pathname === '/search'
							})}
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
								className={cn(styles.navLink, styles.words, {
									[styles.active]:
										location.pathname ===
										`/user/${me.username.replace(' ', '%20')}`
								})}
							>
								<BrainIcon className={styles.bookIcon} />
								<span className={styles.navLinkText}>Words</span>
								{words.length > 0 && (
									<div className={styles.wordsCount}>{words.length}</div>
								)}
							</Link>
						</li>
					)}

					<li>
						<Link
							aria-label='popular words'
							to='/popular'
							className={cn(styles.navLink, {
								[styles.active]: location.pathname === '/popular'
							})}
						>
							<PopularIcon className={styles.popularIcon} />
							<span className={styles.navLinkText}>Popular</span>
						</Link>
					</li>

					{me && (
						<li>
							<Link
								aria-label='settings'
								to='/settings'
								className={cn(styles.navLink, {
									[styles.active]: location.pathname === '/settings'
								})}
							>
								<SettingsIcon className={styles.settingsIcon} />
								<span className={styles.navLinkText}>Settings</span>
							</Link>
						</li>
					)}

					<li>
						<Link
							aria-label='app info'
							to='/info'
							className={cn(styles.navLink, {
								[styles.active]: location.pathname === '/info'
							})}
						>
							<InfoIcon className={styles.infoIcon} />
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
						to='/login'
						className={cn(styles.login, {
							[styles.active]: location.pathname === '/login'
						})}
					>
						<LoginIcon className={styles.loginIcon} />
						<span className={styles.loginText}>Login</span>
					</Link>
				)}
			</div>
		</aside>
	)
}
