import { z } from 'zod'

import { emailScheme, passwordScheme } from './common.schemas'

export const signupSchema = z
	.object({
		username: z
			.string()
			.min(3, 'Username should have at least 3 characters')
			.max(15, "Username shouldn't be longer than 15 characters"),
		email: emailScheme,
		password: passwordScheme,
		confirmPassword: z.string().min(1, 'Please confirm your password')
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ['confirmPassword']
	})

export type SignupValues = z.infer<typeof signupSchema>
