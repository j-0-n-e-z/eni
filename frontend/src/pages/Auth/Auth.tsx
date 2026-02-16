import { useState } from 'react'

import { Icons } from '@/ui'

import { Login } from './components/Login'
import { Signup } from './components/Signup'

import styles from './Auth.module.scss'

export const Auth = () => {
	const [method, setMethod] = useState<'login' | 'signup'>('login')

	return (
		<section className={styles.page}>
			<div className={styles.container}>
				<div className={styles.header}>
					<div className={styles.logoContainer}>
						<div className={styles.logoIconWrapper}>
							<Icons.BrainIcon className={styles.logoIcon} />
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
								onChange={() => setMethod('login')}
							/>
							Login
						</label>
						<label className={styles.tab} htmlFor='signup'>
							<input
								checked={method === 'signup'}
								id='signup'
								name='method'
								type='radio'
								onChange={() => setMethod('signup')}
							/>
							Sign up
						</label>
					</form>
				</div>

				{method === 'login' && <Login />}
				{method === 'signup' && <Signup goToLogin={() => setMethod('login')} />}
			</div>
		</section>
	)
}
