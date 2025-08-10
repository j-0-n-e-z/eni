import cn from 'classnames'
import { Link, useNavigate } from 'react-router-dom'

import { useLogoutMutation } from '@/api'
import { useAppSelector } from '@/app/index'
import { useAuth } from '@/hooks'
import {
	BookIcon,
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
	const [logout] = useLogoutMutation()
	const navigate = useNavigate()
	const { me, isLoading, isAuthenticated } = useAuth()

	async function handleLogout() {
		await logout()
		navigate('/login')
	}

	if (isLoading) return <div>User is loading</div>

	return (
		<aside className={styles.sidepanel}>
			<nav className={cn(styles.navigation)}>
				<ul className={styles.navList}>
					<li>
						<Link aria-label='search' className={styles.topWrapper} to='/'>
							<img
								alt='eni logo'
								className={styles.logo}
								src='/assets/images/eni_huge_logo.webp'
							/>

							<div className={styles.topTitle}>Eni</div>
						</Link>
					</li>

					<li>
						<Link aria-label='search' className={styles.navLink} to='/search'>
							<SearchIcon className={styles.searchIcon} />
							<span className={styles.navLinkText}>Search</span>
						</Link>
					</li>

					{isAuthenticated && (
						<li>
							<Link
								aria-label='profile with words'
								className={cn(styles.navLink, styles.words)}
								to={`/user/${me!.username}`}
							>
								<BookIcon className={styles.bookIcon} />
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
							className={styles.navLink}
							to='/popular'
						>
							<PopularIcon className={styles.popularIcon} />
							<span className={styles.navLinkText}>Popular</span>
						</Link>
					</li>

					{isAuthenticated && (
						<li>
							<Link
								aria-label='settings'
								className={styles.navLink}
								to='/settings'
							>
								<SettingsIcon className={styles.settingsIcon} />
								<span className={styles.navLinkText}>Settings</span>
							</Link>
						</li>
					)}

					<li>
						<Link aria-label='app info' className={styles.navLink} to='/info'>
							<InfoIcon className={styles.infoIcon} />
							<span className={styles.navLinkText}>Info</span>
						</Link>
					</li>

					<li>
						{isAuthenticated ? (
							<button
								aria-label='logout'
								className={cn(styles.navLink, styles.login)}
								onClick={handleLogout}
							>
								<LoginIcon className={styles.logoutIcon} />
								<span className={styles.navLinkText}>Logout</span>
							</button>
						) : (
							<Link aria-label='login' className={styles.navLink} to='/login'>
								<LoginIcon className={styles.loginIcon} />
								<span className={styles.navLinkText}>Login</span>
							</Link>
						)}
					</li>
				</ul>
			</nav>
		</aside>
	)
}
