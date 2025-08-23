import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { useGetMeQuery } from '@/store/api'

import styles from './Auth.module.scss'
import { Login } from './Login'
import { Signup } from './Signup'

export const Auth = () => {
	const navigate = useNavigate()
	const { data: me } = useGetMeQuery()
	const [method, setMethod] = useState<'login' | 'signup'>('login')
	const location = useLocation()
	const from = (location.state as { from?: string })?.from

	useEffect(() => {
		if (me) {
			navigate(from ?? `/user/${me.username}`, { replace: true })
		}
	}, [me])

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
		</div>
	)
}
