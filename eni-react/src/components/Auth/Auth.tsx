import { useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

import { useAuth } from '@/hooks'

import styles from './Auth.module.scss'
import { Login } from './Login'
import { Signup } from './Signup'

export const Auth = () => {
	const navigate = useNavigate()
	const { me, isAuthenticated } = useAuth()
	const [method, setMethod] = useState<'login' | 'signup'>('login')

	useEffect(() => {
		if (me) {
			navigate(`/user/${me.username}`)
		}
	}, [isAuthenticated])

	return (
		<div className={styles.authPage}>
			<div className={styles.formWrapper}>
				<form className={styles.methodPicker}>
					<label htmlFor='login'>
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
					<label htmlFor='signup'>
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
				{method === 'login' && <Login />}
				{method === 'signup' && <Signup goToLogin={() => setMethod('login')} />}
			</div>
			<Toaster />
		</div>
	)
}
