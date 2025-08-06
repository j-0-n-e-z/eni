/* eslint-disable jsx-a11y/label-has-associated-control */
import { useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

import { useAuth } from '@/hooks'

import styles from './Auth.module.scss'
import { Login } from './Login'
import { Signup } from './Signup'

export const Auth = () => {
	const navigate = useNavigate()
	const { isAuthenticated, me } = useAuth()
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
					<label>
						<input
							checked={method === 'login'}
							name='method'
							type='radio'
							value='login'
							onChange={(e) => setMethod(e.target.value as 'login')}
						/>
						Login
					</label>
					<label>
						<input
							checked={method === 'signup'}
							name='method'
							type='radio'
							value='signup'
							onChange={(e) => setMethod(e.target.value as 'signup')}
						/>
						Sign up
					</label>
				</form>
				{method === 'login' ? <Login /> : <Signup />}
			</div>
			<Toaster />
		</div>
	)
}
