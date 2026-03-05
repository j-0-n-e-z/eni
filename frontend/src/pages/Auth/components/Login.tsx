/* eslint-disable jsx-a11y/label-has-associated-control */
import { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import { useAuthData } from '@/hooks'
import { Icons, Input } from '@/ui'
import { notifyOnSuccess } from '@/utils'

import { useLogin } from '../hooks/useLogin'

import styles from '../Auth.module.scss'

export const Login = () => {
	const { form, state, functions } = useLogin({
		onSuccess: () => notifyOnSuccess('Вы успешно вошли', 'login')
	})
	const { errors } = form.formState
	const { me } = useAuthData()
	const navigate = useNavigate()
	const location = useLocation()
	const from = (location.state as { from?: string })?.from

	useEffect(() => {
		if (me) {
			navigate(from ?? `/user/${me.username}`, { replace: true })
		}
	}, [me])

	return (
		<>
			<form className={styles.formContainer} onSubmit={functions.onSubmit}>
				<fieldset className={styles.fields} disabled={state.isLoading}>
					<Input
						label='Email'
						{...form.register('email')}
						defaultValue='rigabdullin@yandex.ru'
						id='email'
						placeholder='ilovemovies@email.com'
						type='email'
						{...('email' in errors && { error: errors.email?.message })}
					/>
					<Input
						label='Password'
						{...form.register('password')}
						defaultValue='Parol228$'
						id='password'
						placeholder='•••••••'
						type='password'
						{...('password' in errors && { error: errors.password?.message })}
					/>

					<div className={styles.formOptions}>
						<div className={styles.checkboxGroup}>
							<input
								id='rememberMe'
								{...form.register('rememberMe')}
								type='checkbox'
							/>
							<label htmlFor='rememberMe'>Remember me</label>
						</div>
						<Link className={styles.forgotPassword} to='/forgot-password'>
							Forgot password?
						</Link>
					</div>
				</fieldset>

				<button className={styles.submitBtn} disabled={state.isLoading}>
					Login
				</button>
			</form>

			<div className={styles.footer}>
				<div className={styles.divider}>
					<span>or continue with</span>
				</div>
				<div className={styles.socialButtons}>
					<button className={styles.socialButton}>
						<Icons.GoogleIcon />
						Google
					</button>
					<button className={styles.socialButton}>
						<Icons.GithubIcon />
						GitHub
					</button>
				</div>
			</div>
		</>
	)
}
