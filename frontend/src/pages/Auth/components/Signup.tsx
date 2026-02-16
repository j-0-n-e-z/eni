/* eslint-disable jsx-a11y/label-has-associated-control */
import cn from 'classnames'

import { useSignup } from '../hooks/useSignup'

import styles from '../Auth.module.scss'

interface SignupProps {
	goToLogin: () => void
}

export const Signup = ({ goToLogin }: SignupProps) => {
	const { form, state, functions } = useSignup({ onSuccess: goToLogin })
	const { errors } = form.formState

	return (
		<form className={styles.formContainer} onSubmit={functions.onSubmit}>
			<fieldset disabled={state.isLoading}>
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
						{...form.register('email')}
						placeholder='ilovemovies@email.com'
					/>
				</label>

				<label className={styles.formGroup}>
					<div className={styles.labelWrapper}>
						<span className={styles.label}>Username</span>
						{errors.username && (
							<span className={styles.inputError}>
								{errors.username.message}
							</span>
						)}
					</div>
					<input
						id='username'
						type='text'
						{...form.register('username')}
						placeholder='voldemort'
					/>
				</label>

				<label className={styles.formGroup}>
					<div className={styles.labelWrapper}>
						<span className={styles.label}>Password</span>
						{errors.password && (
							<span className={styles.inputError}>
								{errors.password.message}
							</span>
						)}
					</div>
					<input
						id='password'
						type='password'
						{...form.register('password')}
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
						{...form.register('confirmPassword')}
						placeholder='••••••••••'
					/>
				</label>
			</fieldset>

			<button className={cn(styles.submitBtn, styles.primary)}>Sign up</button>
		</form>
	)
}
