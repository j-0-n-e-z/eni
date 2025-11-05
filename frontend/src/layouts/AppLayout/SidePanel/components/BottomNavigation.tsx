import cn from 'classnames'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { Link, useLocation } from 'react-router-dom'

import { useAuthActions, useAuthData } from '@/hooks'
import { Icons } from '@/ui'
import { getErrorMessage } from '@/utils'

import styles from '../SidePanel.module.scss'

export const BottomNavigation = () => {
	const location = useLocation()
	const { me, logoutError } = useAuthData()
	const { logout } = useAuthActions()

	const setActiveIf = (path: string) => ({
		[styles.active]: location.pathname === path
	})

	useEffect(() => {
		if (logoutError) {
			const logoutErrorMessage = getErrorMessage(logoutError)
			if (logoutErrorMessage) {
				toast.error(logoutErrorMessage, { id: 'logoutError' })
			}
		}
	}, [logoutError])

	return (
		<div className={styles.bottomNavigation}>
			{me ? (
				<button
					aria-label='logout'
					className={styles.login}
					onClick={() => logout()}
				>
					<Icons.LoginIcon className={styles.logoutIcon} />
					<span className={styles.loginText}>Logout</span>
				</button>
			) : (
				<Link
					aria-label='login'
					className={cn(styles.login, setActiveIf('/login'))}
					to='/login'
				>
					<Icons.LoginIcon className={styles.loginIcon} />
					<span className={styles.loginText}>Login</span>
				</Link>
			)}
		</div>
	)
}
