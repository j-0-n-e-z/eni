/* eslint-disable jsx-a11y/label-has-associated-control */
import { zodResolver } from '@hookform/resolvers/zod'
import cn from 'classnames'
import type { FC } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { useSignupMutation } from '@/api'
import type { SignupValues } from '@/schemas/signup.schemas'
import { signupSchema } from '@/schemas/signup.schemas'
import type { ApiError } from '@/types'

import styles from './Auth.module.scss'

interface SignupProps {
	goToLogin: () => void
}

export const Signup: FC<SignupProps> = ({ goToLogin }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		setError
	} = useForm<SignupValues>({ resolver: zodResolver(signupSchema) })
	const [signup] = useSignupMutation()

	async function onSubmit({ email, password, username }: SignupValues) {
		const { error } = await signup({ email, password, username })

		if (!error) {
      toast.success('You successfully signed up!')
      goToLogin()
		}

		// TODO: validate and send {field: confirmPassword} on error
		if (error && 'data' in error) {
			const apiError = error.data as ApiError
			if (apiError.field) {
				setError(apiError.field as 'email' | 'password' | 'confirmPassword', {
					message: apiError.message
				})
			}
		}
	}

	return (
		<form noValidate className={styles.form} onSubmit={handleSubmit(onSubmit)}>
			<label className={styles.inputWrapper}>
				<div className={styles.label}>
					<span>Email</span>
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

			<label className={styles.inputWrapper}>
				<div className={styles.label}>
					<span>Username</span>
					{errors.username && (
						<span className={styles.inputError}>{errors.username.message}</span>
					)}
				</div>
				<input
					className={styles.input}
					id='username'
					type='text'
					{...register('username')}
					placeholder='Voldemort'
				/>
			</label>

			<label className={styles.inputWrapper}>
				<div className={styles.label}>
					<span>Password</span>
					{errors.password && (
						<span className={styles.inputError}>{errors.password.message}</span>
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

			<label className={styles.inputWrapper}>
				<div className={styles.label}>
					<span>Confirm password</span>
					{errors.confirmPassword && (
						<span className={styles.inputError}>
							{errors.confirmPassword.message}
						</span>
					)}
				</div>
				<input
					className={styles.input}
					id='confirmPassword'
					type='password'
					{...register('confirmPassword')}
					placeholder='••••••••••'
				/>
			</label>

			<button className={cn(styles.submitBtn, styles.submitBtnPrimary)}>
				Sign up
			</button>
		</form>
	)
}
