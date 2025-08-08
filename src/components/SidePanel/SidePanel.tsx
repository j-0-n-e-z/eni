import cn from 'classnames'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useLogoutMutation } from '@/api'
import { useAppSelector } from '@/app/index'
import { useAuth } from '@/hooks'
import {
	ArrowIcon,
	BookIcon,
	InfoIcon,
	LoginIcon,
	PopularIcon,
	SearchIcon,
	SettingsIcon
} from '@/icons'
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
				[styles.collapsed]: !isOpened
			})}
		>
			<Link className={styles.logoWrapper} to='/'>
				<div className={styles.topLogo}>
					<img
						alt='logo'
						className={styles.logo}
						src='/assets/images/eni_huge_logo.webp'
					/>
				</div>
				{isOpened && <h1 className={styles.topTitle}>Eni</h1>}
			</Link>

			<button className={styles.toggle} onClick={() => setIsOpened((p) => !p)}>
				<ArrowIcon className={styles.toggleIcon} />
			</button>

			<nav className={cn(styles.navigation)}>
				<Link className={styles.navItem} to='/'>
					<SearchIcon className={styles.searchIcon} />
					{isOpened && <span>Search</span>}
				</Link>

				{isAuthenticated && (
					<Link
						className={cn(styles.navItem, styles.words)}
						to={`/user/${me!.username}`}
					>
						<BookIcon className={styles.bookIcon} />
						{isOpened && <span>Words</span>}
						{words.length > 0 && (
							<div className={styles.wordsCountWrapper}>
								<div className={styles.wordsCount}>{words.length}</div>
							</div>
						)}
					</Link>
				)}

				<Link className={styles.navItem} to='/popular'>
					<PopularIcon className={styles.popularIcon} />
					{isOpened && <span>Popular</span>}
				</Link>

				{isAuthenticated && (
					<Link className={styles.navItem} to='/settings'>
						<SettingsIcon className={styles.settingsIcon} />
						{isOpened && <span>Settings</span>}
					</Link>
				)}

				<Link className={styles.navItem} to='/info'>
					<InfoIcon className={styles.infoIcon} />
					{isOpened && <span>Info</span>}
				</Link>

				{isAuthenticated ? (
					<button
						className={cn(styles.navItem, styles.login)}
						onClick={handleLogout}
					>
						<LoginIcon className={styles.logoutIcon} />
						{isOpened && <span>Logout</span>}
					</button>
				) : (
					<Link className={cn(styles.navItem, styles.login)} to='/login'>
						<LoginIcon className={styles.loginIcon} />
						{isOpened && <span>Login</span>}
					</Link>
				)}
			</nav>
		</aside>
	)
}
