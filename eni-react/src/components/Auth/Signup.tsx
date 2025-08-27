/* eslint-disable jsx-a11y/label-has-associated-control */
import { zodResolver } from '@hookform/resolvers/zod'
import cn from 'classnames'
import type { FC } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import type { SignupCredentials } from '@/schemas/signup.schemas'
import { signupSchema } from '@/schemas/signup.schemas'
import type { BackendError } from '@/store/api'
import { useSignupMutation } from '@/store/api'

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
	} = useForm<SignupCredentials>({ resolver: zodResolver(signupSchema) })
	const [signup, { isLoading }] = useSignupMutation()

	async function onSubmit({ email, password, username }: SignupCredentials) {
		if (isLoading) return

		try {
			await signup({ email, password, username }).unwrap()
			toast.success('You successfully signed up!')
			goToLogin()
		} catch (error) {
			const err = error as BackendError
			setError(err.data?.error.details.field as 'email' | 'password', {
				message: err.data?.error.message
			})
		}
	}

	return (
		<form
			noValidate
			className={styles.formContainer}
			onSubmit={handleSubmit(onSubmit)}
		>
			<label className={styles.formGroup}>
				<div className={styles.labelWrapper}>
					<span className={styles.label}>Email</span>
					{errors.email && (
						<span className={styles.inputError}>{errors.email.message}</span>
					)}
				</div>
				<input
					id='email'
					type='email'
					{...register('email')}
					placeholder='ilovemovies@email.com'
				/>
			</label>

			<label className={styles.formGroup}>
				<div className={styles.labelWrapper}>
					<span className={styles.label}>Username</span>
					{errors.username && (
						<span className={styles.inputError}>{errors.username.message}</span>
					)}
				</div>
				<input
					id='username'
					type='text'
					{...register('username')}
					placeholder='Voldemort'
				/>
			</label>

			<label className={styles.formGroup}>
				<div className={styles.labelWrapper}>
					<span className={styles.label}>Password</span>
					{errors.password && (
						<span className={styles.inputError}>{errors.password.message}</span>
					)}
				</div>
				<input
					id='password'
					type='password'
					{...register('password')}
					placeholder='••••••••••'
				/>
			</label>

			<label className={styles.formGroup}>
				<div className={styles.labelWrapper}>
					<span className={styles.label}>Confirm password</span>
					{errors.confirmPassword && (
						<span className={styles.inputError}>
							{errors.confirmPassword.message}
						</span>
					)}
				</div>
				<input
					id='confirmPassword'
					type='password'
					{...register('confirmPassword')}
					placeholder='••••••••••'
				/>
			</label>

			<button className={cn(styles.submitBtn, styles.primary)}>Sign up</button>
		</form>
	)
}
