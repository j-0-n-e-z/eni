import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { useLoginMutation } from '@/api'
import type { LoginCredentials } from '@/schemas/login.schemas'
import { loginSchema } from '@/schemas/login.schemas'
import type { ApiError } from '@/types'

import styles from './Auth.module.scss'

export const Login = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		setError
	} = useForm<LoginCredentials>({ resolver: zodResolver(loginSchema) })
	const [login] = useLoginMutation()

	async function onSubmit({ email, password }: LoginCredentials) {
		try {
			await login({ email, password }).unwrap()
		} catch (error) {
			if (!('data' in error)) return
			const apiError = error.data as ApiError
			if (apiError.field) {
				setError(apiError.field as 'email' | 'password', {
					message: apiError.message
				})
			}
		}
	}

	return (
		<form noValidate className={styles.form} onSubmit={handleSubmit(onSubmit)}>
			<label className={styles.inputWrapper} htmlFor='email'>
				<div className={styles.label}>
					<span>Email</span>
					{errors.email && (
						<span className={styles.inputError}>{errors.email.message}</span>
					)}
				</div>
				<input
					className={styles.input}
					defaultValue='rigabdullin@yandex.ru'
					id='email'
					type='email'
					{...register('email')}
					placeholder='ilovemovies@email.com'
				/>
			</label>

			<label className={styles.inputWrapper} htmlFor='password'>
				<div className={styles.label}>
					<span>Password</span>
					{errors.password && (
						<span className={styles.inputError}>{errors.password.message}</span>
					)}
				</div>
				<input
					className={styles.input}
					defaultValue='Parol228$'
					id='password'
					type='password'
					{...register('password')}
					placeholder='••••••••••'
				/>
			</label>

			<button className={styles.submitBtn}>Login</button>
		</form>
	)
}
