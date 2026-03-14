import { z } from 'zod'

export const contactScheme = z.object({
	emailOrTelegram: z.string().refine(
		(value) => {
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
			const telegramRegex = /^@[a-zA-Z0-9_]{5,32}$/

			return emailRegex.test(value) || telegramRegex.test(value)
		},
		{
			message: 'Must be a valid email or telegram username'
		}
	),
	message: z
		.string()
		.min(20, 'Message must be at least 20 characters')
		.max(200, 'Message must be less than 200 characters'),
	name: z.string().min(2, 'Name must be at least 2 characters')
})

export type ContactCredentials = z.infer<typeof contactScheme>
