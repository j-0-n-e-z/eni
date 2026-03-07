import { useState } from 'react'

import { Icons } from '@/ui'

import { Login } from './components/Login'
import { Signup } from './components/Signup'

import styles from './Auth.module.scss'

export const Auth = () => {
	const [method, setMethod] = useState<'login' | 'signup'>('signup')

	return (
		<section className={styles.auth}>
			<div className={styles.authCard}>
				<div className={styles.header}>
					<div className={styles.hero}>
						<div className={styles.heroIconWrapper}>
							<Icons.Brain className={styles.logo} />
						</div>
						<span className={styles.heroTitle}>Eni</span>
					</div>
					<form className={styles.authMethodForm}>
						<label className={styles.authMethod} htmlFor='login'>
							<input
								checked={method === 'login'}
								id='login'
								name='method'
								type='radio'
								onChange={() => setMethod('login')}
							/>
							Login
						</label>
						<label className={styles.authMethod} htmlFor='signup'>
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
				{method === 'signup' && <Signup onSuccess={() => setMethod('login')} />}
			</div>
		</section>
	)
}
