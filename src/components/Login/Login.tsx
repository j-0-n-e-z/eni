import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { useLoginMutation } from '@/api'
import { useAuth } from '@/hooks'
import type { LoginValues } from '@/schemas/login.schemas'
import { loginSchema } from '@/schemas/login.schemas'

import styles from './Login.module.scss'

export const Login = () => {
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<LoginValues>({ resolver: zodResolver(loginSchema) })
	const [login] = useLoginMutation()
	const navigate = useNavigate()
	const { isAuthenticated, user } = useAuth()

	useEffect(() => {
		if (user) {
			navigate(`/user/${user.username}`)
		}
	}, [isAuthenticated])

	async function onSubmit({ email, password }: LoginValues) {
		const { user } = await login({ email, password }).unwrap()
		navigate(`/user/${user.username}`)
	}

	return (
		<div className={styles.loginPage}>
			<form
				noValidate
				className={styles.form}
				onSubmit={handleSubmit(onSubmit)}
			>
				<label className={styles.inputWrapper} htmlFor='email'>
					<div className={styles.label}>
						<span>Email:</span>
						{errors.email && (
							<span className={styles.inputError}>{errors.email.message}</span>
						)}
					</div>
					<input
						className={styles.input}
						id='email'
						type='email'
						{...register('email')}
						placeholder='ilovemovies@email.com'
					/>
				</label>

				<label className={styles.inputWrapper} htmlFor='password'>
					<div className={styles.label}>
						<span>Password:</span>
						{errors.password && (
							<span className={styles.inputError}>
								{errors.password.message}
							</span>
						)}
					</div>
					<input
						className={styles.input}
						id='password'
						type='password'
						{...register('password')}
						placeholder='Str0n9_p4$$vv0rD'
					/>
				</label>

				<button className={styles.submitBtn}>Login</button>
			</form>
		</div>
	)
}
