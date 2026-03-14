import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import type { BackendError } from '@/frontend-types'
import { notifyOnError } from '@/utils'

import {
	contactScheme,
	type ContactCredentials
} from '../schemas/contact.scheme'

interface UseContactProps {
	onSuccess?: () => void
}

export const useContact = ({ onSuccess }: UseContactProps = {}) => {
	const contactForm = useForm<ContactCredentials>({
		mode: 'onTouched',
		resolver: zodResolver(contactScheme)
	})

	const onSubmit = contactForm.handleSubmit(async (values) => {
		try {
			await new Promise((res) => {
				setTimeout(res, 2000)
				console.log(values)
			})
			onSuccess?.()
		} catch (e) {
			const error = e as BackendError

			if (!error.data) return

			const { details } = error.data.error

			console.log(details)

			notifyOnError('Какая-то ошибка', 'contactError')
		}
	})

	return {
		form: contactForm,
		functions: { onSubmit },
		state: {
			errors: contactForm.formState.errors,
			isLoading: contactForm.formState.isSubmitting
		}
	}
}
