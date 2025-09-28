import { z } from 'zod'

import { emailScheme, passwordScheme } from './common.schemas'

export const signupSchema = z
	.object({
		confirmPassword: z.string().min(1, 'Please confirm your password'),
		email: emailScheme,
		password: passwordScheme,
		username: z
			.string()
			.min(1, 'Username is required')
			.min(3, 'Username should have at least 3 characters')
			.max(15, "Username shouldn't be longer than 15 characters")
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ['confirmPassword']
	})

export type SignupCredentials = z.infer<typeof signupSchema>
