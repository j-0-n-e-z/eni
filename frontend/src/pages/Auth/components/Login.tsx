/* eslint-disable jsx-a11y/label-has-associated-control */
import { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import { useAuthData } from '@/hooks'
import { Icons } from '@/ui'
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
				<fieldset disabled={state.isLoading}>
					<label className={styles.formGroup} htmlFor='email'>
						<div className={styles.labelWrapper}>
							<span className={styles.label}>Email</span>
							{errors.email && (
								<span className={styles.inputError}>
									{errors.email.message}
								</span>
							)}
						</div>
						<input
							defaultValue='rigabdullin@yandex.ru'
							id='email'
							type='email'
							{...form.register('email')}
							placeholder='ilovemovies@email.com'
						/>
					</label>

					<label className={styles.formGroup} htmlFor='password'>
						<div className={styles.labelWrapper}>
							<span className={styles.label}>Password</span>
							{errors.password && (
								<span className={styles.inputError}>
									{errors.password.message}
								</span>
							)}
						</div>
						<input
							defaultValue='Parol228$'
							id='password'
							type='password'
							{...form.register('password')}
							placeholder='••••••••••'
						/>
					</label>
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
