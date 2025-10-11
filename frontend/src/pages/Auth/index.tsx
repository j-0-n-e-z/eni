import { useState } from 'react'

import { BrainIcon } from '@/icons'

import styles from './Auth.module.scss'
import { Login } from './components/Login'
import { Signup } from './components/Signup'

export const Auth = () => {
	const [method, setMethod] = useState<'login' | 'signup'>('login')

	return (
		<div className={styles.authPage}>
			<div className={styles.authContainer}>
				<div className={styles.authHeader}>
					<div className={styles.logoContainer}>
						<div className={styles.logoIconWrapper}>
							<BrainIcon className={styles.logoIcon} />
						</div>
						<span className={styles.logoText}>Eni</span>
					</div>
					<form className={styles.tabContainer}>
						<label className={styles.tab} htmlFor='login'>
							<input
								checked={method === 'login'}
								id='login'
								name='method'
								type='radio'
								value='login'
								onChange={(e) => setMethod(e.target.value as 'login')}
							/>
							Login
						</label>
						<label className={styles.tab} htmlFor='signup'>
							<input
								checked={method === 'signup'}
								id='signup'
								name='method'
								type='radio'
								value='signup'
								onChange={(e) => setMethod(e.target.value as 'signup')}
							/>
							Sign up
						</label>
					</form>
				</div>

				{method === 'login' && <Login />}
				{method === 'signup' && <Signup goToLogin={() => setMethod('login')} />}
			</div>
		</div>
	)
}
