/* eslint-disable jsx-a11y/label-has-associated-control */
import cn from 'classnames'

import { Input } from '@/ui'

import { useSignup } from '../hooks/useSignup'

import styles from '../Auth.module.scss'

interface SignupProps {
	onSuccess: () => void
}

export const Signup = ({ onSuccess }: SignupProps) => {
	const { form, state, functions } = useSignup({ onSuccess })
	const { errors } = state

	return (
		<form className={styles.formContainer} onSubmit={functions.onSubmit}>
			<fieldset className={styles.fields} disabled={state.isLoading}>
				<Input
					label='Email'
					{...form.register('email')}
					id='email'
					placeholder='ilovemovies@email.com'
					type='email'
					{...('email' in errors && {
						error: errors.email?.message
					})}
				/>

				<Input
					label='Username'
					{...form.register('username')}
					id='username'
					placeholder='voldemort'
					type='username'
					{...('username' in errors && {
						error: errors.username?.message
					})}
				/>

				<Input
					label='Password'
					{...form.register('password')}
					id='password'
					placeholder='•••••••'
					type='password'
					{...('password' in errors && {
						error: errors.password?.message
					})}
				/>

				<Input
					label='Confirm password'
					{...form.register('confirmPassword')}
					id='confirmPassword'
					placeholder='•••••••'
					type='password'
					{...('confirmPassword' in errors && {
						error: errors.confirmPassword?.message
					})}
				/>
			</fieldset>

			<button
				className={cn(styles.submitBtn, styles.primary)}
				disabled={state.isLoading}
			>
				Sign up
			</button>
		</form>
	)
}
