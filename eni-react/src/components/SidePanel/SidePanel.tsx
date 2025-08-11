import cn from 'classnames'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

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

	useEffect(() => {
		if (isLogoutSuccess) {
			navigate('/login')
		}
	}, [isLogoutLoading])

	if (isMeLoading) return <div>Loading...</div>
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
						<Link aria-label='search' className={styles.navLink} to='/search'>
							<SearchIcon className={styles.searchIcon} />
							<span className={styles.navLinkText}>Search</span>
						</Link>
					</li>

					{me && (
						<li>
							<Link
								aria-label='profile with words'
								className={cn(styles.navLink, styles.words)}
								to={`/user/${me.username}`}
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
							className={styles.navLink}
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
				</ul>
			</nav>

			<div className={styles.loginWrapper}>
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
					<Link aria-label='login' className={styles.login} to='/login'>
						<LoginIcon className={styles.loginIcon} />
						<span className={styles.loginText}>Login</span>
					</Link>
				)}
			</div>
		</aside>
	)
}
