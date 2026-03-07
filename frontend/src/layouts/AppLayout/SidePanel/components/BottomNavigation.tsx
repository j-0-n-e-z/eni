import cn from 'classnames'
import { Link, useLocation } from 'react-router-dom'

import { useAuthActions, useAuthData } from '@/hooks'
import { Icons } from '@/ui'
import { getErrorMessage, notifyOnError } from '@/utils'

import styles from '../SidePanel.module.scss'

export const BottomNavigation = () => {
	const location = useLocation()
	const { me, logoutError } = useAuthData()
	const { logout } = useAuthActions()

	if (logoutError) {
		const errorMessage = getErrorMessage(logoutError)
		if (errorMessage) {
			notifyOnError(errorMessage, 'logoutError')
		}
	}

	return (
		<div className={styles.bottomNavigation}>
			{me ? (
				<button
					aria-label='logout'
					className={styles.login}
					type='button'
					onClick={() => logout()}
				>
					<Icons.Login className={styles.logoutIcon} />
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
					<Icons.Login className={styles.loginIcon} />
					<span className={styles.loginText}>Login</span>
				</Link>
			)}
		</div>
	)
}
