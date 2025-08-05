import { z } from 'zod'

export const loginSchema = z.object({
	email: z.email('Incorrect email'),
	password: z
		.string()
		.min(1, 'Password is required')
		.min(6, 'Password is too short')
		.max(12, 'Password is too long')
		.regex(/[A-Z]/, 'At least one capital letter required')
		.regex(/\d/, 'At least one digit required')
		// .regex(/[!@#$%^&*]/, 'At least one special character required')
})

export type LoginValues = z.infer<typeof loginSchema>
