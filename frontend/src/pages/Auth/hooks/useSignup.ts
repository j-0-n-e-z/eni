import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import type { BackendError } from '@/frontend-types'
import {
	type SignupCredentials,
	signupSchema
} from '@/pages/Auth/schemas/signup.schemas'
import { useSignupMutation } from '@/store/api'
import { notifyOnSuccess } from '@/utils'

interface UseSignupProps {
	onSuccess?: () => void
}

export const useSignup = ({ onSuccess }: UseSignupProps = {}) => {
	const [signup] = useSignupMutation()
	const signupForm = useForm<SignupCredentials>({
		mode: 'onTouched',
		resolver: zodResolver(signupSchema)
	})

	const onSubmit = signupForm.handleSubmit(async (values) => {
		try {
			await signup(values).unwrap()
			notifyOnSuccess('Вы успешно зарегистрировались!', 'signup')
			onSuccess?.()
		} catch (e) {
			const error = e as BackendError

			if (!error.data) return

			const { details } = error.data.error

			if (!details) return

			signupForm.setError(details.field, {
				message: error.data?.error.message
			})
		}
	})

	return {
		form: signupForm,
		functions: { onSubmit },
		state: {
			errors: signupForm.formState.errors,
			isLoading: signupForm.formState.isSubmitting
		}
	}
}
