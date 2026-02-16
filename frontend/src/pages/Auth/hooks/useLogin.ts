import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import type { BackendError } from '@/frontend-types'
import { useAuthActions } from '@/hooks'
import {
	type LoginCredentials,
	loginSchema
} from '@/pages/Auth/schemas/login.schemas'

interface UseLoginProps {
	onSuccess?: () => void
}

export const useLogin = ({ onSuccess }: UseLoginProps = {}) => {
	const { login } = useAuthActions()
	const loginForm = useForm<LoginCredentials>({
		mode: 'onTouched',
		resolver: zodResolver(loginSchema)
	})

	const onSubmit = loginForm.handleSubmit(async (values) => {
		try {
			await login(values).unwrap()
			onSuccess?.()
		} catch (e) {
			const error = e as BackendError

			if (!error.data) return

			const { details } = error.data.error

			if (!details) return

			loginForm.setError(details.field, {
				message: error.data?.error.message
			})
		}
	})

	return {
		form: loginForm,
		functions: { onSubmit },
		state: { isLoading: loginForm.formState.isSubmitting }
	}
}
