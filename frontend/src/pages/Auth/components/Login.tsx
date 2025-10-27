/* eslint-disable jsx-a11y/label-has-associated-control */
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import type { BackendError } from '@/frontend-types'
import { useAuthActions, useAuthData } from '@/hooks'
import type { LoginCredentials } from '@/schemas'
import { loginSchema } from '@/schemas'
import { GithubIcon, GoogleIcon } from '@/ui'

import styles from '../Auth.module.scss'

export const Login = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		setError
	} = useForm<LoginCredentials>({ resolver: zodResolver(loginSchema) })
	const { me, isLoginLoading } = useAuthData()
	const { login } = useAuthActions()
	const navigate = useNavigate()
	const location = useLocation()
	const from = (location.state as { from?: string })?.from

	useEffect(() => {
		if (me) {
			navigate(from ?? `/user/${me.username}`, { replace: true })
		}
	}, [me])

	async function onSubmit({ email, password, rememberMe }: LoginCredentials) {
		if (isLoginLoading) return

		try {
			await login({ email, password, rememberMe }).unwrap()
		} catch (e) {
			const error = e as BackendError

			if (!error.data) return

			const details = error.data.error.details as {
				field: 'email' | 'password'
			}
			setError(details.field, {
				message: error.data?.error.message
			})
		}
	}

	return (
		<>
			<form
				noValidate
				className={styles.formContainer}
				onSubmit={handleSubmit(onSubmit)}
			>
				<label className={styles.formGroup} htmlFor='email'>
					<div className={styles.labelWrapper}>
						<span className={styles.label}>Email</span>
						{errors.email && (
							<span className={styles.inputError}>{errors.email.message}</span>
						)}
					</div>
					<input
						defaultValue='rigabdullin@yandex.ru'
						id='email'
						type='email'
						{...register('email')}
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
						{...register('password')}
						placeholder='••••••••••'
					/>
				</label>

				<div className={styles.formOptions}>
					<div className={styles.checkboxGroup}>
						<input
							id='rememberMe'
							{...register('rememberMe')}
							type='checkbox'
						/>
						<label htmlFor='rememberMe'>Remember me</label>
					</div>
					<Link className={styles.forgotPassword} to='/forgot-password'>
						Forgot password?
					</Link>
				</div>

				<button className={styles.submitBtn}>Login</button>
			</form>

			<div className={styles.authFooter}>
				<div className={styles.divider}>
					<span>or continue with</span>
				</div>
				<div className={styles.socialButtons}>
					<button className={styles.socialButton}>
						<GoogleIcon />
						Google
					</button>
					<button className={styles.socialButton}>
						<GithubIcon />
						GitHub
					</button>
				</div>
			</div>
		</>
	)
}
