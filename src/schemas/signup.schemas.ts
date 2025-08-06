import { z } from 'zod'

export const signupSchema = z
  .object({
    username: z.string().min(3, 'Username should have at least 3 characters'),
		email: z
			.string()
			.min(1, 'Email is required')
			.refine((val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), 'Invalid email'),
		password: z
			.string()
			.min(1, 'Password is required')
			.min(6, 'Password is too short')
			.max(12, 'Password is too long')
			.regex(/[A-Z]/, 'At least one capital letter required')
			.regex(/\d/, 'At least one digit required')
			.regex(/[!@#$%^&*]/, 'At least one special character required'),
		confirmPassword: z.string().min(1, 'Please confirm your password')
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Passwords don\'t match',
		path: ['confirmPassword']
	})

export type SignupValues = z.infer<typeof signupSchema>
